import { getCategory } from "../../api/category.api";
import { useState } from "react";
import { useEffect } from "react";
import { RiArrowLeftDoubleLine, RiArrowRightDoubleLine } from "@remixicon/react";

const CategoryCreate = () => {
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const getCategories = async () => {
    const res = await getCategory(page, limit);
    setCategories(res.data.data);
    setTotalPages(res.data.totalPages);
    setLoading(false);
  };
  const handlePage = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setPage(pageNumber);
  };
  const handleLimit = (e) => {
    setLimit(parseInt(e.target.value));
    setPage(1);
  };
  useEffect(() => {
    getCategories();
  }, [page, limit]);

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
              <input type="text" id="min-quantity" name="minQty" className="w-full rounded-md border border-slate-200 text-sm px-3 py-2 outline-0" required />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="bag-size" className="text-sm">
                Bag Size
              </label>
              <input type="text" id="bag-size" name="bagSize" className="w-full rounded-md border border-slate-200 text-sm px-3 py-2 outline-0" required />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="bag-type" className="text-sm">
                Bag Type
              </label>
              <input type="text" id="bag-type" name="bagType" className="w-full rounded-md border border-slate-200 text-sm px-3 py-2 outline-0" required />
            </div>
            <div className="flex h-full items-end">
              <button className="px-4 py-2 capitalize w-full text-white bg-primary rounded-md text-sm h-9.5">publish product</button>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 shadow-card rounded-lg">
          <h2 className="text-lg mb-5">All Categories</h2>
          <table className="w-full text-sm text-left">
            <thead>
              <tr>
                <th className="font-medium p-2 border-b border-slate-300">Image</th>
                <th className="font-medium p-2 border-b border-slate-300">Name</th>
                <th className="font-medium p-2 border-b border-slate-300">Slug</th>
                <th className="font-medium p-2 border-b border-slate-300">Parent</th>
                <th className="font-medium p-2 border-b border-slate-300">Status</th>
                <th className="font-medium p-2 border-b border-slate-300">Show in Home</th>
                <th className="font-medium p-2 border-b border-slate-300">Created Date</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat._id}>
                  <td className="p-2 border-b border-slate-200">{cat.image || "-"}</td>
                  <td className="p-2 border-b border-slate-200">{cat.name}</td>
                  <td className="p-2 border-b border-slate-200">{cat.slug}</td>
                  <td className="p-2 border-b border-slate-200">{cat.parentId ? cat.parentId : "main category"}</td>
                  <td className="p-2 border-b border-slate-200">{cat.isActive ? "true" : "false"}</td>
                  <td className="p-2 border-b border-slate-200">{cat.showInHome ? "true" : "false"}</td>
                  <td className="p-2 border-b border-slate-200">{cat.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-3">
            <select onChange={handleLimit}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
            <nav aria-label="pagination">
              <ul className="pagination flex items-center gap-2 justify-end">
                <li>
                  <button onClick={() => handlePage(page - 1)} className="page-link w-10 h-10 cursor-pointer flex items-center justify-center hover:bg-slate-100 rounded-md" type="button" disabled={page === 1}>
                    <RiArrowLeftDoubleLine size={18} />
                  </button>
                </li>
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  return (
                    <li>
                      <button onClick={() => handlePage(pageNumber)} className="page-link w-10 h-10 cursor-pointer flex items-center justify-center hover:bg-slate-100 rounded-md" type="button">
                        {pageNumber}
                      </button>
                    </li>
                  );
                })}
                <li>
                  <button onClick={() => handlePage(page + 1)} className="page-link w-10 h-10 cursor-pointer flex items-center justify-center hover:bg-slate-100 rounded-md" type="button" disabled={page === totalPages}>
                    <RiArrowRightDoubleLine size={18} />
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryCreate;
