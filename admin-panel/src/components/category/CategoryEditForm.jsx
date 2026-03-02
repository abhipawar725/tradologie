import { useForm } from "react-hook-form";
import { useState, useCallback, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { categorySchema } from "../../validations/categorySchema";
import { generateSlug } from "../../hooks/useSlug";
import { addCategory } from "../../api/category.api";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Toggle from "../common/Toggle";
import FormInput from "../common/FormInput";

const CategoryForm = ({ category }) => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(categorySchema),
    defaultValues: {
      isActive: true,
      showInHome: false,
    }
  });

  const submitHandler = useCallback(
    async (data) => {
      try {
        setLoading(true);
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
          if (key === "image" && data.image?.[0]) {
            formData.append("image", data.image[0]);
          } else {
            formData.append(key, data[key] ?? "");
          }
        });

        const res = await addCategory(formData);
        toast.success(res?.data || "Category created successfully");
        navigate("/category");
      } catch (error) {
        toast.error(error?.response?.data?.message || "something went wrong");
      } finally {
        setLoading(false);
      }
    },
    [navigate],
  );

  const handleImage = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImagePreview((prev) => {
      if(prev) URL.revokeObjectURL(prev)
      return URL.createObjectURL(file);
    });
  }, []);

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const handleNameChange = (value) => {
    const slug = generateSlug(value);
    setValue("slug", slug, { shouldValidate: true });
  };
  return (
    <>
      <div className="flex items-center justify-between gap-5 mb-4">
        <h1 className="text-xl">Add a new Category</h1>
        <button type="submit" form="category-form" disabled={loading} className="px-4 py-2 capitalize text-white bg-primary rounded-md text-sm" >{loading ? 'Submitting...' : 'Submit'}</button>
      </div>
      <form id="category-form" onSubmit={handleSubmit(submitHandler)}>
        <div className="flex items-start gap-5">
          <div className="basis-8/12">
            <div className="bg-white p-4 shadow-card rounded-lg">
              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-1">
                  <FormInput 
                  label="Category Name"
                  name="name"
                  type="text" 
                  register={register('name')} 
                  errors={errors} 
                  onChange={(e) => handleNameChange(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="parent-cat" className="text-sm">
                    Parent Category
                  </label>
                  <select id="parent-cat" className="w-full rounded-md border border-slate-200 text-sm px-3 py-2 outline-0" {...register("parentId")}>
                    <option value="">Select Category</option>
                    {category.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  {errors.parentId && <p className="text-red-500">{errors.parentId.message}</p>}
                </div>
                <Toggle label="Activate" register={register('isActive')} />
                <Toggle label="Show In Home" register={register('showInHome')} />  
                <div className="flex flex-col gap-1 col-span-2">
                  <label htmlFor="short-desc" className="text-sm">
                    Short Desciption
                  </label>
                  <textarea id="short-desc" rows={3} {...register("shortDescription")} className="w-full rounded-md border border-slate-200 text-sm px-3 py-2 outline-0"></textarea>
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
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute top-0 left-0 w-full h-full opacity-0"
                    {...register("image", {
                      onChange: handleImage,
                    })}
                  />
                  <p>Upload Image</p>
                </div>
                {imagePreview && (
                  <div>
                    <img src={imagePreview} alt="category" className="w-20" />
                  </div>
                )}
                {errors.image && <p className="text-red-500">{errors.image.message}</p>}
              </div>
            </div>
          </div>
        </div>
        <input type="hidden" {...register("slug")} />
      </form>
      <ToastContainer position="top-right" />
    </>
  );
};

export default CategoryForm;
