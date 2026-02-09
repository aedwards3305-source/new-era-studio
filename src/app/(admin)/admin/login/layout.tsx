export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Login page gets a clean layout without the admin sidebar
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-black">
      {children}
    </div>
  );
}
