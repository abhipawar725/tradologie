import { Link, NavLink } from "react-router";
import { logoutApi } from "../../api/auth.api";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";

const Nav = [
  {
    label: "dashboard",
    url: "/dashboard",
  },
  {
    label: "category",
    url: "/category",
  },
  {
    label: "product",
    url: "/product",
  },
];
const Sidebar = () => {
  const navigate = useNavigate()
  const logout = async () => {
    try {
      const res = await logoutApi();
      toast.success(res.data?.message);
      navigate("/login")
    } catch (error) {
      toast.error(error.response?.data.message || "Logout failed");
    }
  };
  return (
    <>
      {Nav.map((item) => (
        <NavLink to={item.url} key={item.label}>
          {item.label}
        </NavLink>
      ))}
      <Link onClick={logout}>Logout</Link>
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
};

export default Sidebar;
