import { Link, NavLink, useNavigate } from "react-router";
import { logoutApi } from "../../api/auth.api";
import { toast, ToastContainer } from "react-toastify";
import { RiCheckboxBlankCircleLine } from "@remixicon/react";
import { RiArrowRightSLine, RiArrowDownSLine } from "@remixicon/react";
import { useState } from "react";

const nav = [
  {
    label: "dashboard",
    url: "/",
  },
  {
    label: "category",
    children: [
      { label: "category list", url: "/category" },
      { label: "category add", url: "/category/add" },
      { label: "category edit", url: "/category/edit/:id" },
    ],
  },
  {
    label: "product",
    children: [
      { label: "product list", url: "/product" },
      { label: "product add", url: "/product/add" },
      { label: "product edit", url: "/product/edit/:id" },
    ],
  },
];
const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();
  const logout = async () => {
    try {
      const res = await logoutApi();
      toast.success(res.data?.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data.message || "Logout failed");
    }
  };

  const toggleMenu = (label) => {
    setOpenMenu(openMenu === label ? null : label);
  };

  return (
    <>
      <aside className="w-64 bg-white shadow-soft fixed top-0 h-screen overflow-auto">
        <div className="bg-white p-3">
          <img src="/images/logo.webp" alt="logo" className="w-[256px]" />
        </div>

        <nav className="space-y-3 px-3">
          <ul>
            {nav.map((item) => (
              <li key={item.label} className="mt-2">
                {item.url ? (
                  <NavLink to={item.url} className="px-4 py-2 block relative capitalize rounded-sm hover:bg-gray-50 transition">
                    {item.label}
                  </NavLink>
                ) : (
                  <button onClick={() => toggleMenu(item.label)} className={`w-full flex items-center justify-between gap-2 px-4 py-2 relative capitalize rounded-sm hover:bg-gray-50 transition ${openMenu === item.label ? "bg-primary text-white hover:bg-primary hover:text-white" : ""}`}>
                    {item.label} {openMenu === item.label ? <RiArrowDownSLine size={24} /> : <RiArrowRightSLine size={24} />}
                  </button>
                )}
                {openMenu === item.label && (
                  <ul>
                    {item.children.map((subItem) => {
                      return (
                        <li key={subItem.label} className="mt-2">
                          <NavLink to={subItem.url} className="px-4 py-2 relative capitalize flex items-center gap-2 rounded-sm hover:bg-gray-50 transition text-base">
                            <RiCheckboxBlankCircleLine size={12} /> {subItem.label}
                          </NavLink>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <Link onClick={logout}>Logout</Link>
      </aside>
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
};

export default Sidebar;
