import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/page";
import Login from "./pages/Login/page";
import Signup from "./pages/Signup/page";
import Products from "./pages/Products/page";
import Cart from "./pages/Cart/page";
import Dashboard from "./pages/Dashboard/page";
import Reviews from "./pages/Reviews/page";
import Teams from "./pages/Teams/page";
import Profile from "./pages/Profile/page";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}
