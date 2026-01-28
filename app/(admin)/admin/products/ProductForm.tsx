import { useEffect, useState } from "react"

const ProductForm = () => {
   const [categories, setCategories] = useState<any[]>([])
   console.log(categories)
   useEffect(() => {
    fetch("/api/categories")
    .then((res) => res.json())
    .then((data) => setCategories(data))
  },[])  
 
  return (
    <>
    <form>
        <select>
         <option disabled value="">Select Category</option>   
         {categories.filter((cat) => cat.parentId !== null)
          .map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))
         }   
        </select>
    </form>
    </>
  )
}

export default ProductForm