"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { Search, Menu, X } from "lucide-react";
import type { CategoryWithFirstProduct } from "@/app/(site)/layout";

// Navigation structure matching deruizebike.com
const navLinks = [
  {
    label: "Select",
    href: "/e-bikes/select",
    isMegaMenu: true,
    story: {
      heading: "SELECT is far more than just Deruiz's top-of-the-line.",
      text: "Every component is conceived, developed, and selected from the ground up. The frame geometry, the motor integration, the battery placement — each detail is the result of hundreds of hours of real-world testing and refinement. This is not an upgrade. It's a reinvention. When you choose Select, you choose a machine built without compromise.",
      readMoreHref: "/e-bikes/select",
    },
  },
  {
    label: "E-Bikes",
    href: "/e-bikes",
    isMegaMenu: true,
    description: "Greater reach, more opportunities: Our E-Bikes make your everyday life easier and keep you mobile.",
    image: "/images/products/sycxly-1500-917-mica-pro-ML-Bronze-Matt.webp",
    categories: [
      { label: "All E-Bikes", href: "/e-bikes", slug: null },
      { label: "City", href: "/e-bikes/city", slug: "city" },
      { label: "Trekking", href: "/e-bikes/trekking", slug: "trekking" },
      { label: "SUV", href: "/e-bikes/suv", slug: "suv" },
      { label: "MTB / Mountain", href: "/e-bikes/mtb", slug: "mtb" },
      { label: "Gravel / Road", href: "/e-bikes/gravel", slug: "gravel" },
      { label: "Folding", href: "/e-bikes/folding", slug: "folding" },
    ],
  },
  { label: "Accessories", href: "/accessories" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

interface HeaderProps {
  categoryProducts: CategoryWithFirstProduct[];
}

export default function Header({ categoryProducts }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoveredCategorySlug, setHoveredCategorySlug] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  // Build slug → first product map
  const categoryMap = new Map(
    categoryProducts.map((cat) => [cat.slug, cat])
  );

  const openDropdown = useCallback((label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveDropdown(label);
  }, []);

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 80);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const handleLinkClick = useCallback(() => {
    setActiveDropdown(null);
    setMobileOpen(false);
  }, []);

  // Resolve what to show in the right panel
  const hoveredCat = hoveredCategorySlug ? categoryMap.get(hoveredCategorySlug) : null;
  const firstProduct = hoveredCat?.products?.[0];
  const panelImage = firstProduct?.images?.[0]?.url ?? navLinks[1].image ?? "";
  const panelName = firstProduct?.name ?? null;
  const panelTagline = firstProduct?.tagline ?? navLinks[1].description;
  const panelHref = hoveredCategorySlug
    ? `/e-bikes/${hoveredCategorySlug}`
    : navLinks[1].href;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-yellow-400 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold tracking-widest uppercase text-black">
              DERUIZ
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0">
            {navLinks.map((link) => {
              // For mega menu links like "E-Bikes", only match exact root path
              // For regular links, match prefix so /e-bikes/city still highlights E-Bikes in dropdown
              const isExactMatch = pathname === link.href;
              const isPrefixMatch = !link.isMegaMenu && link.href !== "/" && pathname.startsWith(link.href);
              const isActive = isExactMatch || isPrefixMatch;
              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.isMegaMenu ? openDropdown(link.label) : scheduleClose()}
                  onMouseLeave={scheduleClose}
                >
                  <Link
                    href={link.href}
                    className={`px-6 py-6 text-base font-bold tracking-wide transition-colors inline-block ${
                      isActive 
                        ? "text-black underline underline-offset-8"
                        : "text-black hover:opacity-60"
                    }`}
                    onClick={handleLinkClick}
                  >
                    {link.label}
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <button className="hidden lg:block text-black hover:opacity-60 transition-colors">
              <Search size={20} />
            </button>
            <Link href="/login" className="hidden lg:block text-black hover:opacity-60 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>
            <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? (
                <X size={24} className="text-black" />
              ) : (
                <Menu size={24} className="text-black" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Full-width Mega Menu */}
      <div
        className={`absolute left-0 right-0 w-screen bg-white shadow-xl shadow-black/5 py-8 transition-all duration-200 ease-out transform ${activeDropdown ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-1 pointer-events-none'}`}
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeDropdown === "Select" ? (
            <div className="grid grid-cols-2 gap-0 min-h-[320px]">
              {/* Left: story */}
              <div className="pr-12 py-4 flex flex-col justify-between border-r border-gray-100">
                <div>
                  <h3 className="text-lg font-bold text-black mb-4 tracking-wide">
                    {navLinks[0].story?.heading}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-6">
                    {navLinks[0].story?.text}
                  </p>
                  <Link
                    href={navLinks[0].story?.readMoreHref ?? "/e-bikes/urban"}
                    className="mt-4 inline-block text-xs font-semibold tracking-widest uppercase text-black border-b border-black pb-0.5 hover:opacity-60 transition-opacity"
                    onClick={handleLinkClick}
                  >
                    Read more
                  </Link>
                </div>
              </div>
              {/* Right: showroom image */}
              <div className="pl-8 py-4">
                <div className="w-full h-[280px] overflow-hidden bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://deruizebike.com/wp-content/uploads/2026/03/showroom-v2-2.webp"
                    alt="Deruiz Showroom"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          ) : activeDropdown === "E-Bikes" ? (
            <div className="grid grid-cols-2 gap-8">
              {/* Left: category list */}
              <div className="py-2">
                <div className="grid grid-cols-2 gap-1">
                  {navLinks[1].categories?.map((cat) => (
                    <Link
                      key={cat.href}
                      href={cat.href}
                      className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-black transition-colors rounded"
                      onMouseEnter={() => setHoveredCategorySlug(cat.slug)}
                      onMouseLeave={() => setHoveredCategorySlug(null)}
                      onClick={handleLinkClick}
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
                <Link
                  href={navLinks[1].href}
                  className="mt-4 ml-3 inline-block text-xs font-semibold tracking-widest uppercase text-black border-b border-black pb-0.5 hover:opacity-60"
                  onClick={handleLinkClick}
                >
                  View All E-Bikes
                </Link>
              </div>
              {/* Right: dynamic product preview */}
              <div className="py-2">
                <Link
                  href={panelHref}
                  className="block group"
                  onClick={handleLinkClick}
                >
                  <div className="relative aspect-[4/3] overflow-hidden mb-3 bg-gray-100">
                    {panelImage && (
                      <Image
                        key={panelImage}
                        src={panelImage}
                        alt={panelName ?? "E-Bikes"}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="eager"
                      />
                    )}
                  </div>
                  {panelName && (
                    <p className="text-sm font-semibold text-black mb-1">{panelName}</p>
                  )}
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                    {panelTagline}
                  </p>
                  <span className="mt-2 inline-block text-xs font-semibold tracking-widest uppercase text-black border-b border-black pb-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more
                  </span>
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t transition-all duration-200 ease-out">
          <nav className="px-4 py-4 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || 
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <div key={link.label}>
                  <Link
                    href={link.href}
                    className={`block py-2 text-sm font-medium ${
                      isActive
                        ? "text-black font-semibold"
                        : "text-gray-900"
                    }`}
                    onClick={handleLinkClick}
                  >
                    {link.label}
                  </Link>
                  {link.isMegaMenu && link.categories && (
                    <div className="pl-4 space-y-1">
                      {link.categories.map((cat) => {
                        const isCatActive = pathname === cat.href;
                        return (
                          <Link
                            key={cat.href}
                            href={cat.href}
                            className={`block py-1.5 text-sm ${
                              isCatActive
                                ? "text-black font-semibold"
                                : "text-gray-500"
                            }`}
                            onClick={handleLinkClick}
                          >
                            {cat.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
            <div className="pt-2 border-t flex gap-4">
              <Link
                href="/login"
                className="text-sm font-medium text-gray-900"
                onClick={handleLinkClick}
              >
                Login
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
