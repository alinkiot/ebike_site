"use client";

import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";

interface ProductCardProps {
  name: string;
  tagline?: string | null;
  price: number;
  salePrice?: number | null;
  image?: string | null;
  href: string;
  featured?: boolean;
  loading?: "eager" | "lazy";
}

export default function ProductCard({ name, tagline, price, salePrice, image, href, featured, loading }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  
  const hasValidImage = image && !imageError;

  return (
    <Link href={href} className="group block">
      <div className="relative overflow-hidden bg-gray-50 aspect-[3/2]">
        {hasValidImage ? (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            loading={loading ?? "lazy"}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <Image
              src="/images/placeholder.svg"
              alt={name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              className="object-contain p-8 opacity-50"
            />
          </div>
        )}
        {featured && (
          <span className="absolute top-3 left-3 bg-yellow-400 text-black text-xs px-2 py-1 tracking-widest uppercase font-semibold">
            Featured
          </span>
        )}
        {salePrice && (
          <span className="absolute top-3 right-3 bg-red-600 text-white text-xs px-2 py-1 tracking-widest uppercase">
            Sale
          </span>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-semibold tracking-wide text-black group-hover:opacity-70 transition-opacity">
          {name}
        </h3>
        {tagline && <p className="mt-1 text-xs text-gray-500">{tagline}</p>}
        <div className="mt-2 flex items-center gap-2">
          {salePrice ? (
            <>
              <span className="text-sm font-semibold text-red-600">{formatPrice(salePrice)}</span>
              <span className="text-xs text-gray-400 line-through">{formatPrice(price)}</span>
            </>
          ) : (
            <span className="text-sm font-semibold text-black">{formatPrice(price)}</span>
          )}
        </div>
        <span className="mt-3 inline-block text-xs font-semibold tracking-widest uppercase text-black border-b border-black pb-0.5 group-hover:opacity-60 transition-opacity">
          Discover more
        </span>
      </div>
    </Link>
  );
}
