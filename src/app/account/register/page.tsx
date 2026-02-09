'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
  const router = useRouter();
  const { isAuthenticated, register } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [subscribedToOffers, setSubscribedToOffers] = useState(true);
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

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    const result = register({
      email,
      password,
      firstName,
      lastName,
      subscribedToOffers,
    });

    if (result.success) {
      router.push('/account');
    } else {
      setError(result.error || 'Registration failed.');
      setLoading(false);
    }
  };

  if (isAuthenticated) return null;

  return (
    <div className="section-padding py-12 lg:py-20">
      <div className="section-width max-w-md mx-auto">
        <div className="text-center mb-10">
          <h1 className="heading-lg mb-3">Create Account</h1>
          <p className="text-sm font-body text-brand-gray-500">
            Join us for exclusive offers, order tracking, and a personalized experience.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-sm font-body text-red-600">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-xs font-body font-semibold tracking-wider uppercase mb-2"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
                className="w-full border border-brand-gray-200 px-4 py-3 text-sm font-body focus:outline-none focus:border-brand-black transition-colors"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-xs font-body font-semibold tracking-wider uppercase mb-2"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
                className="w-full border border-brand-gray-200 px-4 py-3 text-sm font-body focus:outline-none focus:border-brand-black transition-colors"
              />
            </div>
          </div>

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
              placeholder="At least 6 characters"
              className="w-full border border-brand-gray-200 px-4 py-3 text-sm font-body focus:outline-none focus:border-brand-black transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-xs font-body font-semibold tracking-wider uppercase mb-2"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              className="w-full border border-brand-gray-200 px-4 py-3 text-sm font-body focus:outline-none focus:border-brand-black transition-colors"
            />
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={subscribedToOffers}
              onChange={(e) => setSubscribedToOffers(e.target.checked)}
              className="mt-0.5 h-4 w-4 border-brand-gray-300 text-brand-gold focus:ring-brand-gold"
            />
            <span className="text-sm font-body text-brand-gray-600 leading-relaxed">
              Send me exclusive offers, early access to sales, and style tips
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full text-center"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm font-body text-brand-gray-500">
            Already have an account?{' '}
            <Link
              href="/account/login"
              className="text-brand-black font-medium link-underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
