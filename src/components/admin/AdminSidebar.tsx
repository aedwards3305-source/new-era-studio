'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  CubeIcon,
  CurrencyDollarIcon,
  PlusCircleIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Products', href: '/admin', icon: CubeIcon },
  { label: 'Add Product', href: '/admin/products/new', icon: PlusCircleIcon },
  { label: 'Pricing', href: '/admin/pricing', icon: CurrencyDollarIcon },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin/login');
  };

  return (
    <aside className="w-64 bg-brand-black text-white min-h-screen flex flex-col">
      <div className="p-6 border-b border-white/10">
        <Link href="/admin" className="block">
          <h1 className="font-display text-xl font-light tracking-wide">
            New Era Studio
          </h1>
          <p className="text-xs text-brand-gray-400 mt-1 font-body tracking-wider uppercase">
            Admin Panel
          </p>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive =
            item.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-body transition-colors',
                isActive
                  ? 'bg-brand-peach/20 text-brand-peach-200'
                  : 'text-brand-gray-300 hover:bg-white/5 hover:text-white'
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 text-sm font-body text-brand-gray-400 hover:text-white transition-colors"
        >
          View Storefront
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-sm font-body text-brand-gray-400 hover:text-red-400 transition-colors w-full text-left"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5 flex-shrink-0" />
          Log Out
        </button>
      </div>
    </aside>
  );
}
