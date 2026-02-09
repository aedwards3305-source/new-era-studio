import { cookies } from 'next/headers';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

export const metadata = {
  title: 'Admin | New Era Studios',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if user has session cookie — if not, show bare layout (login page)
  const cookieStore = cookies();
  const hasSession = cookieStore.has('nes-admin-session');

  if (!hasSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-black">
        {children}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-brand-gray-50">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}
