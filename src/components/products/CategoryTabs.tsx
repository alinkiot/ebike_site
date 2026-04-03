"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function CategoryTabs({
  categories,
  activeSlug,
  basePath = "/e-bikes",
  pathRouting = true,
}: {
  categories: Category[];
  activeSlug?: string;
  basePath?: string;
  pathRouting?: boolean;
}) {
  const router = useRouter();

  const handleClick = (slug?: string) => {
    if (slug) {
      router.push(pathRouting ? `${basePath}/${slug}` : `${basePath}?category=${slug}`);
    } else {
      router.push(basePath);
    }
  };

  return (
    <div className="flex gap-2 flex-wrap">
      <button
        onClick={() => handleClick()}
        className={`px-5 py-2 text-xs font-semibold tracking-widest uppercase transition-colors ${
          !activeSlug
            ? "bg-yellow-400 text-black"
            : "border border-gray-300 text-gray-600 hover:border-black hover:text-black"
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => handleClick(cat.slug)}
          className={`px-5 py-2 text-xs font-semibold tracking-widest uppercase transition-colors ${
            activeSlug === cat.slug
              ? "bg-yellow-400 text-black"
              : "border border-gray-300 text-gray-600 hover:border-black hover:text-black"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
