"use client"
import { useEffect, useState } from "react"
import ProductForm from "./ProductForm"

const page = () => {
   const [categories, setCategories] = useState([])

   useEffect(() => {
    fetch("/api/categories")
    .then((res) => res.json())
    .then((data) => setCategories(data))
  },[])  
    
  return (
    <>
    <ProductForm />
    </>
  )
}

export default page