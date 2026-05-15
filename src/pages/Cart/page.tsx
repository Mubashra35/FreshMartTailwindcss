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
    alertBox.className = `fixed top-20 right-5 z-[9999] min-w-[220px] px-4 py-3 rounded-[6px] text-[0.92rem] shadow-[0_4px_16px_rgba(0,0,0,0.15)] flex items-center gap-2.5 ${type === "success" ? "bg-[#E8F5E9] text-[#2E7D32] border-l-4 border-brand-primary" : "bg-[#FFEBEE] text-[#C62828] border-l-4 border-brand-accent"}`;
    alertBox.textContent = message;
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

  const inputClass = "w-full font-body text-[0.95rem] px-3.5 py-2.5 border-[1.5px] border-border-muted rounded-md bg-bg-main text-text-primary transition-all duration-300 focus:outline-none focus:border-border-focus focus:bg-bg-card focus:shadow-[0_0_0_3px_rgba(46,125,50,0.12)]";
  const lgButton = "font-body text-[1.05rem] font-medium px-8 py-3.5 border-2 border-transparent rounded-md bg-brand-primary text-white cursor-pointer transition-all duration-300 inline-flex items-center justify-center gap-2 hover:bg-brand-secondary hover:shadow-sm hover:-translate-y-px w-full";
  const borderButton = "font-body text-[1.05rem] font-medium px-8 py-3.5 border-2 border-brand-primary rounded-md bg-transparent text-brand-primary cursor-pointer transition-all duration-300 hover:bg-brand-primary hover:text-white w-full text-center";
  const borderButtonSm = "font-body text-[0.88rem] font-medium px-4 py-2 border-2 border-brand-primary rounded-md bg-transparent text-brand-primary cursor-pointer transition-all duration-300 hover:bg-brand-primary hover:text-white flex-shrink-0";

  return (
    <>
      <Navbar />

      <main className="flex-1 px-6 py-9 max-w-[1200px] w-full mx-auto">
        <div className="flex flex-col items-center text-center mb-8">
          <h2 className="font-heading text-brand-primary text-[clamp(1.4rem,3vw,2rem)] font-semibold leading-[1.3] mb-2.5">🛒 My Cart</h2>
          <p className="text-text-muted max-w-[520px] text-[0.97rem] leading-[1.7]">Review your items and proceed to checkout when ready.</p>
        </div>

        {/* EMPTY CART */}
        {cart.length === 0 ? (
          <div className="text-center py-12 px-5 flex flex-col items-center gap-4">
            <h3 className="font-heading text-[1.4rem] font-bold text-brand-primary m-0">🛒 Your cart is empty!</h3>
            <p className="text-[0.97rem] text-text-secondary leading-[1.7] max-w-[400px]">Looks like you haven't added anything yet. Start shopping now!</p>
            <button className="font-body text-[1.05rem] font-medium px-8 py-3.5 border-2 border-transparent rounded-md bg-brand-primary text-white cursor-pointer transition-all duration-300 inline-flex items-center justify-center gap-2 hover:bg-brand-secondary hover:shadow-sm hover:-translate-y-px mt-4" onClick={() => navigate("/products")}>
              Browse Products
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 items-start w-full">

            {/* CART ITEMS */}
            <div className="flex-1 flex flex-col w-full">
              {cart.map((item, index) => (
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 bg-bg-card border border-border-muted rounded-md p-4 sm:p-5 mb-3 transition-all duration-300 w-full hover:shadow-sm hover:border-border-secondary" key={index}>
                  <img src={item.image} alt={item.name} className="w-[88px] h-[88px] object-cover rounded-sm shrink-0" />
                  <div className="flex-1 flex flex-col gap-2 w-full text-center sm:text-left">
                    <h3 className="font-body text-[1.15rem] font-semibold text-text-secondary m-0">{item.name}</h3>
                    <p className="text-brand-primary font-bold text-[1.1rem] m-0">Rs. {item.price}</p>
                    <div className="flex items-center justify-center sm:justify-start gap-3 mt-1 mb-2">
                      <button className="w-8 h-8 rounded-full border border-border-muted bg-bg-main text-text-primary flex items-center justify-center cursor-pointer hover:bg-border-muted" onClick={() => changeQty(index, -1)}>−</button>
                      <span className="font-medium min-w-[20px] text-center">{item.qty}</span>
                      <button className="w-8 h-8 rounded-full border border-border-muted bg-bg-main text-text-primary flex items-center justify-center cursor-pointer hover:bg-border-muted" onClick={() => changeQty(index, 1)}>+</button>
                    </div>
                    <p className="text-[0.9rem] text-text-secondary m-0">Item Total: <strong>Rs. {item.price * item.qty}</strong></p>
                  </div>
                  <button className={borderButtonSm} onClick={() => removeItem(index)}>
                    🗑️ Remove
                  </button>
                </div>
              ))}
            </div>

            {/* ORDER SUMMARY */}
            <div className="bg-bg-card border border-border-muted rounded-xl p-8 w-full lg:w-[380px] shadow-sm flex flex-col gap-5 lg:sticky lg:top-24 shrink-0">
              <h2 className="font-heading text-[1.4rem] font-semibold text-brand-primary m-0 border-b border-border-muted pb-4">Order Summary</h2>

              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center text-[0.95rem] text-text-secondary">
                  <p className="m-0">Subtotal</p>
                  <span className="font-medium">Rs. {subtotal}</span>
                </div>
                <div className="flex justify-between items-center text-[0.95rem] text-text-secondary">
                  <p className="m-0">Delivery Fee</p>
                  <span className="font-medium">Rs. {DELIVERY_FEE}</span>
                </div>
                <div className="flex justify-between items-center text-[0.95rem] text-text-secondary">
                  <p className="m-0">Discount</p>
                  <span className="font-medium text-brand-accent">− Rs. {discount}</span>
                </div>
                <div className="flex justify-between items-center text-[1.1rem] text-text-primary border-t border-border-muted pt-3 mt-1">
                  <p className="m-0 font-bold">Total</p>
                  <span className="font-bold text-brand-primary">Rs. {total}</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-2">
                <input
                  type="text"
                  placeholder="Enter promo code..."
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className={inputClass}
                />
                <button className={borderButton} onClick={applyPromo}>
                  Apply Promo Code
                </button>
              </div>

              {promoAlert && (
                <div className={`p-3 rounded-md text-[0.92rem] flex items-center gap-2.5 ${promoAlertType === "success" ? "bg-[#E8F5E9] text-[#2E7D32] border-l-4 border-brand-primary" : "bg-[#FFEBEE] text-[#C62828] border-l-4 border-brand-accent"}`}>
                  {promoAlert}
                </div>
              )}

              <div className="flex flex-col gap-3 mt-2">
                <button className={lgButton} onClick={checkout}>
                  Proceed to Checkout →
                </button>

                <button className={borderButton} onClick={clearCart}>
                  🗑️ Clear Cart
                </button>
              </div>

              <a href="/products" className="bg-transparent border-none text-brand-primary font-medium p-0 cursor-pointer underline text-[0.95rem] text-center w-full block hover:text-brand-secondary hover:no-underline mt-2">← Continue Shopping</a>
            </div>

          </div>
        )}

      </main>

      <Footer />
    </>
  );
}
