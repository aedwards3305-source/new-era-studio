'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push('/admin');
      } else {
        setError('Invalid password');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto p-8">
      <div className="text-center mb-10">
        <h1 className="font-display text-3xl font-light text-white tracking-wide">
          New Era Studio
        </h1>
        <p className="text-sm text-brand-gray-400 font-body mt-2">
          Admin Login
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="password"
            className="block text-xs font-body font-medium text-brand-gray-300 uppercase tracking-wider mb-2"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-brand-gray-500 focus:outline-none focus:border-brand-peach focus:ring-1 focus:ring-brand-peach font-body"
            placeholder="Enter admin password"
            required
            autoFocus
          />
        </div>

        {error && (
          <p className="text-red-400 text-sm font-body">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-brand-peach text-white font-body font-medium text-sm tracking-wider uppercase rounded-lg hover:bg-brand-peach-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
