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
  { label: "Fruits", width: "72%" },
  { label: "Vegetables", width: "55%" },
  { label: "Dairy", width: "85%" },
  { label: "Bakery", width: "40%" },
  { label: "Beverages", width: "90%" },
  { label: "Snacks", width: "60%" },
  { label: "Meat", width: "80%" },
  { label: "Frozen", width: "70%" },
];

const recentOrders = [
  { id: "#FM-1024", items: "Apples, Milk, Bread", total: "Rs. 520", date: "05 May 2025", status: "Delivered", statusClass: "in-stock" },
  { id: "#FM-1023", items: "Mangoes, Yogurt", total: "Rs. 490", date: "02 May 2025", status: "Delivered", statusClass: "in-stock" },
  { id: "#FM-1022", items: "Chicken, Spinach", total: "Rs. 690", date: "28 Apr 2025", status: "Processing", statusClass: "low-stock" },
  { id: "#FM-1021", items: "Green Tea, Nuts", total: "Rs. 800", date: "25 Apr 2025", status: "Delivered", statusClass: "in-stock" },
  { id: "#FM-1020", items: "Cheese, Croissant", total: "Rs. 600", date: "20 Apr 2025", status: "Cancelled", statusClass: "out-stock" },
];

const statusBadge = (status: string) => {
  if (status === "in-stock") return "bg-[#E8F5E9] text-[#2E7D32]";
  if (status === "low-stock") return "bg-[#FFF8E1] text-[#F57F17]";
  return "bg-[#FFEBEE] text-[#C62828]";
};

const statusLabel = (status: string) => {
  if (status === "in-stock") return "In Stock";
  if (status === "low-stock") return "Low Stock";
  return "Out of Stock";
};

const inputClass = "w-full text-sm px-3 py-2 border-[1.5px] border-[#D8EDD8] rounded bg-[#F4FAF4] text-[#1B1B1B] outline-none focus:border-[#2E7D32] focus:bg-white focus:shadow-[0_0_0_3px_rgba(46,125,50,0.12)] transition-all";
const selectClass = "w-full text-sm px-3 py-2 border-[1.5px] border-[#D8EDD8] rounded bg-white text-[#1B1B1B] outline-none focus:border-[#2E7D32] cursor-pointer transition-all";

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  const [insName, setInsName] = useState("");
  const [insCategory, setInsCategory] = useState("");
  const [insPrice, setInsPrice] = useState("");
  const [insQty, setInsQty] = useState("");
  const [insDesc, setInsDesc] = useState("");

  const [updProduct, setUpdProduct] = useState("");
  const [updPrice, setUpdPrice] = useState("");
  const [updQty, setUpdQty] = useState("");
  const [updDesc, setUpdDesc] = useState("");

  const [delProduct, setDelProduct] = useState("");

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("freshmart-cart") || "[]");
    const total = cart.reduce((sum: number, item: any) => sum + item.qty, 0);
    setCartCount(total);
  }, []);

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

  const showSection = (id: string) => {
    setActiveSection(id);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const insertStock = () => {
    if (!insName || !insCategory || !insPrice || !insQty) {
      showAlert("⚠️ Please fill in all fields.", "error"); return;
    }
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

  const SectionTitle = ({ title, subtitle }: { title: string; subtitle: string }) => (
    <div className="flex flex-col items-center text-center mb-8">
      <h2 className="text-2xl font-semibold text-[#2E7D32] mb-1" style={{ fontFamily: "var(--font-heading)" }}>{title}</h2>
      <p className="text-sm text-[#7A7A7A] max-w-lg">{subtitle}</p>
    </div>
  );

  return (
    <>
      <Navbar />
      <main className="flex-1 px-6 py-9 max-w-[1200px] w-full mx-auto">

        <SectionTitle title="📊 Dashboard" subtitle="Manage your FreshMart inventory, orders, and store activity." />

        {/* Stat Cards */}
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {[
            { icon: "📦", value: "17", label: "Total Products" },
            { icon: "✅", value: "13", label: "In Stock" },
            { icon: "⚠️", value: "3", label: "Low Stock" },
            { icon: "❌", value: "2", label: "Out of Stock" },
            { icon: "🛒", value: String(cartCount), label: "Items in Cart" },
            { icon: "📋", value: "12", label: "Total Orders" },
          ].map((card) => (
            <div key={card.label} className="flex flex-col gap-2 bg-white border border-[#D8EDD8] rounded-xl p-6 min-w-[180px] shadow-sm hover:shadow-md hover:border-[#66BB6A] hover:-translate-y-0.5 transition-all">
              <span className="text-4xl leading-none">{card.icon}</span>
              <h3 className="text-3xl font-bold text-[#2E7D32]">{card.value}</h3>
              <p className="text-sm text-[#7A7A7A]">{card.label}</p>
            </div>
          ))}
        </div>

        <SectionTitle title="🗂️ Stock Management" subtitle="Perform all stock operations from here." />

        {/* CRUD Cards */}
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {[
            { icon: "👁️", title: "View All Stock", desc: "Browse and review the complete product inventory.", id: "view-stock" },
            { icon: "➕", title: "Insert New Stock", desc: "Add a new product to the FreshMart inventory.", id: "insert-stock" },
            { icon: "✏️", title: "Update Stock", desc: "Edit existing product details, price, or quantity.", id: "update-stock" },
            { icon: "🗑️", title: "Delete Stock", desc: "Remove a product permanently from the inventory.", id: "delete-stock" },
          ].map((card) => (
            <div
              key={card.id}
              onClick={() => showSection(card.id)}
              className="flex flex-col bg-white border border-[#D8EDD8] rounded-xl p-5 w-[240px] shadow-sm cursor-pointer hover:-translate-y-1 hover:shadow-md hover:border-[#66BB6A] transition-all"
            >
              <span className="text-4xl leading-none mb-1">{card.icon}</span>
              <h3 className="text-base font-semibold text-[#3A3A3A] mb-1">{card.title}</h3>
              <p className="text-sm text-[#3A3A3A]">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* View Stock */}
        {activeSection === "view-stock" && (
          <div id="view-stock" className="mb-10">
            <SectionTitle title="📋 All Stock" subtitle="Complete inventory list of all FreshMart products." />
            <div className="w-full overflow-x-auto mt-5">
              <table className="w-full border-collapse rounded-xl overflow-hidden text-sm bg-white shadow-sm">
                <thead className="bg-[#2E7D32]">
                  <tr>
                    {["#", "Product", "Category", "Price", "Stock", "Status"].map((h) => (
                      <th key={h} className="text-white font-semibold px-4 py-3 text-left text-xs uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {initialStock.map((item, i) => (
                    <tr key={item.id} className={`${i % 2 === 0 ? "bg-[#F0F7F0]" : "bg-white"} hover:bg-[#C8E6C9] cursor-pointer transition-colors`}>
                      <td className="px-4 py-3 text-[#3A3A3A]">{item.id}</td>
                      <td className="px-4 py-3 text-[#3A3A3A]">{item.name}</td>
                      <td className="px-4 py-3 text-[#3A3A3A]">{item.category}</td>
                      <td className="px-4 py-3 text-[#3A3A3A]">{item.price}</td>
                      <td className="px-4 py-3 text-[#3A3A3A]">{item.stock}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusBadge(item.status)}`}>
                          {statusLabel(item.status)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Insert Stock */}
        {activeSection === "insert-stock" && (
          <div id="insert-stock" className="mb-10">
            <SectionTitle title="➕ Insert New Stock" subtitle="Fill in the details to add a new product to the inventory." />
            <div className="bg-white border border-[#D8EDD8] rounded-2xl p-10 max-w-[480px] w-full mx-auto shadow-md flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-[#3A3A3A]">Product Name</label>
                <input type="text" placeholder="e.g. Fresh Strawberries" value={insName} onChange={(e) => setInsName(e.target.value)} className={inputClass} />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-[#3A3A3A]">Category</label>
                <select value={insCategory} onChange={(e) => setInsCategory(e.target.value)} className={selectClass}>
                  <option value="">Select Category</option>
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
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-[#3A3A3A]">Price (Rs.)</label>
                <input type="number" placeholder="e.g. 250" value={insPrice} onChange={(e) => setInsPrice(e.target.value)} className={inputClass} />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-[#3A3A3A]">Stock Quantity</label>
                <input type="text" placeholder="e.g. 50 kg" value={insQty} onChange={(e) => setInsQty(e.target.value)} className={inputClass} />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-[#3A3A3A]">Description</label>
                <textarea placeholder="Short product description..." value={insDesc} onChange={(e) => setInsDesc(e.target.value)}
                  className="w-full text-sm px-3 py-2 border-[1.5px] border-[#D8EDD8] rounded bg-[#F4FAF4] text-[#1B1B1B] outline-none focus:border-[#2E7D32] focus:bg-white resize-y min-h-[100px] transition-all">
                </textarea>
              </div>
              <button onClick={insertStock} className="bg-[#2E7D32] text-white font-semibold py-2 px-6 rounded border-none cursor-pointer hover:bg-[#66BB6A] transition-all">
                ➕ Add Product
              </button>
            </div>
          </div>
        )}

        {/* Update Stock */}
        {activeSection === "update-stock" && (
          <div id="update-stock" className="mb-10">
            <SectionTitle title="✏️ Update Stock" subtitle="Select a product and update its details." />
            <div className="bg-white border border-[#D8EDD8] rounded-2xl p-10 max-w-[480px] w-full mx-auto shadow-md flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-[#3A3A3A]">Select Product</label>
                <select value={updProduct} onChange={(e) => setUpdProduct(e.target.value)} className={selectClass}>
                  <option value="">Select Product</option>
                  {productNames.map((name) => <option key={name}>{name}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-[#3A3A3A]">New Price (Rs.)</label>
                <input type="number" placeholder="e.g. 200" value={updPrice} onChange={(e) => setUpdPrice(e.target.value)} className={inputClass} />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-[#3A3A3A]">New Stock Quantity</label>
                <input type="text" placeholder="e.g. 100 kg" value={updQty} onChange={(e) => setUpdQty(e.target.value)} className={inputClass} />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-[#3A3A3A]">New Description</label>
                <textarea placeholder="Updated description..." value={updDesc} onChange={(e) => setUpdDesc(e.target.value)}
                  className="w-full text-sm px-3 py-2 border-[1.5px] border-[#D8EDD8] rounded bg-[#F4FAF4] text-[#1B1B1B] outline-none focus:border-[#2E7D32] focus:bg-white resize-y min-h-[100px] transition-all">
                </textarea>
              </div>
              <button onClick={updateStock} className="bg-[#2E7D32] text-white font-semibold py-2 px-6 rounded border-none cursor-pointer hover:bg-[#66BB6A] transition-all">
                ✏️ Update Product
              </button>
            </div>
          </div>
        )}

        {/* Delete Stock */}
        {activeSection === "delete-stock" && (
          <div id="delete-stock" className="mb-10">
            <SectionTitle title="🗑️ Delete Stock" subtitle="Select a product to permanently remove from inventory." />
            <div className="bg-white border border-[#D8EDD8] rounded-2xl p-10 max-w-[480px] w-full mx-auto shadow-md flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-[#3A3A3A]">Select Product to Delete</label>
                <select value={delProduct} onChange={(e) => setDelProduct(e.target.value)} className={selectClass}>
                  <option value="">Select Product</option>
                  {productNames.map((name) => <option key={name}>{name}</option>)}
                </select>
              </div>
              <button onClick={confirmDelete} className="bg-transparent border-2 border-[#2E7D32] text-[#2E7D32] font-semibold py-2 px-6 rounded cursor-pointer hover:bg-[#2E7D32] hover:text-white transition-all">
                🗑️ Delete Product
              </button>
            </div>
          </div>
        )}

        {/* Chart */}
        <SectionTitle title="📈 Stock by Category" subtitle="Visual overview of stock levels across all categories." />
        <div className="bg-white border border-[#D8EDD8] rounded-xl px-8 py-7 mb-10 shadow-sm flex flex-col gap-4">
          {chartData.map((item) => (
            <div key={item.label} className="flex items-center gap-4">
              <p className="min-w-[90px] text-sm font-medium text-[#3A3A3A]">{item.label}</p>
              <div className="flex-1 bg-[#D8EDD8] rounded-full h-[22px] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#2E7D32] to-[#66BB6A] rounded-full flex items-center justify-end pr-3 text-white text-xs font-semibold"
                  style={{ width: item.width }}
                >
                  {item.width}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <SectionTitle title="⚡ Quick Links" subtitle="Navigate to important sections quickly." />
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {[
            { icon: "🛍️", title: "All Products", desc: "Browse the full product listing page.", path: "/products" },
            { icon: "🛒", title: "View Cart", desc: "Check current cart and proceed to checkout.", path: "/cart" },
            { icon: "🍎", title: "Fruits", desc: "View all fruit products in inventory.", path: "/products?category=fruits" },
            { icon: "🥦", title: "Vegetables", desc: "View all vegetable products in inventory.", path: "/products?category=vegetables" },
            { icon: "🥛", title: "Dairy", desc: "View all dairy products in inventory.", path: "/products?category=dairy" },
            { icon: "🥩", title: "Meat", desc: "View all meat products in inventory.", path: "/products?category=meat" },
          ].map((card) => (
            <div
              key={card.title}
              onClick={() => navigate(card.path)}
              className="flex flex-col bg-white border border-[#D8EDD8] rounded-xl p-5 w-[240px] shadow-sm cursor-pointer hover:-translate-y-1 hover:shadow-md hover:border-[#66BB6A] transition-all"
            >
              <span className="text-4xl leading-none mb-1">{card.icon}</span>
              <h3 className="text-base font-semibold text-[#3A3A3A] mb-1">{card.title}</h3>
              <p className="text-sm text-[#3A3A3A]">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <SectionTitle title="🕐 Recent Orders" subtitle="Latest customer orders at FreshMart." />
        <div className="w-full overflow-x-auto mt-5">
          <table className="w-full border-collapse rounded-xl overflow-hidden text-sm bg-white shadow-sm">
            <thead className="bg-[#2E7D32]">
              <tr>
                {["Order #", "Items", "Total", "Date", "Status"].map((h) => (
                  <th key={h} className="text-white font-semibold px-4 py-3 text-left text-xs uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, i) => (
                <tr key={order.id} className={`${i % 2 === 0 ? "bg-[#F0F7F0]" : "bg-white"} hover:bg-[#C8E6C9] cursor-pointer transition-colors`}>
                  <td className="px-4 py-3 text-[#3A3A3A]">{order.id}</td>
                  <td className="px-4 py-3 text-[#3A3A3A]">{order.items}</td>
                  <td className="px-4 py-3 text-[#3A3A3A]">{order.total}</td>
                  <td className="px-4 py-3 text-[#3A3A3A]">{order.date}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusBadge(order.statusClass)}`}>
                      {order.status}
                    </span>
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