import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/page";
import Footer from "../../components/Footer/page";

const DELIVERY_FEE = 99;

interface CartItem {
  name: string;
  price: number;
  image: string;
  qty: number;
}

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoInput, setPromoInput] = useState("");
  const [promoAlert, setPromoAlert] = useState("");
  const [promoAlertType, setPromoAlertType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("freshmart-cart") || "[]");
    setCart(stored);
  }, []);

  const saveCart = (updatedCart: CartItem[]) => {
    localStorage.setItem("freshmart-cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    window.dispatchEvent(new Event("cartUpdated"));
  };

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

  const changeQty = (index: number, delta: number) => {
    const updated = [...cart];
    updated[index].qty += delta;
    if (updated[index].qty <= 0) updated.splice(index, 1);
    saveCart(updated);
  };

  const removeItem = (index: number) => {
    const updated = [...cart];
    updated.splice(index, 1);
    saveCart(updated);
    showAlert("🗑️ Item removed from cart.", "error");
  };

  const clearCart = () => {
    saveCart([]);
    setPromoApplied(false);
    showAlert("🗑️ Cart cleared!", "error");
  };

  const applyPromo = () => {
    setPromoAlert("");
    if (promoApplied) {
      setPromoAlert("⚠️ Promo code already applied.");
      setPromoAlertType("error");
      return;
    }
    if (promoInput.trim().toUpperCase() === "FRESH20") {
      setPromoApplied(true);
      setPromoAlert("✅ Promo FRESH20 applied! 20% off.");
      setPromoAlertType("success");
    } else {
      setPromoAlert("❌ Invalid promo code. Try FRESH20.");
      setPromoAlertType("error");
    }
  };

  const checkout = () => {
    if (cart.length === 0) {
      showAlert("⚠️ Your cart is empty!", "error");
      return;
    }
    showAlert("✅ Order placed successfully! Thank you for shopping at FreshMart.", "success");
    setTimeout(() => {
      saveCart([]);
      setPromoApplied(false);
    }, 2000);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = promoApplied ? Math.round(subtotal * 0.2) : 0;
  const total = subtotal + DELIVERY_FEE - discount;

  return (
    <>
      <Navbar />
      <main className="flex-1 px-6 py-9 max-w-[1200px] w-full mx-auto">

        <div className="flex flex-col items-center text-center mb-8">
          <h2 className="text-2xl font-semibold text-[#1B1B1B] mb-1" style={{ fontFamily: "var(--font-heading)" }}>🛒 My Cart</h2>
          <p className="text-sm text-[#7A7A7A]">Review your items and proceed to checkout when ready.</p>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-12 px-6 text-[#7A7A7A]">
            <h3 className="text-lg font-semibold mb-2">🛒 Your cart is empty!</h3>
            <p className="text-sm mb-4">Looks like you haven't added anything yet. Start shopping now!</p>
            <button
              onClick={() => navigate("/products")}
              className="bg-[#2E7D32] text-white font-semibold py-3 px-8 rounded-xl border-none cursor-pointer hover:bg-[#66BB6A] hover:-translate-y-px transition-all"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="flex gap-8 items-start flex-wrap">

            {/* Cart Items */}
            <div className="flex-1 min-w-[280px]">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-row items-center gap-5 bg-white border border-[#D8EDD8] rounded-xl px-5 py-4 mb-3 hover:shadow-sm hover:border-[#66BB6A] transition-all w-full"
                >
                  <img src={item.image} alt={item.name} className="w-22 h-22 object-cover rounded flex-shrink-0" style={{ width: 88, height: 88 }} />
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-[#3A3A3A] mb-1">{item.name}</h3>
                    <p className="text-lg font-bold text-[#2E7D32] mb-2">Rs. {item.price}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <button
                        onClick={() => changeQty(index, -1)}
                        className="bg-[#2E7D32] text-white font-medium px-3 py-1 rounded border-none cursor-pointer hover:bg-[#66BB6A] transition-all"
                      >−</button>
                      <span className="text-sm font-medium">{item.qty}</span>
                      <button
                        onClick={() => changeQty(index, 1)}
                        className="bg-[#2E7D32] text-white font-medium px-3 py-1 rounded border-none cursor-pointer hover:bg-[#66BB6A] transition-all"
                      >+</button>
                    </div>
                    <p className="text-sm text-[#3A3A3A]">Item Total: <strong>Rs. {item.price * item.qty}</strong></p>
                  </div>
                  <button
                    onClick={() => removeItem(index)}
                    className="bg-transparent border-2 border-[#2E7D32] text-[#2E7D32] font-medium px-3 py-1 text-sm rounded cursor-pointer hover:bg-[#2E7D32] hover:text-white transition-all"
                  >
                    🗑️ Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white border border-[#D8EDD8] rounded-xl p-6 min-w-[260px] shadow-sm flex flex-col gap-4">
              <h2 className="text-xl font-semibold text-[#1B1B1B]" style={{ fontFamily: "var(--font-heading)" }}>Order Summary</h2>

              {[
                { label: "Subtotal", value: `Rs. ${subtotal}` },
                { label: "Delivery Fee", value: `Rs. ${DELIVERY_FEE}` },
                { label: "Discount", value: `− Rs. ${discount}` },
              ].map((row) => (
                <div key={row.label} className="flex justify-between items-center text-sm">
                  <p className="text-[#3A3A3A]">{row.label}</p>
                  <span className="text-[#3A3A3A]">{row.value}</span>
                </div>
              ))}

              <div className="flex justify-between items-center text-sm border-t border-[#D8EDD8] pt-3">
                <p className="font-bold text-[#1B1B1B]">Total</p>
                <span className="font-bold text-[#1B1B1B]">Rs. {total}</span>
              </div>

              <input
                type="text"
                placeholder="Enter promo code..."
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                className="w-full text-sm px-3 py-2 border-[1.5px] border-[#D8EDD8] rounded bg-[#F4FAF4] text-[#1B1B1B] outline-none focus:border-[#2E7D32] transition-all"
              />
              <button
                onClick={applyPromo}
                className="bg-transparent border-2 border-[#2E7D32] text-[#2E7D32] font-medium px-4 py-2 rounded cursor-pointer hover:bg-[#2E7D32] hover:text-white transition-all"
              >
                Apply Promo Code
              </button>

              {promoAlert && (
                <div className={`flex items-center gap-2 px-3 py-2 rounded text-sm border-l-4 ${
                  promoAlertType === "success"
                    ? "bg-[#E8F5E9] text-[#2E7D32] border-[#2E7D32]"
                    : "bg-[#FFEBEE] text-[#C62828] border-[#E53935]"
                }`}>
                  {promoAlert}
                </div>
              )}

              <button
                onClick={checkout}
                className="bg-[#2E7D32] text-white font-semibold py-3 px-8 rounded-xl border-none cursor-pointer hover:bg-[#66BB6A] hover:-translate-y-px transition-all"
              >
                Proceed to Checkout →
              </button>

              <button
                onClick={clearCart}
                className="bg-transparent border-2 border-[#2E7D32] text-[#2E7D32] font-medium px-4 py-2 rounded cursor-pointer hover:bg-[#2E7D32] hover:text-white transition-all"
              >
                🗑️ Clear Cart
              </button>

              <a href="/products" className="text-[#2E7D32] font-medium underline text-sm text-center hover:text-[#66BB6A] hover:no-underline transition-all">
                ← Continue Shopping
              </a>
            </div>

          </div>
        )}

      </main>
      <Footer />
    </>
  );
}