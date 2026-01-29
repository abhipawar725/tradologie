import Image from "next/image";
import { RiSearch2Line } from "@remixicon/react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-white text-secondary">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-2xl fixed top-0 h-screen overflow-auto">
        <div className="bg-white p-3">
          <Image
            src="/logo-dark.webp"
            alt="logo"
            width={197}
            height={52}
            loading="eager"
          />
        </div>
        <nav className="space-y-3 px-3">
          <a href="/admin/dashboard" className="block">
            Dashboard
          </a>
          <a href="/admin/categories" className="block">
            Categories
          </a>
          <a href="/admin/products" className="block">
            Products
          </a>
          <a href="/admin/blogs" className="block">
            Blogs
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-4">  
        <div className="p-3 h-16 w-full bg-white/70">
           <div className="bg-white w-full py-2 px-4 rounded-md shadow-md">
              <RiSearch2Line size={24} /> 
           </div>
        </div>
      {children}
      </main>
    </div>
  );
}
