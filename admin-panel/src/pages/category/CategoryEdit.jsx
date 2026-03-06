import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCategoryById } from "../../api/category.api";
import { getCategory } from "../../api/category.api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { categorySchema } from "../../validations/categorySchema";
import { editCategory } from "../../api/category.api";
import { generateSlug } from "../../hooks/useSlug";

const CategoryEdit = () => {
  const url = import.meta.env.VITE_BASE_URL;
  const [category, setCategory] = useState({});
  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();



  const {
    register,
    setValue,
    handleSubmit, 
    formState: {errors}
  } = useForm({
    resolver: yupResolver(categorySchema)
    }
  )

  const submitHandler = async (data) => {
    console.log(data)
    console.log(Object.keys(data))
    try {
      setLoading(true)
      const formData = new FormData()  
      Object.keys(data).forEach((key) => {
        if(key === 'image' && data.image?.[0]){
          formData.append('image', data.image[0])
        }
      })
    } catch (error) {
      
    }
  }

  const getData = async () => {
    try {
      setLoading(true);
      const res = await getCategoryById(id);
      setCategory(res.data.category);
      setLoading(false);
    } catch (error) {
      console.log(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryData = async () => {
    try {
      setLoading(true);
      const res = await getCategory({ isActive: true });
      setCategories(res.data.data.categories);
      setLoading(false);
    } catch (error) {
      console.log(error?.response);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  useEffect(() => {
    getCategoryData();
  }, []);

  useEffect(() => {
  if(category){
    setValue('name', category?.name || '')
    setValue('parentId', category?.parentId?._id || '')
    setValue('slug', category?.slug || '')
    setValue('isActive', category?.isActive || false)
    setValue('showInHome', category?.showInHome || false)
    setValue('shortDescription', category?.shortDescription || '')
    setValue('image', category?.image || null)
    setImagePreview(`${url}/uploads/${category?.image}`)
  }
  },[category, setValue])

   const updatedSlug = (value) => {
    const slug = generateSlug(value)
    setValue('slug', slug, {shouldValidate: true})
   } 

   const updateImage = (file) => {
    if(!file) return;
    setImagePreview(URL.createObjectURL(file))
   }

  return (
    <div>
      <div className="flex items-center justify-between gap-5 mb-4">
        <h1 className="text-xl">Edit Category</h1>
        <button type="submit" form="category-edit-form" disabled={loading} className="px-4 py-2 capitalize text-white bg-primary rounded-md text-sm">
          {loading ? "Updating..." : "Update"}
        </button>
      </div>
      <form id="category-edit-form" onSubmit={handleSubmit(submitHandler)}>
        <div className="flex items-start gap-5">
          <div className="basis-8/12">
            <div className="bg-white p-4 shadow-card rounded-lg">
              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-1">
                  <label className="text-sm">Name</label>
                  <input 
                  type="text" 
                  name="name"
                  {...register("name", {onChange: (e) => updatedSlug(e.target.value)})}
                  className="w-full rounded-md border border-slate-200 text-sm px-3 py-2 outline-0" />
                  {errors?.name && <p className="text-red-500">{errors.name?.message}</p>}
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="parent-cat" className="text-sm">
                    Parent Category
                  </label>
                  <select id="parent-cat" {...register('parentId')} className="w-full rounded-md border border-slate-200 text-sm px-3 py-2 outline-0">
                    <option value=''>Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  {errors.parentId && <p className="text-red-500">{errors.parentId.message}</p>}
                </div>
                {/* <Toggle label="Activate" /> */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm">Activate</label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" {...register('isActive')} />
                    <div className="h-6 w-11 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-colors duration-300"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5"></div>
                  </label>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm">Show In Home</label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" {...register('showInHome')} />
                    <div className="h-6 w-11 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-colors duration-300"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5"></div>
                  </label>
                </div>
                {/* <Toggle label="Show In Home" /> */}
                <div className="flex flex-col gap-1 col-span-2">
                  <label htmlFor="short-desc" className="text-sm">
                    Short Desciption
                  </label>
                  <textarea id="short-desc" {...register('shortDescription')} rows={3} className="w-full rounded-md border border-slate-200 text-sm px-3 py-2 outline-0"></textarea>
                  {errors.shortDescription && <p className="text-red-500">{errors.shortDescription.message}</p>}
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
                  <input type="file" accept="image/*" {...register('image', {onChange: (e) => updateImage(e.target.files[0])})} className="absolute top-0 left-0 w-full h-full opacity-0" />
                  <p>Upload Image</p>
                </div>
                  {category.image && (
                  <div>
                    <img src={imagePreview} alt="category" className="w-20" />
                  </div>
                  )}
                {errors.image && <p className="text-red-500">{errors.image.message}</p>}
              </div>
            </div>
          </div>
        </div>
        <input type="hidden" {...register('slug')} />
      </form>
      {/* <ToastContainer position="top-right" /> */}
    </div>
  );
};

export default CategoryEdit;
