const CategoryCreate = () => {
  return (
    <div className="p-4 shadow-card bg-white rounded-md max-w-lg w-full">
      <form action="">
        <div className="flex flex-col gap-5 w-full">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium" htmlFor="name">
              Full Name
            </label>
            <input type="text" className="w-full rounded-md border border-slate-200 text-sm px-3 py-2 outline-0" name="name" id="name" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input type="text" className="w-full rounded-md border border-slate-200 text-sm px-3 py-2 outline-0" name="email" id="email" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium" htmlFor="password">
              Password
            </label>
            <input type="text" className="w-full rounded-md border border-slate-200 text-sm px-3 py-2 outline-0" name="password" id="password" />
          </div>
          <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryCreate;
