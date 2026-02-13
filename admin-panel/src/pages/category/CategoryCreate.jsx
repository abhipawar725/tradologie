const CategoryCreate = () => {
  return (
    <>
      <div className="flex items-center justify-between gap-5 mb-4">
        <h1 className="text-xl">Add a new Category</h1>
        <button className="px-4 py-2 capitalize text-white bg-primary rounded-md text-sm">
          publish product
        </button>
      </div>
        <form>
          <div className="flex items-start gap-5">
            <div className="basis-8/12">
              <div className="bg-white p-4 shadow-card rounded-lg">
                <div className="grid grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1 col-span-2">
                    <label htmlFor="pro_name" className="text-sm">
                      Product Name
                    </label>
                    <input
                      type="text"
                      id="pro_name"
                      name="name"
                      className="w-full rounded-md border border-slate-200 text-sm px-3 py-2 outline-0"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="type" className="text-sm">
                      Type
                    </label>
                    <select
                      name="type"
                      id="type"
                      className="w-full rounded-md border border-slate-200 text-sm px-3 py-2 outline-0"
                    >
                      <option value="vegetarian">Vegetarian</option>
                      <option value="non-vegetarian">Non-Vegetarian</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="category" className="text-sm">
                      Category
                    </label>
                    <select
                      name="categoryId"
                      id="category"
                      className="w-full rounded-md border border-slate-200 text-sm px-3 py-2 outline-0"
                    >
                      {/* {categories
              .filter((cat) => cat !== null)
              .map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))} */}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1 col-span-2">
                    <label htmlFor="short-description" className="text-sm">
                      Short Description
                    </label>
                    {/* <Editor
            apiKey={editorKey}
            onInit={(_, editor) => (shortDescRef.current = editor)}
            initialValue=""
            init={{
              height: 180,
              menubar: false,
              plugins: ["lists", "link"],
              toolbar: "bold italic | bullist | link",
            }}
          /> */}
                  </div>
                  <div className="flex flex-col gap-1 col-span-2">
                    <label htmlFor="description" className="text-sm">
                      Description
                    </label>
                    {/* <Editor
            apiKey={editorKey}
            onInit={(_, editor) => (descRef.current = editor)}
            initialValue=""
            init={{
              height: 350,
              menubar: false,
              plugins: ["advlist", "lists", "link", "image", "code", "table"],
              toolbar:
                "undo redo | formatselect | bold italic underline | bullist numlist | link image | code",
            }}
          /> */}
                  </div>
                  <button type="submit">submit</button>
                </div>
              </div>
            </div>
            <div className="basis-4/12">
              <div className="bg-white p-4 shadow-card rounded-lg mb-5">
                <div className="flex flex-col gap-5">
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
                </div>
              </div>
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
