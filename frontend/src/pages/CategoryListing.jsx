import React, { useEffect, useState } from "react";
import { getCategoryBySlug } from "../services/categoryService";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CategoryListing = () => {
  const [categories, setCategories] = useState([]);
  const location = useLocation()
  const path = location.pathname
  const slugArray = path.replace("/category/", "").split("/")
  const slugPath = slugArray.join("/")
  let slug = slugArray.length > 1 ? slugArray[1] : slugArray[0]
  const url = import.meta.env.VITE_BASE_URL
  const navigate = useNavigate()

  const getCategoryData = async () => {
    try {
      const res = await getCategoryBySlug(slug);
      setCategories(res.data);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  const handleClick = (slug) => {
    const newPath = [...slugArray, slug].join("/")
    navigate(`/category/${newPath}`)
  }

  useEffect(() => {
    getCategoryData();
  }, [location.pathname]);

  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        {categories?.map((cat) => (
          <div onClick={() => handleClick(`${cat.slug}`)}>
            <div className="border rounded-xl">
              <img src={`${url}/uploads/${cat.image}`} alt={cat.name} className="max-w-full mx-auto block" />
              <p className="text-primary m-0 text-center p-3">{cat.name}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CategoryListing;
