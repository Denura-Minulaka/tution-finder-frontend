import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../componentCSS/ViewClass.css";

interface ClassData {
  id: number;
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

interface ScheduleData {
  id: number;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}

export default function ViewClass() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [classData, setClassData] = useState<ClassData | null>(null);
  const [schedules, setSchedules] = useState<ScheduleData[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  
  // State for the custom confirmation popup
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const headers = { Authorization: `Bearer ${token}` };

        const [classRes, scheduleRes] = await Promise.all([
          axios.get(`http://localhost:8084/api/classes/${id}`, { headers }),
          axios.get(`http://localhost:8084/api/schedules/list/${id}`, { headers })
        ]);

        setClassData(classRes.data);
        setSchedules(scheduleRes.data);
      } catch {
        setMessage("CRITICAL_FETCH_ERROR: TERMINAL_OFFLINE");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleDelete = async () => {
    setMessage("");
    setShowConfirm(false); // Close the popup
    try {
      setIsDeleting(true);
      const token = localStorage.getItem("accessToken");
      await axios.delete(`http://localhost:8084/api/classes/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("MODULE_TERMINATED_SUCCESSFULLY");
      setTimeout(() => navigate("/TeacherHome"), 1500);
    } catch {
      setIsDeleting(false);
      setMessage("ERROR: UNAUTHORIZED_DELETION_ATTEMPT");
    }
  };

  if (loading) return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center font-['Rajdhani']">
      <div className="w-48 h-1 bg-neutral-900 rounded-full overflow-hidden">
        <div className="h-full bg-emerald-500 animate-[loading-slide_1.5s_infinite]"></div>
      </div>
      <p className="mt-4 text-emerald-500 tracking-[10px] text-xs uppercase animate-pulse">Syncing_Vault...</p>
    </div>
  );

  if (!classData) return <div className="bg-black min-h-screen text-red-500 p-20 text-center font-bold font-['Rajdhani']">404: MODULE_NOT_SYNCED</div>;

  return (
    <div className="bg-[#020202] min-h-screen font-['Rajdhani'] text-white relative overflow-hidden flex flex-col">
      
      {/* Confirmation Popup */}
      {showConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0d0d0d] border-2 border-red-500/50 p-8 w-full max-w-[330px] text-center shadow-[0_0_20px_rgba(239,68,68,0.3)]">
            <h3 className="text-red-500 text-xl font-bold tracking-widest mb-2 uppercase italic">TERMINATE MODULE?</h3>
            <p className="text-neutral-400 text-sm mb-6 tracking-tight uppercase font-bold">
              Confirm deletion of {classData.className}. This action is irreversible.
            </p>
            <div className="flex gap-4">
              <button 
                className="flex-1 py-3 bg-red-600 text-white font-black uppercase text-xs hover:bg-red-500 transition-all active:scale-95 shadow-[0_0_15px_rgba(220,38,38,0.4)]" 
                onClick={handleDelete}
              >
                YES
              </button>
              <button 
                className="flex-1 py-3 bg-[#222] border border-neutral-700 text-neutral-400 font-bold uppercase text-xs hover:bg-neutral-800 hover:text-white transition-colors" 
                onClick={() => setShowConfirm(false)}
              >
                NO
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-900/20 blur-[150px] rounded-full"></div>
      </div>

      {/* Responsive Navbar Fix */}
      <nav className="border-b border-emerald-500/20 px-4 md:px-8 py-4 md:py-6 flex flex-row justify-between items-center bg-black/50 backdrop-blur-md relative z-50 gap-2">
        <div className="flex items-center gap-2 md:gap-4">
          <div className="w-2 h-2 md:w-3 md:h-3 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981] animate-pulse"></div>
          <h1 className="text-xs sm:text-sm md:text-xl font-bold tracking-[3px] md:tracking-[8px] uppercase text-emerald-400 truncate">Class_Details</h1>
        </div>
        <button onClick={() => navigate("/TeacherHome")} className="whitespace-nowrap text-[8px] md:text-[10px] font-black tracking-[1px] md:tracking-[3px] border border-emerald-500/30 px-2 md:px-4 py-1.5 md:py-2 hover:bg-emerald-500 hover:text-black transition-all uppercase">
          Return_To_Base
        </button>
      </nav>

      <main className="flex-grow flex flex-col lg:flex-row p-8 gap-8 relative z-10 overflow-y-auto">
        <div className="flex-1 space-y-8">
          <section className="bg-neutral-900/20 border-l-4 border-emerald-500 p-10">
            <span className="text-emerald-500 text-xs font-bold tracking-[5px] uppercase">Main_Identification</span>
            <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-none mt-4">{classData.className}</h2>
            <div className="mt-8 inline-block bg-emerald-500/10 border border-emerald-500/40 px-6 py-2">
              <span className="text-emerald-400 font-bold uppercase tracking-[4px]">{classData.mode}</span>
            </div>
          </section>

          <section className="bg-neutral-900/10 border border-white/5 p-10">
            <span className="text-neutral-500 text-xs font-bold tracking-[5px] uppercase">Description</span>
            <p className="text-2xl text-neutral-400 leading-relaxed font-light italic mt-6 max-w-4xl">"{classData.description}"</p>

            <hr className="my-10 border-neutral-800" />

            <span className="text-emerald-500 text-xs font-bold tracking-[5px] uppercase block mb-8">Time_Schedule_Modules</span>
            <div className="flex flex-wrap gap-6">
              {schedules.map((sch) => (
                <div 
                  key={sch.id} 
                  onClick={() => navigate(`/ViewSchedule/${sch.id}`)}
                  className="w-40 h-40 bg-[#080808] border border-emerald-500/30 p-4 flex flex-col justify-between hover:border-emerald-500 transition-colors relative group cursor-pointer"
                >
                  <div className="text-emerald-500 text-[10px] font-black tracking-[2px] uppercase">{sch.dayOfWeek}</div>
                  <div className="flex flex-col">
                    <span className="text-lg font-bold tracking-tighter">{sch.startTime.slice(0, 5)}</span>
                    <span className="text-neutral-600 text-xs font-bold uppercase">To</span>
                    <span className="text-lg font-bold tracking-tighter">{sch.endTime.slice(0, 5)}</span>
                  </div>
                  <div className="absolute top-2 right-2 w-1 h-1 bg-emerald-500 rounded-full group-hover:animate-ping"></div>
                </div>
              ))}

              <button 
                onClick={() => navigate(`/AddSchedule/${classData.id}`)}
                className="w-40 h-40 bg-neutral-900/40 border-2 border-dashed border-neutral-800 flex flex-col items-center justify-center hover:border-emerald-500 group transition-all"
              >
                <div className="text-4xl text-neutral-700 group-hover:text-emerald-500 transition-colors">+</div>
                <span className="text-[9px] text-neutral-600 font-black uppercase tracking-[2px] mt-2 group-hover:text-emerald-400">Add_Time</span>
              </button>
            </div>
          </section>
        </div>

        <div className="w-full lg:w-[450px] flex flex-col gap-6">
          <div className="bg-[#080808] border border-emerald-500/20 p-8 flex flex-col gap-8 shadow-2xl">
            <h3 className="text-emerald-500 text-xs font-black tracking-[4px] border-b border-emerald-500/20 pb-4 uppercase">Core_Details</h3>
            {[
              { label: "Core_Subject", value: classData.subject },
              { label: "Grade_Target", value: classData.grade },
              { label: "Medium_Language", value: classData.language },
              { label: "Region", value: classData.district },
              { label: "Node_Location", value: classData.town }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col gap-1">
                <span className="text-[10px] text-neutral-600 font-bold tracking-[3px] uppercase">{item.label}</span>
                <span className="text-xl font-semibold tracking-wide text-white">{item.value}</span>
              </div>
            ))}
            <div className="mt-4 pt-8 border-t border-neutral-800">
              <span className="text-[10px] text-emerald-500 font-bold tracking-[3px] uppercase">Module_Valuation</span>
              <div className="text-4xl font-black tracking-tighter">LKR {classData.price.toLocaleString()}</div>
            </div>
          </div>

          <div className="bg-[#080808] border border-emerald-500/20 p-8 space-y-4">
            <button onClick={() => navigate(`/EditClass/${classData.id}`)} disabled={isDeleting} className="w-full py-5 bg-white text-black font-black uppercase text-xs tracking-[5px] hover:bg-emerald-500 transition-all disabled:opacity-50">
              EDIT CLASS
            </button>
            <button onClick={() => setShowConfirm(true)} disabled={isDeleting} className="w-full py-5 border-2 border-red-900 text-red-500 font-black uppercase text-xs tracking-[5px] hover:bg-red-600 hover:text-white transition-all disabled:opacity-50">
              Terminate Class
            </button>
            {message && (
              <div className={`text-center font-bold text-[10px] tracking-[2px] uppercase pt-4 ${message.includes("SUCCESS") ? "text-emerald-400" : "text-red-500 animate-pulse"}`}>
                {`> ${message}`}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}