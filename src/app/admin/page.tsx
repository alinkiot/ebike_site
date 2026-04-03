import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboard() {
  const [productCount, categoryCount, blogCount, userCount] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.blogPost.count(),
    prisma.user.count(),
  ]);

  const stats = [
    { label: "Products", value: productCount, href: "/admin/products" },
    { label: "Categories", value: categoryCount, href: "/admin/categories" },
    { label: "Blog Posts", value: blogCount, href: "/admin/blog" },
    { label: "Users", value: userCount, href: "/admin/users" },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2">{s.label}</p>
            <p className="text-4xl font-bold text-black">{s.value}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
