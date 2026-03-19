import { Link } from "react-router-dom";
import Logo from "../../assets/logo.webp";

const Header = () => {
  return (
    <>
      <header>
        <div className="container mx-auto">
          <div className="flex items-center justify-between gap-4">
            <Link to="/">
              <img src={Logo} alt="tradologie" />
            </Link>
            <nav className="flex items-center gap-3">
              <Link to="/about">About Us</Link>
              <Link to="/products">Products</Link>
              <Link to="/products/testing">Product Detail</Link>
              <Link to="/category">Category</Link>
              <Link to="/contact">Contact</Link>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
