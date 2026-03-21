import React, { useState, useEffect } from "react";
import { getProducts } from "../services/productService";
import ProductCard from "../components/product/ProductCard";

const ProductListing = () => {
  const [products, setProducts] = useState([]);

  const getProductData = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data.products);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    getProductData();
  }, []);

  return (
    <>
      {products?.map((item) => (
        <ProductCard key={item._id} image={item.image} title={item.name} slug={item.slug} />
      ))}
    </>
  );
};

export default ProductListing;
