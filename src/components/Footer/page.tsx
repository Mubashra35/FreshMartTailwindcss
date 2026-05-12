import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#2E7D32] text-[#E8F5E9] px-8 pt-10 pb-5 mt-auto">
      <div className="flex flex-wrap gap-8 justify-between max-w-[1200px] mx-auto mb-6">

        <div className="flex-1 min-w-[160px]">
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            🛒 FreshMart
          </h2>
          <p className="text-[#A5D6A7] text-sm leading-relaxed">
            Your trusted online grocery store. Fresh produce, fast delivery, and unbeatable prices — every single day.
          </p>
        </div>

        <div className="flex-1 min-w-[160px]">
          <h4 className="text-xs font-semibold text-[#C8E6C9] mb-3 uppercase tracking-wide">Quick Links</h4>
          {[
            { to: "/", label: "🏠 Home" },
            { to: "/products", label: "🛍️ Products" },
            { to: "/cart", label: "🛒 Cart" },
            { to: "/dashboard", label: "📊 Dashboard" },
            { to: "/login", label: "🔐 Login" },
            { to: "/signup", label: "📝 Sign Up" },
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-[#A5D6A7] text-sm block mb-2 hover:text-[#F9A825] hover:pl-1 transition-all"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex-1 min-w-[160px]">
          <h4 className="text-xs font-semibold text-[#C8E6C9] mb-3 uppercase tracking-wide">Shop by Category</h4>
          {[
            { to: "/products?category=fruits", label: "🍎 Fruits" },
            { to: "/products?category=vegetables", label: "🥦 Vegetables" },
            { to: "/products?category=dairy", label: "🥛 Dairy" },
            { to: "/products?category=bakery", label: "🍞 Bakery" },
            { to: "/products?category=beverages", label: "🧃 Beverages" },
            { to: "/products?category=snacks", label: "🍿 Snacks" },
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-[#A5D6A7] text-sm block mb-2 hover:text-[#F9A825] hover:pl-1 transition-all"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex-1 min-w-[160px]">
          <h4 className="text-xs font-semibold text-[#C8E6C9] mb-3 uppercase tracking-wide">Contact Us</h4>
          <p className="text-[#A5D6A7] text-sm mb-2">📍 123 Green Market Street, Lahore, Pakistan</p>
          <p className="text-[#A5D6A7] text-sm mb-2">📞 +92 300 1234567</p>
          <p className="text-[#A5D6A7] text-sm mb-2">✉️ hello@freshmart.pk</p>
          <p className="text-[#A5D6A7] text-sm mb-2">🕐 Mon – Sat: 9am – 9pm</p>
        </div>

      </div>
      <p className="text-[#A5D6A7] text-xs text-center">© 2025 FreshMart. All rights reserved. Made with 💚 in Pakistan.</p>
    </footer>
  );
}