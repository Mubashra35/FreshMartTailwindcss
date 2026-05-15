import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../../components/Navbar/page";
import Footer from "../../components/Footer/page";

const allProducts = [
  { name: "Fresh Red Apples", slug: "red apple", price: 120, category: "fruits", badge: "Organic", image: "/images/apples.jpeg", desc: "Crisp, sweet, and farm-fresh apples from local orchards.", oldPrice: 160 },
  { name: "Ripe Bananas", slug: "bananas", price: 60, category: "fruits", badge: "Fresh", image: "/images/bananas.jpg", desc: "Sweet, ripe bananas — perfect for breakfast or snacking.", oldPrice: null },
  { name: "Sindhri Mangoes", slug: "mangoes", price: 350, category: "fruits", badge: "Sale", image: "/images/mangoes.jpg", desc: "Premium Pakistani Sindhri mangoes — sweet, juicy, and aromatic.", oldPrice: 450 },
  { name: "Fresh Broccoli", slug: "broccoli", price: 90, category: "vegetables", badge: "Fresh", image: "/images/broccoli.jpg", desc: "Nutrient-packed broccoli, harvested fresh every morning.", oldPrice: 120 },
  { name: "Fresh Tomatoes", slug: "tomatoes", price: 80, category: "vegetables", badge: "Organic", image: "/images/tomatoes.jpg", desc: "Vine-ripened tomatoes, rich in flavor and nutrients.", oldPrice: null },
  { name: "Baby Spinach", slug: "spinach", price: 50, category: "vegetables", badge: "Fresh", image: "/images/spinach.jpeg", desc: "Tender baby spinach leaves, washed and ready to eat.", oldPrice: null },
  { name: "Whole Milk 1L", slug: "whole milk", price: 180, category: "dairy", badge: "Dairy", image: "/images/milk.jpg", desc: "Pure, full-cream milk from grass-fed cows. No preservatives.", oldPrice: null },
  { name: "Plain Yogurt 500g", slug: "yogurt", price: 140, category: "dairy", badge: "Dairy", image: "/images/yogurt.jpg", desc: "Creamy, thick yogurt made from fresh farm milk daily.", oldPrice: 170 },
  { name: "Cheddar Cheese 200g", slug: "cheese", price: 420, category: "dairy", badge: "Premium", image: "/images/cheese.jpg", desc: "Aged cheddar with rich, sharp flavor — perfect for cooking.", oldPrice: null },
  { name: "Sourdough Bread", slug: "sourdough bread", price: 220, category: "bakery", badge: "Bakery", image: "/images/sourdough.jpg", desc: "Freshly baked sourdough, crusty outside and soft inside.", oldPrice: 260 },
  { name: "Butter Croissant", slug: "croissant", price: 180, category: "bakery", badge: "Bakery", image: "/images/croissant.jpg", desc: "Flaky, buttery croissants baked fresh every morning.", oldPrice: null },
  { name: "Fresh Orange Juice", slug: "orange juice", price: 150, category: "beverages", badge: "Sale", image: "/images/orrange.jpg", desc: "100% natural squeezed orange juice. No added sugar.", oldPrice: 200 },
  { name: "Organic Green Tea", slug: "green tea", price: 320, category: "beverages", badge: "Organic", image: "/images/tea.jpg", desc: "Premium organic green tea — refreshing and full of antioxidants.", oldPrice: null },
  { name: "Mixed Nuts 250g", slug: "mixed nuts", price: 480, category: "snacks", badge: "Premium", image: "/images/snacks.jpg", desc: "Premium blend of almonds, cashews, walnuts, and pistachios.", oldPrice: null },
  { name: "Granola Bar", slug: "granola bar", price: 95, category: "snacks", badge: "Healthy", image: "/images/granola.jpg", desc: "Wholesome oat granola bar with honey and dried fruits.", oldPrice: 120 },
  { name: "Chicken Breast 1kg", slug: "chicken breast", price: 560, category: "meat", badge: "Fresh", image: "/images/chicken.jpg", desc: "Fresh, boneless chicken breast — halal certified.", oldPrice: null },
  { name: "Frozen Green Peas", slug: "frozen peas", price: 130, category: "frozen", badge: "Frozen", image: "/images/peas.jpg", desc: "Sweet, tender green peas — flash frozen to lock in freshness.", oldPrice: null },
];

export default function Products() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortFilter, setSortFilter] = useState("default");

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setCategory(cat);
  }, [searchParams]);

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

  const resetFilters = () => {
    setSearch("");
    setCategory("all");
    setPriceFilter("all");
    setSortFilter("default");
  };

  let filtered = allProducts.filter((p) => {
    const matchSearch = p.slug.includes(search.toLowerCase()) || p.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "all" || p.category === category;
    let matchPrice = true;
    if (priceFilter === "0-100") matchPrice = p.price < 100;
    else if (priceFilter === "100-200") matchPrice = p.price >= 100 && p.price <= 200;
    else if (priceFilter === "200-400") matchPrice = p.price > 200 && p.price <= 400;
    else if (priceFilter === "400-1000") matchPrice = p.price > 400;
    return matchSearch && matchCategory && matchPrice;
  });

  if (sortFilter === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sortFilter === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sortFilter === "name-asc") filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

  const inputClass = "flex-1 min-w-[200px] font-body text-[0.95rem] px-3.5 py-2.5 border-[1.5px] border-border-muted rounded-md bg-bg-main text-text-primary transition-all duration-300 focus:outline-none focus:border-border-focus focus:bg-bg-card focus:shadow-[0_0_0_3px_rgba(46,125,50,0.12)]";
  const selectClass = "w-full font-body text-[0.95rem] px-3.5 py-2.5 border-[1.5px] border-border-muted rounded-md bg-bg-card text-text-primary transition-all duration-300 focus:outline-none focus:border-border-focus focus:shadow-[0_0_0_3px_rgba(46,125,50,0.12)] cursor-pointer appearance-none";

  return (
    <>
      <Navbar />

      <main className="flex-1 px-6 py-9 max-w-[1200px] w-full mx-auto">
        <div className="flex flex-col items-center text-center mb-8">
          <h2 className="font-heading text-brand-primary text-[clamp(1.4rem,3vw,2rem)] font-semibold leading-[1.3] mb-2.5">🛍️ All Products</h2>
          <p className="text-text-muted max-w-[520px] text-[0.97rem] leading-[1.7]">Browse our full range of fresh, organic, and locally sourced groceries.</p>
        </div>

        {/* FILTER BAR */}
        <div className="flex flex-wrap items-center gap-3 bg-bg-card border border-border-muted rounded-md p-4 mb-7 shadow-sm">
          <input
            type="text"
            placeholder="🔍 Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={inputClass}
          />

          <div className="relative flex-1 min-w-[160px]">
            <select value={category} onChange={(e) => setCategory(e.target.value)} className={selectClass}>
              <option value="all">All Categories</option>
              <option value="fruits">🍎 Fruits</option>
              <option value="vegetables">🥦 Vegetables</option>
              <option value="dairy">🥛 Dairy</option>
              <option value="bakery">🍞 Bakery</option>
              <option value="beverages">🧃 Beverages</option>
              <option value="snacks">🍿 Snacks</option>
              <option value="meat">🥩 Meat</option>
              <option value="frozen">🧊 Frozen</option>
            </select>
          </div>

          <div className="relative flex-1 min-w-[160px]">
            <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)} className={selectClass}>
              <option value="all">All Prices</option>
              <option value="0-100">Under Rs. 100</option>
              <option value="100-200">Rs. 100 – 200</option>
              <option value="200-400">Rs. 200 – 400</option>
              <option value="400-1000">Rs. 400+</option>
            </select>
          </div>

          <div className="relative flex-1 min-w-[160px]">
            <select value={sortFilter} onChange={(e) => setSortFilter(e.target.value)} className={selectClass}>
              <option value="default">Sort By</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
            </select>
          </div>

          <button className="font-body text-[0.88rem] font-medium px-4 py-2 border-2 border-brand-primary rounded-md bg-transparent text-brand-primary cursor-pointer transition-all duration-300 hover:bg-brand-primary hover:text-white" onClick={resetFilters}>Reset ✕</button>
        </div>

        {/* PRODUCT GRID */}
        {filtered.length === 0 ? (
          <div className="text-center py-12 px-5 flex flex-col items-center gap-4">
            <p className="text-[0.97rem] text-text-secondary leading-[1.7] max-w-[400px]">No products found. Try a different search or filter.</p>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-6 my-9 mx-3">
            {filtered.map((p) => (
              <div className="flex flex-col bg-bg-card border border-border-muted rounded-md w-[220px] shadow-sm transition-all duration-300 overflow-hidden hover:-translate-y-1 hover:shadow-md hover:border-border-secondary" key={p.slug}>
                <img src={p.image} alt={p.name} className="w-full h-[180px] object-cover" />
                <div className="flex flex-col gap-1.5 p-3.5 flex-1">
                  <span className={`inline-block px-2.5 py-1 rounded-full text-[0.78rem] font-semibold w-fit ${p.badge === "Sale" ? "bg-brand-accent text-white" : "bg-brand-third text-brand-primary"}`}>{p.badge}</span>
                  <h3 className="font-body text-[1.15rem] font-semibold text-text-secondary m-0">{p.name}</h3>
                  <p className="text-[0.97rem] text-text-secondary leading-[1.7] m-0 mb-1 flex-1">{p.desc}</p>
                  <div className="mt-auto">
                    <span className="text-brand-primary font-bold text-[1.1rem]">Rs. {p.price}</span>
                    {p.oldPrice && <span className="text-text-muted text-[0.85rem] line-through ml-2"> Rs. {p.oldPrice}</span>}
                  </div>
                </div>
                <button className="font-body text-[0.95rem] font-medium px-[22px] py-2.5 border-2 border-transparent bg-brand-primary text-white cursor-pointer transition-all duration-300 inline-flex items-center justify-center gap-2 hover:bg-brand-secondary hover:shadow-sm hover:-translate-y-px mt-auto rounded-none" onClick={() => addToCart(p.name, p.price, p.image)}>Add to Cart 🛒</button>
              </div>
            ))}
          </div>
        )}

      </main>

      <Footer />
    </>
  );
}
