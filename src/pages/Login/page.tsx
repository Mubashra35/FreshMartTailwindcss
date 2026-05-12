import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/page";
import Footer from "../../components/Footer/page";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    setAlertMsg("");
    if (email.trim() === "" || password.trim() === "" || role === "") {
      setAlertMsg("⚠️ Please fill in all fields before logging in.");
      setAlertType("error");
      return;
    }
    setAlertMsg("✅ Login successful! Redirecting...");
    setAlertType("success");
    setTimeout(() => {
      if (role === "admin") navigate("/dashboard");
      else navigate("/");
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 px-6 py-9 max-w-[1200px] w-full mx-auto">

        <div className="bg-white border border-[#D8EDD8] rounded-2xl p-10 max-w-[480px] w-full mx-auto shadow-md">

          <div className="flex flex-col items-center text-center mb-6">
            <h2 className="text-2xl font-semibold text-[#1B1B1B] mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              🛒 Welcome Back!
            </h2>
            <p className="text-sm text-[#7A7A7A]">Login to your FreshMart account to continue shopping fresh.</p>
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
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-[#3A3A3A]">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-sm px-3 py-2 border-[1.5px] border-[#D8EDD8] rounded bg-[#F4FAF4] text-[#1B1B1B] outline-none focus:border-[#2E7D32] focus:bg-white focus:shadow-[0_0_0_3px_rgba(46,125,50,0.12)] transition-all"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-[#3A3A3A]">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-sm px-3 py-2 border-[1.5px] border-[#D8EDD8] rounded bg-[#F4FAF4] text-[#1B1B1B] outline-none focus:border-[#2E7D32] focus:bg-white focus:shadow-[0_0_0_3px_rgba(46,125,50,0.12)] transition-all"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-[#3A3A3A]">Login As</label>
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
              onClick={handleLogin}
              className="w-full bg-[#2E7D32] text-white font-semibold py-3 px-8 rounded-xl text-base border-none cursor-pointer hover:bg-[#66BB6A] hover:-translate-y-px transition-all"
            >
              Login to FreshMart
            </button>

            <p className="text-sm text-[#3A3A3A] text-center">
              Don't have an account?{" "}
              <a href="/signup" className="text-[#2E7D32] font-medium underline hover:text-[#66BB6A] hover:no-underline transition-all">
                Sign Up here
              </a>
            </p>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}