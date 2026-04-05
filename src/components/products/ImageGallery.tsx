"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductImage {
  id: string;
  url: string;
  alt?: string | null;
}

export default function ImageGallery({ images }: { images: ProductImage[] }) {
  const [active, setActive] = useState(0);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const hasImageError = (url: string) => imageErrors.has(url);
  const markImageError = (url: string) => {
    setImageErrors(prev => new Set(prev).add(url));
  };

  const validImages = images.filter(img => !hasImageError(img.url));
  const currentActive = validImages.length > 0 && active >= validImages.length ? 0 : active;

  if (validImages.length === 0) {
    return (
      <div className="relative aspect-square bg-gray-100 flex items-center justify-center">
        <Image
          src="/images/placeholder.svg"
          alt="No image available"
          fill
          sizes="100vw"
          className="object-contain p-16 opacity-40"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        {!hasImageError(validImages[currentActive].url) ? (
          <Image
            src={validImages[currentActive].url}
            alt={validImages[currentActive].alt || "Product image"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 50vw"
            className="object-contain"
            priority
            onError={() => markImageError(validImages[currentActive].url)}
          />
        ) : (
          <Image
            src="/images/placeholder.svg"
            alt="Image unavailable"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 50vw"
            className="object-contain p-16 opacity-40"
          />
        )}
      </div>
      {validImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {validImages.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setActive(i)}
              className={`relative flex-none w-20 h-20 overflow-hidden border-2 transition-colors ${
                i === currentActive ? "border-black" : "border-transparent"
              }`}
            >
              {!hasImageError(img.url) ? (
                <Image
                  src={img.url}
                  alt={img.alt || ""}
                  fill
                  sizes="80px"
                  className="object-cover"
                  onError={() => markImageError(img.url)}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-xs text-gray-400">—</span>
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
