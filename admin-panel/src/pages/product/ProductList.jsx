import React from 'react'
import { getProduct } from '../../api/product.api'
import { useEffect } from 'react'

const ProductList = () => {
  useEffect(() => {
    getProduct()
  },[])
  return (
    <div>ProductList</div>
  )
}

export default ProductList