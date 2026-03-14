import { useCallback, useEffect, useState } from "react";
import { getCategory } from "../../api/category.api";
import { useForm } from "react-hook-form";
import { generateSlug } from "../../hooks/useSlug";
import { yupResolver } from "@hookform/resolvers/yup";
import { productSchema } from "../../validations/productSchema";
import {addProduct} from "../../api/product.api"
import { ToastContainer, toast } from "react-toastify";


const ProductCreate = () => {
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(productSchema) });
  const [category, setCategory] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const getCategoryData = async () => {
    try {
      setLoading(true);
      const res = await getCategory();
      setCategory(res.data.data.categories);
      setLoading(false);
    } catch (error) {
      console.log(error?.response);
    }
  };

  const leafCategory = category?.filter((cat) => {
    const hasChild = category?.some((c) => c?.parentId?._id === cat?._id);
    return !hasChild;
  });

  useEffect(() => {
    getCategoryData();
  }, []);

  const handleImage = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImagePreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
  }, []);

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const handleSlug = (e) => {
    const value = e.target.value;
    if (!value) return;
    const slug = generateSlug(value);
    setValue("slug", slug);
  };

  const onSubmit = async (data) => {
    const formData = new FormData()
    Object.keys(data).forEach((key) => {
      if(key === 'image' && data.image?.[0]){
        formData.append('image', data.image[0])
      }else{
        formData.append(key, data[key] ?? '')
      }
    })

     try {
      const res = await addProduct(formData)
      toast.success(res.data.message)
     } catch (error) {
      toast.error(error.response.message)
     }
  };

  return (
    <>
      <div className="flex items-center justify-between gap-5 mb-4">
        <h1 className="text-xl">Add a new Product</h1>
        <button form="product-add" className="px-4 py-2 capitalize text-white bg-primary rounded-md text-sm">
          publish product
        </button>
      </div>
      <form id="product-add" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-start gap-5">
          <div className="basis-8/12">
            <div className="bg-white p-4 shadow-card rounded-lg">
              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-1">
                  <label htmlFor="pro_name" className="text-sm">
                    Product Name
                  </label>
                  <input type="text" id="pro_name" {...register("name", { onChange: handleSlug })} className="w-full rounded-md border border-slate-200 text-sm px-3 py-2 outline-0" />
                  {errors?.name && <p className="text-red-500 text-sm">{errors?.name?.message}</p>}
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="category" className="text-sm">
                    Category
                  </label>
                  <select name="categoryId" id="category" {...register("category")} className="w-full rounded-md border border-slate-200 text-sm px-3 py-2 outline-0">
                    <option value="">Select Category</option>
                    {leafCategory?.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  {errors?.category && <p className="text-red-500 text-sm">{errors?.category?.message}</p>}
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="isActive" className="text-sm">
                    Activate
                  </label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" {...register("isActive")} />
                    <div className="h-6 w-11 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-colors duration-300"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5"></div>
                  </label>
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="showInHome" className="text-sm">
                    Show in Home
                  </label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" {...register("showInHome")} />
                    <div className="h-6 w-11 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-colors duration-300"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5"></div>
                  </label>
                </div>
                <div className="flex flex-col gap-1 col-span-2">
                  <label htmlFor="short-description" className="text-sm">
                    Short Description
                  </label>
                  <textarea rows={3} id="short-description" {...register("shortDescription")} className="w-full rounded-md border border-slate-200 text-sm px-3 py-2 outline-0"></textarea>
                  {errors?.shortDescription && <p className="text-red-500 text-sm">{errors?.shortDescription?.message}</p>}
                  <input type="hidden" {...register("slug")} />
                </div>
              </div>
            </div>
          </div>
          <div className="basis-4/12">
            <div className="bg-white p-4 shadow-card rounded-lg">
              <div className="flex flex-col gap-1">
                <label htmlFor="product-image" className="text-sm">
                  Product Image
                </label>
                <div className="flex justify-center items-center relative w-full rounded-md cursor-pointer border-dashed border border-slate-200 text-sm px-3 py-2 outline-0 overflow-hidden h-20">
                  <input type="file" {...register("image", { onChange: handleImage })} className="absolute top-0 left-0 w-full h-full opacity-0" />
                  <p>Upload Image</p>
                </div>
                {errors?.image && <p className="text-red-500 text-sm">{errors?.image?.message}</p>}
                {imagePreview && (
                  <div>
                    <img src={imagePreview} alt="image" className="w-20" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
      <ToastContainer position="top-right" />
    </>
  );
};

export default ProductCreate;
