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
      <div className="flex">
        <div className="relative h-screen flex-1">
          {/* <img src="/images/login-banner.webp" alt="banner" className="absolute inset-0 w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-t from-black/80 via-black/50 to-black/20"></div>
          <div className="relative z-10 h-full p-12 flex flex-col justify-between text-white">
            <img src="/images/logo.webp" alt="logo" className="w-[256px]" />
            <div className="text-white w-8/12">
              <h1 className="text-4xl font-semibold mb-6 leading-tight">Powering Global B2B Trade</h1>
              <p className="text-lg text-white/90">Connect with verified international buyers and suppliers. Manage inquiries, products, and high-value trade opportunities through a secure and intelligent trading platform.</p>
            </div>
          </div> */}
        </div>
        <div className="p-6 bg-white w-105">
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
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
};

export default Login;
