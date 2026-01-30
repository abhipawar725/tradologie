"use client";

import React from "react";

type Categories = {
  _id: string;
  name: string;
  parentId: string | null;
};

type CategoriesTypes = {
  categories: Categories[];
};

export default function CategoryForm({ categories }: CategoriesTypes) {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget
    const formData = new FormData(form)
    const allData: { name?: string; parentId?: string | null } = {};

    for(const [key, value] of formData.entries()){
      if(key === 'name'){
        allData.name = value as string
      }
      if(key === 'parentId'){
        allData.parentId = value === "" ? null : String(value)
      }
    }
    console.log(allData)

    await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(allData),
    });
  }

  return (
    <>
      <aside className="bg-white p-4 shadow">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label htmlFor="cat_name" className="text-sm">
                Category Name
              </label>
              <input 
              type="text"
              id="cat_name"
              name="name"
              className="w-full rounded-md border border-slate-200 text-sm px-3 py-2 outline-0" required />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="pt_cat" className="text-sm">
                Parent Category
              </label>
              <select 
              id="pt_cat"
              name="parentId"
              className="w-full rounded-md border border-slate-200 text-sm px-3 py-2 outline-0" 
              >
                <option value="">Main Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit" className="bg-black text-white px-4 py-2 rounded">
            Submit
          </button>
        </form>
      </aside>
    </>
  );
}
