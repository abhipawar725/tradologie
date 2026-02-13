import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { RiSearch2Line } from "@remixicon/react";

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 ml-64">
        <div className="backdrop-blur-xs px-5 pt-5 sticky top-0">
          <div className="bg-white w-full py-2 px-6 rounded-lg shadow-card flex items-center justify-between">
            <RiSearch2Line size={24} />
            <img
              src="/images/avator.png"
              alt="profile"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </div>
        <div className="p-5">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
