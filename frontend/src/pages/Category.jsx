import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCategoryBySlug } from "../api/category";

const Category = () => {
  const { slug } = useParams();
  const { data, isLoading, isError } = useQuery({ queryKey: ["categorybyslug", slug], queryFn: () => getCategoryBySlug(slug) });
  const path = !!data?.[0]?.category;

  return (
    <>
      {isLoading && <p>Loading...</p>}
      <div className="grid grid-cols-5 gap-5">
        {(!data || data.length === 0) && <p>Products not found</p>}
        {data &&
          data.length > 0 &&
          data?.map((item) => (
            <Link to={path ? `/product/${item.slug}` : `/category/${item.slug}`} className="bg-white border border-border-primary rounded-lg overflow-hidden" key={item._id}>
              <img src={`http://localhost:5000/uploads/${item.image}`} alt={item.name} />
              <p className="text-text-primary text-center p-4">{item.name}</p>
            </Link>
          ))}
      </div>
    </>
  );
};

export default Category;
