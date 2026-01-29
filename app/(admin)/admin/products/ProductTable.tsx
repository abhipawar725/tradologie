
const ProductTable = ({ products, loading, sidebar }: any) => {
    console.log(products)
  return (
    <>
      <div className="shadow bg-white rounded-xl p-4">
        <div className="flex items-center justify-between gap-3 mb-3">
          <h2>Product List</h2>
          <button type="button" className="bg-orange-700 text-white rounded py-1 px-3" onClick={sidebar}>
            Add
          </button>
        </div>
        <div className="overflow-auto w-full">
          <table className="w-full">
            <thead>
              <tr>
                <th className="border-b border-slate-300 font-medium py-3 text-left">S. No.</th>
                <th className="border-b border-slate-300 font-medium py-3 text-left">Image</th>
                <th className="border-b border-slate-300 font-medium py-3 text-left">Name</th>
                <th className="border-b border-slate-300 font-medium py-3 text-left">Category</th>
                <th className="border-b border-slate-300 font-medium py-3 text-left">Parent Category</th>
                <th className="border-b border-slate-300 font-medium py-3 text-left">Actions</th>
                <th className="border-b border-slate-300 font-medium py-3 text-left">Last Updated</th>
              </tr>
            </thead>
            <tbody>
             {products.map((item: any, index: number) => (
              <tr key={item._id}>
                <td className="border-b border-slate-200 py-3 text-black/70 font-light text-left">{index+1}</td>
                <td className="border-b border-slate-200 py-3 text-black/70 font-light text-left">test</td>
                <td className="border-b border-slate-200 py-3 text-black/70 font-light text-left">{item.name}</td>
                <td className="border-b border-slate-200 py-3 text-black/70 font-light text-left">test</td>
                <td className="border-b border-slate-200 py-3 text-black/70 font-light text-left">{item.parentId}</td>
                <td className="border-b border-slate-200 py-3 text-black/70 font-light text-left">test</td>
                <td className="border-b border-slate-200 py-3 text-black/70 font-light text-left">test</td>
              </tr>
             ))}   
              <tr>
                <td className="border-b border-slate-200 py-3 text-black/70 font-light text-left">test</td>
                <td className="border-b border-slate-200 py-3 text-black/70 font-light text-left">test</td>
                <td className="border-b border-slate-200 py-3 text-black/70 font-light text-left">test</td>
                <td className="border-b border-slate-200 py-3 text-black/70 font-light text-left">test</td>
                <td className="border-b border-slate-200 py-3 text-black/70 font-light text-left">test</td>
                <td className="border-b border-slate-200 py-3 text-black/70 font-light text-left">test</td>
                <td className="border-b border-slate-200 py-3 text-black/70 font-light text-left">test</td>
              </tr>
              <tr>
                <td className="border-b border-slate-200 py-3 text-black/70 font-light text-left">test</td>
                <td className="border-b border-slate-200 py-3 text-black/70 font-light text-left">test</td>
                <td className="border-b border-slate-200 py-3 text-black/70 font-light text-left">test</td>
                <td className="border-b border-slate-200 py-3 text-black/70 font-light text-left">test</td>
                <td className="border-b border-slate-200 py-3 text-black/70 font-light text-left">test</td>
                <td className="border-b border-slate-200 py-3 text-black/70 font-light text-left">test</td>
                <td className="border-b border-slate-200 py-3 text-black/70 font-light text-left">test</td>
              </tr>
              <tr>
                <td className="border-b border-slate-200 py-3 text-black/70 font-light text-left">test</td>
                <td className="border-b border-slate-200 py-3 text-black/70 font-light text-left">test</td>
                <td className="border-b border-slate-200 py-3 text-black/70 font-light text-left">test</td>
                <td className="border-b border-slate-200 py-3 text-black/70 font-light text-left">test</td>
                <td className="border-b border-slate-200 py-3 text-black/70 font-light text-left">test</td>
                <td className="border-b border-slate-200 py-3 text-black/70 font-light text-left">test</td>
                <td className="border-b border-slate-200 py-3 text-black/70 font-light text-left">test</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProductTable;
