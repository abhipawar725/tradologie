export const config = {
   api: {
      bodyParser: false,
   }
}

import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
import slugify from "slugify";
import upload from "@/lib/multer";
import runMiddleware from "@/lib/runMiddleware";

type CreateProduct = {
  name: string;
  categoryId: string;
  minQty: number;
  images?: string[];
  bagSize: string;
  bagType: string;
  type: "vegetarian" | "non-vegetarian";
  shortDescription?: string;
  description?: string;
};

type ProductResponse = {
  _id: string;
  name: string;
  slug: string;
  categoryId: any;
  price?: number;
  shortDescription?: string;
  description?: string;
};

export async function GET() {
  await connectDB();
  const products = await Product.find().populate("categoryId").lean<ProductResponse[]>();
  return NextResponse.json(products);
}

export async function POST(req: any, res: any) {
  await connectDB();
   
  await runMiddleware(req, res, upload.array("images", 5)) 
  
  const { name, categoryId, minQty, bagSize, bagType, type, shortDescription, description } = req.body;
  if (!name || !categoryId || !minQty || !bagSize || !bagType || !type) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  const images = req.files?.map(
   (file: any) => `uploads/products/${file.filename}`
  ) || []

  const slug = slugify(name, { lower: true });
  try {
    const product = await Product.create({
      name,
      slug,
      categoryId,
      minQty: Number(minQty),
      bagSize,
      bagType,
      type,
      images,
      shortDescription,
      description,
    });

    return NextResponse.json({ message: "Product created successfully", product }, { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ error: "Product is already exits" }, { status: 409 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
