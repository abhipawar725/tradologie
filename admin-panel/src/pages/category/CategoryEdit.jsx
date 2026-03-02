import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCategoryById } from "../../api/category.api";
import { getCategory } from "../../api/category.api";

const CategoryEdit = () => {
  const [category, setCategory] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const getData = async () => {
    try {
      setLoading(true);
      const res = await getCategoryById(id);
      setCategory(res.data.category)
      setLoading(false);
    } catch (error) {
      console.log(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryData = async () => {
    try {
      setLoading(true)
      const res = await getCategory({isActive: true})
      setCategories(res.data.data.categories)
      setLoading(false)
    } catch (error) {
      console.log(error?.response)
    } finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getCategoryData()
  },[])

  return (
    <div>
      <div className="flex items-center justify-between gap-5 mb-4">
        <h1 className="text-xl">Edit Category</h1>
        <button type="submit" disabled={loading} className="px-4 py-2 capitalize text-white bg-primary rounded-md text-sm">
          {loading ? "Updating..." : "Update"}
        </button>
      </div>
      <form id="category-form">
        <div className="flex items-start gap-5">
          <div className="basis-8/12">
            <div className="bg-white p-4 shadow-card rounded-lg">
              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-1">
                  <label className="text-sm">Name</label>
                  <input 
                  type="text"
                  value={category.name}
                  className="w-full rounded-md border border-slate-200 text-sm px-3 py-2 outline-0" />
                  {/* {errors?.name && <p className="text-red-500">{errors.name?.message}</p>} */}
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="parent-cat" className="text-sm">
                    Parent Category 
                  </label>
                  <select id="parent-cat" className="w-full rounded-md border border-slate-200 text-sm px-3 py-2 outline-0">
                    <option value={category.parentId?.name}>Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  {/* {errors.parentId && <p className="text-red-500">{errors.parentId.message}</p>} */}
                </div>
                {/* <Toggle label="Activate" /> */}
                {/* <Toggle label="Show In Home" /> */}
                <div className="flex flex-col gap-1 col-span-2">
                  <label htmlFor="short-desc" className="text-sm">
                    Short Desciption
                  </label>
                  <textarea id="short-desc" value={category.shortDescription} rows={3} className="w-full rounded-md border border-slate-200 text-sm px-3 py-2 outline-0"></textarea>
                  {/* {errors.shortDescription && <p className="text-red-500">{errors.shortDescription.message}</p>} */}
                </div>
              </div>
            </div>
          </div>
          <div className="basis-4/12">
            <div className="bg-white p-4 shadow-card rounded-lg">
              <div className="flex flex-col gap-1">
                <label htmlFor="Category-image" className="text-sm">
                  Category Image
                </label>
                <div className="flex justify-center items-center relative w-full rounded-md cursor-pointer border-dashed border border-slate-200 text-sm px-3 py-2 outline-0 overflow-hidden h-20">
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute top-0 left-0 w-full h-full opacity-0"
                  />
                  <p>Upload Image</p>
                </div>
                {/* {imagePreview && (
                  <div>
                    <img src={imagePreview} alt="category" className="w-20" />
                  </div>
                )} */}
                {/* {errors.image && <p className="text-red-500">{errors.image.message}</p>} */}
              </div>
            </div>
          </div>
        </div>
        <input type="hidden" />
      </form>
      {/* <ToastContainer position="top-right" /> */}
    </div>
  );
};

export default CategoryEdit;
