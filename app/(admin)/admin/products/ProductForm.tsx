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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget
    const formData = new FormData(form);
    const allData = {}
    for(const [key, value] of formData.entries()){
      allData[key] = value
    }
    console.log(allData)
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label htmlFor="pro_name" className="text-sm">
                Product Name
              </label>
              <input 
              type="text"
              id="pro_name"
              name="name"
              className="w-full rounded-md border border-slate-200 text-sm px-3 py-2 outline-0" required />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="min-quantity" className="text-sm">
                Minimun Order Quantity
              </label>
              <input 
              type="text"
              id="min-quantity"
              name="minQty"
              className="w-full rounded-md border border-slate-200 text-sm px-3 py-2 outline-0" required />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="bag-size" className="text-sm">
                Bag Size
              </label>
              <input 
              type="text"
              id="bag-size"
              name="bagSize"
              className="w-full rounded-md border border-slate-200 text-sm px-3 py-2 outline-0" required />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="bag-type" className="text-sm">
                Bag Type
              </label>
              <input 
              type="text"
              id="bag-type"
              name="bagType"
              className="w-full rounded-md border border-slate-200 text-sm px-3 py-2 outline-0" required />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="short-description" className="text-sm">
                Short Description
              </label>
              <textarea
              id="short-description"
              name="shortDescription"
              className="w-full rounded-md border border-slate-200 text-sm px-3 py-2 outline-0"
              ></textarea>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="description" className="text-sm">
                Description
              </label>
              <textarea
              id="description"
              name="description"
              className="w-full rounded-md border border-slate-200 text-sm px-3 py-2 outline-0"
              ></textarea>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="type" className="text-sm">
                Type
              </label>
              <select name="type" id="type">
                <option value="vegetarian">Vegetarian</option>
                <option value="non-vegetarian">Non-Vegetarian</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="category" className="text-sm">
                Category
              </label>
              <select name="categoryId" id="category">
                {categories.filter((cat) => cat !== null).map((cat) => (
                 <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))} 
              </select>
            </div>                        
          </div>
      </form>
    </>
  );
};

export default ProductForm;
