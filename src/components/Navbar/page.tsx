import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const updateCount = () => {
      const cart = JSON.parse(localStorage.getItem("freshmart-cart") || "[]");
      const total = cart.reduce((sum: number, item: any) => sum + item.qty, 0);
      setCartCount(total);
    };
    updateCount();
    window.addEventListener("storage", updateCount);
    window.addEventListener("cartUpdated", updateCount);
    return () => {
      window.removeEventListener("storage", updateCount);
      window.removeEventListener("cartUpdated", updateCount);
    };
  }, []);

  return (
    <nav className="flex items-center justify-between bg-[#2E7D32] px-8 h-16 shadow-md sticky top-0 z-[1000]">
      <Link
        to="/"
        className="font-bold text-2xl text-white tracking-wide hover:text-[#F9A825] transition-colors"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        🛒 FreshMart
      </Link>

      {/* Hamburger */}
      <button
        className="flex md:hidden flex-col gap-[5px] bg-transparent border-none cursor-pointer p-1"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle Menu"
      >
        <span className="block w-6 h-[2px] bg-white rounded"></span>
        <span className="block w-6 h-[2px] bg-white rounded"></span>
        <span className="block w-6 h-[2px] bg-white rounded"></span>
      </button>

      {/* Nav Links */}
      <ul
        className={`${
          menuOpen ? "flex" : "hidden"
        } md:flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-1
        absolute md:static top-16 left-0 right-0 md:right-auto
        bg-[#2E7D32] md:bg-transparent px-4 md:px-0 py-4 md:py-0 z-[999]`}
      >
        <li>
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-[#E8F5E9] text-sm font-normal px-3 py-2 rounded hover:bg-white/20 hover:text-white transition-all block"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/products"
            onClick={() => setMenuOpen(false)}
            className="text-[#E8F5E9] text-sm font-normal px-3 py-2 rounded hover:bg-white/20 hover:text-white transition-all block"
          >
            Products
          </Link>
        </li>

        {/* Dropdown */}
        <li className="relative">
  <a
    href="#"
    onClick={(e) => {
      e.preventDefault();
      setDropdownOpen(!dropdownOpen);
    }}
    className="text-[#E8F5E9] text-sm font-normal px-3 py-2 rounded hover:bg-white/20 hover:text-white transition-all block cursor-pointer"
  >
    Categories ▾
  </a>

  {dropdownOpen && (
    <div className="absolute top-[110%] left-0 bg-white border border-[#D8EDD8] rounded-xl min-w-[180px] shadow-lg flex flex-col z-[999] overflow-hidden">
      ...
    </div>
  )}
</li>

        <li>
          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className="text-[#E8F5E9] text-sm font-normal px-3 py-2 rounded hover:bg-white/20 hover:text-white transition-all block"
          >
            🛒 Cart {cartCount > 0 && <span>({cartCount})</span>}
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard"
            onClick={() => setMenuOpen(false)}
            className="text-[#E8F5E9] text-sm font-normal px-3 py-2 rounded hover:bg-white/20 hover:text-white transition-all block"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <button
            onClick={() => { setMenuOpen(false); navigate("/login"); }}
            className="bg-[#F9A825] text-[#1B1B1B] font-semibold px-4 py-2 rounded border-none cursor-pointer hover:bg-[#FFD54F] transition-all"
          >
            Login
          </button>
        </li>
      </ul>
    </nav>
  );
}