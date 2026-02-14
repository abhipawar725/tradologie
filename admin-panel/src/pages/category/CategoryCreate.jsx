import { getCategory } from "../../api/category.api";
import { useState } from "react";
import { useEffect } from "react";

const CategoryCreate = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCategories = async () => {
    const res = await getCategory();
    setCategories(res.data.categories);
    setLoading(false);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="bg-white p-4 shadow-card rounded-lg">
          <h1 className="text-lg mb-5">Add a new Category</h1>
          <div className="grid grid-cols-4 gap-5">
            <div className="flex flex-col gap-1">
              <label htmlFor="min-quantity" className="text-sm">
                Minimun Order Quantity
              </label>
              <input
                type="text"
                id="min-quantity"
                name="minQty"
                className="w-full rounded-md border border-slate-200 text-sm px-3 py-2 outline-0"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="bag-size" className="text-sm">
                Bag Size
              </label>
              <input
                type="text"
                id="bag-size"
                name="bagSize"
                className="w-full rounded-md border border-slate-200 text-sm px-3 py-2 outline-0"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="bag-type" className="text-sm">
                Bag Type
              </label>
              <input
                type="text"
                id="bag-type"
                name="bagType"
                className="w-full rounded-md border border-slate-200 text-sm px-3 py-2 outline-0"
                required
              />
            </div>
            <div className="flex h-full items-end">
              <button className="px-4 py-2 capitalize w-full text-white bg-primary rounded-md text-sm h-9.5">
                publish product
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 shadow-card rounded-lg">
          <h2 className="text-lg mb-5">All Categories</h2>
          <table className="w-full text-sm text-left">
            <thead>
              <tr>
                <th className="font-medium p-2 border-b border-slate-300">
                  Image
                </th>
                <th className="font-medium p-2 border-b border-slate-300">
                  Name
                </th>
                <th className="font-medium p-2 border-b border-slate-300">
                  Slug
                </th>
                <th className="font-medium p-2 border-b border-slate-300">
                  Parent
                </th>
                <th className="font-medium p-2 border-b border-slate-300">
                  Status
                </th>
                <th className="font-medium p-2 border-b border-slate-300">
                  Show in Home
                </th>
                <th className="font-medium p-2 border-b border-slate-300">
                  Created Date
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat._id}>
                   <td className="p-2 border-b border-slate-200">{cat.image || '-'}</td>  
                   <td className="p-2 border-b border-slate-200">{cat.name}</td>  
                   <td className="p-2 border-b border-slate-200">{cat.slug}</td>  
                   <td className="p-2 border-b border-slate-200">{cat.parentId ? cat.parentId : 'main category'}</td>  
                   <td className="p-2 border-b border-slate-200">{cat.isActive ? 'true' : 'false'}</td>  
                   <td className="p-2 border-b border-slate-200">{cat.showInHome ? 'true' : 'false'}</td>  
                   <td className="p-2 border-b border-slate-200">{cat.updatedAt}</td>  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CategoryCreate;
