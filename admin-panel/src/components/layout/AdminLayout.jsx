import Sidebar from "./Sidebar"
import {Outlet} from "react-router-dom"
const AdminLayout = () => {
  return (
    <div>
        <Sidebar />
        <Outlet />
    </div>
  )
}

export default AdminLayout