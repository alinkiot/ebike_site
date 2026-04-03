import { prisma } from "@/lib/prisma";
import HeroBanner from "@/components/home/HeroBanner";
import ProductCarousel from "@/components/home/ProductCarousel";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import Testimonials from "@/components/home/Testimonials";
import BlogPreview from "@/components/home/BlogPreview";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default async function HomePage() {
  const [featuredProducts, bestsellerProducts, testimonials, blogPosts] = await Promise.all([
    prisma.product.findMany({
      where: { featured: true, published: true },
      include: { images: { orderBy: { order: "asc" }, take: 1 }, category: true },
      take: 8,
    }),
    prisma.product.findMany({
      where: { bestseller: true, published: true },
      include: { images: { orderBy: { order: "asc" }, take: 1 }, category: true },
      take: 8,
    }),
    prisma.testimonial.findMany({ where: { active: true }, take: 5 }),
    prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
    }),
  ]);

  return (
    <>
      <HeroBanner />
      <CategoryShowcase />
      {featuredProducts.length > 0 && (
        <ProductCarousel
          title="Featured Bikes"
          subtitle="New arrivals"
          products={featuredProducts}
        />
      )}
      <WhyChooseUs />
      {bestsellerProducts.length > 0 && (
        <ProductCarousel
          title="Best Sellers"
          subtitle="Most popular"
          products={bestsellerProducts}
        />
      )}
      {testimonials.length > 0 && <Testimonials testimonials={testimonials} />}
      {blogPosts.length > 0 && <BlogPreview posts={blogPosts} />}
    </>
  );
}
