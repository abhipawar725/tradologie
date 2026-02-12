import Sidebar from "./Sidebar"
import {Outlet} from "react-router-dom"
const AuthLayout = () => {
  return (
    <div>
        <Sidebar />
        <Outlet />
    </div>
  )
}

export default AuthLayout