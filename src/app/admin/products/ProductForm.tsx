"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { slugify } from "@/lib/utils";

interface Category { id: string; name: string; slug: string; }
interface ProductData {
  id?: string;
  name?: string;
  slug?: string;
  tagline?: string | null;
  description?: string | null;
  price?: number;
  salePrice?: number | null;
  featured?: boolean;
  bestseller?: boolean;
  published?: boolean;
  categoryId?: string;
  images?: { id: string; url: string; alt?: string | null }[];
}

export default function ProductForm({ categories, product }: { categories: Category[]; product?: ProductData }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState(product?.name || "");
  const [imageUrl, setImageUrl] = useState(product?.images?.[0]?.url || "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const form = new FormData(e.currentTarget);

    const body = {
      name: form.get("name") as string,
      slug: (form.get("slug") as string) || slugify(name),
      tagline: form.get("tagline") as string || null,
      description: form.get("description") as string || null,
      price: parseFloat(form.get("price") as string),
      salePrice: form.get("salePrice") ? parseFloat(form.get("salePrice") as string) : null,
      featured: form.get("featured") === "on",
      bestseller: form.get("bestseller") === "on",
      published: form.get("published") === "on",
      categoryId: form.get("categoryId") as string,
    };

    const url = product?.id ? `/api/products/${product.id}` : "/api/products";
    const method = product?.id ? "PUT" : "POST";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    setLoading(false);

    if (!res.ok) {
      setError("Failed to save product.");
    } else {
      const saved = await res.json();
      // Save image if provided
      if (imageUrl && !product?.images?.length) {
        await fetch("/api/product-images", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: saved.id, url: imageUrl, order: 0 }),
        });
      }
      router.push("/admin/products");
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6 bg-white p-8 rounded-lg shadow-sm border border-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-2">Name *</label>
          <input name="name" required value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black" />
        </div>
        <div>
          <label className="block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-2">Slug</label>
          <input name="slug" defaultValue={product?.slug} placeholder={slugify(name) || "auto-generated"} className="w-full border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-2">Tagline</label>
        <input name="tagline" defaultValue={product?.tagline || ""} className="w-full border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black" />
      </div>

      <div>
        <label className="block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-2">Description</label>
        <textarea name="description" rows={4} defaultValue={product?.description || ""} className="w-full border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black resize-none" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-2">Price *</label>
          <input name="price" type="number" step="0.01" required defaultValue={product?.price} className="w-full border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black" />
        </div>
        <div>
          <label className="block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-2">Sale Price</label>
          <input name="salePrice" type="number" step="0.01" defaultValue={product?.salePrice || ""} className="w-full border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-2">Category *</label>
        <select name="categoryId" required defaultValue={product?.categoryId} className="w-full border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black bg-white">
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-2">Image URL</label>
        <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black" placeholder="https://..." />
      </div>

      <div className="flex gap-6">
        {[
          { name: "featured", label: "Featured", checked: product?.featured },
          { name: "bestseller", label: "Bestseller", checked: product?.bestseller },
          { name: "published", label: "Published", checked: product?.published ?? true },
        ].map((f) => (
          <label key={f.name} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input type="checkbox" name={f.name} defaultChecked={f.checked} className="w-4 h-4" />
            {f.label}
          </label>
        ))}
      </div>

      {error && <p className="text-red-500 text-xs">{error}</p>}

      <div className="flex gap-3">
        <button type="submit" disabled={loading} className="bg-yellow-400 text-black px-8 py-3 text-sm font-semibold tracking-widest uppercase hover:bg-yellow-300 transition-colors disabled:opacity-50">
          {loading ? "Saving..." : product?.id ? "Update Product" : "Create Product"}
        </button>
        <button type="button" onClick={() => router.back()} className="border border-gray-300 px-8 py-3 text-sm font-semibold tracking-widest uppercase hover:border-black transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
}
