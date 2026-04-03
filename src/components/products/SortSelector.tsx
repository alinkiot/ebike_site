"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function SortSelector({ currentSort }: { currentSort?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.value === "newest") {
      params.delete("sort");
    } else {
      params.set("sort", e.target.value);
    }
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <select
      value={currentSort || "newest"}
      onChange={handleChange}
      className="border border-gray-300 px-3 py-2 text-xs font-semibold tracking-widest uppercase focus:outline-none focus:border-black focus:ring-1 focus:ring-black bg-white cursor-pointer"
    >
      <option value="newest">Newest</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
    </select>
  );
}
