import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/page";
import Footer from "../../components/Footer/page";

const initialStock = [
  { id: 1, name: "Fresh Red Apples", category: "Fruits", price: "Rs. 120/kg", stock: "85 kg", status: "in-stock" },
  { id: 2, name: "Ripe Bananas", category: "Fruits", price: "Rs. 60/dozen", stock: "120 dozen", status: "in-stock" },
  { id: 3, name: "Sindhri Mangoes", category: "Fruits", price: "Rs. 350/kg", stock: "12 kg", status: "low-stock" },
  { id: 4, name: "Fresh Broccoli", category: "Vegetables", price: "Rs. 90/bunch", stock: "60 bunches", status: "in-stock" },
  { id: 5, name: "Fresh Tomatoes", category: "Vegetables", price: "Rs. 80/kg", stock: "0 kg", status: "out-stock" },
  { id: 6, name: "Baby Spinach", category: "Vegetables", price: "Rs. 50/bundle", stock: "45 bundles", status: "in-stock" },
  { id: 7, name: "Whole Milk 1L", category: "Dairy", price: "Rs. 180/L", stock: "200 L", status: "in-stock" },
  { id: 8, name: "Plain Yogurt 500g", category: "Dairy", price: "Rs. 140/500g", stock: "8 units", status: "low-stock" },
  { id: 9, name: "Cheddar Cheese 200g", category: "Dairy", price: "Rs. 420/200g", stock: "35 units", status: "in-stock" },
  { id: 10, name: "Sourdough Bread", category: "Bakery", price: "Rs. 220/loaf", stock: "25 loaves", status: "in-stock" },
  { id: 11, name: "Butter Croissant", category: "Bakery", price: "Rs. 180/pack", stock: "0 packs", status: "out-stock" },
  { id: 12, name: "Fresh Orange Juice", category: "Beverages", price: "Rs. 150/L", stock: "90 L", status: "in-stock" },
  { id: 13, name: "Organic Green Tea", category: "Beverages", price: "Rs. 320/50 bags", stock: "50 packs", status: "in-stock" },
  { id: 14, name: "Mixed Nuts 250g", category: "Snacks", price: "Rs. 480/250g", stock: "5 units", status: "low-stock" },
  { id: 15, name: "Granola Bar", category: "Snacks", price: "Rs. 95/bar", stock: "150 bars", status: "in-stock" },
  { id: 16, name: "Chicken Breast 1kg", category: "Meat", price: "Rs. 560/kg", stock: "40 kg", status: "in-stock" },
  { id: 17, name: "Frozen Green Peas", category: "Frozen", price: "Rs. 130/500g", stock: "70 units", status: "in-stock" },
];

const chartData = [
  { label: "Fruits", width: "72%" }, { label: "Vegetables", width: "55%" },
  { label: "Dairy", width: "85%" }, { label: "Bakery", width: "40%" },
  { label: "Beverages", width: "90%" }, { label: "Snacks", width: "60%" },
  { label: "Meat", width: "80%" }, { label: "Frozen", width: "70%" },
];

const recentOrders = [
  { id: "#FM-1024", items: "Apples, Milk, Bread", total: "Rs. 520", date: "05 May 2025", status: "Delivered", statusClass: "in-stock" },
  { id: "#FM-1023", items: "Mangoes, Yogurt", total: "Rs. 490", date: "02 May 2025", status: "Delivered", statusClass: "in-stock" },
  { id: "#FM-1022", items: "Chicken, Spinach", total: "Rs. 690", date: "28 Apr 2025", status: "Processing", statusClass: "low-stock" },
  { id: "#FM-1021", items: "Green Tea, Nuts", total: "Rs. 800", date: "25 Apr 2025", status: "Delivered", statusClass: "in-stock" },
  { id: "#FM-1020", items: "Cheese, Croissant", total: "Rs. 600", date: "20 Apr 2025", status: "Cancelled", statusClass: "out-stock" },
];

const statusBadge = (s: string) => {
  if (s === "in-stock") return "bg-[#E8F5E9] text-[#2E7D32]";
  if (s === "low-stock") return "bg-[#FFF8E1] text-[#F57F17]";
  return "bg-[#FFEBEE] text-[#C62828]";
};

const statusLabel = (s: string) => s === "in-stock" ? "In Stock" : s === "low-stock" ? "Low Stock" : "Out of Stock";

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  const [insName, setInsName] = useState(""); const [insCategory, setInsCategory] = useState("");
  const [insPrice, setInsPrice] = useState(""); const [insQty, setInsQty] = useState("");
  const [insDesc, setInsDesc] = useState("");
  const [updProduct, setUpdProduct] = useState(""); const [updPrice, setUpdPrice] = useState("");
  const [updQty, setUpdQty] = useState(""); const [updDesc, setUpdDesc] = useState("");
  const [delProduct, setDelProduct] = useState("");

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("freshmart-cart") || "[]");
    setCartCount(cart.reduce((sum: number, item: any) => sum + item.qty, 0));
  }, []);

  const showAlert = (message: string, type: string) => {
    const alertBox = document.createElement("div");
    alertBox.className = `fixed top-20 right-5 z-[9999] min-w-[220px] px-4 py-3 rounded-[6px] text-[0.92rem] shadow-[0_4px_16px_rgba(0,0,0,0.15)] ${type === "success" ? "bg-[#E8F5E9] text-[#2E7D32] border-l-4 border-[#2E7D32]" : "bg-[#FFEBEE] text-[#C62828] border-l-4 border-[#E53935]"}`;
    alertBox.textContent = message;
    document.body.appendChild(alertBox);
    setTimeout(() => alertBox.remove(), 3000);
  };

  const showSection = (id: string) => {
    setActiveSection(id);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  };

  const insertStock = () => {
    if (!insName || !insCategory || !insPrice || !insQty) { showAlert("⚠️ Please fill in all fields.", "error"); return; }
    showAlert(`✅ ${insName} added to inventory!`, "success");
    setInsName(""); setInsCategory(""); setInsPrice(""); setInsQty(""); setInsDesc("");
  };

  const updateStock = () => {
    if (!updProduct) { showAlert("⚠️ Please select a product.", "error"); return; }
    showAlert(`✅ ${updProduct} updated successfully!`, "success");
    setUpdProduct(""); setUpdPrice(""); setUpdQty(""); setUpdDesc("");
  };

  const confirmDelete = () => {
    if (!delProduct) { showAlert("⚠️ Please select a product to delete.", "error"); return; }
    showAlert(`🗑️ ${delProduct} deleted from inventory!`, "error");
    setDelProduct("");
  };

  const productNames = initialStock.map((p) => p.name);
  const inputClass = "w-full font-body text-[0.95rem] px-3.5 py-2.5 border-[1.5px] border-border-muted rounded-[6px] bg-bg-main text-text-primary transition-all duration-300 focus:outline-none focus:border-brand-primary focus:bg-bg-card focus:shadow-[0_0_0_3px_rgba(46,125,50,0.12)]";
  const selectClass = "w-full font-body text-[0.95rem] px-3.5 py-2.5 border-[1.5px] border-border-muted rounded-[6px] bg-bg-card text-text-primary transition-all duration-300 focus:outline-none focus:border-brand-primary focus:shadow-[0_0_0_3px_rgba(46,125,50,0.12)] cursor-pointer appearance-none";
  const labelClass = "text-[0.88rem] font-medium text-text-secondary mb-1.5";
  const sectionTitle = "flex flex-col items-center text-center mb-8";

  return (
    <>
      <Navbar />
      <main className="flex-1 px-6 py-9 max-w-[1200px] w-full mx-auto">

        <div className={sectionTitle}>
          <h2 className="font-heading text-[clamp(1.4rem,3vw,2rem)] font-semibold text-brand-primary leading-snug mb-2">📊 Dashboard</h2>
          <p className="text-text-muted max-w-[520px]">Manage your FreshMart inventory, orders, and store activity.</p>
        </div>

        {/* STAT CARDS */}
        <div className="flex flex-wrap justify-center gap-6 my-9 mx-3">
          {[
            { icon: "📦", val: "17", label: "Total Products" }, { icon: "✅", val: "13", label: "In Stock" },
            { icon: "⚠️", val: "3", label: "Low Stock" }, { icon: "❌", val: "2", label: "Out of Stock" },
            { icon: "🛒", val: String(cartCount), label: "Items in Cart" }, { icon: "📋", val: "12", label: "Total Orders" },
          ].map(({ icon, val, label }) => (
            <div key={label} className="flex flex-col gap-2 bg-bg-card border border-border-muted rounded-md p-6 min-w-[180px] shadow-sm transition-all duration-300 hover:shadow-md hover:border-border-secondary hover:-translate-y-0.5">
              <span className="text-[2rem] leading-none">{icon}</span>
              <h3 className="text-[1.6rem] font-bold text-brand-primary m-0">{val}</h3>
              <p className="text-[0.88rem] text-text-muted m-0">{label}</p>
            </div>
          ))}
        </div>

        {/* CRUD CARDS */}
        <div className={sectionTitle}>
          <h2 className="font-heading text-[clamp(1.4rem,3vw,2rem)] font-semibold text-brand-primary leading-snug mb-2">🗂️ Stock Management</h2>
          <p className="text-text-muted max-w-[520px]">Perform all stock operations from here.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 my-9 mx-3">
          {[
            { icon: "👁️", title: "View All Stock", desc: "Browse and review the complete product inventory.", id: "view-stock" },
            { icon: "➕", title: "Insert New Stock", desc: "Add a new product to the FreshMart inventory.", id: "insert-stock" },
            { icon: "✏️", title: "Update Stock", desc: "Edit existing product details, price, or quantity.", id: "update-stock" },
            { icon: "🗑️", title: "Delete Stock", desc: "Remove a product permanently from the inventory.", id: "delete-stock" },
          ].map(({ icon, title, desc, id }) => (
            <div key={id} onClick={() => showSection(id)} className="flex flex-col bg-bg-card border border-border-muted rounded-md p-5 w-[240px] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-border-secondary cursor-pointer">
              <span className="text-[2.2rem] leading-none mb-1">{icon}</span>
              <h3 className="font-body text-[1.15rem] font-semibold text-text-secondary mb-2">{title}</h3>
              <p className="text-[0.97rem] text-text-secondary leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* VIEW STOCK */}
        {activeSection === "view-stock" && (
          <div id="view-stock" className="mb-10">
            <div className={sectionTitle}>
              <h2 className="font-heading text-[clamp(1.4rem,3vw,2rem)] font-semibold text-brand-primary leading-snug mb-2">📋 All Stock</h2>
              <p className="text-text-muted max-w-[520px]">Complete inventory list of all FreshMart products.</p>
            </div>
            <div className="w-full overflow-x-auto mt-5">
              <table className="w-full border-collapse rounded-md overflow-hidden text-[0.93rem] bg-bg-card shadow-sm">
                <thead className="bg-table-headerBg">
                  <tr>{["#", "Product", "Category", "Price", "Stock", "Status"].map((h) => (
                    <th key={h} className="text-table-headerText font-semibold px-[18px] py-3.5 text-left text-[0.88rem] tracking-wide uppercase">{h}</th>
                  ))}</tr>
                </thead>
                <tbody>
                  {initialStock.map((item, i) => (
                    <tr key={item.id} className={`${i % 2 === 0 ? "bg-table-odd" : "bg-table-even"} hover:bg-table-hover cursor-pointer`}>
                      <td className="px-[18px] py-3 text-text-secondary border-b border-border-muted">{item.id}</td>
                      <td className="px-[18px] py-3 text-text-secondary border-b border-border-muted">{item.name}</td>
                      <td className="px-[18px] py-3 text-text-secondary border-b border-border-muted">{item.category}</td>
                      <td className="px-[18px] py-3 text-text-secondary border-b border-border-muted">{item.price}</td>
                      <td className="px-[18px] py-3 text-text-secondary border-b border-border-muted">{item.stock}</td>
                      <td className="px-[18px] py-3 border-b border-border-muted">
                        <span className={`inline-block px-3 py-1 rounded-full text-[0.78rem] font-semibold ${statusBadge(item.status)}`}>{statusLabel(item.status)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* INSERT STOCK */}
        {activeSection === "insert-stock" && (
          <div id="insert-stock" className="mb-10">
            <div className={sectionTitle}>
              <h2 className="font-heading text-[clamp(1.4rem,3vw,2rem)] font-semibold text-brand-primary leading-snug mb-2">➕ Insert New Stock</h2>
              <p className="text-text-muted max-w-[520px]">Fill in the details to add a new product to the inventory.</p>
            </div>
            <div className="bg-bg-card border border-border-muted rounded-lg p-9 max-w-[480px] w-full mx-auto shadow-md flex flex-col gap-4">
              <div className="flex flex-col"><label className={labelClass}>Product Name</label><input type="text" placeholder="e.g. Fresh Strawberries" value={insName} onChange={(e) => setInsName(e.target.value)} className={inputClass} /></div>
              <div className="flex flex-col">
                <label className={labelClass}>Category</label>
                <select value={insCategory} onChange={(e) => setInsCategory(e.target.value)} className={selectClass}>
                  <option value="">Select Category</option>
                  {["fruits", "vegetables", "dairy", "bakery", "beverages", "snacks", "meat", "frozen"].map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                </select>
              </div>
              <div className="flex flex-col"><label className={labelClass}>Price (Rs.)</label><input type="number" placeholder="e.g. 250" value={insPrice} onChange={(e) => setInsPrice(e.target.value)} className={inputClass} /></div>
              <div className="flex flex-col"><label className={labelClass}>Stock Quantity</label><input type="text" placeholder="e.g. 50 kg" value={insQty} onChange={(e) => setInsQty(e.target.value)} className={inputClass} /></div>
              <div className="flex flex-col"><label className={labelClass}>Description</label><textarea placeholder="Short product description..." value={insDesc} onChange={(e) => setInsDesc(e.target.value)} className={`${inputClass} resize-y min-h-[100px]`}></textarea></div>
              <button onClick={insertStock} className="font-body text-[0.95rem] font-medium px-5 py-2.5 border-2 border-transparent rounded-[6px] bg-brand-primary text-white cursor-pointer transition-all duration-300 hover:bg-brand-secondary hover:shadow-sm hover:-translate-y-px">➕ Add Product</button>
            </div>
          </div>
        )}

        {/* UPDATE STOCK */}
        {activeSection === "update-stock" && (
          <div id="update-stock" className="mb-10">
            <div className={sectionTitle}>
              <h2 className="font-heading text-[clamp(1.4rem,3vw,2rem)] font-semibold text-brand-primary leading-snug mb-2">✏️ Update Stock</h2>
              <p className="text-text-muted max-w-[520px]">Select a product and update its details.</p>
            </div>
            <div className="bg-bg-card border border-border-muted rounded-lg p-9 max-w-[480px] w-full mx-auto shadow-md flex flex-col gap-4">
              <div className="flex flex-col">
                <label className={labelClass}>Select Product</label>
                <select value={updProduct} onChange={(e) => setUpdProduct(e.target.value)} className={selectClass}>
                  <option value="">Select Product</option>
                  {productNames.map((name) => <option key={name}>{name}</option>)}
                </select>
              </div>
              <div className="flex flex-col"><label className={labelClass}>New Price (Rs.)</label><input type="number" placeholder="e.g. 200" value={updPrice} onChange={(e) => setUpdPrice(e.target.value)} className={inputClass} /></div>
              <div className="flex flex-col"><label className={labelClass}>New Stock Quantity</label><input type="text" placeholder="e.g. 100 kg" value={updQty} onChange={(e) => setUpdQty(e.target.value)} className={inputClass} /></div>
              <div className="flex flex-col"><label className={labelClass}>New Description</label><textarea placeholder="Updated description..." value={updDesc} onChange={(e) => setUpdDesc(e.target.value)} className={`${inputClass} resize-y min-h-[100px]`}></textarea></div>
              <button onClick={updateStock} className="font-body text-[0.95rem] font-medium px-5 py-2.5 border-2 border-transparent rounded-[6px] bg-brand-primary text-white cursor-pointer transition-all duration-300 hover:bg-brand-secondary hover:shadow-sm hover:-translate-y-px">✏️ Update Product</button>
            </div>
          </div>
        )}

        {/* DELETE STOCK */}
        {activeSection === "delete-stock" && (
          <div id="delete-stock" className="mb-10">
            <div className={sectionTitle}>
              <h2 className="font-heading text-[clamp(1.4rem,3vw,2rem)] font-semibold text-brand-primary leading-snug mb-2">🗑️ Delete Stock</h2>
              <p className="text-text-muted max-w-[520px]">Select a product to permanently remove from inventory.</p>
            </div>
            <div className="bg-bg-card border border-border-muted rounded-lg p-9 max-w-[480px] w-full mx-auto shadow-md flex flex-col gap-4">
              <div className="flex flex-col">
                <label className={labelClass}>Select Product to Delete</label>
                <select value={delProduct} onChange={(e) => setDelProduct(e.target.value)} className={selectClass}>
                  <option value="">Select Product</option>
                  {productNames.map((name) => <option key={name}>{name}</option>)}
                </select>
              </div>
              <button onClick={confirmDelete} className="font-body text-[0.95rem] font-medium px-5 py-2.5 border-2 border-brand-primary rounded-[6px] bg-transparent text-brand-primary cursor-pointer transition-all duration-300 hover:bg-brand-primary hover:text-white">🗑️ Delete Product</button>
            </div>
          </div>
        )}

        {/* CHART */}
        <div className={sectionTitle}>
          <h2 className="font-heading text-[clamp(1.4rem,3vw,2rem)] font-semibold text-brand-primary leading-snug mb-2">📈 Stock by Category</h2>
          <p className="text-text-muted max-w-[520px]">Visual overview of stock levels across all categories.</p>
        </div>
        <div className="bg-bg-card border border-border-muted rounded-md px-8 py-7 mb-10 shadow-sm flex flex-col gap-4">
          {chartData.map((item) => (
            <div key={item.label} className="flex items-center gap-4">
              <p className="min-w-[90px] text-[0.88rem] font-medium text-text-secondary m-0">{item.label}</p>
              <div className="flex-1 bg-border-muted rounded-full h-[22px] overflow-hidden">
                <div className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full flex items-center justify-end pr-2.5 text-[0.75rem] font-semibold text-white transition-[width_1s_ease]" style={{ width: item.width }}>
                  {item.width}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* QUICK LINKS */}
        <div className={sectionTitle}>
          <h2 className="font-heading text-[clamp(1.4rem,3vw,2rem)] font-semibold text-brand-primary leading-snug mb-2">⚡ Quick Links</h2>
          <p className="text-text-muted max-w-[520px]">Navigate to important sections quickly.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 my-9 mx-3">
          {[
            { icon: "🛍️", title: "All Products", desc: "Browse the full product listing page.", path: "/products" },
            { icon: "🛒", title: "View Cart", desc: "Check current cart and proceed to checkout.", path: "/cart" },
            { icon: "🍎", title: "Fruits", desc: "View all fruit products in inventory.", path: "/products?category=fruits" },
            { icon: "🥦", title: "Vegetables", desc: "View all vegetable products in inventory.", path: "/products?category=vegetables" },
            { icon: "🥛", title: "Dairy", desc: "View all dairy products in inventory.", path: "/products?category=dairy" },
            { icon: "🥩", title: "Meat", desc: "View all meat products in inventory.", path: "/products?category=meat" },
          ].map(({ icon, title, desc, path }) => (
            <div key={title} onClick={() => navigate(path)} className="flex flex-col bg-bg-card border border-border-muted rounded-md p-5 w-[240px] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-border-secondary cursor-pointer">
              <span className="text-[2.2rem] leading-none mb-1">{icon}</span>
              <h3 className="font-body text-[1.15rem] font-semibold text-text-secondary mb-2">{title}</h3>
              <p className="text-[0.97rem] text-text-secondary leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* RECENT ORDERS */}
        <div className={sectionTitle}>
          <h2 className="font-heading text-[clamp(1.4rem,3vw,2rem)] font-semibold text-brand-primary leading-snug mb-2">🕐 Recent Orders</h2>
          <p className="text-text-muted max-w-[520px]">Latest customer orders at FreshMart.</p>
        </div>
        <div className="w-full overflow-x-auto mt-5">
          <table className="w-full border-collapse rounded-md overflow-hidden text-[0.93rem] bg-bg-card shadow-sm">
            <thead className="bg-table-headerBg">
              <tr>{["Order #", "Items", "Total", "Date", "Status"].map((h) => (
                <th key={h} className="text-table-headerText font-semibold px-[18px] py-3.5 text-left text-[0.88rem] tracking-wide uppercase">{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {recentOrders.map((order, i) => (
                <tr key={order.id} className={`${i % 2 === 0 ? "bg-table-odd" : "bg-table-even"} hover:bg-table-hover cursor-pointer`}>
                  <td className="px-[18px] py-3 text-text-secondary border-b border-border-muted">{order.id}</td>
                  <td className="px-[18px] py-3 text-text-secondary border-b border-border-muted">{order.items}</td>
                  <td className="px-[18px] py-3 text-text-secondary border-b border-border-muted">{order.total}</td>
                  <td className="px-[18px] py-3 text-text-secondary border-b border-border-muted">{order.date}</td>
                  <td className="px-[18px] py-3 border-b border-border-muted">
                    <span className={`inline-block px-3 py-1 rounded-full text-[0.78rem] font-semibold ${statusBadge(order.statusClass)}`}>{order.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </main>
      <Footer />
    </>
  );
}
