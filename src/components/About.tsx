import React from "react";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#020202] min-h-screen font-['Rajdhani'] text-white selection:bg-emerald-500 selection:text-black">
      
      {/* BACKGROUND LAYER */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-red-900/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-emerald-900/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-10">
        
        {/* HEADER */}
        <nav className="flex justify-between items-center mb-20">
          <div className="flex flex-col">
            <span className="text-2xl font-black italic uppercase tracking-tighter leading-none">
              ABOUT<span className="text-emerald-500">_SYSTEM</span>
            </span>
            <span className="text-[9px] font-bold tracking-[4px] text-neutral-500 uppercase mt-1">Intelligence_Report_2026</span>
          </div>
          
          <button 
            onClick={() => navigate("/")}
            className="py-2 px-6 rounded-md bg-linear-to-r from-emerald-500 to-emerald-800 text-black font-black uppercase text-[10px] tracking-[3px] hover:scale-105 transition-all active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
          >
            Back_to_Home
          </button>
        </nav>

        {/* SECTION 1: WHAT IS CLASS_MS? */}
        <section className="mb-32">
          <div className="max-w-3xl">
            <h2 className="text-emerald-500 text-[11px] font-black tracking-[8px] uppercase italic mb-4">Core_Definition</h2>
            <h1 className="text-5xl md:text-7xl font-black italic uppercase leading-tight tracking-tighter mb-8">
                THE BRIDGE TO <br />
                    <span className="relative inline-block pr-6 -mr-6 bg-linear-to-r from-emerald-500 to-red-800 text-transparent bg-clip-text">
                ELITE_EDUCATION
                    </span>
            </h1>
            <p className="text-neutral-400 font-medium uppercase tracking-[2px] text-lg leading-relaxed">
              CLASS_MS is a high-performance <span className="text-white">Management Ecosystem</span> designed to synchronize expert instructors with ambitious students. We remove the chaos of traditional scheduling, replacing it with a streamlined, industrial-grade interface for academic growth.
            </p>
          </div>
        </section>

        {/* SECTION 2: SYSTEM ADVANTAGES */}
        <section className="mb-20">
          <h2 className="bg-linear-to-r from-orange-400 to-red-800 text-transparent bg-clip-text text-[11px] font-black tracking-[8px] uppercase italic mb-10 text-center">Strategic_Advantages</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { 
                title: "Precision Scheduling", 
                desc: "Automated time-slot management that prevents overlaps and maximizes instructor productivity.",
                icon: "T-01"
              },
              { 
                title: "Verified Tracking", 
                desc: "Immutable logs of student progress and enrollment status through our Core_Intelligence engine.",
                icon: "T-02"
              },
              { 
                title: "Direct Analytics", 
                desc: "Real-time data visualization for both learners and teachers to identify performance gaps.",
                icon: "T-03"
              },
              { 
                title: "Secure Portal", 
                desc: "Encrypted access for all institutional data, ensuring privacy and intellectual security.",
                icon: "T-04"
              }
            ].map((adv, i) => (
              <div key={i} className="p-8 bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-all group">
                <span className="text-emerald-500 font-black text-xs block mb-4 group-hover:translate-x-1 transition-transform tracking-widest">[{adv.icon}]</span>
                <h3 className="text-white font-black uppercase italic tracking-widest mb-3">{adv.title}</h3>
                <p className="text-neutral-500 text-[11px] font-bold uppercase tracking-[1px] leading-loose group-hover:text-neutral-300 transition-colors">
                  {adv.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: CALL TO ACTION */}
        <section className="bg-linear-to-r from-emerald-900/20 to-red-900/20 border border-white/5 p-12 text-center rounded-lg">
          <h2 className="text-2xl font-black italic uppercase tracking-[5px] mb-6">Ready to initiate deployment?</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <button 
              onClick={() => navigate("/signup")}
              className="py-3 px-10 bg-emerald-500 text-black font-black uppercase text-xs tracking-[4px] hover:bg-white transition-all"
            >
              Initialize_Account
            </button>
            <button 
              onClick={() => navigate("/Login")}
              className="py-3 px-10 border border-white/20 text-white font-black uppercase text-xs tracking-[4px] hover:border-green-500 hover:text-green-500 transition-all"
            >
              System_Log_In
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}