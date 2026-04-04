import { useQueryClient } from "@tanstack/react-query";
import { useCategoryies } from "../../hooks/useCategory";
import { deleteCategory } from "../../api/category.api";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { RiArrowLeftDoubleLine, RiArrowRightDoubleLine, RiEdit2Line, RiDeleteBin2Line } from "@remixicon/react";

const CategoryList = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const navigate = useNavigate();
  const handlePage = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setPage(pageNumber);
  };
  const handleLimit = (e) => {
    setLimit(2);
    setPage(1);
  };

  const url = import.meta.env.VITE_BASE_URL;

  const handleDelete = async (id) => {
    try {
      const res = await deleteCategory(id);
      toast.success(res.data.message);
      queryClient.invalidateQueries(["categories"]);
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  
  const { data, isLoading, isError, error } = useCategoryies(page, limit);
  if (isLoading) {
    return <p>loading...</p>;
  }
  if (isError) {
    return <p>{error.message}</p>;
  }
  
  const categories = data?.data?.categories || [];
  const totalPages = data?.data?.totalPages || 1;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).slice(Math.max(0, page - 3), page + 2);

 console.log(data.data)  

  return (
    <>
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
              <th className="font-medium p-2 border-b border-slate-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((cat) => (
              <tr key={cat._id}>
                <td className="p-2 border-b border-slate-200">
                  <img src={`${url}/uploads/${cat.image}`} alt={cat.name} className="w-11" />
                </td>
                <td className="p-2 border-b border-slate-200">{cat.name}</td>
                <td className="p-2 border-b border-slate-200">{cat.slug}</td>
                <td className="p-2 border-b border-slate-200">{cat.parentId ? cat.parentId.name : "main category"}</td>
                <td className="p-2 border-b border-slate-200">{cat.isActive ? "true" : "false"}</td>
                <td className="p-2 border-b border-slate-200">{cat.showInHome ? "true" : "false"}</td>
                <td className="p-2 border-b border-slate-200">{cat.updatedAt}</td>
                <td className="p-2 border-b border-slate-200">
                  <button type="button" onClick={() => navigate(`/category/edit/${cat._id}`)}>
                    <RiEdit2Line size={24} />
                  </button>
                  <button type="button" onClick={() => handleDelete(`${cat._id}`)}>
                    <RiDeleteBin2Line size={24} />
                  </button>
                </td>
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
              {pages.map((pageNumber) => (
                <li key={pageNumber}>
                  <button onClick={() => handlePage(pageNumber)} className="page-link w-10 h-10 cursor-pointer flex items-center justify-center hover:bg-slate-100 rounded-md" type="button">
                    {pageNumber}
                  </button>
                </li>
              ))}
              <li>
                <button onClick={() => handlePage(page + 1)} className="page-link w-10 h-10 cursor-pointer flex items-center justify-center hover:bg-slate-100 rounded-md" type="button" disabled={page === totalPages}>
                  <RiArrowRightDoubleLine size={18} />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default CategoryList;
