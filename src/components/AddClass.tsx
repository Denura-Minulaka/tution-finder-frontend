import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../componentCSS/AddClass.css";

interface ClassRequest {
  className: string;
  description: string;
  subject: string;
  grade: string;
  language: string;
  mode: string;
  district: string;
  town: string;
  price: number;
}

export default function AddClass() {
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("error");

  const [formData, setFormData] = useState<ClassRequest>({
    className: "",
    description: "",
    subject: "",
    grade: "",
    language: "",
    mode: "Physical",
    district: "",
    town: "",
    price: 0,
  });

  // --- AUTH SHIELD ---
  useEffect(() => {
    const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
    const userRole = localStorage.getItem("userRole") || localStorage.getItem("userType");

    // Redirect if no token or if the user is not a teacher
    if (!token || userRole !== "teacher") {
      navigate("/login");
    }
  }, [navigate]);

  // --- DROPDOWN CLICK-OUTSIDE HANDLER ---
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ 
      ...formData, 
      [name]: name === "price" ? (value === "" ? 0 : Number(value)) : value 
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
      
      await axios.post("http://localhost:8084/api/classes/add", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setMessageType("success");
      setMessage("MODULE_SAVED_SUCCESSFULLY");
      
      // Redirect to account dashboard after success
      setTimeout(() => navigate("/account"), 2000);
    } catch (error: unknown) {
      setMessageType("error");
      if (axios.isAxiosError(error)) {
        if (error.response) {
            const data = error.response.data as { message?: string; error?: string };
            setMessage(data.message || data.error || "SERVER_REJECTED_REQUEST");
        } else {
            setMessage("CANNOT_CONNECT_TO_PORT_8084");
        }
      } else {
        setMessage("UNKNOWN_SYSTEM_ERROR");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    /* FIXED: Removed 'fixed top-0 left-0 w-screen h-screen' to allow Footer to show */
    <div className="relative min-h-screen bg-black flex items-start justify-center pt-10 px-4 font-['Rajdhani'] box-border pb-20">
      
      {/* Container Box */}
      <div className="add-class-box-glow relative w-full max-w-[700px] p-8 md:p-12 bg-[#0a0a0a] border border-[rgba(16,185,129,0.4)] shadow-[0_0_40px_rgba(0,0,0,0.9),0_0_20px_rgba(16,185,129,0.1)] rounded-lg text-white mt-5 mb-10 overflow-hidden">
        
        {/* Title Section */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-fit"> 
            <h2 className="emerald-typing text-2xl md:text-3xl font-bold text-emerald-400 tracking-[5px] uppercase border-r-[3px] border-emerald-500 whitespace-nowrap overflow-hidden">
              Module_Configuration
            </h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 relative z-20">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-emerald-500 tracking-widest mb-2">MODULE_TITLE</label>
              <input type="text" name="className" placeholder="Class Name" value={formData.className} onChange={handleChange} required 
                className="p-3 bg-transparent border-b-2 border-neutral-800 text-emerald-50 text-base focus:border-emerald-400 outline-none transition-all placeholder:text-neutral-700" />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-emerald-500 tracking-widest mb-2">SUBJECT_TYPE</label>
              <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required 
                className="p-3 bg-transparent border-b-2 border-neutral-800 text-emerald-50 text-base focus:border-emerald-400 outline-none transition-all placeholder:text-neutral-700" />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-emerald-500 tracking-widest mb-2">DESCRIPTION_LOG</label>
            <textarea name="description" placeholder="Brief description of learning objectives..." value={formData.description} onChange={handleChange} required 
              className="p-3 bg-transparent border-b-2 border-neutral-800 text-emerald-50 text-base focus:border-emerald-400 outline-none transition-all resize-none placeholder:text-neutral-700" rows={3} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-emerald-500 tracking-widest mb-2">GRADE_LEVEL</label>
              <input type="text" name="grade" placeholder="e.g. Grade 12" value={formData.grade} onChange={handleChange} required 
                className="p-3 bg-transparent border-b-2 border-neutral-800 text-emerald-50 text-base focus:border-emerald-400 outline-none transition-all placeholder:text-neutral-700" />
            </div>

            <div className="relative" ref={dropdownRef}>
              <label className="text-sm font-semibold text-emerald-500 tracking-widest mb-2">DELIVERY_MODE</label>
              <div onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="p-3 bg-neutral-950 border-b-2 border-neutral-800 text-emerald-400 flex justify-between items-center cursor-pointer hover:border-emerald-400 transition-colors">
                <span className="text-base font-bold uppercase">{formData.mode}</span>
                <span className="text-xs">{isDropdownOpen ? "▲" : "▼"}</span>
              </div>
              {isDropdownOpen && (
                <div className="absolute z-50 left-0 right-0 mt-2 bg-neutral-900 border border-emerald-500/50 shadow-2xl rounded-md overflow-hidden">
                  {["Physical", "Online", "Hybrid"].map((m) => (
                    <div key={m} className="p-3 hover:bg-emerald-500/20 cursor-pointer text-emerald-400 text-base border-b border-neutral-800 last:border-0 font-medium uppercase"
                      onClick={() => { setFormData({...formData, mode: m}); setIsDropdownOpen(false); }}>
                      {m}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-emerald-500 tracking-widest mb-2">DISTRICT</label>
              <input type="text" name="district" placeholder="District" value={formData.district} onChange={handleChange} required 
                className="p-3 bg-transparent border-b-2 border-neutral-800 text-emerald-50 text-base focus:border-emerald-400 outline-none transition-all placeholder:text-neutral-700" />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-emerald-500 tracking-widest mb-2">TOWN</label>
              <input type="text" name="town" placeholder="Town" value={formData.town} onChange={handleChange} required 
                className="p-2 bg-transparent border-b-2 border-neutral-800 text-emerald-50 text-base focus:border-emerald-400 outline-none transition-all placeholder:text-neutral-700" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-emerald-500 tracking-widest mb-2">MEDIUM_LANGUAGE</label>
              <input type="text" name="language" placeholder="English/Sinhala" value={formData.language} onChange={handleChange} required 
                className="p-3 bg-transparent border-b-2 border-neutral-800 text-emerald-50 text-base focus:border-emerald-400 outline-none transition-all placeholder:text-neutral-700" />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-emerald-500 tracking-widest mb-2">COURSE_FEE</label>
              <div className="flex items-center gap-3 border-b-2 border-neutral-800">
                <span className="text-emerald-500 font-bold text-sm">LKR</span>
                <input type="number" name="price" placeholder="0.00" value={formData.price || ""} onChange={handleChange} required 
                  className="w-full p-3 bg-transparent text-emerald-50 text-base focus:border-emerald-400 outline-none transition-all placeholder:text-neutral-700" />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-6 pt-10">
            <button type="button" onClick={() => navigate(-1)} 
              className="flex-1 py-4 border-2 border-neutral-800 text-neutral-500 hover:text-white hover:border-white hover:bg-neutral-900 rounded uppercase text-xs tracking-[3px] font-bold transition-all">
              Discard Changes
            </button>
            <button type="submit" disabled={loading}
              className="flex-[2] py-4 bg-gradient-to-r from-emerald-600 to-emerald-800 hover:from-emerald-800 hover:to-emerald-600 text-black font-bold rounded uppercase shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] transition-all text-sm tracking-[3px]">
              {loading ? "INITIALIZING_UPLOAD..." : "PUBLISH_CLASS_MODULE"}
            </button>
          </div>

          {message && (
            <div className={`text-center font-bold text-sm mt-4 tracking-widest ${messageType === "success" ? "text-emerald-400" : "text-red-500 animate-pulse"}`}>
              {`> ${message}`}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}