import { useState } from "react";
import Navbar from "../../components/Navbar/page";
import Footer from "../../components/Footer/page";

interface TeamMember {
  name: string;
  role: string;
  emoji: string;
  bio: string;
}

const teamData: TeamMember[] = [
  { name: "Ali Khan", role: "Founder & CEO", emoji: "👨🏽‍💼", bio: "Ali founded FreshMart with a vision to make fresh, local produce accessible to everyone. He leads the company's strategic vision." },
  { name: "Ayesha Malik", role: "Head of Operations", emoji: "👩🏽‍💻", bio: "Ayesha ensures that our daily operations run smoothly, from supply chain management to customer service excellence." },
  { name: "Bilal Tariq", role: "Logistics Manager", emoji: "👨🏽‍🚚", bio: "Bilal coordinates our delivery network, ensuring that your groceries arrive fresh and on time, every single day." },
  { name: "Sana Saeed", role: "Customer Success Lead", emoji: "👩🏽‍💼", bio: "Sana is dedicated to your satisfaction. She leads our support team to resolve any issues quickly and with a smile." }
];

export default function Teams() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const sectionTitle = "flex flex-col items-center text-center mb-8 mt-10";
  const sectionTitleH2 = "font-heading text-brand-primary text-[clamp(1.4rem,3vw,2rem)] font-semibold leading-[1.3] mb-2.5";
  const sectionTitleP = "text-text-muted max-w-[520px] text-[0.97rem] leading-[1.7]";

  return (
    <>
      <Navbar />
      <main className="flex-1 px-6 py-9 max-w-[1200px] w-full mx-auto relative">
        <div className={sectionTitle}>
          <h2 className={sectionTitleH2}>Meet Our Team</h2>
          <p className={sectionTitleP}>The dedicated people working hard behind the scenes to deliver freshness to your doorstep.</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8 my-10">
          {teamData.map(member => (
             <div 
               key={member.name} 
               onClick={() => setSelectedMember(member)}
               className="flex flex-col items-center bg-bg-card border border-border-muted rounded-lg p-8 w-[260px] shadow-sm transition-all duration-300 cursor-pointer hover:shadow-md hover:-translate-y-2 hover:border-brand-secondary group"
             >
               <div className="w-24 h-24 rounded-full bg-brand-third flex items-center justify-center text-[3.5rem] mb-4 shadow-inner transition-transform duration-300 group-hover:scale-110">
                 {member.emoji}
               </div>
               <h3 className="font-heading text-[1.4rem] font-bold text-brand-primary m-0 transition-colors duration-300 group-hover:text-brand-secondary">{member.name}</h3>
               <p className="text-[0.95rem] text-text-secondary m-0 mt-1">{member.role}</p>

               {/* Social Icons inside Card */}
               <div className="flex gap-4 mt-5 opacity-80 group-hover:opacity-100 transition-opacity duration-300" onClick={(e) => e.stopPropagation()}>
                 <a href="#" title="LinkedIn" className="text-text-muted hover:text-[#0A66C2] transition-colors duration-200">
                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                 </a>
                 <a href="#" title="GitHub" className="text-text-muted hover:text-[#333] transition-colors duration-200">
                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                 </a>
                 <a href="#" title="Email" className="text-text-muted hover:text-brand-primary transition-colors duration-200">
                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/></svg>
                 </a>
               </div>
             </div>
          ))}
        </div>

        {/* Modal Popup */}
        {selectedMember && (
          <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4" onClick={() => setSelectedMember(null)}>
            <div className="bg-bg-card rounded-xl p-8 max-w-[400px] w-full shadow-2xl relative" onClick={e => e.stopPropagation()}>
              <button 
                className="absolute top-4 right-4 text-text-muted hover:text-text-primary text-xl font-bold cursor-pointer bg-transparent border-none"
                onClick={() => setSelectedMember(null)}
              >
                ✕
              </button>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-brand-third flex items-center justify-center text-[3.5rem] mb-4 shadow-inner">
                  {selectedMember.emoji}
                </div>
                <h3 className="font-heading text-[1.8rem] font-bold text-brand-primary m-0">{selectedMember.name}</h3>
                <p className="text-[1rem] text-brand-secondary font-medium m-0 mt-1 mb-4">{selectedMember.role}</p>
                <p className="text-[0.95rem] text-text-secondary leading-[1.6] m-0 mb-6 border-t border-border-muted pt-4">
                  {selectedMember.bio}
                </p>
                
                <div className="flex gap-5">
                  <a href="#" title="LinkedIn" className="text-brand-primary hover:text-[#0A66C2] transition-colors duration-200 bg-brand-third p-2.5 rounded-full">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                  <a href="#" title="GitHub" className="text-brand-primary hover:text-[#333] transition-colors duration-200 bg-brand-third p-2.5 rounded-full">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  </a>
                  <a href="#" title="Email" className="text-brand-primary hover:text-brand-primary transition-colors duration-200 bg-brand-third p-2.5 rounded-full">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
      <Footer />
    </>
  );
}
