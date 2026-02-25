import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
import { Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { categorySchema } from "../../validations/categorySchema";
import { generateSlug } from "../../hooks/useSlug";
import { addCategory, getCategory } from "../../api/category.api";

const CategoryForm = ({ category }) => {
  const editorkey = import.meta.env.VITE_EDITOR_TINYMCE;
  const editorRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
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
      console.log(res.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  console.log(watch("shortDescription"));

  return (
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
              <div className="col-span-2">
                <Controller
                  name="shortDescription"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Editor
                      apiKey={editorkey}
                      value={field.value}
                      onEditorChange={(content) => field.onChange(content)}
                      init={{
                        height: 400,
                        menubar: true,
                        plugins: ["advlist", "anchor", "autolink", "autosave", "charmap", "code", "codesample", "directionality", "emoticons", "fullscreen", "help", "image", "importcss", "insertdatetime", "link", "lists", "media", "nonbreaking", "pagebreak", "preview", "quickbars", "save", "searchreplace"],
                        toolbar:  "undo redo | \
      blocks fontfamily fontsize | bold italic underline strikethrough | \
      align numlist bullist | link image | table media | \
      lineheight outdent indent | forecolor backcolor removeformat | \
      charmap emoticons | code fullscreen preview | save print | \
      pagebreak anchor codesample | ltr rtl",
                        menubar: "file edit view insert format tools table help code",
                      }}
                    />
                  )}
                ></Controller>
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
      <button type="submit">Submit</button>
    </form>
  );
};

export default CategoryForm;
