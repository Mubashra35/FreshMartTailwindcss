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

const selectClass = "text-sm px-3 py-2 border-[1.5px] border-[#D8EDD8] rounded bg-white text-[#1B1B1B] outline-none focus:border-[#2E7D32] cursor-pointer transition-all appearance-none";

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

  const resetFilters = () => {
    setSearch(""); setCategory("all"); setPriceFilter("all"); setSortFilter("default");
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

  return (
    <>
      <Navbar />
      <main className="flex-1 px-6 py-9 max-w-[1200px] w-full mx-auto">

        <div className="flex flex-col items-center text-center mb-8">
          <h2 className="text-2xl font-semibold text-[#1B1B1B] mb-1" style={{ fontFamily: "var(--font-heading)" }}>🛍️ All Products</h2>
          <p className="text-sm text-[#7A7A7A]">Browse our full range of fresh, organic, and locally sourced groceries.</p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-3 bg-white border border-[#D8EDD8] rounded-xl px-5 py-4 mb-7 shadow-sm">
          <input
            type="text"
            placeholder="🔍 Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-[200px] text-sm px-3 py-2 border-[1.5px] border-[#D8EDD8] rounded bg-[#F4FAF4] text-[#1B1B1B] outline-none focus:border-[#2E7D32] transition-all"
          />
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
          <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)} className={selectClass}>
            <option value="all">All Prices</option>
            <option value="0-100">Under Rs. 100</option>
            <option value="100-200">Rs. 100 – 200</option>
            <option value="200-400">Rs. 200 – 400</option>
            <option value="400-1000">Rs. 400+</option>
          </select>
          <select value={sortFilter} onChange={(e) => setSortFilter(e.target.value)} className={selectClass}>
            <option value="default">Sort By</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
          </select>
          <button
            onClick={resetFilters}
            className="bg-transparent border-2 border-[#2E7D32] text-[#2E7D32] font-medium px-3 py-1 text-sm rounded cursor-pointer hover:bg-[#2E7D32] hover:text-white transition-all"
          >
            Reset ✕
          </button>
        </div>

        {/* Product Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-12 px-6 text-[#7A7A7A] text-sm">
            No products found. Try a different search or filter.
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-6 my-9 mx-3">
            {filtered.map((p) => (
              <div
                key={p.slug}
                className="flex flex-col bg-white border border-[#D8EDD8] rounded-xl w-[220px] shadow-sm overflow-hidden hover:-translate-y-1 hover:shadow-md hover:border-[#66BB6A] transition-all"
              >
                <img src={p.image} alt={p.name} className="w-full h-[180px] object-cover" />
                <div className="flex flex-col gap-1 p-3 flex-1">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                    p.badge === "Sale" ? "bg-[#E53935] text-white" : "bg-[#A5D6A7] text-[#2E7D32]"
                  }`}>
                    {p.badge}
                  </span>
                  <h3 className="text-base font-semibold text-[#3A3A3A]">{p.name}</h3>
                  <p className="text-sm text-[#3A3A3A] leading-relaxed">{p.desc}</p>
                  <div>
                    <span className="text-lg font-bold text-[#2E7D32]">Rs. {p.price}</span>
                    {p.oldPrice && <span className="text-sm text-[#7A7A7A] line-through ml-1">Rs. {p.oldPrice}</span>}
                  </div>
                </div>
                <button
                  onClick={() => addToCart(p.name, p.price, p.image)}
                  className="bg-[#2E7D32] text-white font-medium px-4 py-2 border-none cursor-pointer hover:bg-[#66BB6A] hover:-translate-y-px transition-all mx-3 mb-3 rounded"
                >
                  Add to Cart 🛒
                </button>
              </div>
            ))}
          </div>
        )}

      </main>
      <Footer />
    </>
  );
}