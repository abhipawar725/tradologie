import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import AdminRoute from "../components/auth/AdminRoute";
import AuthLayout from "../components/layout/AuthLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import CategoryList from "../pages/category/CategoryList";
import CategoryCreate from "../pages/category/CategoryCreate";
import CategoryEdit from "../pages/category/CategoryEdit";
import ProductList from "../pages/product/ProductList";
import ProductCreate from "../pages/product/ProductCreate";
import ProductEdit from "../pages/product/ProductEdit";
import UserList from "../pages/user/UserList";
import UserCreate from "../pages/user/UserCreate";
import UserEdit from "../pages/user/UserEdit";

const Approuter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<AuthLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route>
              </Route>
              <Route>
              </Route> 
              <Route path="/category" element={<CategoryList />} />
              <Route path="/category/add" element={<CategoryCreate />} />
              <Route path="/category/edit/:id" element={<CategoryEdit />} />
              <Route path="/product" element={<ProductList />} />
              <Route path="/product/add" element={<ProductCreate />} />
              <Route path="/product/edit/:id" element={<ProductEdit />} />
              <Route element={<AdminRoute />}>
                <Route path="/user" element={<UserList />} />
                <Route path="/user/add" element={<UserCreate />} />
                <Route path="/user/edit/:id" element={<UserEdit />} />
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<h1>Not Found Page</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Approuter;
