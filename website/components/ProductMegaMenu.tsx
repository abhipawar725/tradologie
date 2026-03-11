"use client";
import React, { useEffect, useState } from "react";
import { getCategory } from "@/lib/category";
import Link from "next/link";

const ProductMegaMenu = () => {
  const [category, setCategory] = useState<[]>([]);

  const getCategoryData = async () => {
    try {
      const res = await getCategory();
      setCategory(res);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategoryData();
  }, []);

  const parentCategory = category?.filter((cat: any) => cat.parentId === null);

  return (
    <ul className="absolute top-full bg-white shadow-lg rounded-lg p-4 w-52 z-10">
      {parentCategory?.map((child: any) => (
        <li key={child._id}>
          <Link href={child.slug}>{child.name}</Link>
          <ul>
            {category
              ?.filter((cat: any) => cat.parentId !== null)
              .map((child: any) => (
                <li key={child._id}>
                  <Link href={child.slug}>{child.name}</Link>
                </li>
              ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default ProductMegaMenu;
