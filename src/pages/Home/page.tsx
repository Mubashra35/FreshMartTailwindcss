import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/page";
import Footer from "../../components/Footer/page";

export default function Home() {
  const navigate = useNavigate();

  const showAlert = (message: string, type: string) => {
    const alertBox = document.createElement("div");
    alertBox.className = `fixed top-20 right-5 z-[9999] min-w-[220px] px-4 py-3 rounded-[6px] text-[0.92rem] shadow-[0_4px_16px_rgba(0,0,0,0.15)] flex items-center gap-2.5 ${type === "success" ? "bg-[#E8F5E9] text-[#2E7D32] border-l-4 border-brand-primary" : "bg-[#FFEBEE] text-[#C62828] border-l-4 border-brand-accent"}`;
    alertBox.textContent = message;
    document.body.appendChild(alertBox);
    setTimeout(() => alertBox.remove(), 3000);
  };

  const addToCart = (name: string, price: number, image: string) => {
    const cart = JSON.parse(localStorage.getItem("freshmart-cart") || "[]");
    const existing = cart.find((item: any) => item.name === name);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ name, price, image, qty: 1 });
    }
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

  const lgButton = "font-body text-[1.05rem] font-medium px-8 py-3.5 border-2 border-transparent rounded-md bg-brand-primary text-white cursor-pointer transition-all duration-300 inline-flex items-center justify-center gap-2 hover:bg-brand-secondary hover:shadow-sm hover:-translate-y-px";
  const borderButtonLg = "font-body text-[1.05rem] font-medium px-8 py-3.5 border-2 border-brand-primary rounded-md bg-transparent text-brand-primary cursor-pointer transition-all duration-300 inline-flex items-center justify-center gap-2 hover:bg-brand-primary hover:text-white";
  const sectionTitle = "flex flex-col items-center text-center mb-8";
  const sectionTitleH2 = "font-heading text-brand-primary text-[clamp(1.4rem,3vw,2rem)] font-semibold leading-[1.3] mb-2.5";
  const sectionTitleP = "text-text-muted max-w-[520px] text-[0.97rem] leading-[1.7]";
  const categoryItem = "flex flex-col items-center justify-center gap-2.5 bg-bg-card border-[1.5px] border-border-muted rounded-md p-6 cursor-pointer transition-all duration-300 no-underline text-text-primary w-[120px] shadow-sm hover:border-brand-secondary hover:bg-brand-third hover:-translate-y-[3px] hover:shadow-md hover:text-brand-primary";
  const productCard = "flex flex-col bg-bg-card border border-border-muted rounded-md w-[220px] shadow-sm transition-all duration-300 overflow-hidden hover:-translate-y-1 hover:shadow-md hover:border-border-secondary";
  const addCartBtn = "font-body text-[0.95rem] font-medium px-[22px] py-2.5 border-2 border-transparent bg-brand-primary text-white cursor-pointer transition-all duration-300 inline-flex items-center justify-center gap-2 hover:bg-brand-secondary hover:shadow-sm hover:-translate-y-px mt-auto rounded-none";

  return (
    <>
      <Navbar />
      <main className="flex-1 px-6 py-9 max-w-[1200px] w-full mx-auto">
        {/* HERO */}
        <section className="flex flex-col md:flex-row items-center justify-between gap-8 px-8 py-[60px] bg-gradient-to-br from-brand-primary to-brand-secondary rounded-lg mb-10 text-white">
          <div className="flex flex-col gap-4 max-w-[520px]">
            <span className="inline-block px-2.5 py-1 rounded-full text-[0.78rem] font-semibold bg-brand-third text-brand-primary w-fit">🌿 100% Fresh &amp; Organic</span>
            <h1 className="font-heading text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-white leading-[1.2] mb-3">Fresh Groceries,<br />Delivered to Your Door</h1>
            <p className="text-white/90 text-[0.97rem] leading-[1.7] mb-2">Shop from thousands of fresh fruits, vegetables, dairy, and more — all sourced locally and delivered within hours.</p>
            <div className="flex gap-3 flex-wrap">
              <button className={lgButton} onClick={() => navigate("/products")}>🛒 Shop Now</button>
              <button className={`${borderButtonLg} border-white text-white hover:bg-white hover:text-brand-primary`} onClick={() => navigate("/products")}>Browse Categories</button>
            </div>
          </div>
          <img src="/images/basket.jpeg" alt="Fresh groceries basket" className="w-[320px] rounded-md shadow-md" />
        </section>

        {/* CATEGORIES */}
        <section className="mb-16">
          <div className={sectionTitle}>
            <h2 className={sectionTitleH2}>Shop by Category</h2>
            <p className={sectionTitleP}>Find exactly what you need — from farm-fresh produce to pantry staples.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 my-6">
            <div onClick={() => navigate("/products?category=fruits")} className={categoryItem}>
              <img src="/images/fruits.jpg" alt="Fruits" className="w-12 h-12 object-cover rounded-full" />
              <span className="text-[0.88rem] font-semibold text-center">🍎 Fruits</span>
            </div>
            <div onClick={() => navigate("/products?category=vegetables")} className={categoryItem}>
              <img src="/images/veges.jpg" alt="Vegetables" className="w-12 h-12 object-cover rounded-full" />
              <span className="text-[0.88rem] font-semibold text-center">🥦 Vegetables</span>
            </div>
            <div onClick={() => navigate("/products?category=dairy")} className={categoryItem}>
              <img src="/images/dairy.jpg" alt="Dairy" className="w-12 h-12 object-cover rounded-full" />
              <span className="text-[0.88rem] font-semibold text-center">🥛 Dairy</span>
            </div>
            <div onClick={() => navigate("/products?category=bakery")} className={categoryItem}>
              <img src="/images/bakery.jpg" alt="Bakery" className="w-12 h-12 object-cover rounded-full" />
              <span className="text-[0.88rem] font-semibold text-center">🍞 Bakery</span>
            </div>
            <div onClick={() => navigate("/products?category=beverages")} className={categoryItem}>
              <img src="/images/beverages.jpeg" alt="Beverages" className="w-12 h-12 object-cover rounded-full" />
              <span className="text-[0.88rem] font-semibold text-center">🧃 Beverages</span>
            </div>
            <div onClick={() => navigate("/products?category=snacks")} className={categoryItem}>
              <img src="/images/snacks.jpg" alt="Snacks" className="w-12 h-12 object-cover rounded-full" />
              <span className="text-[0.88rem] font-semibold text-center">🍿 Snacks</span>
            </div>
            <div onClick={() => navigate("/products?category=meat")} className={categoryItem}>
              <img src="/images/meat.jpg" alt="Meat" className="w-12 h-12 object-cover rounded-full" />
              <span className="text-[0.88rem] font-semibold text-center">🥩 Meat</span>
            </div>
            <div onClick={() => navigate("/products?category=frozen")} className={categoryItem}>
              <img src="/images/frozen.jpg" alt="Frozen" className="w-12 h-12 object-cover rounded-full" />
              <span className="text-[0.88rem] font-semibold text-center">🧊 Frozen</span>
            </div>
          </div>
        </section>

        {/* FEATURED PRODUCTS */}
        <section className="mb-16">
          <div className={sectionTitle}>
            <h2 className={sectionTitleH2}>Featured Products</h2>
            <p className={sectionTitleP}>Handpicked fresh items — best quality at the best price.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 my-9 mx-3">
            {[
              { name: "Fresh Red Apples", price: 120, oldPrice: 160, img: "/images/apples.jpeg", badge: "Organic", desc: "Crisp, sweet, and farm-fresh apples from local orchards." },
              { name: "Fresh Broccoli", price: 90, oldPrice: 120, img: "/images/broccoli.jpg", badge: "Fresh", desc: "Nutrient-packed broccoli, harvested fresh every morning." },
              { name: "Whole Milk 1L", price: 180, oldPrice: null, img: "/images/milk.jpg", badge: "Dairy", desc: "Pure, full-cream milk from grass-fed cows. No preservatives." },
              { name: "Sourdough Bread", price: 220, oldPrice: 260, img: "/images/sourdough.jpg", badge: "Bakery", desc: "Freshly baked sourdough, crusty outside and soft inside." },
              { name: "Fresh Orange Juice", price: 150, oldPrice: 200, img: "/images/orrange.jpg", badge: "Sale", badgeAccent: true, desc: "100% natural squeezed orange juice. No added sugar." },
              { name: "Ripe Bananas", price: 60, oldPrice: null, img: "/images/bananas.jpg", badge: "Fresh", desc: "Sweet, ripe bananas — perfect for breakfast or snacking." }
            ].map(p => (
              <div key={p.name} className={productCard}>
                <img src={p.img} alt={p.name} className="w-full h-[180px] object-cover" />
                <div className="flex flex-col gap-1.5 p-3.5 flex-1">
                  <span className={`inline-block px-2.5 py-1 rounded-full text-[0.78rem] font-semibold w-fit ${p.badgeAccent ? 'bg-brand-accent text-white' : 'bg-brand-third text-brand-primary'}`}>{p.badge}</span>
                  <h3 className="font-body text-[1.15rem] font-semibold text-text-secondary m-0">{p.name}</h3>
                  <p className="text-[0.97rem] text-text-secondary leading-[1.7] m-0 mb-1 flex-1">{p.desc}</p>
                  <div className="mt-auto">
                    <span className="text-brand-primary font-bold text-[1.1rem]">Rs. {p.price}</span>
                    {p.oldPrice && <span className="text-text-muted text-[0.85rem] line-through ml-2"> Rs. {p.oldPrice}</span>}
                  </div>
                </div>
                <button className={addCartBtn} onClick={() => addToCart(p.name, p.price, p.img)}>Add to Cart 🛒</button>
              </div>
            ))}
          </div>
          <div className={sectionTitle}>
            <button className={borderButtonLg} onClick={() => navigate("/products")}>View All Products →</button>
          </div>
        </section>

        {/* PROMO BANNER */}
        <section className="bg-brand-third p-10 rounded-lg text-center flex flex-col items-center gap-4 my-10 shadow-sm">
          <span className="inline-block px-2.5 py-1 rounded-full text-[0.78rem] font-semibold w-fit bg-brand-accent text-white">Limited Time Offer</span>
          <h2 className="font-heading text-brand-primary text-[clamp(1.4rem,3vw,2rem)] font-semibold leading-[1.3] m-0">Get 20% Off Your<br />First Order!</h2>
          <p className="text-text-secondary max-w-[520px] text-[0.97rem] leading-[1.7] m-0">Use code <strong>FRESH20</strong> at checkout. Fresh produce, amazing prices.</p>
          <button className={lgButton} onClick={() => navigate("/products")}>Claim Offer 🎉</button>
        </section>

        {/* WHY CHOOSE US */}
        <section className="mb-16">
          <div className={sectionTitle}>
            <h2 className={sectionTitleH2}>Why Choose FreshMart?</h2>
            <p className={sectionTitleP}>We deliver more than just groceries — we deliver freshness, trust, and convenience.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 my-8">
            {[
              { icon: "🌿", title: "100% Organic", desc: "All our products are sourced from certified organic farms." },
              { icon: "🚚", title: "Fast Delivery", desc: "Same-day delivery available. Fresh to your door in hours." },
              { icon: "💰", title: "Best Prices", desc: "Competitive prices with weekly deals and seasonal discounts." },
              { icon: "🔒", title: "Secure Payment", desc: "100% secure checkout with multiple payment options." },
              { icon: "↩️", title: "Easy Returns", desc: "Not satisfied? Return within 24 hours, no questions asked." }
            ].map(f => (
              <div key={f.title} className="flex flex-col items-center text-center max-w-[200px] gap-2">
                <span className="text-[2.5rem] leading-none mb-1">{f.icon}</span>
                <h3 className="font-body text-[1.15rem] font-semibold text-text-secondary m-0">{f.title}</h3>
                <p className="text-[0.97rem] text-text-secondary leading-[1.7] m-0">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="mb-16">
          <div className={sectionTitle}>
            <h2 className={sectionTitleH2}>What Our Customers Say</h2>
            <p className={sectionTitleP}>Thousands of happy customers trust FreshMart every day.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 my-9 mx-3">
            {[
              { text: "\"FreshMart has completely changed how I shop for groceries. Everything is always so fresh and the delivery is super fast!\"", name: "Sara K." },
              { text: "\"Amazing quality products at great prices. I love the organic section — the vegetables are always farm-fresh!\"", name: "Ahmed R." },
              { text: "\"Best grocery app I have used. The search filters make it so easy to find exactly what I need by price and category.\"", name: "Maria L." }
            ].map(t => (
              <div key={t.name} className="bg-bg-card border border-border-muted rounded-md p-6 w-[300px] shadow-sm flex flex-col gap-4 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <p className="text-[0.97rem] text-text-secondary leading-[1.7] italic flex-1 m-0">{t.text}</p>
                <div className="flex items-center gap-3 border-t border-border-muted pt-4 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-brand-third flex items-center justify-center text-brand-primary font-bold text-lg">{t.name.charAt(0)}</div>
                  <div className="flex flex-col">
                    <h4 className="font-body text-[1rem] font-semibold text-text-secondary m-0">{t.name}</h4>
                    <span className="text-[0.75rem]">⭐⭐⭐⭐⭐</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="bg-bg-card border border-border-muted rounded-lg p-10 text-center flex flex-col items-center gap-4 shadow-sm mb-8">
          <h2 className={sectionTitleH2}>Stay Fresh — Subscribe to Our Newsletter</h2>
          <p className={sectionTitleP}>Get weekly deals, seasonal recipes, and exclusive offers straight to your inbox.</p>
          <div className="flex flex-col sm:flex-row gap-2 w-full max-w-[400px] mt-2">
            <input type="email" id="newsletter-email" placeholder="Enter your email address..." className="flex-1 font-body text-[0.95rem] px-3.5 py-2.5 border-[1.5px] border-border-muted rounded-md bg-bg-main text-text-primary transition-all duration-300 focus:outline-none focus:border-border-focus focus:bg-bg-card focus:shadow-[0_0_0_3px_rgba(46,125,50,0.12)]" />
            <button onClick={subscribeNewsletter} className="font-body text-[0.95rem] font-medium px-[22px] py-2.5 border-2 border-transparent rounded-md bg-brand-primary text-white cursor-pointer transition-all duration-300 inline-flex items-center justify-center whitespace-nowrap hover:bg-brand-secondary hover:shadow-sm hover:-translate-y-px">Subscribe 🌿</button>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
