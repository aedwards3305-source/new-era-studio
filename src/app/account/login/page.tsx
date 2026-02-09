'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/account');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = login(email, password);
    if (result.success) {
      router.push('/account');
    } else {
      setError(result.error || 'Login failed.');
      setLoading(false);
    }
  };

  if (isAuthenticated) return null;

  return (
    <div className="section-padding py-12 lg:py-20">
      <div className="section-width max-w-md mx-auto">
        <div className="text-center mb-10">
          <h1 className="heading-lg mb-3">Sign In</h1>
          <p className="text-sm font-body text-brand-gray-500">
            Sign in to your account to view orders and access exclusive offers.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-sm font-body text-red-600">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-xs font-body font-semibold tracking-wider uppercase mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-brand-gray-200 px-4 py-3 text-sm font-body focus:outline-none focus:border-brand-black transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-body font-semibold tracking-wider uppercase mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              className="w-full border border-brand-gray-200 px-4 py-3 text-sm font-body focus:outline-none focus:border-brand-black transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full text-center"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 text-center space-y-3">
          <p className="text-sm font-body text-brand-gray-500">
            Don&apos;t have an account?{' '}
            <Link
              href="/account/register"
              className="text-brand-black font-medium link-underline"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
