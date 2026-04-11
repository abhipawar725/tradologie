import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { productBySlug } from "../api/product"

const Products = () => {
  const {slug} = useParams()

  const {data} = useQuery({queryKey: ["products"], queryFn: () => productBySlug(slug)})
  console.log(data)
  return (
    <>
     <div>
        {data?.name}
        {data?.slug}
        {data?.category?.name}
        {data?.shortDescription}
     </div>
    </>
  )
}

export default Products