import { Link } from "react-router-dom";
import Logo from "../../assets/logo.webp";
import { getCategory } from "../../services/categoryService";
import { useEffect, useState } from "react";

const Header = () => {
  const [category, setCategory] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);
  const getCategoryData = async () => {
    try {
      const res = await getCategory();
      setCategory(res.data.data.categories);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  useEffect(() => {
    getCategoryData();
  }, []);

  return (
    <>
      <header>
        <div className="container mx-auto">
          <div className="flex items-center justify-between gap-4">
            <Link to="/">
              <img src={Logo} alt="tradologie" />
            </Link>
            <nav>
              <ul className="flex items-center gap-3">
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li className="relative">
                  <button type="button" onClick={() => setOpenMenu(true)}>
                    Products
                  </button>
                  {openMenu && (
                    <div className="flex flex-col gap-3 absolute top-full bg-white shadow-lg rounded-lg p-3 min-w-3xs">
                      {category
                        ?.filter((cat) => cat.parentId === null)
                        .map((item) => (
                          <Link key={item.id} to={`/category/${item.slug}`}>
                            {item.name}
                          </Link>
                        ))}
                    </div>
                  )}
                </li>
                <li>
                  <Link to="/products/testing">Product Detail</Link>
                </li>
                <li>
                  <Link to="/category">Category</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
