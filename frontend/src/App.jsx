import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import AppRoute from "./components/layout/AppRoute";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Blogs from "./pages/Blogs";
import About from "./pages/About";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<AppRoute />}>
            <Route path="/" index element={<Home />} />
            <Route path="/category/:slug" element={<Category />} />
            <Route path="/product/:slug" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
