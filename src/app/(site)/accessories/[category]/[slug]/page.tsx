import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import ImageGallery from "@/components/products/ImageGallery";
import SpecsTabs from "@/components/products/SpecsTabs";
import ProductCard from "@/components/products/ProductCard";
import { formatPrice } from "@/lib/utils";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { images: { take: 1 }, category: true },
  });
  if (!product) return {};
  return {
    title: `${product.name} | Deruiz Accessories`,
    description: product.tagline || product.description || undefined,
    openGraph: {
      images: product.images[0]?.url ? [product.images[0].url] : [],
    },
  };
}

export default async function AccessoryDetailPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      images: { orderBy: { order: "asc" } },
      specs: { orderBy: { order: "asc" } },
      category: true,
    },
  });

  if (!product || !product.published || product.category.type !== "accessory") notFound();

  const related = await prisma.product.findMany({
    where: {
      published: true,
      categoryId: product.categoryId,
      NOT: { id: product.id },
    },
    include: { images: { orderBy: { order: "asc" }, take: 1 }, category: true },
    take: 4,
  });

  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-400 mb-10">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span>/</span>
          <Link href="/accessories" className="hover:text-black transition-colors">Accessories</Link>
          <span>/</span>
          <Link href={`/accessories?category=${category}`} className="hover:text-black transition-colors capitalize">{product.category.name}</Link>
          <span>/</span>
          <span className="text-black">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <ImageGallery images={product.images} />

          <div className="flex flex-col gap-6">
            <div>
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-400 mb-2">
                {product.category.name}
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-black">{product.name}</h1>
              {product.tagline && (
                <p className="mt-2 text-gray-500">{product.tagline}</p>
              )}
            </div>

            <div className="flex items-center gap-3">
              {product.salePrice ? (
                <>
                  <span className="text-2xl font-bold text-red-600">{formatPrice(product.salePrice)}</span>
                  <span className="text-lg text-gray-400 line-through">{formatPrice(product.price)}</span>
                </>
              ) : (
                <span className="text-2xl font-bold text-black">{formatPrice(product.price)}</span>
              )}
            </div>

            {product.description && (
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            )}

            <button className="w-full bg-yellow-400 text-black py-4 text-sm font-semibold tracking-widest uppercase hover:bg-yellow-300 transition-colors">
              Add to Cart
            </button>

            {product.specs.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-bold tracking-widest uppercase mb-4">Specifications</h3>
                <SpecsTabs specs={product.specs} />
              </div>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-24 border-t border-gray-100 pt-16">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-400 mb-2">More from {product.category.name}</p>
            <h2 className="text-2xl font-bold text-black mb-10">You may also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {related.map((p) => (
                <ProductCard
                  key={p.id}
                  name={p.name}
                  tagline={p.tagline}
                  price={p.price}
                  salePrice={p.salePrice}
                  image={p.images[0]?.url}
                  href={`/accessories/${p.category.slug}/${p.slug}`}
                  featured={p.featured}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
