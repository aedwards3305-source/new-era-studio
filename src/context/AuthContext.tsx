'use client';

import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { Customer, Order } from '@/lib/types';

interface AuthState {
  customer: Customer | null;
  orders: Order[];
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => { success: boolean; error?: string };
  register: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    subscribedToOffers: boolean;
  }) => { success: boolean; error?: string };
  logout: () => void;
  addOrder: (order: Omit<Order, 'id'>) => void;
  updateProfile: (data: Partial<Pick<Customer, 'firstName' | 'lastName' | 'subscribedToOffers'>>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: 'LOGIN'; payload: Customer }
  | { type: 'LOGOUT' }
  | { type: 'LOAD_SESSION'; payload: { customer: Customer; orders: Order[] } }
  | { type: 'ADD_ORDER'; payload: Order }
  | { type: 'UPDATE_PROFILE'; payload: Partial<Pick<Customer, 'firstName' | 'lastName' | 'subscribedToOffers'>> };

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN':
      return { customer: action.payload, orders: state.orders, isAuthenticated: true };

    case 'LOGOUT':
      return { customer: null, orders: [], isAuthenticated: false };

    case 'LOAD_SESSION':
      return {
        customer: action.payload.customer,
        orders: action.payload.orders,
        isAuthenticated: true,
      };

    case 'ADD_ORDER':
      return { ...state, orders: [action.payload, ...state.orders] };

    case 'UPDATE_PROFILE':
      if (!state.customer) return state;
      return {
        ...state,
        customer: { ...state.customer, ...action.payload },
      };

    default:
      return state;
  }
}

const initialState: AuthState = {
  customer: null,
  orders: [],
  isAuthenticated: false,
};

// Simple hash for localStorage (not cryptographic security — just basic obfuscation)
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return hash.toString(36);
}

interface StoredAccount {
  customer: Customer;
  passwordHash: string;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load session from localStorage on mount
  useEffect(() => {
    try {
      const session = localStorage.getItem('new-era-studio-session');
      if (session) {
        const { customerId } = JSON.parse(session);
        const accounts = JSON.parse(localStorage.getItem('new-era-studio-accounts') || '{}');
        const account: StoredAccount | undefined = accounts[customerId];
        if (account) {
          const orders = JSON.parse(
            localStorage.getItem(`new-era-studio-orders-${customerId}`) || '[]'
          );
          dispatch({
            type: 'LOAD_SESSION',
            payload: { customer: account.customer, orders },
          });
        }
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Persist orders whenever they change
  useEffect(() => {
    if (state.customer) {
      try {
        localStorage.setItem(
          `new-era-studio-orders-${state.customer.id}`,
          JSON.stringify(state.orders)
        );
      } catch {
        // Ignore storage errors
      }
    }
  }, [state.orders, state.customer]);

  // Persist customer profile changes
  useEffect(() => {
    if (state.customer) {
      try {
        const accounts = JSON.parse(localStorage.getItem('new-era-studio-accounts') || '{}');
        if (accounts[state.customer.id]) {
          accounts[state.customer.id].customer = state.customer;
          localStorage.setItem('new-era-studio-accounts', JSON.stringify(accounts));
        }
      } catch {
        // Ignore
      }
    }
  }, [state.customer]);

  const login = useCallback((email: string, password: string) => {
    try {
      const accounts: Record<string, StoredAccount> = JSON.parse(
        localStorage.getItem('new-era-studio-accounts') || '{}'
      );
      const account = Object.values(accounts).find(
        (a) => a.customer.email.toLowerCase() === email.toLowerCase()
      );
      if (!account) {
        return { success: false, error: 'No account found with that email.' };
      }
      if (account.passwordHash !== simpleHash(password)) {
        return { success: false, error: 'Incorrect password.' };
      }

      // Load orders for this customer
      const orders = JSON.parse(
        localStorage.getItem(`new-era-studio-orders-${account.customer.id}`) || '[]'
      );

      dispatch({ type: 'LOAD_SESSION', payload: { customer: account.customer, orders } });
      localStorage.setItem(
        'new-era-studio-session',
        JSON.stringify({ customerId: account.customer.id })
      );

      return { success: true };
    } catch {
      return { success: false, error: 'Something went wrong. Please try again.' };
    }
  }, []);

  const register = useCallback(
    (data: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      subscribedToOffers: boolean;
    }) => {
      try {
        const accounts: Record<string, StoredAccount> = JSON.parse(
          localStorage.getItem('new-era-studio-accounts') || '{}'
        );

        // Check if email already exists
        const existing = Object.values(accounts).find(
          (a) => a.customer.email.toLowerCase() === data.email.toLowerCase()
        );
        if (existing) {
          return { success: false, error: 'An account with this email already exists.' };
        }

        const customer: Customer = {
          id: `cust-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          createdAt: new Date().toISOString(),
          subscribedToOffers: data.subscribedToOffers,
        };

        accounts[customer.id] = {
          customer,
          passwordHash: simpleHash(data.password),
        };

        localStorage.setItem('new-era-studio-accounts', JSON.stringify(accounts));
        localStorage.setItem(
          'new-era-studio-session',
          JSON.stringify({ customerId: customer.id })
        );

        dispatch({ type: 'LOGIN', payload: customer });
        return { success: true };
      } catch {
        return { success: false, error: 'Something went wrong. Please try again.' };
      }
    },
    []
  );

  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' });
    try {
      localStorage.removeItem('new-era-studio-session');
    } catch {
      // Ignore
    }
  }, []);

  const addOrder = useCallback((order: Omit<Order, 'id'>) => {
    const newOrder: Order = {
      ...order,
      id: `order-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    };
    dispatch({ type: 'ADD_ORDER', payload: newOrder });
  }, []);

  const updateProfile = useCallback(
    (data: Partial<Pick<Customer, 'firstName' | 'lastName' | 'subscribedToOffers'>>) => {
      dispatch({ type: 'UPDATE_PROFILE', payload: data });
    },
    []
  );

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        addOrder,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
