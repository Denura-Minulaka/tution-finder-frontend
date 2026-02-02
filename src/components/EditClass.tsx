import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EditClass() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState("");

  // --- Custom Dropdown State ---
  const [isModeOpen, setIsModeOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    className: "",
    subject: "",
    description: "",
    grade: "",
    language: "",
    mode: "",
    district: "",
    town: "",
    price: 0
  });

  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsModeOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 1. Fetch current class data to pre-fill the form
  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(`http://localhost:8084/api/classes/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFormData(res.data);
      } catch  {
        setMessage("ERROR: DATA_SYNC_FAILED");
      } finally {
        setLoading(false);
      }
    };
    fetchClassDetails();
  }, [id]);

  // 2. Handle update submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    setMessage("");

    try {
      const token = localStorage.getItem("accessToken");
      await axios.put(`http://localhost:8084/api/classes/update/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setMessage("SUCCESS: MODULE_RECONFIGURED");
      setTimeout(() => navigate(`/ViewClass/${id}`), 1500);
    } catch {
      setMessage("ERROR: UPDATE_SEQUENCE_ABORTED");
    } finally {
      setUpdating(false);
    }
  };

  const modeOptions = ["ONLINE", "PHYSICAL", "HYBRID"];

  if (loading) return (
    <div className="bg-black min-h-screen flex items-center justify-center font-['Rajdhani']">
      <p className="text-emerald-500 tracking-[10px] animate-pulse uppercase">Accessing_Class_Data...</p>
    </div>
  );

  return (
    <div className="bg-[#020202] min-h-screen font-['Rajdhani'] text-white flex items-center justify-center p-4 md:p-8 relative">
      
      <div className="w-full max-w-4xl bg-[#080808] border border-emerald-500/30 p-6 md:p-12 relative z-10 shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500 shadow-[0_0_15px_#10b981]"></div>

        <div className="mb-10 flex justify-between items-end border-b border-neutral-800 pb-6">
          <div>
            <h2 className="text-2xl md:text-4xl font-black italic tracking-widest uppercase text-white">
              Edit_Class_Node
            </h2>
          </div>
          <button onClick={() => navigate(-1)} className="text-[10px] text-neutral-500 hover:text-white transition-colors uppercase font-bold tracking-[2px]">
            [ Return ]
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Class Name */}
            <div className="flex flex-col gap-2">
              <label className="text-neutral-500 text-[10px] font-black tracking-[4px] uppercase">Class_Title</label>
              <input 
                type="text" 
                required
                className="bg-black border border-neutral-800 p-4 text-white outline-none focus:border-emerald-500 transition-colors font-bold"
                value={formData.className}
                onChange={(e) => setFormData({...formData, className: e.target.value})}
              />
            </div>

            {/* Subject */}
            <div className="flex flex-col gap-2">
              <label className="text-neutral-500 text-[10px] font-black tracking-[4px] uppercase">Core_Subject</label>
              <input 
                type="text" 
                required
                className="bg-black border border-neutral-800 p-4 text-white outline-none focus:border-emerald-500 transition-colors font-bold"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
              />
            </div>

            {/* Price */}
            <div className="flex flex-col gap-2">
              <label className="text-emerald-500 text-[10px] font-black tracking-[4px] uppercase">Valuation (LKR)</label>
              <input 
                type="number" 
                required
                className="bg-black border border-neutral-800 p-4 text-white outline-none focus:border-emerald-500 transition-colors font-bold"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
              />
            </div>

            {/* Mode - Custom Dropdown Fix */}
            <div className="flex flex-col gap-2 relative" ref={dropdownRef}>
              <label className="text-neutral-500 text-[10px] font-black tracking-[4px] uppercase">Operational_Mode</label>
              <div 
                onClick={() => setIsModeOpen(!isModeOpen)}
                className="bg-black border border-neutral-800 p-4 text-white flex justify-between items-center cursor-pointer hover:border-emerald-500 transition-all font-bold tracking-widest uppercase"
              >
                <span>{formData.mode || "SELECT_MODE"}</span>
                <span className="text-[10px] text-emerald-500">{isModeOpen ? "▲" : "▼"}</span>
              </div>

              {isModeOpen && (
                <div className="absolute z-50 left-0 right-0 top-full mt-1 bg-[#0a0a0a] border border-emerald-500/50 shadow-2xl max-h-60 overflow-y-auto">
                  {modeOptions.map((opt) => (
                    <div 
                      key={opt}
                      onClick={() => {
                        setFormData({...formData, mode: opt});
                        setIsModeOpen(false);
                      }}
                      className="p-4 hover:bg-emerald-500/20 cursor-pointer text-white border-b border-neutral-900 text-sm tracking-[2px] font-bold uppercase transition-colors"
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className="text-neutral-500 text-[10px] font-black tracking-[4px] uppercase">Instructional_Narrative</label>
            <textarea 
              rows={4}
              required
              className="bg-black border border-neutral-800 p-4 text-white outline-none focus:border-emerald-500 transition-colors font-bold resize-none"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          {/* Region and Town */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-neutral-500 text-[10px] font-black tracking-[4px] uppercase">District_Sector</label>
              <input 
                type="text" 
                required
                className="bg-black border border-neutral-800 p-4 text-white outline-none focus:border-emerald-500 transition-colors font-bold"
                value={formData.district}
                onChange={(e) => setFormData({...formData, district: e.target.value})}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-neutral-500 text-[10px] font-black tracking-[4px] uppercase">Town_Node</label>
              <input 
                type="text" 
                required
                className="bg-black border border-neutral-800 p-4 text-white outline-none focus:border-emerald-500 transition-colors font-bold"
                value={formData.town}
                onChange={(e) => setFormData({...formData, town: e.target.value})}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-neutral-900">
            <button 
              type="submit" 
              disabled={updating}
              className="flex-1 py-5 bg-emerald-500 text-black font-black uppercase text-xs tracking-[5px] hover:bg-emerald-400 transition-all active:scale-95 disabled:opacity-50"
            >
              {updating ? "Committing_Update..." : "Commit_Reconfiguration"}
            </button>
            <button 
              type="button" 
              onClick={() => navigate(-1)}
              className="flex-1 py-5 border-2 border-neutral-800 text-neutral-500 font-black uppercase text-xs tracking-[5px] hover:border-white hover:text-white transition-all active:scale-95"
            >
              Abort_Operation
            </button>
          </div>
        </form>

        {message && (
          <div className={`mt-8 text-center font-bold text-[10px] tracking-[2px] uppercase animate-pulse ${message.includes("SUCCESS") ? "text-emerald-400" : "text-red-500"}`}>
            {`> STATUS: ${message}`}
          </div>
        )}
      </div>
    </div>
  );
}