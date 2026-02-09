import { NavLink } from "react-router";

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
  return (
    <>
    {Nav.map((item) => (
     <NavLink to={item.url} key={item.label}>{item.label}</NavLink>
    ))}
    </>
  );
};

export default Sidebar;
