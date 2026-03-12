"use client";
import React, { useEffect, useState } from "react";
import { getCategory } from "@/lib/category";
import Link from "next/link";

type ParentIdProps = {
  name: string;
  _id: string;
}

type CategoryProps = {
_id: string;
slug: string;
name: string;
parentId: null | ParentIdProps
}

const ProductMegaMenu = () => {
  const [category, setCategory] = useState<CategoryProps[]>([]);

  const getCategoryData = async () => {
    try {
      const res = await getCategory();
      setCategory(res);
    } catch (error: unknown) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategoryData();
  }, []);

  const rootCategory = category.filter((cat) => cat.parentId === null);

  const childMap = category.reduce((acc, cat) => {
    if(cat.parentId?._id){
      if(!acc[cat.parentId._id]) acc[cat.parentId._id] = []
      acc[cat.parentId._id].push(cat)
    }
    return acc
  }, {} as Record<string, CategoryProps[]>)

  return (
    <ul className="absolute top-11 right-0 bg-white shadow-lg rounded-lg p-4 z-10 grid grid-cols-3 grid-rows-2 w-4xl">
      {rootCategory.map((parent) => (
        <li key={parent._id} className="row-start-1 row-end-3 nth-last-2:row-end-2 last:col-start-3 last:row-start-2">
          <Link href={parent.slug}>{parent.name}</Link>
          <ul>
            {childMap[parent._id]?.map((cat) => (
                <li key={cat._id}>
                  <Link href={cat.slug}>{cat.name}</Link>
                </li>              
            )) }
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default ProductMegaMenu;
