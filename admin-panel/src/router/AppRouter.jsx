import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import AdminLayout from "../components/layout/AdminLayout";
import Dashboard from "../pages/dashboard/Dashboard";

const Approuter = () => {
  return <>
  <BrowserRouter>
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>

          </Route>
        </Route>
    </Routes>
  </BrowserRouter>
  </>
};

export default Approuter;
