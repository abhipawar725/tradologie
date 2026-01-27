import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Category from "@/models/Category";
import slugify from "slugify";

export async function GET() {
 await connectDB();
 
 const categories = await Category.find().sort({ createdAt: 1 });
 return NextResponse.json(categories);
}

export async function POST(req: Request) {
  await connectDB();
  
  const body = await req.json();
  const {name, parentId} = body
  console.log(body)
  if(!name){
    return NextResponse.json(
        {error: 'Category name is required'},
        {status: 400}
    )
  }
  const slug = slugify(name, {lower: true})
  const category = await Category.create({
    name, slug, parentId: parentId || null
  })

  return NextResponse.json(category, {status: 201});
}

export async function PUT() {
    
}

export async function DELETE() {
    
}
