"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: string;
  author: string;
  role?: string | null;
  content: string;
  rating: number;
}

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0);

  if (!testimonials.length) return null;

  const prev = () => setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));
  const t = testimonials[index];

  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-400 mb-10">
          What riders say
        </p>
        <div className="flex justify-center gap-1 mb-6">
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i} size={16} fill="currentColor" className="text-yellow-400" />
          ))}
        </div>
        <blockquote className="text-xl sm:text-2xl font-light leading-relaxed text-gray-100 mb-8">
          &ldquo;{t.content}&rdquo;
        </blockquote>
        <p className="text-sm font-semibold tracking-wide">{t.author}</p>
        {t.role && <p className="text-xs text-gray-400 mt-1">{t.role}</p>}

        {testimonials.length > 1 && (
          <div className="flex justify-center gap-4 mt-10">
            <button onClick={prev} className="w-10 h-10 border border-white/30 flex items-center justify-center hover:border-white transition-colors">
              <ChevronLeft size={18} />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${i === index ? "bg-white" : "bg-white/30"}`}
                />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 border border-white/30 flex items-center justify-center hover:border-white transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
