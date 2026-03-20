import React,{useState, useEffect} from 'react'

const ProductListing = () => {
  const [products, setProducts] = useState([])

  const getProductData = async() => {
    try {
      const res = await axios.get("http://localhost:5000/api/product", {withCredentials: true})
      console.log(res.data.products)
      setProducts(res.data.products)
    } catch (error) {
      console.log(error.response)
    }
  } 
  useEffect(() => {
   getProductData()
  },[])

  return (
    <>
    {products?.map((item) => (
     <div key={item._id}>{item.name}</div> 
    ))}
    </>
  )
}

export default ProductListing
