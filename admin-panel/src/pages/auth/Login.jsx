import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginApi } from "../../api/auth.api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const formData = new FormData(form);
    const allData = {};
    for (const [key, value] of formData.entries()) {
      allData[key] = value;
    }
    try {
      const res = await loginApi(allData);
      toast.success(res.data?.message);
      form.reset();
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data.message || "Login failed");
      form.reset();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="p-4 shadow-card bg-white rounded-md max-w-lg w-full">
        <form onSubmit={handleSubmit}>
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
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
};

export default Login;
