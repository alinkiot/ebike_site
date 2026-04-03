"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Bike, Tag, FileText, Users, ArrowLeft, Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "Products", icon: Bike },
  { href: "/admin/categories", label: "Categories", icon: Tag },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/users", label: "Users", icon: Users },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navContent = (
    <>
      <div className="px-6 py-6 border-b border-white/10 flex items-center justify-between">
        <div>
          <span className="text-lg font-bold tracking-widest uppercase">DERUIZ</span>
          <p className="text-xs text-gray-400 mt-1">Admin Panel</p>
        </div>
        <button className="lg:hidden text-gray-400 hover:text-white" onClick={() => setOpen(false)}>
          <X size={18} />
        </button>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded text-sm transition-colors ${
                active ? "bg-yellow-400 text-black font-semibold" : "text-gray-300 hover:bg-white/10"
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="px-3 py-4 border-t border-white/10">
        <Link href="/" className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={16} />
          Back to site
        </Link>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-black text-white p-2 rounded"
        onClick={() => setOpen(true)}
      >
        <Menu size={20} />
      </button>

      {/* Mobile overlay */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`lg:hidden fixed top-0 left-0 h-full w-56 bg-black text-white flex flex-col z-50 transition-transform duration-200 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {navContent}
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-56 bg-black text-white flex-col min-h-screen">
        {navContent}
      </aside>
    </>
  );
}

