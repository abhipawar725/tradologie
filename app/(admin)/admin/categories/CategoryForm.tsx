"use client";

type Categories = {
  _id: string;
  name: string;
  parentId: string | null;
};

type CategoriesTypes = {
  categories: Categories[];
};

export default function CategoryForm({ categories }: CategoriesTypes) {
  async function handleSubmit(e: any) {
    e.preventDefault();

    await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, parentId }),
    });
  }

  return (
    <>
      <aside className="bg-white p-4 shadow">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-sm">
                Category Name
              </label>
              <input type="text" className="w-full rounded-md border border-slate-200 text-sm px-3 py-2 outline-0" onChange={(e) => e.target.value} required />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-sm">
                Parent Category
              </label>
              <select className="w-full border p-2 mb-3" onChange={(e) => e.target.value} required>
                <option value="">Main Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit" className="bg-black text-white px-4 py-2 rounded">
            Submit
          </button>
        </form>
      </aside>
    </>
  );
}
