"use client";
import { useEffect, useState } from "react";
import ProductForm from "./ProductForm";
import ProductTable from "./ProductTable";

const page = () => {
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

  return (
    <>
      <ProductForm categories={categories} onSuccess={fetchData} />
      <ProductTable products={products} loading={loading} />
    </>
  );
};

export default page;
