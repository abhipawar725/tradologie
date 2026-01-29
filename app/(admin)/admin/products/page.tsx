"use client";
import { useEffect, useState } from "react";
import { RiCloseLargeFill } from "@remixicon/react";
import ProductForm from "./ProductForm";
import ProductTable from "./ProductTable";

const page = () => {
  const [openSidebar, setOpenSidebar] = useState<Boolean>(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true)
    const [proRes, catRes] = await Promise.all([fetch("/api/products"), fetch("/api/categories")]);
    const proData = await proRes.json();
    const catData = await catRes.json();
    setCategories(catData)
    setProducts(proData)
    setLoading(false)
  }

  const handleSidebar = (e: any) => {
      setOpenSidebar(true)
  }

  return (
    <>
      {openSidebar && (
      <div className="fixed w-96 bg-white shadow-2xl top-0 right-0 h-screen overflow-auto">
          <div className="flex items-center gap-3 justify-between p-3 border-b border-slate-200">
          <h2>Add Product</h2>
          <button type="button" onClick={() => setOpenSidebar(false)}><RiCloseLargeFill size={16} /></button>   
          </div>
          <div className="p-3 overflow-auto h-[calc(100vh-4rem)]">
          <ProductForm categories={categories} onSuccess={fetchData} />
          </div>
      </div>  
      )}
      <ProductTable products={products} loading={loading} sidebar={handleSidebar} />
    </>
  );
};

export default page;
