import { useParams } from "react-router-dom"

const Products = () => {
  const {slug} = useParams()
  return (
    <div>{slug}</div>
  )
}

export default Products