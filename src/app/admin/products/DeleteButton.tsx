"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteButton({ id, type }: { id: string; type: "product" | "blog" | "category" }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this?")) return;
    setLoading(true);
    const endpoint = type === "product" ? `/api/products/${id}` : type === "blog" ? `/api/blog/${id}` : `/api/categories/${id}`;
    await fetch(endpoint, { method: "DELETE" });
    setLoading(false);
    router.refresh();
  };

  return (
    <button onClick={handleDelete} disabled={loading} className="text-xs font-semibold text-red-500 hover:text-red-700 transition-colors disabled:opacity-50">
      {loading ? "..." : "Delete"}
    </button>
  );
}
