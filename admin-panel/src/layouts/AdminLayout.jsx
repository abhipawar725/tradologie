import Sidebar from "../components/layout/Sidebar"
import { Outlet } from "react-router"

const AdminLayout = () => {
  return (
    <>
    <div className="min-h-screen">
        <div className='h-screen'>
          <Sidebar />
        </div>
        <div>
          <Outlet />
        </div>
    </div>
    </>
  )
}

export default AdminLayout