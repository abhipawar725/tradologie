import connectDB from "@/lib/db";
import Category from "@/models/Category";
import { NextResponse } from "next/server";
import { Types } from "mongoose";

type CategoryNode = {
    _id: Types.ObjectId;
    parentId: Types.ObjectId | null;
    isActive: boolean;
    children: CategoryNode[];
}

function buildTree(
  categories: CategoryNode[],
  parentId: Types.ObjectId | null = null
): CategoryNode[] {
  return categories
    .filter(cat => String(cat.parentId) === String(parentId))
    .map(cat => ({
      ...cat,
      children: buildTree(categories, cat._id),
    }));
}

export async function GET() {
  await connectDB();

  const categories = await Category.find({ isActive: true }).lean<CategoryNode[]>();

  const tree = buildTree(categories);

  return NextResponse.json(tree);
}
