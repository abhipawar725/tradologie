import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getProductBySlug } from '../services/productService'

const ProductDetail = () => {
  const {slug} = useParams()
  const [product, setProduct] = useState({})

  const getProductData = async() => {
    try {
      const res = await getProductBySlug(slug)
      setProduct(res.data.product)
      console.log(res.data.product)
    } catch (error) {
      console.log(error?.response?.data?.message)
    }
  }

  useEffect(() => {
   getProductData()
  },[]) 

  return (
    <div>
      {product?.name}
      {product?.slug}
    </div>
  )
}

export default ProductDetail
