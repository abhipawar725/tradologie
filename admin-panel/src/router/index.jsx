import { createBrowserRouter, RouterProvider } from "react-router";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import List from "../pages/category/List";

const router = createBrowserRouter([
    {
        element: (<AdminLayout />),
        children: [
            {
                path: "/",
                element: <Dashboard />
            },
            {
                path: "/category",
                element: <List />
            },
            {
                path: "/products",
                element: <List />
            }
        ]
    }
])

export default router