import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { categorySchema } from "../../validations/categorySchema";
import { generateSlug } from "../../hooks/useSlug";
import { addCategory, getCategory } from "../../api/category.api";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CategoryForm = ({ category }) => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(categorySchema),
  });

  const submitHandler = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "image" && data.image?.[0]) {
        formData.append("image", data.image[0]);
      } else {
        formData.append(key, data[key] ?? "");
      }
    });
    try {
      const res = await addCategory(formData);
      toast.success(res.data);
      navigate("/category");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="flex items-start gap-5">
          <div className="basis-8/12">
            <div className="bg-white p-4 shadow-card rounded-lg">
              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-1">
                  <label htmlFor="cat-name" className="text-sm">
                    Category Name
                  </label>
                  <input
                    type="text"
                    id="cat-name"
                    className="w-full rounded-md border border-slate-200 text-sm px-3 py-2 outline-0"
                    {...register("name", {
                      onChange: (e) => {
                        const slug = generateSlug(e.target.value);
                        setValue("slug", slug, { shouldValidate: true });
                      },
                    })}
                  />
                  {errors.name && <p className="text-red-500">{errors.name.message}</p>}
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
                <div className="flex flex-col gap-1">
                  <label htmlFor="is-active" className="text-sm">
                    Activate
                  </label>
                  <div className="relative w-11 h-5">
                    <label className="absolute inset-0 z-10 opacity-0 peer ...">
                      <input type="checkbox" {...register("isActive")} />
                    </label>
                    <div className="h-full w-full relative bg-gray-300 rounded-full peer-has-checked:bg-green-500 transition-colors duration-300"></div>
                    <div className="absolute -translate-y-1/2 top-1/2 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-has-checked:translate-x-5"></div>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="show-in-home" className="text-sm">
                    Show in Home
                  </label>
                  <div className="relative w-11 h-5">
                    <label className="absolute inset-0 z-10 opacity-0 peer ...">
                      <input type="checkbox" {...register("showInHome")} />
                    </label>
                    <div className="h-full w-full relative bg-gray-300 rounded-full peer-has-checked:bg-green-500 transition-colors duration-300"></div>
                    <div className="absolute -translate-y-1/2 top-1/2 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-has-checked:translate-x-5"></div>
                  </div>
                </div>
                <div className="flex flex-col gap-1 col-span-2">
                  <label htmlFor="short-desc" className="text-sm">
                    Short Desciption
                  </label>
                  <textarea id="short-desc" {...register("shortDescription")} className="w-full rounded-md border border-slate-200 text-sm px-3 py-2 outline-0"></textarea>
                  {errors.shortDescription && <p className="text-red-500">{errors.shortDescription.message}</p>}
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
                  <input
                    type="file"
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
        <button type="submit" className="bg-primary px-6 py-3 rounded-4xl text-white">
          Submit
        </button>
      </form>
      <ToastContainer position="top-right" />
    </>
  );
};

export default CategoryForm;
