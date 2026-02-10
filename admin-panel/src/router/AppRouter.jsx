import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";

const Approuter = () => {
  return <>
  <BrowserRouter>
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route></Route>
    </Routes>
  </BrowserRouter>
  </>
};

export default Approuter;
