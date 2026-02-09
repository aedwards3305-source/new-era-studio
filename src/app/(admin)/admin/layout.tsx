import { AdminSidebar } from '@/components/admin/AdminSidebar';

export const metadata = {
  title: 'Admin | New Era Studio',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-brand-gray-50">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}
