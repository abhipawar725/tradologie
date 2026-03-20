import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <>
      <Link to={product.slug}>
        <div class="border rounded-xl">
          <img src={product.image} alt="ACC Grade B 550 | 200 mm" class="max-w-full mx-auto block" />
          <p class="text-primary m-0 text-center p-3">{product.name}</p>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
