"use client";

import { useState } from "react";

interface Variant {
  id: string;
  type: string;
  label: string;
  value: string;
  inStock: boolean;
}

export default function VariantSelector({ variants }: { variants: Variant[] }) {
  const colors = variants.filter((v) => v.type === "color");
  const sizes = variants.filter((v) => v.type === "size");
  const [selectedColor, setSelectedColor] = useState(colors[0]?.id);
  const [selectedSize, setSelectedSize] = useState(sizes[0]?.id);

  return (
    <div className="space-y-5">
      {colors.length > 0 && (
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-3">Color</p>
          <div className="flex gap-2 flex-wrap">
            {colors.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelectedColor(v.id)}
                disabled={!v.inStock}
                title={v.label}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  selectedColor === v.id ? "border-black scale-110" : "border-transparent"
                } ${!v.inStock ? "opacity-30 cursor-not-allowed" : ""}`}
                style={{ backgroundColor: v.value }}
              />
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {colors.find((v) => v.id === selectedColor)?.label}
          </p>
        </div>
      )}
      {sizes.length > 0 && (
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-3">Size</p>
          <div className="flex gap-2 flex-wrap">
            {sizes.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelectedSize(v.id)}
                disabled={!v.inStock}
                className={`px-4 py-2 text-xs font-semibold tracking-wide border transition-colors ${
                  selectedSize === v.id
                    ? "bg-yellow-400 text-black border-yellow-400"
                    : "border-gray-300 text-gray-700 hover:border-black"
                } ${!v.inStock ? "opacity-30 cursor-not-allowed" : ""}`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
