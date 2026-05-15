import { useState, useRef, useEffect } from "react";
import Navbar from "../../components/Navbar/page";
import Footer from "../../components/Footer/page";

export default function Profile() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: ""
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileUrl = URL.createObjectURL(e.target.files[0]);
      setAvatar(fileUrl);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic Validation
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setToast({ message: "First and Last name are required.", type: "error" });
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setToast({ message: "Please enter a valid email address.", type: "error" });
      return;
    }

    if (formData.phone.trim().length < 10) {
      setToast({ message: "Please enter a valid phone number.", type: "error" });
      return;
    }

    // Simulate API Call
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setToast({ message: "Profile updated successfully!", type: "success" });
    }, 1000);
  };

  const sectionTitle = "flex flex-col items-center text-center mb-8 mt-4";
  const sectionTitleH2 = "font-heading text-brand-primary text-[clamp(1.4rem,3vw,2rem)] font-semibold leading-[1.3] mb-2.5";
  const sectionTitleP = "text-text-muted max-w-[520px] text-[0.97rem] leading-[1.7]";

  const inputClass = "w-full font-body text-[0.95rem] px-3.5 py-2.5 border-[1.5px] border-border-muted rounded-[6px] bg-bg-main text-text-primary transition-all duration-300 focus:outline-none focus:border-border-focus focus:bg-bg-card focus:shadow-[0_0_0_3px_rgba(46,125,50,0.12)] disabled:opacity-50 disabled:cursor-not-allowed";
  const labelClass = "text-[0.88rem] font-medium text-text-secondary mb-1.5 block";
  
  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 px-6 py-9 max-w-[1200px] w-full mx-auto relative">
        
        {/* Toast Notification */}
        {toast && (
          <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-[1001] px-6 py-3 rounded-md shadow-lg font-medium transition-all duration-300 animate-fade-in ${
            toast.type === "success" ? "bg-green-100 text-green-800 border border-green-200" : "bg-red-100 text-red-800 border border-red-200"
          }`}>
            {toast.message}
          </div>
        )}

        <div className={sectionTitle}>
          <h2 className={sectionTitleH2}>Your Profile</h2>
          <p className={sectionTitleP}>Manage your account settings and preferences.</p>
        </div>

        <div className="bg-bg-card border border-border-muted rounded-[20px] p-9 max-w-[600px] w-full mx-auto shadow-md">
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 border-b border-border-muted pb-8 text-center sm:text-left">
             <div 
               className="relative w-24 h-24 rounded-full bg-brand-third flex items-center justify-center text-[3rem] cursor-pointer overflow-hidden group border-2 border-transparent hover:border-brand-primary transition-colors duration-300 shrink-0"
               onClick={handleAvatarClick}
               title="Click to change avatar"
             >
               {avatar ? (
                 <img src={avatar} alt="Profile Avatar" className="w-full h-full object-cover" />
               ) : (
                 "👤"
               )}
               <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                 <span className="text-white text-xs font-semibold">Upload</span>
               </div>
               <input 
                 type="file" 
                 ref={fileInputRef} 
                 onChange={handleFileChange} 
                 accept="image/*" 
                 className="hidden" 
               />
             </div>
             
             <div className="mt-2 sm:mt-0">
               <h3 className="font-heading text-[1.5rem] font-bold text-brand-primary m-0">
                 {formData.firstName || formData.lastName ? `${formData.firstName} ${formData.lastName}`.trim() : "New User"}
               </h3>
               <p className="text-[0.95rem] text-text-secondary m-0 mt-1">
                 {formData.email || "No email provided"}
               </p>
             </div>
          </div>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="flex-1">
                <label className={labelClass}>First Name <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="e.g. Ali" 
                  className={inputClass} 
                  disabled={loading}
                />
              </div>
              <div className="flex-1">
                <label className={labelClass}>Last Name <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="e.g. Khan" 
                  className={inputClass} 
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Email Address <span className="text-red-500">*</span></label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. ali.khan@example.com" 
                className={inputClass} 
                disabled={loading}
              />
            </div>

            <div>
              <label className={labelClass}>Phone Number <span className="text-red-500">*</span></label>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. 0300 1234567" 
                className={inputClass} 
                disabled={loading}
              />
            </div>

            <div>
              <label className={labelClass}>Delivery Address</label>
              <textarea 
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your complete delivery address" 
                className={`${inputClass} resize-y min-h-[80px]`} 
                disabled={loading}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="mt-4 font-body text-[1.05rem] font-medium px-8 py-3.5 border-2 border-transparent rounded-md bg-brand-primary text-white cursor-pointer transition-all duration-300 w-full hover:bg-brand-secondary hover:shadow-sm hover:-translate-y-px disabled:opacity-70 disabled:cursor-wait flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
