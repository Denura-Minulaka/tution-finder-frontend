import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#0a0f1e] border-t border-cyan-500/20 py-10 md:py-12 overflow-hidden">
      {/* Background Energy Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[150px] md:h-[200px] bg-cyan-500/5 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        {/* Main Grid: Stacks on mobile (grid-cols-1), 3 cols on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 items-start">
          
          {/* Section 1: Brand & Status - Centered on mobile */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4">
            <Link to="/" className="text-xl font-bold tracking-[4px] text-cyan-400 drop-shadow-[0_0_8px_rgba(0,255,255,0.3)]">
              TUITION_FINDER
            </Link>
            <p className="text-blue-100/50 text-[10px] md:text-[11px] font-medium tracking-[1px] leading-relaxed max-w-[280px] md:max-w-[300px] uppercase">
              Advancing academic coordination through decentralized intelligence. 
              <br />
              <span className="text-cyan-500/80 tracking-[2px]">Core_v.4.0_Stable</span>
            </p>
          </div>

          {/* Section 2: Navigation Nodes - 2 columns even on mobile */}
          <div className="grid grid-cols-2 gap-4 md:gap-8 w-full max-w-[320px] mx-auto md:mx-0">
            <div className="flex flex-col items-center md:items-start gap-3 md:gap-4">
              <h4 className="text-cyan-500 text-[10px] font-black tracking-[3px] uppercase italic">System_Nodes</h4>
              <FooterLink to="/" text="Home" />
              <FooterLink to="/about" text="About" />
            </div>
            <div className="flex flex-col items-center md:items-start gap-3 md:gap-4">
              <h4 className="text-cyan-500 text-[10px] font-black tracking-[3px] uppercase italic">Auth_Access</h4>
              <FooterLink to="/login" text="Login" />
              <FooterLink to="/signup" text="Signup" />
            </div>
          </div>

          {/* Section 3: Diagnostic Info - Full width on mobile */}
          <div className="bg-slate-950/50 border border-white/5 p-5 md:p-6 rounded-[15px] backdrop-blur-sm w-full">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#22d3ee]" />
              <span className="text-white text-[10px] font-black uppercase tracking-[3px]">System_Status</span>
            </div>
            <div className="space-y-2 font-mono text-[9px] text-blue-100/40 uppercase">
              <div className="flex justify-between">
                <span>Encryption:</span>
                <span className="text-cyan-400">AES_256</span>
              </div>
              <div className="flex justify-between">
                <span>Connection:</span>
                <span className="text-cyan-400">Secure</span>
              </div>
              <div className="w-full bg-white/5 h-[1px] mt-2" />
              <p className="text-[8px] mt-2 italic text-center md:text-left">© 2026 Core_Intelligence_Unit</p>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}

function FooterLink({ to, text }: { to: string; text: string }) {
  return (
    <Link 
      to={to} 
      className="text-blue-100/60 text-[11px] font-medium tracking-[2px] uppercase hover:text-cyan-400 transition-all duration-300"
    >
      {text}
    </Link>
  );
}