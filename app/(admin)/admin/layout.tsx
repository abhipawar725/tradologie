export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-5">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-3">
          <a href="/admin/dashboard" className="block">Dashboard</a>
          <a href="/admin/categories" className="block">Categories</a>
          <a href="/admin/products" className="block">Products</a>
          <a href="/admin/blogs" className="block">Blogs</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        {children}
      </main>
    </div>
  );
}
