import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize theme
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }

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

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const navLinkClass = "text-[#E8F5E9] text-[0.95rem] font-normal px-2.5 py-2 rounded-sm transition-all duration-300 hover:bg-white/15 hover:text-white flex items-center whitespace-nowrap";

  return (
    <nav className="flex items-center justify-between w-full bg-brand-primary px-6 h-16 shadow-md sticky top-0 z-[1000]">
      <Link to="/" className="font-heading text-xl lg:text-2xl font-bold text-white tracking-[0.5px] hover:text-brand-fourth transition-all duration-300 shrink-0">
        🛒 FreshMart
      </Link>

      <ul className="flex items-center gap-2 m-0 p-0 list-none h-full">
        <li><Link to="/" className={navLinkClass}>Home</Link></li>
        <li><Link to="/products" className={navLinkClass}>Products</Link></li>
        <li><Link to="/reviews" className={navLinkClass}>Reviews</Link></li>
        <li><Link to="/teams" className={navLinkClass}>Teams</Link></li>

        <li className="relative group shrink-0 h-full flex items-center">
          <button className={navLinkClass}>Categories ▾</button>
          <div className="hidden group-hover:flex absolute top-full left-0 bg-bg-card border border-border-muted rounded-md min-w-[180px] shadow-md flex-col z-[9999] overflow-hidden">
            <Link to="/products?category=fruits" className="text-text-primary px-4 py-2.5 text-[0.92rem] hover:bg-brand-third hover:text-brand-primary whitespace-nowrap block">🍎 Fruits</Link>
            <Link to="/products?category=vegetables" className="text-text-primary px-4 py-2.5 text-[0.92rem] hover:bg-brand-third hover:text-brand-primary whitespace-nowrap block">🥦 Vegetables</Link>
            <Link to="/products?category=dairy" className="text-text-primary px-4 py-2.5 text-[0.92rem] hover:bg-brand-third hover:text-brand-primary whitespace-nowrap block">🥛 Dairy</Link>
            <Link to="/products?category=bakery" className="text-text-primary px-4 py-2.5 text-[0.92rem] hover:bg-brand-third hover:text-brand-primary whitespace-nowrap block">🍞 Bakery</Link>
            <Link to="/products?category=beverages" className="text-text-primary px-4 py-2.5 text-[0.92rem] hover:bg-brand-third hover:text-brand-primary whitespace-nowrap block">🧃 Beverages</Link>
          </div>
        </li>

        <li><Link to="/cart" className={navLinkClass}>🛒 Cart {cartCount > 0 && <span className="ml-1 font-bold">({cartCount})</span>}</Link></li>
        <li><Link to="/dashboard" className={navLinkClass}>Dashboard</Link></li>
        <li><Link to="/profile" className={navLinkClass}>Profile</Link></li>

        <li className="flex items-center gap-2 ml-2 shrink-0">
          <button onClick={toggleTheme} className="bg-transparent border border-white/30 text-white rounded-full p-2 hover:bg-white/15 transition-all duration-300 cursor-pointer flex items-center justify-center shrink-0" aria-label="Toggle Theme">
            {isDark ? "☀️" : "🌙"}
          </button>
          <button className="bg-brand-fourth text-[#1B1B1B] font-semibold px-4 py-1.5 rounded-sm border-none cursor-pointer hover:bg-[#FFD54F] hover:-translate-y-px hover:shadow-sm transition-all duration-300 shrink-0 whitespace-nowrap text-[0.95rem]" onClick={() => navigate("/login")}>Login</button>
        </li>
      </ul>
    </nav>
  );
}
