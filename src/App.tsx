import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login/page";
import Signup from "./pages/Signup/page";
import Products from "./pages/Products/page";
import Cart from "./pages/Cart/page";
import Dashboard from "./pages/Dashboard/page";
import Navbar from "./components/Navbar/page";
import Footer from "./components/Footer/page";

function Home() {
  const navigate = useNavigate();

  const showAlert = (message: string, type: string) => {
    const alertBox = document.createElement("div");
    alertBox.textContent = message;
    alertBox.className = `fixed top-20 right-5 z-[9999] min-w-[220px] px-4 py-3 rounded text-sm border-l-4 shadow-lg ${
      type === "success"
        ? "bg-[#E8F5E9] text-[#2E7D32] border-[#2E7D32]"
        : "bg-[#FFEBEE] text-[#C62828] border-[#E53935]"
    }`;
    document.body.appendChild(alertBox);
    setTimeout(() => alertBox.remove(), 3000);
  };

  const addToCart = (name: string, price: number, image: string) => {
    const cart = JSON.parse(localStorage.getItem("freshmart-cart") || "[]");
    const existing = cart.find((item: any) => item.name === name);
    if (existing) existing.qty += 1;
    else cart.push({ name, price, image, qty: 1 });
    localStorage.setItem("freshmart-cart", JSON.stringify(cart));
    showAlert(`✅ ${name} added to cart!`, "success");
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const subscribeNewsletter = () => {
    const input = document.getElementById("newsletter-email") as HTMLInputElement;
    if (!input || input.value.trim() === "") {
      showAlert("⚠️ Please enter your email address.", "error");
      return;
    }
    showAlert("✅ Subscribed successfully! Welcome to FreshMart.", "success");
    input.value = "";
  };

  const btnPrimary = "inline-flex items-center gap-2 bg-[#2E7D32] text-white font-semibold py-3 px-8 rounded-xl border-none cursor-pointer hover:bg-[#66BB6A] hover:-translate-y-px transition-all text-base";
  const btnOutline = "inline-flex items-center gap-2 bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-xl cursor-pointer hover:bg-white hover:text-[#2E7D32] transition-all text-base";

  return (
    <>
      <Navbar />
      <main className="flex-1 px-6 py-9 max-w-[1200px] w-full mx-auto">

        {/* HERO */}
        <section className="flex items-center justify-between gap-8 px-8 py-16 bg-gradient-to-br from-[#2E7D32] to-[#66BB6A] rounded-2xl mb-10 text-white flex-wrap">
          <div className="flex flex-col gap-4 max-w-[520px]">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#A5D6A7] text-[#2E7D32] w-fit">
              🌿 100% Fresh &amp; Organic
            </span>
            <h1 className="text-4xl font-bold text-white leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
              Fresh Groceries,<br />Delivered to Your Door
            </h1>
            <p className="text-sm text-white/90 leading-relaxed">
              Shop from thousands of fresh fruits, vegetables, dairy, and more — all sourced locally and delivered within hours.
            </p>
            <div className="flex gap-3 flex-wrap">
              <button className={btnPrimary} onClick={() => navigate("/products")}>🛒 Shop Now</button>
              <button className={btnOutline} onClick={() => navigate("/products")}>Browse Categories</button>
            </div>
          </div>
          <img src="/images/basket.jpeg" alt="Fresh groceries basket" className="w-[320px] rounded-xl object-cover" />
        </section>

        {/* CATEGORIES */}
        <section className="mb-10">
          <div className="flex flex-col items-center text-center mb-8">
            <h2 className="text-2xl font-semibold text-[#2E7D32] mb-1" style={{ fontFamily: "var(--font-heading)" }}>Shop by Category</h2>
            <p className="text-sm text-[#7A7A7A] max-w-lg">Find exactly what you need — from farm-fresh produce to pantry staples.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { path: "/products?category=fruits", img: "/images/fruits.jpg", label: "🍎 Fruits" },
              { path: "/products?category=vegetables", img: "/images/veges.jpg", label: "🥦 Vegetables" },
              { path: "/products?category=dairy", img: "/images/dairy.jpg", label: "🥛 Dairy" },
              { path: "/products?category=bakery", img: "/images/bakery.jpg", label: "🍞 Bakery" },
              { path: "/products?category=beverages", img: "/images/beverages.jpeg", label: "🧃 Beverages" },
              { path: "/products?category=snacks", img: "/images/snacks.jpg", label: "🍿 Snacks" },
              { path: "/products?category=meat", img: "/images/meat.jpg", label: "🥩 Meat" },
              { path: "/products?category=frozen", img: "/images/frozen.jpg", label: "🧊 Frozen" },
            ].map((cat) => (
              <div
                key={cat.path}
                onClick={() => navigate(cat.path)}
                className="flex flex-col items-center justify-center gap-2 bg-white border-[1.5px] border-[#D8EDD8] rounded-xl p-6 cursor-pointer hover:border-[#66BB6A] hover:bg-[#A5D6A7] hover:-translate-y-0.5 hover:shadow-md hover:text-[#2E7D32] transition-all text-[#1B1B1B] w-[120px] shadow-sm"
              >
                <img src={cat.img} alt={cat.label} className="w-12 h-12 object-cover rounded-full" />
                <span className="text-xs font-semibold text-center">{cat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURED PRODUCTS */}
        <section className="mb-10">
          <div className="flex flex-col items-center text-center mb-8">
            <h2 className="text-2xl font-semibold text-[#2E7D32] mb-1" style={{ fontFamily: "var(--font-heading)" }}>Featured Products</h2>
            <p className="text-sm text-[#7A7A7A] max-w-lg">Handpicked fresh items — best quality at the best price.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { img: "/images/apples.jpeg", badge: "Organic", name: "Fresh Red Apples", desc: "Crisp, sweet, and farm-fresh apples from local orchards.", price: "Rs. 120/kg", oldPrice: "Rs. 160/kg", cartName: "Fresh Red Apples", cartPrice: 120 },
              { img: "/images/broccoli.jpg", badge: "Fresh", name: "Fresh Broccoli", desc: "Nutrient-packed broccoli, harvested fresh every morning.", price: "Rs. 90/bunch", oldPrice: "Rs. 120/bunch", cartName: "Fresh Broccoli", cartPrice: 90 },
              { img: "/images/milk.jpg", badge: "Dairy", name: "Whole Milk 1L", desc: "Pure, full-cream milk from grass-fed cows. No preservatives.", price: "Rs. 180/L", oldPrice: null, cartName: "Whole Milk 1L", cartPrice: 180 },
              { img: "/images/sourdough.jpg", badge: "Bakery", name: "Sourdough Bread", desc: "Freshly baked sourdough, crusty outside and soft inside.", price: "Rs. 220/loaf", oldPrice: "Rs. 260/loaf", cartName: "Sourdough Bread", cartPrice: 220 },
              { img: "/images/orrange.jpg", badge: "Sale", name: "Fresh Orange Juice", desc: "100% natural squeezed orange juice. No added sugar.", price: "Rs. 150/L", oldPrice: "Rs. 200/L", cartName: "Fresh Orange Juice", cartPrice: 150 },
              { img: "/images/bananas.jpg", badge: "Fresh", name: "Ripe Bananas", desc: "Sweet, ripe bananas — perfect for breakfast or snacking.", price: "Rs. 60/dozen", oldPrice: null, cartName: "Ripe Bananas", cartPrice: 60 },
            ].map((p) => (
              <div key={p.cartName} className="flex flex-col bg-white border border-[#D8EDD8] rounded-xl w-[220px] shadow-sm overflow-hidden hover:-translate-y-1 hover:shadow-md hover:border-[#66BB6A] transition-all">
                <img src={p.img} alt={p.name} className="w-full h-[180px] object-cover" />
                <div className="flex flex-col gap-1 p-3 flex-1">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold w-fit ${
                    p.badge === "Sale" ? "bg-[#E53935] text-white" : "bg-[#A5D6A7] text-[#2E7D32]"
                  }`}>{p.badge}</span>
                  <h3 className="text-base font-semibold text-[#3A3A3A]">{p.name}</h3>
                  <p className="text-sm text-[#3A3A3A] leading-relaxed">{p.desc}</p>
                  <div>
                    <span className="text-lg font-bold text-[#2E7D32]">{p.price}</span>
                    {p.oldPrice && <span className="text-sm text-[#7A7A7A] line-through ml-1">{p.oldPrice}</span>}
                  </div>
                </div>
                <button
                  onClick={() => addToCart(p.cartName, p.cartPrice, p.img)}
                  className="bg-[#2E7D32] text-white font-medium px-4 py-2 border-none cursor-pointer hover:bg-[#66BB6A] transition-all mx-3 mb-3 rounded"
                >
                  Add to Cart 🛒
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <button
              onClick={() => navigate("/products")}
              className="bg-transparent border-2 border-[#2E7D32] text-[#2E7D32] font-medium px-6 py-2 rounded cursor-pointer hover:bg-[#2E7D32] hover:text-white transition-all"
            >
              View All Products →
            </button>
          </div>
        </section>

        {/* PROMO BANNER */}
        <section className="flex items-center justify-between gap-8 px-10 py-12 bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] rounded-2xl my-10 text-white flex-wrap">
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#E53935] text-white mb-3">Limited Time Offer</span>
            <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-heading)" }}>Get 20% Off Your<br />First Order!</h2>
            <p className="text-sm text-white/90 mb-4">Use code <strong>FRESH20</strong> at checkout. Fresh produce, amazing prices.</p>
            <button
              onClick={() => navigate("/products")}
              className="inline-flex items-center gap-2 bg-[#2E7D32] text-white font-semibold py-3 px-8 rounded-xl border-none cursor-pointer hover:bg-[#66BB6A] transition-all"
            >
              Claim Offer 🎉
            </button>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="mb-10">
          <div className="flex flex-col items-center text-center mb-8">
            <h2 className="text-2xl font-semibold text-[#2E7D32] mb-1" style={{ fontFamily: "var(--font-heading)" }}>Why Choose FreshMart?</h2>
            <p className="text-sm text-[#7A7A7A] max-w-lg">We deliver more than just groceries — we deliver freshness, trust, and convenience.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { icon: "🌿", title: "100% Organic", desc: "All our products are sourced from certified organic farms." },
              { icon: "🚚", title: "Fast Delivery", desc: "Same-day delivery available. Fresh to your door in hours." },
              { icon: "💰", title: "Best Prices", desc: "Competitive prices with weekly deals and seasonal discounts." },
              { icon: "🔒", title: "Secure Payment", desc: "100% secure checkout with multiple payment options." },
              { icon: "↩️", title: "Easy Returns", desc: "Not satisfied? Return within 24 hours, no questions asked." },
            ].map((f) => (
              <div key={f.title} className="flex flex-col items-center text-center gap-2 bg-white border border-[#D8EDD8] rounded-xl p-7 w-[200px] shadow-sm hover:-translate-y-0.5 hover:shadow-md hover:border-[#66BB6A] transition-all">
                <span className="text-4xl">{f.icon}</span>
                <h3 className="text-base font-semibold text-[#3A3A3A]">{f.title}</h3>
                <p className="text-sm text-[#3A3A3A]">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="mb-10">
          <div className="flex flex-col items-center text-center mb-8">
            <h2 className="text-2xl font-semibold text-[#2E7D32] mb-1" style={{ fontFamily: "var(--font-heading)" }}>What Our Customers Say</h2>
            <p className="text-sm text-[#7A7A7A] max-w-lg">Thousands of happy customers trust FreshMart every day.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { quote: "FreshMart has completely changed how I shop for groceries. Everything is always so fresh and the delivery is super fast!", name: "Sara K." },
              { quote: "Amazing quality products at great prices. I love the organic section — the vegetables are always farm-fresh!", name: "Ahmed R." },
              { quote: "Best grocery app I have used. The search filters make it so easy to find exactly what I need by price and category.", name: "Maria L." },
            ].map((t) => (
              <div key={t.name} className="bg-white border border-[#D8EDD8] rounded-xl p-7 w-[300px] shadow-sm">
                <p className="text-sm text-[#3A3A3A] leading-relaxed mb-4">"{t.quote}"</p>
                <div className="flex items-center gap-3 mt-4">
                  <div>
                    <h4 className="text-sm font-medium text-[#7A7A7A]">{t.name}</h4>
                    <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-[#A5D6A7] text-[#2E7D32]">⭐⭐⭐⭐⭐</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="bg-gradient-to-br from-[#2E7D32] to-[#66BB6A] rounded-2xl px-10 py-12 text-center text-white my-10">
          <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-heading)" }}>Stay Fresh — Subscribe to Our Newsletter</h2>
          <p className="text-sm text-white/90 mb-5">Get weekly deals, seasonal recipes, and exclusive offers straight to your inbox.</p>
          <div className="flex gap-3 justify-center flex-wrap mt-5">
            <input
              type="email"
              id="newsletter-email"
              placeholder="Enter your email address..."
              className="max-w-[320px] w-full text-sm px-3 py-2 rounded bg-white/20 border border-white/30 text-white placeholder-white/70 outline-none focus:bg-white/30 transition-all"
            />
            <button
              onClick={subscribeNewsletter}
              className="bg-[#2E7D32] text-white font-semibold px-6 py-2 rounded border-none cursor-pointer hover:bg-[#1B5E20] transition-all"
            >
              Subscribe 🌿
            </button>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

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
      </Routes>
    </BrowserRouter>
  );
}