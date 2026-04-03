import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import DeleteButton from "./DeleteButton";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true, images: { take: 1 } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <Link href="/admin/products/new" className="bg-yellow-400 text-black px-5 py-2.5 text-sm font-semibold tracking-widest uppercase hover:bg-yellow-300 transition-colors">
          + New Product
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-semibold tracking-widest uppercase text-gray-400">Name</th>
              <th className="text-left px-6 py-3 text-xs font-semibold tracking-widest uppercase text-gray-400">Category</th>
              <th className="text-left px-6 py-3 text-xs font-semibold tracking-widest uppercase text-gray-400">Price</th>
              <th className="text-left px-6 py-3 text-xs font-semibold tracking-widest uppercase text-gray-400">Status</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{p.name}</td>
                <td className="px-6 py-4 text-gray-500">{p.category.name}</td>
                <td className="px-6 py-4 text-gray-700">{formatPrice(p.price)}</td>
                <td className="px-6 py-4">
                  <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${p.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {p.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/admin/products/${p.id}`} className="text-xs font-semibold text-gray-600 hover:text-black transition-colors">Edit</Link>
                    <DeleteButton id={p.id} type="product" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && (
          <p className="text-center text-gray-400 py-12">No products yet.</p>
        )}
      </div>
    </div>
  );
}
