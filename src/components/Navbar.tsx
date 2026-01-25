import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false); 
  const navigate = useNavigate();

  const userRole = localStorage.getItem("userRole");
  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    const nav = navRef.current;
    const orb = orbRef.current;
    if (!nav || !orb) return;

    // Set initial position far away to avoid load-in glow
    nav.style.setProperty("--x", "-1000px");
    nav.style.setProperty("--y", "-1000px");

    const handleMouseMove = (e: MouseEvent) => {
      const r = nav.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      nav.style.setProperty("--x", `${x}px`);
      nav.style.setProperty("--y", `${y}px`);
      
      if (orb) {
        orb.style.opacity = "1";
        orb.style.left = `${x - 4}px`;
        orb.style.top = `${y - 4}px`;
      }
    };

    const handleMouseLeave = () => {
      if (orb) orb.style.opacity = "0";
    };

    nav.addEventListener("mousemove", handleMouseMove);
    nav.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      nav.removeEventListener("mousemove", handleMouseMove);
      nav.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const confirmLogout = () => {
    localStorage.clear();
    setShowLogoutConfirm(false);
    navigate("/login");
    window.location.reload();
  };

  const getHomePath = () => {
    if (userRole === "teacher") return "/TeacherHome";
    if (userRole === "student") return "/StudentHome";
    return "/";
  };

  return (
    <>
      <nav
        ref={navRef}
        style={{ zIndex: 9999 }}
        className="fixed top-5 left-1/2 -translate-x-1/2 w-[95%] max-w-[1100px] h-[70px] rounded-[20px] 
                   bg-[#0a0f1e] md:bg-slate-950/70 backdrop-blur-md flex items-center px-6 md:px-10 
                   border border-white/10 shadow-[0_0_30px_rgba(0,255,255,0.2)]
                   group md:overflow-hidden overflow-visible"
      >
        {/* Background Energy Effect - Clipped to Navbar and only visible on Hover */}
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100 rounded-[20px]"
          style={{
            background: `radial-gradient(circle at var(--x) var(--y), rgba(0,255,255,0.2), transparent 45%)`
          }}
        />

        {/* Logo */}
        <Link to={getHomePath()} className="relative z-10 text-lg md:text-xl font-bold tracking-[3px] text-cyan-400 drop-shadow-[0_0_8px_rgba(0,255,255,0.5)]">
          TUITION_FINDER
        </Link>

        {/* Dynamic Links (Desktop) */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-8 z-10">
          <NavLink to={getHomePath()} text="HOME" />
          {!isLoggedIn && <NavLink to="/About" text="ABOUT" />}
          {isLoggedIn && userRole === "teacher" && <NavLink to="/AddClass" text="ADD CLASS" />}
          {isLoggedIn && userRole === "student" && <NavLink to="/LeaderBoard" text="LEADERBOARD" />}
        </div>

        {/* Right Side Section (Desktop) */}
        <div className="hidden md:flex ml-auto gap-4 items-center z-10">
          {!isLoggedIn ? (
            <>
              <NavLink to="/login" text="LOGIN" />
              <NavLink to="/signup" text="SIGNUP" />
            </>
          ) : (
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate("/account")}
                className="w-10 h-10 rounded-full border border-cyan-400/30 flex items-center justify-center hover:bg-cyan-400/10 transition-all group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              <button 
                onClick={() => setShowLogoutConfirm(true)}
                className="px-4 py-1.5 rounded-lg border border-red-500/50 text-red-500 text-[10px] font-black tracking-[2px] uppercase hover:bg-red-500 hover:text-white transition-all duration-300"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button 
          className="md:hidden ml-auto z-20 w-10 h-10 relative focus:outline-none" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span className={`block absolute h-0.5 w-5 bg-cyan-400 transform transition duration-300 ease-in-out ${isMenuOpen ? 'rotate-45' : '-translate-y-1.5'}`}></span>
            <span className={`block absolute h-0.5 w-5 bg-cyan-400 transform transition duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block absolute h-0.5 w-5 bg-cyan-400 transform transition duration-300 ease-in-out ${isMenuOpen ? '-rotate-45' : 'translate-y-1.5'}`}></span>
          </div>
        </button>

        {/* Mobile Menu */}
        <div className={`absolute top-[80px] left-0 right-0 bg-[#0a0f1e]/95 backdrop-blur-xl border border-cyan-500/30 p-6 rounded-[20px] flex flex-col gap-4 items-center md:hidden shadow-2xl z-50 transition-all duration-300 origin-top ${isMenuOpen ? 'scale-y-100 opacity-100 visible' : 'scale-y-0 opacity-0 invisible'}`}>
          <NavLink to={getHomePath()} text="HOME" onClick={() => setIsMenuOpen(false)} />
          {!isLoggedIn ? (
            <>
              <NavLink to="/About" text="ABOUT" onClick={() => setIsMenuOpen(false)} />
              <NavLink to="/login" text="LOGIN" onClick={() => setIsMenuOpen(false)} />
              <NavLink to="/signup" text="SIGNUP" onClick={() => setIsMenuOpen(false)} />
            </>
          ) : (
            <>
              {userRole === "teacher" && <NavLink to="/AddClass" text="ADD CLASS" onClick={() => setIsMenuOpen(false)} />}
              {userRole === "student" && <NavLink to="/LeaderBoard" text="LEADERBOARD" onClick={() => setIsMenuOpen(false)} />}
              <NavLink to="/account" text="MY ACCOUNT" onClick={() => setIsMenuOpen(false)} />
              <button 
                onClick={() => {
                   setIsMenuOpen(false);
                   setShowLogoutConfirm(true);
                }} 
                className="text-red-500 text-[11px] font-black tracking-[2px] mt-2 uppercase"
              >
                LOGOUT_SYSTEM
              </button>
            </>
          )}
        </div>

        {/* Floating cursor orb */}
        <div ref={orbRef} className="absolute w-2 h-2 rounded-full bg-cyan-400 blur-[2px] pointer-events-none opacity-0 transition-opacity duration-150 z-20" />

        <style>{`
          .glitch-link:hover::before {
            content: attr(data-text);
            position: absolute;
            left: 0; top: 0;
            color: #00ffff;
            opacity: 0.5;
            animation: glitch-anim .4s linear infinite;
          }
          @keyframes glitch-anim {
            0% { clip-path: inset(0 0 70% 0); }
            50% { clip-path: inset(30% 0 30% 0); }
            100% { clip-path: inset(10% 0 60% 0); }
          }
        `}</style>
      </nav>

      {/* --- LOGOUT MODAL --- */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0a0f1e] border-2 border-red-500/50 p-8 rounded-2xl max-w-sm w-full shadow-[0_0_50px_rgba(239,68,68,0.2)] text-center">
            <h2 className="text-red-500 font-black tracking-[4px] uppercase mb-4 text-sm">System_Termination</h2>
            <p className="text-blue-100/70 text-xs tracking-[1px] mb-8 leading-relaxed uppercase">
              Are you sure you want to terminate the current session?
            </p>
            <div className="flex gap-4">
              <button onClick={() => setShowLogoutConfirm(false)} className="flex-1 py-2 border border-white/20 text-white/50 text-[10px] font-bold uppercase tracking-[2px] hover:border-white hover:text-white transition-all">Abort</button>
              <button onClick={confirmLogout} className="flex-1 py-2 bg-red-500 text-white text-[10px] font-black uppercase tracking-[2px] shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:bg-red-600 transition-all">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function NavLink({ to, text, onClick }: { to: string; text: string; onClick?: () => void }) {
  return (
    <Link 
      to={to} 
      onClick={onClick} 
      data-text={text} 
      className="glitch-link relative py-2 text-[11px] md:text-[13px] font-medium tracking-[2px] text-blue-100 uppercase hover:text-cyan-300 transition-colors"
    >
      {text}
    </Link>
  );
}