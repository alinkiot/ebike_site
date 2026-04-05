import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  if (!q || q.trim().length < 2) {
    return NextResponse.json({ products: [] });
  }

  try {
    // Search in products (name, tagline)
    const products = await prisma.product.findMany({
      where: {
        published: true,
        OR: [
          {
            name: {
              contains: q
            },
          },
          {
            tagline: {
              contains: q
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        category: {
          select: {
            slug: true,
          },
        },
        slug: true,
      },
      take: 10,
    });

    // Format results
    const formattedProducts = products.map((p) => ({
      id: p.id,
      name: p.name,
      href: p.category.slug 
        ? `/e-bikes/${p.category.slug}/${p.slug}` 
        : `/accessories/${p.category.slug}/${p.slug}`,
    }));

    return NextResponse.json({ products: formattedProducts });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ products: [] }, { status: 500 });
  }
}
