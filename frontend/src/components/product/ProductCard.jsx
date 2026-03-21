import { Link } from "react-router-dom";
const url = import.meta.env.VITE_BASE_URL;

const ProductCard = (product) => {
  console.log(product);
  return (
    <>
      <Link to={`/products/${product.slug}`}>
        <div className="border rounded-xl">
          <img src={`${url}/uploads/${product.image}`} alt={product.title} className="max-w-full mx-auto block" />
          <p className="text-primary m-0 text-center p-3">{product.title}</p>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
