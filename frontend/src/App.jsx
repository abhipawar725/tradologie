import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import AppRoute from "./components/layout/AppRoute"
import Home from "./pages/Home"
import Category from "./pages/Category"
import Products from "./pages/Products"
import Contact from "./pages/Contact"
import NotFound from "./pages/NotFound"

function App() {
  return (
    <>
      <Router>
         <Routes>
          <Route element={<AppRoute />}>
          <Route path="/" index element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
          </Route>
         </Routes>
      </Router>
    </>
  );
}

export default App;
