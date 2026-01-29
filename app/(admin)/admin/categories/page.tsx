"use client"
import { useEffect, useState } from "react"
import CategoryForm from "./CategoryForm";

export default function CategoriesPage() {
    const [categories, setCategories] = useState<any[]>([]);

    useEffect(() => {
     fetchcategories();
    }, [])  

    async function fetchcategories() {
        const res = await fetch("/api/categories");
        const data = await res.json()
        setCategories(data)
    }

    return (
        <>
         <h1 className="text-2xl font-bold mb-6">Categories</h1>
         <div className="grid grid-cols-2 gap-6">
            <CategoryForm categories={categories} />
         </div>
        </>
    )
}