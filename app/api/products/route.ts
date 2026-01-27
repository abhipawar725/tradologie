import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
import slugify from "slugify";

type CreateProduct = {
   name: string;
   categoryId: string;
   price?: number;
   shortDescription?: string;
   description?: string; 
}

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
   await connectDB()
   const products = await Product.find().populate("categoryId").lean<ProductResponse[]>();
   return NextResponse.json(products); 
}

export async function POST(req: Request) {
   await connectDB()    
   const body:CreateProduct = await req.json();
   const {name, categoryId, price, shortDescription, description} = body;
   if(!name || !categoryId){
    return NextResponse.json(
        {error: "Name and category are required"},
        {status: 400}
    )
   }
   const slug = slugify(name, {lower: true});
   const product = await Product.create({
    name, slug, categoryId, price, shortDescription, description
   })

   return NextResponse.json(product, {status: 201})
}
