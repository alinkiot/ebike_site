import { prisma } from "@/lib/prisma";
import ProductForm from "../ProductForm";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({ orderBy: { order: "asc" } });
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">New Product</h1>
      <ProductForm categories={categories} />
    </div>
  );
}
