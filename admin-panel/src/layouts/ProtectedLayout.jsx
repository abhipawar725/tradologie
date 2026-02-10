import Sidebar from "../components/layout/Sidebar";
import { Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  return (
    <>
      <div className="min-h-screen flex">
        <div className="h-screen">
          <Sidebar />
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default ProtectedLayout;
