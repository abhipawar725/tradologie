import { getProducts } from "../../api/product.api";
import { deleteProduct } from "../../api/product.api";
import { useEffect, useState } from "react";
import { RiEdit2Line, RiDeleteBin2Line} from "@remixicon/react";
import { ToastContainer, toast } from "react-toastify";

const ProductList = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  
  const getProductsData = async() => {
    try {
      setLoading(true)
      const res = await getProducts()
      setProducts(res.data.products)
    } catch (error) {
      console.log(error?.response?.data?.message)
    } finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    getProductsData()
  },[])

  const handleDelete = async(id) => {
    try {
      setLoading(true)
      const res = await deleteProduct(id)
      toast.success(res.data.message)
      getProductsData()
    } catch (error) {
      toast.error(error?.response?.data?.message)
    } finally{
      setLoading(false)
    }
  }

  {loading && <p>Loading...</p>}
  return (
    <>
      <div className="bg-white p-4 shadow-card rounded-lg">
        <h2 className="text-lg mb-5">All Products</h2>
        <div className="overflow-auto w-full">
        <table className="w-full text-sm text-left">
          <thead>
            <tr>
              <th className="font-medium p-2 border-b border-slate-300 whitespace-nowrap">S. No.</th>
              <th className="font-medium p-2 border-b border-slate-300 whitespace-nowrap">Image</th>
              <th className="font-medium p-2 border-b border-slate-300 whitespace-nowrap">Name</th>
              <th className="font-medium p-2 border-b border-slate-300 whitespace-nowrap">Slug</th>
              <th className="font-medium p-2 border-b border-slate-300 whitespace-nowrap">Category</th>
              <th className="font-medium p-2 border-b border-slate-300 whitespace-nowrap">Status</th>
              <th className="font-medium p-2 border-b border-slate-300 whitespace-nowrap">Show in Home</th>
              <th className="font-medium p-2 border-b border-slate-300 whitespace-nowrap">Description</th>
              <th className="font-medium p-2 border-b border-slate-300 whitespace-nowrap">Created Date</th>
              <th className="font-medium p-2 border-b border-slate-300 whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody>
           {products?.map((item, index) => (
            <tr key={item._id}>
              <td className="p-2 border-b border-slate-200">{index + 1}</td>
              <td className="p-2 border-b border-slate-200">{item.image}</td>
              <td className="p-2 border-b border-slate-200">{item.name}</td>
              <td className="p-2 border-b border-slate-200">{item.slug}</td>
              <td className="p-2 border-b border-slate-200">{item.category}</td>
              <td className="p-2 border-b border-slate-200">{item.isActive ? 'activate' : 'deactivate'}</td>
              <td className="p-2 border-b border-slate-200">{item.showInHome ? 'activate' : 'deactivate'}</td>
              <td className="p-2 border-b border-slate-200">{item.shortDescription}</td>
              <td className="p-2 border-b border-slate-200">{item.createdAt}</td>
              <td className="p-2 border-b border-slate-200">
                 <button type="button" className="cursor-pointer" onClick={() => alert(item._id)}>
                    <RiEdit2Line size={24} />
                  </button>
                  <button type="button" className="cursor-pointer" onClick={() => handleDelete(item._id)}>
                    <RiDeleteBin2Line size={24} />
                  </button>
              </td>
            </tr>
           ))}
          </tbody>
        </table>
        </div>
      </div>
    </>
  );
};

export default ProductList;
