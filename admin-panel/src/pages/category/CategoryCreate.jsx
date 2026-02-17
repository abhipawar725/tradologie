import { getCategory } from "../../api/category.api";
import { addCategory } from "../../api/category.api";
import { useEffect, useState, useRef } from "react";

const CategoryCreate = () => {
  const [parentId, setParentId] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const formRef = useRef()

  const getCategories = async () => {
    const res = await getCategory({isActive: true});
    setCategories(res.data.data.categories);
    setLoading(false);
  };

  useEffect(() => {
    getCategories();
  }, []);

   const handleSubmit = async(e) => {
    e.preventDefault()
    const formData = new FormData(formRef.current)
    const allData = {}
    allData.name = formData.get('name')
    allData.parentId = formData.get('parentId')
    const images = formData.get('images')
    formData.append('images', images)
    console.log(allData)
    // try {
      // const res = await addCategory(allData)
      // console.log(res.data)
    // } catch (error) {
      // console.log(error.response.data)           
    // }   
   }
  return (
    <>
      <div className="flex items-center justify-between gap-5 mb-4">
        <h1 className="text-xl">Add a new Category</h1>
        <button onClick={handleSubmit} className="px-4 py-2 capitalize text-white bg-primary rounded-md text-sm">
          Publish
        </button>
      </div>
      <form ref={formRef}>
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
                    name="name"
                    className="w-full rounded-md border border-slate-200 text-sm px-3 py-2 outline-0"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="parent-cat" className="text-sm">
                    Parent Category
                  </label>
                  <select
                    name="parentId"
                    id="parent-cat"
                    value={parentId}
                    onChange={(e) => setParentId(e.target.value)}
                    className="w-full rounded-md border border-slate-200 text-sm px-3 py-2 outline-0"
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    {categories
                      .map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      ))}
                  </select>
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
                    name="images"
                    className="absolute top-0 left-0 w-full h-full opacity-0"
                  />
                  <p>Upload Image</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CategoryCreate;
