"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function HeroBanner() {
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Timeout: if video doesn't load in 3 seconds, fallback to image
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!videoLoaded && !videoError) {
        setVideoError(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [videoLoaded, videoError]);

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-black">
      {/* Always keep placeholder image visible until video loaded */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/hero/index.png"
          alt="Deruiz Electric Bicycle"
          fill
          sizes="100vw"
          className={`object-cover opacity-60 animate-slow-zoom ${videoLoaded ? 'hidden' : 'block'}`}
          priority
        />
        {!videoError && (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-50"
            onError={() => setVideoError(true)}
            onLoadedData={() => setVideoLoaded(true)}
          >
            <source src="/videos/hero-cycling.mp4" type="video/mp4" />
          </video>
        )}
      </div>
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/60" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto animate-fade-in-up">
        <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-300 mb-4 opacity-0 animate-fade-in-up [animation-delay:200ms]">
          Deruiz Electric Bicycles
        </p>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6 opacity-0 animate-fade-in-up [animation-delay:400ms]">
          This time,
          <br />
          <span className="italic font-light">beyond</span>
        </h1>
        <p className="text-lg text-gray-200 mb-10 max-w-xl mx-auto leading-relaxed opacity-0 animate-fade-in-up [animation-delay:600ms]">
          Welcome to our community, Deruiz Ebikes, the green power. At Deruiz we build very modern ebikes, with an elegant look but still robust and stable. We want to give the customer the tools to go a little further than ever before.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in-up [animation-delay:800ms]">
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
