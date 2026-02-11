import useAuth from "../../hooks/useAuth"
import {Navigate, Outlet} from "react-router-dom"

const ProtectedRoute = () => {
const {loading, isAuth} = useAuth();

if(loading) return <p>checking auth...</p>;
return isAuth ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoute