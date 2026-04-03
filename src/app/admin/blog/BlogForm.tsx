"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { slugify } from "@/lib/utils";

interface BlogPostData {
  id?: string;
  title?: string;
  slug?: string;
  excerpt?: string | null;
  content?: string;
  coverImage?: string | null;
  published?: boolean;
}

export default function BlogForm({ post }: { post?: BlogPostData }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState(post?.title || "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const body = {
      title: form.get("title") as string,
      slug: (form.get("slug") as string) || slugify(title),
      excerpt: form.get("excerpt") as string || null,
      content: form.get("content") as string,
      coverImage: form.get("coverImage") as string || null,
      published: form.get("published") === "on",
      publishedAt: form.get("published") === "on" ? new Date().toISOString() : null,
    };
    const url = post?.id ? `/api/blog/${post.id}` : "/api/blog";
    const method = post?.id ? "PUT" : "POST";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    setLoading(false);
    if (!res.ok) {
      setError("Failed to save post.");
    } else {
      router.push("/admin/blog");
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6 bg-white p-8 rounded-lg shadow-sm border border-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-2">Title *</label>
          <input name="title" required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-black" />
        </div>
        <div>
          <label className="block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-2">Slug</label>
          <input name="slug" defaultValue={post?.slug} placeholder={slugify(title) || "auto-generated"} className="w-full border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-black" />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-2">Excerpt</label>
        <input name="excerpt" defaultValue={post?.excerpt || ""} className="w-full border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-black" />
      </div>
      <div>
        <label className="block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-2">Cover Image URL</label>
        <input name="coverImage" defaultValue={post?.coverImage || ""} className="w-full border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-black" placeholder="https://..." />
      </div>
      <div>
        <label className="block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-2">Content *</label>
        <textarea name="content" required rows={12} defaultValue={post?.content || ""} className="w-full border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-black resize-none font-mono" placeholder="HTML content..." />
      </div>
      <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
        <input type="checkbox" name="published" defaultChecked={post?.published} className="w-4 h-4" />
        Published
      </label>
      {error && <p className="text-red-500 text-xs">{error}</p>}
      <div className="flex gap-3">
        <button type="submit" disabled={loading} className="bg-yellow-400 text-black px-8 py-3 text-sm font-semibold tracking-widest uppercase hover:bg-yellow-300 transition-colors disabled:opacity-50">
          {loading ? "Saving..." : post?.id ? "Update Post" : "Create Post"}
        </button>
        <button type="button" onClick={() => router.back()} className="border border-gray-300 px-8 py-3 text-sm font-semibold tracking-widest uppercase hover:border-black transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
}
