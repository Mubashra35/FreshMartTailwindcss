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
      if (role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    }, 1500);
  };

  const inputClass = "w-full font-body text-[0.95rem] px-3.5 py-2.5 border-[1.5px] border-border-muted rounded-md bg-bg-main text-text-primary transition-all duration-300 focus:outline-none focus:border-border-focus focus:bg-bg-card focus:shadow-[0_0_0_3px_rgba(46,125,50,0.12)]";
  const labelClass = "text-[0.88rem] font-medium text-text-secondary mb-1.5 block";
  const selectClass = "w-full font-body text-[0.95rem] px-3.5 py-2.5 border-[1.5px] border-border-muted rounded-md bg-bg-card text-text-primary transition-all duration-300 focus:outline-none focus:border-border-focus focus:shadow-[0_0_0_3px_rgba(46,125,50,0.12)] cursor-pointer appearance-none";

  return (
    <>
      <Navbar />

      <main className="flex-1 px-6 py-9 max-w-[1200px] w-full mx-auto">
        <section className="bg-bg-card border border-border-muted rounded-2xl p-9 max-w-[480px] w-full mx-auto shadow-md">

          <div className="flex flex-col items-center text-center mb-8">
            <h2 className="font-heading text-brand-primary text-[clamp(1.4rem,3vw,2rem)] font-semibold leading-[1.3] mb-2.5">🛒 Welcome Back!</h2>
            <p className="text-text-muted max-w-[520px] text-[0.97rem] leading-[1.7]">Login to your FreshMart account to continue shopping fresh.</p>
          </div>

          {alertMsg && (
            <div className={`p-3 rounded-md text-[0.92rem] mb-4 flex items-center gap-2.5 ${alertType === "success" ? "bg-[#E8F5E9] text-[#2E7D32] border-l-4 border-brand-primary" : "bg-[#FFEBEE] text-[#C62828] border-l-4 border-brand-accent"}`}>
              {alertMsg}
            </div>
          )}

          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label htmlFor="email" className={labelClass}>Email Address</label>
              <input
                type="email"
                id="email"
                className={inputClass}
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className={labelClass}>Password</label>
              <input
                type="password"
                id="password"
                className={inputClass}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="role" className={labelClass}>Login As</label>
              <div className="relative w-full">
                <select
                  id="role"
                  className={selectClass}
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">-- Select Role --</option>
                  <option value="customer">Customer</option>
                  <option value="admin">Admin / Manager</option>
                </select>
              </div>
            </div>

            <div className="mt-2">
              <button className="font-body text-[1.05rem] font-medium px-8 py-3.5 border-2 border-transparent rounded-md bg-brand-primary text-white cursor-pointer transition-all duration-300 w-full flex items-center justify-center gap-2 hover:bg-brand-secondary hover:shadow-sm hover:-translate-y-px" onClick={handleLogin}>
                Login to FreshMart
              </button>
            </div>

            <div className="text-center mt-2">
              <p className="text-[0.97rem] text-text-secondary">
                Don't have an account?{" "}
                <a href="/signup" className="bg-transparent border-none text-brand-primary font-medium p-0 cursor-pointer underline text-[0.95rem] hover:text-brand-secondary hover:no-underline">Sign Up here</a>
              </p>
            </div>
          </div>

        </section>
      </main>

      <Footer />
    </>
  );
}
