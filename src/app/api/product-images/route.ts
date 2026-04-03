import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { productId, url, alt, order } = await req.json();
  const image = await prisma.productImage.create({ data: { productId, url, alt, order } });
  return NextResponse.json(image, { status: 201 });
}
