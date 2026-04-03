import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { prisma } from "@/lib/prisma";

async function getCategoryProducts() {
  return prisma.category.findMany({
    where: { type: "bike" },
    orderBy: { order: "asc" },
    include: {
      products: {
        where: { published: true },
        orderBy: { createdAt: "asc" },
        take: 1,
        include: {
          images: {
            orderBy: { order: "asc" },
            take: 1,
          },
        },
      },
    },
  });
}

export type CategoryWithFirstProduct = Awaited<ReturnType<typeof getCategoryProducts>>[number];

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const categoryProducts = await getCategoryProducts();
  return (
    <>
      <Header categoryProducts={categoryProducts} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
