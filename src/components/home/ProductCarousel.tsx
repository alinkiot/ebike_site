"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";

interface Product {
  id: string;
  name: string;
  tagline?: string | null;
  price: number;
  salePrice?: number | null;
  slug: string;
  featured?: boolean;
  category: { slug: string };
  images: { url: string }[];
}

interface ProductCarouselProps {
  title: string;
  subtitle?: string;
  products: Product[];
}

export default function ProductCarousel({ title, subtitle, products }: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-10">
        <div>
          {subtitle && (
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-400 mb-2">{subtitle}</p>
          )}
          <h2 className="font-serif-display text-3xl sm:text-4xl text-black">{title}</h2>
        </div>
        <div className="hidden sm:flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-10 h-10 border border-black flex items-center justify-center hover:bg-yellow-400 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-10 h-10 border border-black flex items-center justify-center hover:bg-yellow-400 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="flex-none w-72 sm:w-80"
            style={{ scrollSnapAlign: "start" }}
          >
            <ProductCard
              name={product.name}
              tagline={product.tagline}
              price={product.price}
              salePrice={product.salePrice}
              image={product.images[0]?.url}
              href={`/e-bikes/${product.category.slug}/${product.slug}`}
              featured={product.featured}
              loading="eager"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
