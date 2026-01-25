import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#020202] min-h-screen font-['Rajdhani'] text-white selection:bg-emerald-500 selection:text-black">
      
      {/* LAYER 0: FIXED BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-emerald-600/10 blur-[150px] rounded-full animate-[pulse_8s_infinite]"></div>
        <div className="absolute bottom-[-5%] right-[-5%] w-[600px] h-[600px] bg-emerald-900/10 blur-[130px] rounded-full animate-[pulse_10s_infinite]"></div>
        <div className="absolute inset-0 opacity-[0.08]" 
             style={{ backgroundImage: 'radial-gradient(#fff 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }}>
        </div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen overflow-x-hidden">
        
        {/* NAVIGATION  */}
        <nav className="max-w-7xl mx-auto w-full px-8 py-10 flex flex-col md:flex-row justify-between items-center md:items-start gap-8 transition-all">
          {/* LEFT SIDE: LOGO */}
          <div className="flex items-center gap-4 group cursor-pointer transition-transform hover:scale-105 duration-500">
            <div className="w-1 h-10 bg-gradient-to-b from-emerald-400 to-emerald-700 shadow-[0_0_20px_rgba(16,185,129,0.5)] group-hover:h-12 transition-all"></div>
            <div className="flex flex-col">
              <span className="text-3xl font-black italic uppercase tracking-tighter leading-none group-hover:text-emerald-400 transition-colors">
                CLASS<span className="text-emerald-500">_MS</span>
              </span>
              <span className="text-[9px] font-bold tracking-[6px] text-neutral-500 uppercase mt-1">Core_Intelligence</span>
            </div>
          </div>

          {/* RIGHT SIDE: CONVERSATIONAL LEAD-IN + GRADIENT BUTTON */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[3px] text-neutral-100">
               Do you want to know more <span className="text-[10px] font-bold uppercase tracking-[3px] bg-linear-to-r from-emerald-500 to-red-800 text-transparent bg-clip-text">about us?</span>
            </span>
            <button 
              onClick={() => navigate("/About")}
              className="py-2.5 px-6 rounded-md bg-gradient-to-r from-emerald-500 to-emerald-800 text-black font-black uppercase text-[12px] tracking-[4px] hover:from-emerald-400 hover:to-emerald-600 hover:scale-120 transition-all duration-300 shadow-[0_10px_20px_rgba(16,185,129,0.2)] active:scale-95"
            >
              About System
            </button>
          </div>
        </nav>

        {/* HERO SECTION */}
        <main className="flex-grow flex flex-col items-center justify-center px-8 text-center pt-24 pb-32">
          <div className="flex items-center gap-6 mb-10 group">
            <div className="h-[1px] w-20 bg-emerald-500/50 group-hover:w-32 transition-all duration-700"></div>
            <span className="text-emerald-500 text-[11px] font-black tracking-[10px] uppercase italic animate-pulse">Next_Generation_Standard</span>
            <div className="h-[1px] w-20 bg-emerald-500/50 group-hover:w-32 transition-all duration-700"></div>
          </div>

          <div className="relative group cursor-default overflow-visible py-8">
            <h1 className="text-7xl md:text-[11rem] font-black italic uppercase leading-tight tracking-tighter transition-all duration-700 overflow-visible">
              ELEVATE <br />
              <span className="inline-block px-10 -mx-10 bg-linear-to-r from-emerald-500 to-red-800 text-transparent bg-clip-text group-hover:tracking-[15px] group-hover:drop-shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all duration-1000">
                LEARNING
              </span>
            </h1>
          </div>

          <div className="mt-8 relative border-y border-white/5 py-10 w-full max-w-4xl hover:border-emerald-500/40 transition-colors duration-500 group">
            <p className="max-w-2xl mx-auto text-neutral-400 text-sm md:text-lg font-medium uppercase tracking-[5px] leading-relaxed group-hover:text-white transition-colors duration-500">
              The professional coordination layer for <br />
              <span className="text-white group-hover:text-emerald-400 transition-colors">Expert Educators</span> & <span className="text-white group-hover:text-emerald-400 transition-colors">High-Performance Students</span>.
            </p>
          </div>
        </main>

        {/* REST OF THE CODE REMAINS THE SAME */}
        {/* (Cards, Register Section, Footer) */}
        <section className="max-w-7xl mx-auto w-full px-8 grid grid-cols-1 md:grid-cols-3 gap-8 pb-20">
          <div className="relative group p-10 bg-white/[0.01] border border-white/5 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.03] hover:border-emerald-500/40 hover:scale-110">
            <div className="absolute top-0 left-0 w-1 h-0 bg-emerald-500 group-hover:h-full transition-all duration-700"></div>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-emerald-500 font-black text-2xl italic opacity-20 group-hover:opacity-100 transition-opacity">01</span>
              <h3 className="text-lg font-black uppercase italic tracking-widest text-emerald-400 group-hover:tracking-[5px] transition-all">The_Platform</h3>
            </div>
            <p className="text-neutral-400 text-xs font-bold uppercase tracking-[3px] leading-loose group-hover:text-white transition-colors">
              CLASS_MS is a decentralized educational ecosystem designed to bridge the gap between quality tutors and ambitious learners. We provide the architecture for verified academic rankings.
            </p>
          </div>

          <div className="relative group p-10 bg-white/[0.01] border border-white/5 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.03] hover:border-emerald-500/40 hover:scale-110">
            <div className="absolute top-0 left-0 w-1 h-0 bg-emerald-500 group-hover:h-full transition-all duration-700"></div>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-emerald-500 font-black text-2xl italic opacity-20 group-hover:opacity-100 transition-opacity">02</span>
              <h3 className="text-lg font-black uppercase italic tracking-widest text-emerald-400 group-hover:tracking-[5px] transition-all">Instructor_Edge</h3>
            </div>
            <ul className="text-neutral-400 text-[10px] font-bold uppercase tracking-[2px] space-y-4">
              {['Global Module Deployment', 'Real-time Analytics', 'Secure Enrollment Logs', 'Excellence Badges'].map((item, i) => (
                <li key={i} className="flex gap-3 items-center group/item">
                  <span className="text-emerald-500 group-hover/item:translate-x-1 transition-transform">▶</span>
                  <span className="group-hover:text-white transition-colors">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative group p-10 bg-white/[0.01] border border-white/5 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.03] hover:border-emerald-500/40 hover:scale-110">
            <div className="absolute top-0 left-0 w-1 h-0 bg-emerald-500 group-hover:h-full transition-all duration-700"></div>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-emerald-500 font-black text-2xl italic opacity-20 group-hover:opacity-100 transition-opacity">03</span>
              <h3 className="text-lg font-black uppercase italic tracking-widest text-emerald-400 group-hover:tracking-[5px] transition-all">Learner_Terminal</h3>
            </div>
            <ul className="text-neutral-400 text-[10px] font-bold uppercase tracking-[2px] space-y-4">
              {['District Discovery', 'Verified Leaderboards', 'Transparent Reviews', 'Schedule Sync'].map((item, i) => (
                <li key={i} className="flex gap-3 items-center group/item">
                  <span className="text-emerald-500 group-hover/item:translate-x-1 transition-transform">▶</span>
                  <span className="group-hover:text-white transition-colors">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* REGISTER / LOGIN SECTION */}
        <section className="max-w-4xl mx-auto w-full px-8 pb-32 flex flex-col items-center text-center">
          <div className="mb-10">
            <span className="text-emerald-500/60 text-[10px] font-bold uppercase tracking-[6px] block mb-4">Initial_Initialization_Phase</span>
            <h2 className="text-2xl md:text-4xl font-black italic uppercase tracking-[8px] leading-tight">
              DO YOU WANT TO <span className="bg-linear-to-r from-emerald-500 to-red-800 text-transparent bg-clip-text">REGISTER</span>?
            </h2>
          </div>

          <div className="flex flex-col md:flex-row gap-6 w-full px-4">
            <button 
              onClick={() => navigate("/signup")}
              className="flex-1 px-10 py-5 bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-600 bg-[length:200%_auto] hover:bg-right text-black text-[12px] font-black uppercase tracking-[5px] transition-all duration-500 hover:bg-white hover:text-black hover:scale-110"
            >
              Create_Account
            </button>
            <button 
              onClick={() => navigate("/Login")}
              className="flex-1 px-10 py-5 border border-white/10 text-white text-[12px] font-black uppercase tracking-[5px] hover:border-emerald-500 hover:text-emerald-400 transition-all duration-300 hover:scale-110"
            >
              Existing_User_Log_In
            </button>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="p-12 flex flex-col md:flex-row justify-between items-center border-t border-white/5 bg-black/40 backdrop-blur-xl">
          <div className="text-[10px] font-bold text-neutral-300 uppercase tracking-[8px] hover:text-emerald-500 transition-colors cursor-default">
            Class_Management_System // Institutional_Core // 2026
          </div>
          <div className="flex gap-12 mt-6 md:mt-0">
            <div className="flex flex-col items-end group cursor-pointer">
              <span className="text-[10px] text-neutral-300 font-black tracking-[3px] uppercase group-hover:text-white transition-colors">Service_Status</span>
              <span className="text-emerald-500 text-[10px] font-black tracking-[3px] uppercase animate-pulse">Online_&_Secure</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}