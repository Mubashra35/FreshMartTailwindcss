import { Link } from "react-router-dom";

export default function Footer() {
  const linkClass = "text-[#A5D6A7] text-[0.92rem] block mb-2 transition-all duration-300 hover:text-brand-fourth hover:pl-1";
  const h4Class = "text-[0.9rem] font-semibold text-[#C8E6C9] mb-3 uppercase tracking-[0.5px]";

  return (
    <footer className="bg-brand-primary text-[#E8F5E9] pt-10 pb-5 px-8 mt-auto">
      <div className="flex flex-wrap gap-8 justify-between max-w-[1200px] mx-auto mb-6">

        <div className="flex-1 min-w-[160px]">
          <h2 className="font-heading text-[1.3rem] text-white mb-4">🛒 FreshMart</h2>
          <p className="text-[#A5D6A7] text-[0.88rem] leading-[1.6]">Your trusted online grocery store. Fresh produce, fast delivery, and unbeatable prices — every single day.</p>
        </div>

        <div className="flex-1 min-w-[160px]">
          <h4 className={h4Class}>Quick Links</h4>
          <Link to="/" className={linkClass}>🏠 Home</Link>
          <Link to="/products" className={linkClass}>🛍️ Products</Link>
          <Link to="/cart" className={linkClass}>🛒 Cart</Link>
          <Link to="/dashboard" className={linkClass}>📊 Dashboard</Link>
          <Link to="/login" className={linkClass}>🔐 Login</Link>
          <Link to="/signup" className={linkClass}>📝 Sign Up</Link>
        </div>

        <div className="flex-1 min-w-[160px]">
          <h4 className={h4Class}>Company</h4>
          <Link to="/teams" className={linkClass}>👥 Our Team</Link>
          <Link to="/reviews" className={linkClass}>⭐ Reviews</Link>
          <Link to="/profile" className={linkClass}>👤 Profile</Link>
          <Link to="/products?category=fruits" className={linkClass}>🍎 Fruits</Link>
          <Link to="/products?category=vegetables" className={linkClass}>🥦 Vegetables</Link>
        </div>

        <div className="flex-1 min-w-[160px]">
          <h4 className={h4Class}>Contact Us</h4>
          <p className="text-[#A5D6A7] text-[0.88rem] leading-[1.6] mb-2">📍 123 Green Market Street, Lahore, Pakistan</p>
          <p className="text-[#A5D6A7] text-[0.88rem] leading-[1.6] mb-2">📞 +92 300 1234567</p>
          <p className="text-[#A5D6A7] text-[0.88rem] leading-[1.6] mb-2">✉️ hello@freshmart.pk</p>
          <p className="text-[#A5D6A7] text-[0.88rem] leading-[1.6] mb-2">🕐 Mon – Sat: 9am – 9pm</p>
        </div>

      </div>
      <p className="text-[#A5D6A7] text-[0.88rem] leading-[1.6] text-center border-t border-white/10 pt-4 max-w-[1200px] mx-auto">© 2025 FreshMart. All rights reserved. Made with 💚 in Pakistan.</p>
    </footer>
  );
}
