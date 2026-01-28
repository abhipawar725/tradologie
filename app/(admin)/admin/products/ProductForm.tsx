type Categories = {
  _id: string;
  name: string;
  parentId: string | null;
};

type ProductFormProps = {
  categories: Categories[];
  onSuccess: () => void;
};

const ProductForm = ({ categories, onSuccess }: ProductFormProps) => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-medium">Name</label>
            <input type="text" name="name" onChange={(e) => e.target.value} className="px-4 py-3 border border-slate-200 rounded outline-0 bg-white" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium">Category</label>
            <select className="px-4 py-3 border border-slate-200 rounded outline-0 bg-white">
              <option disabled value="">
                Select Category
              </option>
              {categories
                .filter((cat) => cat.parentId !== null)
                .map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium">Price</label>
            <input type="number" name="price" onChange={(e) => e.target.value} className="px-4 py-3 border border-slate-200 rounded outline-0 bg-white" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium">Short Description</label>
            <textarea name="shortDescription" onChange={(e) => e.target.value} className="px-4 py-3 border border-slate-200 rounded outline-0 bg-white"></textarea>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium">Description</label>
            <textarea name="description" onChange={(e) => e.target.value} className="px-4 py-3 border border-slate-200 rounded outline-0 bg-white"></textarea>
          </div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
};

export default ProductForm;
