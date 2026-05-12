import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/page";
import Footer from "../../components/Footer/page";

export default function Signup() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    setAlertMsg("");
    if (!fullname.trim() || !email.trim() || !phone.trim() || !address.trim() || !password.trim() || !confirmPassword.trim() || role === "") {
      setAlertMsg("⚠️ Please fill in all fields before signing up.");
      setAlertType("error");
      return;
    }
    if (password !== confirmPassword) {
      setAlertMsg("⚠️ Passwords do not match. Please try again.");
      setAlertType("error");
      return;
    }
    if (password.length < 6) {
      setAlertMsg("⚠️ Password must be at least 6 characters long.");
      setAlertType("error");
      return;
    }
    setAlertMsg("✅ Account created successfully! Redirecting to login...");
    setAlertType("success");
    setTimeout(() => navigate("/login"), 1500);
  };

  const inputClass = "w-full text-sm px-3 py-2 border-[1.5px] border-[#D8EDD8] rounded bg-[#F4FAF4] text-[#1B1B1B] outline-none focus:border-[#2E7D32] focus:bg-white focus:shadow-[0_0_0_3px_rgba(46,125,50,0.12)] transition-all";

  return (
    <>
      <Navbar />
      <main className="flex-1 px-6 py-9 max-w-[1200px] w-full mx-auto">

        <div className="bg-white border border-[#D8EDD8] rounded-2xl p-10 max-w-[480px] w-full mx-auto shadow-md">

          <div className="flex flex-col items-center text-center mb-6">
            <h2 className="text-2xl font-semibold text-[#1B1B1B] mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              🌿 Create Account
            </h2>
            <p className="text-sm text-[#7A7A7A]">Join FreshMart today and enjoy fresh groceries delivered to your door.</p>
          </div>

          {alertMsg && (
            <div className={`flex items-center gap-2 px-4 py-3 rounded text-sm mb-4 border-l-4 ${
              alertType === "success"
                ? "bg-[#E8F5E9] text-[#2E7D32] border-[#2E7D32]"
                : "bg-[#FFEBEE] text-[#C62828] border-[#E53935]"
            }`}>
              {alertMsg}
            </div>
          )}

          <div className="flex flex-col gap-4">
            {[
              { label: "Full Name", id: "fullname", type: "text", placeholder: "Enter your full name", value: fullname, setter: setFullname },
              { label: "Email Address", id: "email", type: "email", placeholder: "you@example.com", value: email, setter: setEmail },
              { label: "Phone Number", id: "phone", type: "tel", placeholder: "+92 300 1234567", value: phone, setter: setPhone },
              { label: "Delivery Address", id: "address", type: "text", placeholder: "Enter your delivery address", value: address, setter: setAddress },
              { label: "Password", id: "password", type: "password", placeholder: "Create a strong password", value: password, setter: setPassword },
              { label: "Confirm Password", id: "confirm-password", type: "password", placeholder: "Re-enter your password", value: confirmPassword, setter: setConfirmPassword },
            ].map((field) => (
              <div key={field.id} className="flex flex-col gap-1">
                <label className="text-xs font-medium text-[#3A3A3A]">{field.label}</label>
                <input
                  type={field.type}
                  id={field.id}
                  placeholder={field.placeholder}
                  value={field.value}
                  onChange={(e) => field.setter(e.target.value)}
                  className={inputClass}
                />
              </div>
            ))}

            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-[#3A3A3A]">Register As</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full text-sm px-3 py-2 border-[1.5px] border-[#D8EDD8] rounded bg-white text-[#1B1B1B] outline-none focus:border-[#2E7D32] cursor-pointer transition-all"
              >
                <option value="">-- Select Role --</option>
                <option value="customer">Customer</option>
                <option value="admin">Admin / Manager</option>
              </select>
            </div>

            <button
              onClick={handleSignup}
              className="w-full bg-[#2E7D32] text-white font-semibold py-3 px-8 rounded-xl text-base border-none cursor-pointer hover:bg-[#66BB6A] hover:-translate-y-px transition-all"
            >
              Create My Account
            </button>

            <p className="text-sm text-[#3A3A3A] text-center">
              Already have an account?{" "}
              <a href="/login" className="text-[#2E7D32] font-medium underline hover:text-[#66BB6A] hover:no-underline transition-all">
                Login here
              </a>
            </p>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}