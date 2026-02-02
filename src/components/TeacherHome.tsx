import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../componentCSS/TeacherHome.css";

interface ClassData {
  id: number;
  className: string;
  subject: string;
  grade: string;
  language: string;
  mode: string;
  district: string;
  town: string;
  price: number;
}

export default function TeacherHome() {
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyClasses = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get("http://localhost:8084/api/classes/my-classes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClasses(response.data);
      } catch (error) {
        console.error("SYSTEM_FETCH_ERROR:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyClasses();
  }, []);

  return (
    <div className="bg-black min-h-screen font-['Rajdhani'] p-6 md:p-12 text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-20">
          <div className="flex flex-col border-l-4 border-emerald-500 pl-8">
            <div className="inline-block w-fit">
              <h1 className="emerald-typing-title text-4xl md:text-6xl font-bold text-emerald-400 tracking-[10px] uppercase">
                YOUR CLASSES
              </h1>
            </div>
            <p className="text-neutral-500 text-sm tracking-[5px] mt-4 font-bold uppercase">
              Operational_Status: <span className="text-emerald-500">Secure</span>
            </p>
          </div>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="w-64 h-1.5 bg-neutral-900 rounded-full overflow-hidden">
              <div className="loading-bar-progress h-full bg-emerald-500 shadow-[0_0_15px_#10b981]"></div>
            </div>
            <p className="text-emerald-500 font-bold tracking-[4px] mt-6 animate-pulse uppercase">Syncing_Modules...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {classes.map((cls) => (
              <div 
                key={cls.id} 
                onClick={() => navigate(`/ViewClass/${cls.id}`)}
                className="group relative bg-[#021616] border-2 border-emerald-500/40 rounded-sm cursor-pointer transition-all duration-500 hover:-translate-y-3 hover:bg-[#041f1f] hover:border-emerald-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(16,185,129,0.2)]"
              >
                {/* Thick Top Accent */}
                <div className="absolute -top-[2px] -left-[2px] w-[calc(100%+4px)] h-1.5 bg-emerald-500 shadow-[0_0_15px_#10b981] z-10"></div>
                
                <div className="p-10">
                  <div className="flex justify-between items-start mb-10">
                    <span className="text-xs font-black text-emerald-400 border-2 border-emerald-500/50 px-4 py-1 tracking-widest uppercase bg-emerald-500/10">
                      {cls.mode}
                    </span>
                    <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981] animate-pulse"></div>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-10 group-hover:text-emerald-400 transition-colors uppercase italic tracking-tighter leading-none">
                    {cls.className}
                  </h2>

                  <div className="space-y-6 mb-12">
                    <div className="flex flex-col border-l-2 border-neutral-700 pl-4 group-hover:border-emerald-500 transition-colors">
                      <span className="text-[11px] font-bold text-neutral-500 tracking-[3px] uppercase">SUBJECT</span>
                      <span className="text-xl text-emerald-200 font-semibold">{cls.subject}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col border-l-2 border-neutral-700 pl-4 group-hover:border-emerald-500 transition-colors">
                        <span className="text-[11px] font-bold text-neutral-500 tracking-[3px] uppercase">GRADE</span>
                        <span className="text-xl text-white font-semibold">{cls.grade}</span>
                      </div>
                      <div className="flex flex-col border-l-2 border-neutral-700 pl-4 group-hover:border-emerald-500 transition-colors">
                        <span className="text-[11px] font-bold text-neutral-500 tracking-[3px] uppercase">MEDIUM</span>
                        <span className="text-xl text-white font-semibold">{cls.language}</span>
                      </div>
                    </div>

                    {/* Updated Location Section to show Town and District */}
                    <div className="flex flex-col border-l-2 border-neutral-700 pl-4 group-hover:border-emerald-500 transition-colors">
                      <span className="text-[11px] font-bold text-neutral-500 tracking-[3px] uppercase">LOCATION</span>
                      <span className="text-xl text-white font-semibold uppercase">{cls.town} / {cls.district}</span>
                    </div>
                  </div>

                  <div className="flex items-end justify-between border-t border-neutral-800 pt-8">
                    <div className="flex flex-col">
                      <span className="text-[11px] text-neutral-500 font-bold tracking-[3px] uppercase mb-1">Module_Fee</span>
                      <span className="text-3xl font-black text-white tracking-tighter">
                        <span className="text-emerald-500 text-xl mr-2 font-bold">LKR</span>
                        {cls.price.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-emerald-500 text-2xl font-black group-hover:translate-x-3 transition-transform">
                      &gt;&gt;
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Add New Module Button */}
            <div 
              onClick={() => navigate("/AddClass")}
              className="group flex flex-col items-center justify-center min-h-[450px] bg-[#080808] border-2 border-dashed border-neutral-800 rounded-sm cursor-pointer transition-all duration-300 hover:border-emerald-500 hover:bg-emerald-500/5"
            >
              <div className="text-7xl font-light text-neutral-800 group-hover:text-emerald-500 transition-colors">+</div>
              <span className="text-xs font-black text-neutral-600 group-hover:text-emerald-400 tracking-[6px] uppercase mt-4">New_Module</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}