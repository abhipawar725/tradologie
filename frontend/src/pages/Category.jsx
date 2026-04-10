import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCategoryBySlug } from "../api/category";

const Category = () => {
  const {pathname} = useLocation()
  console.log(pathname)
  const slugPath = pathname.replace("/category/", "")
  const slug = slugPath.split("/").filter(Boolean).pop()
  console.log(slug)
  const { data, isLoading, isError } = useQuery({ queryKey: ["categorybyslug", slug], queryFn: () => getCategoryBySlug(slug) });
  return (
    <>
      {isLoading && <p>Loading...</p>}
      <div className="grid grid-cols-5 gap-5">
        {data?.map((item) => (
          <Link to={`/category/${slug ? `${slug}/` : ""}${item.slug}`} className="bg-white border border-border-primary rounded-lg overflow-hidden" key={item._id}>
            <img src={`http://localhost:5000/uploads/${item.image}`} alt={item.name} />
            <p className="text-text-primary text-center p-4">{item.name}</p>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Category;
