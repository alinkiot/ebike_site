"use client";

import Link from "next/link";
import Image from "next/image";

export default function HeroBanner() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-black">
      {/* Background image from deruizebike.com */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/120-35.webp"
          alt="Deruiz Electric Bicycle"
          fill
          sizes="100vw"
          className="object-cover opacity-60"
          priority
        />
      </div>
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto">
        <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-300 mb-4">
          Deruiz Electric Bicycles
        </p>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
          This time,
          <br />
          <span className="italic font-light">beyond</span>
        </h1>
        <p className="text-lg text-gray-200 mb-10 max-w-xl mx-auto leading-relaxed">
          Welcome to our community, Deruiz Ebikes, the green power. At Deruiz we build very modern ebikes, with an elegant look but still robust and stable. We want to give the customer the tools to go a little further than ever before.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/e-bikes"
            className="inline-block bg-yellow-400 text-black px-8 py-3.5 text-sm font-semibold tracking-widest uppercase hover:bg-yellow-300 transition-colors"
          >
            Explore E-Bikes
          </Link>
          <Link
            href="/about"
            className="inline-block border border-white text-white px-8 py-3.5 text-sm font-semibold tracking-widest uppercase hover:bg-yellow-400 hover:text-black hover:border-yellow-400 transition-colors"
          >
            Our Story
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-white/40 animate-pulse" />
      </div>
    </section>
  );
}
