import { prisma } from "@/lib/prisma";
import CategoriesClient from "./CategoriesClient";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({ orderBy: { order: "asc" } });
  return <CategoriesClient categories={categories} />;
}
