"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { slugify } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  slug: string;
  type: string;
  description?: string | null;
  order: number;
}

export default function CategoriesClient({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [type, setType] = useState("bike");
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, slug: slugify(name), type, order: categories.length }),
    });
    setLoading(false);
    setName("");
    setType("bike");
    router.refresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category? Products in it will be affected.")) return;
    await fetch(`/api/categories/${id}`, { method: "DELETE" });
    router.refresh();
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Categories</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Create form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-sm font-bold tracking-widest uppercase mb-4">Add Category</h2>
          <form onSubmit={handleCreate} className="flex gap-3">
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Category name"
              className="flex-1 border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-black"
            />
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:border-black bg-white"
            >
              <option value="bike">Bike</option>
              <option value="accessory">Accessory</option>
            </select>
            <button type="submit" disabled={loading} className="bg-yellow-400 text-black px-5 py-2.5 text-sm font-semibold tracking-widest uppercase hover:bg-yellow-300 transition-colors disabled:opacity-50">
              {loading ? "..." : "Add"}
            </button>
          </form>
        </div>

        {/* List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-semibold tracking-widest uppercase text-gray-400">Name</th>
                <th className="text-left px-6 py-3 text-xs font-semibold tracking-widest uppercase text-gray-400">Slug</th>
                <th className="text-left px-6 py-3 text-xs font-semibold tracking-widest uppercase text-gray-400">Type</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {categories.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 font-medium text-gray-900">{c.name}</td>
                  <td className="px-6 py-3 text-gray-400 text-xs">{c.slug}</td>
                  <td className="px-6 py-3 text-gray-400 text-xs capitalize">{c.type}</td>
                  <td className="px-6 py-3 text-right">
                    <button onClick={() => handleDelete(c.id)} className="text-xs font-semibold text-red-500 hover:text-red-700 transition-colors">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {categories.length === 0 && <p className="text-center text-gray-400 py-8">No categories yet.</p>}
        </div>
      </div>
    </div>
  );
}
