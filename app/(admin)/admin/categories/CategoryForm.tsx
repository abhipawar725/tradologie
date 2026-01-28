"use client"

import { useEffect, useState } from "react";

export default function CategoryForm(){
  const [name, setName] = useState("")
  const [parentId, setParentId] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false)
    
  useEffect(()=>{
   fetch("/api/categories")
   .then((res) => res.json())
   .then((data) => setCategories(data))
  }, []) 

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true)
    
    await fetch("/api/categories", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name, parentId})
    })

    setName("")
    setParentId("")
    setLoading(false)
  }

  return(
    <>
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
       <h2 className="font-semibold mb-4">Add Category</h2>
       <input 
       type="text"
       className="w-full border p-2 mb-3"
       placeholder="Category name"
       value={name}
       onChange={(e) => setName(e.target.value)}
       required
       /> 
       <select 
       className="w-full border p-2 mb-3"
       value={parentId}
       onChange={(e) => setParentId(e.target.value)}
       required
       >
        <option value="">Main Category</option>
        {categories.map((cat) => (
         <option key={cat._id} value={cat._id}>{cat.name}</option>   
        ))} 
       </select>
       <button type="submit" className="bg-black text-white px-4 py-2 rounded" disabled={loading}>
        {loading ? "Saving" : "Save"}
       </button>
    </form>
    </>
  )
}
