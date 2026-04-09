import Logo from "../../assets/logo.webp"
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
    <header className='shadow-sm'>
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/">
            <img src={Logo} alt='tradologie' />
          </Link>
          <nav className='flex items-center gap-5 capitalize'>
            <Link to="/" className='text-text-primary hover:text-primary transition-all'>Home</Link>
            <Link to="/products" className='text-text-primary hover:text-primary transition-all'>Products</Link>
            <Link to="/categories" className='text-text-primary hover:text-primary transition-all'>Categories</Link>
            <Link to="/about" className='text-text-primary hover:text-primary transition-all'>About Us</Link>
            <Link to="/contact" className='text-text-primary hover:text-primary transition-all'>Contact Us</Link>
            <Link to="/blogs" className='text-text-primary hover:text-primary transition-all'>Blogs</Link>
          </nav>
        </div>
      </div>
    </header>
    </>
  )
}

export default Header