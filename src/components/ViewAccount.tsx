import React, { useEffect, useState } from "react";
import axios from "axios";
import "../componentCSS/ViewAccount.css";
import { useNavigate } from "react-router-dom";

type UserType = "student" | "teacher";

interface AccountData {
  id: number;
  fname: string;
  lname: string;
  email: string;
  contact: string;
  username: string;
  experienceYears?: string;
}

function getUserIdFromToken(token: string): number | null {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    // payload.sub usually contains the user ID in JWT
    return parseInt(payload.sub);
  } catch {
    return null;
  }
}

export default function ViewAccount() {
  const [accountData, setAccountData] = useState<AccountData | null>(null);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("error");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccount = async () => {
      // Standardized keys from our updated Login logic
      const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
      const storedUserType = localStorage.getItem("userRole") as UserType;
      
      if (!token || !storedUserType) {
        navigate("/login");
        return;
      }

      setUserType(storedUserType);
      const userId = getUserIdFromToken(token);
      
      if (!userId) {
        setMessage("SESSION_INVALID: Please re-login.");
        setMessageType("error");
        return;
      }

      try {
        const endpoint = storedUserType === "student"
            ? `http://localhost:8083/api/students/${userId}`
            : `http://localhost:8082/api/teachers/${userId}`;

        const response = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAccountData(response.data);
      } catch (err) {
        console.error(err);
        setMessage("ERROR: UNABLE_TO_REACH_DATABASE");
        setMessageType("error");
      }
    };
    fetchAccount();
  }, [navigate]);

  const deleteAccount = async () => {
    if (!accountData || !userType) return;
    const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
    if (!token) return;

    try {
      const endpoint = userType === "student"
          ? `http://localhost:8083/api/students/${accountData.id}`
          : `http://localhost:8082/api/teachers/${accountData.id}`;

      await axios.delete(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessageType("success");
      setMessage("ACCOUNT_DELETED: SYSTEM_CLEAN");
      
      // Clear all session data
      localStorage.clear();
      setAccountData(null);
      
      // Navigate to home after a delay
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 2000);
    } catch {
      setMessageType("error");
      setMessage("FAILED_TO_TERMINATE_ACCOUNT");
    }
    setShowConfirm(false);
  };

  if (!accountData && !message)
    return (
      <div className="bg-black flex items-center justify-center min-h-screen p-4 font-['Orbitron']">
        <div className="view-box-glow w-full max-w-[500px] p-10 bg-[#0a0a0a] border border-cyan-500/30 rounded-xl text-white text-center shadow-[0_0_30px_rgba(0,255,200,0.4)]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
            <h2 className="text-cyan-400 font-bold tracking-widest uppercase">Fetching_Data...</h2>
          </div>
        </div>
      </div>
    );

  return (
    <div className="bg-black flex items-center justify-center min-h-screen p-4 font-['Orbitron'] relative overflow-hidden">
      
      {/* Confirmation Popup */}
      {showConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="popup-animation bg-[#0d0d0d] border-2 border-red-500 p-8 rounded-xl w-full max-w-[330px] text-center shadow-[0_0_30px_rgba(255,0,0,0.3)]">
            <h3 className="text-red-500 text-xl font-bold tracking-widest mb-2 uppercase">TERMINATE?</h3>
            <p className="text-neutral-400 text-sm mb-6 tracking-tight uppercase">This action is permanent and cannot be undone.</p>
            <div className="flex gap-4">
              <button 
                className="flex-1 py-3 bg-red-600 text-white font-bold rounded uppercase text-xs shadow-[0_0_15px_rgba(255,0,0,0.4)] hover:bg-red-700 hover:scale-105 transition-all" 
                onClick={deleteAccount}
              >
                Confirm
              </button>
              <button 
                className="flex-1 py-3 bg-[#222] border border-neutral-700 text-neutral-400 font-bold rounded uppercase text-xs hover:bg-neutral-800 hover:text-white transition-colors" 
                onClick={() => setShowConfirm(false)}
              >
                Abort
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Account Box */}
      <div className="view-box-glow relative w-full max-w-[500px] p-6 md:p-10 bg-[#0a0a0a] border border-cyan-500/30 rounded-xl text-white shadow-[0_0_30px_rgba(0,255,200,0.4)] z-10 overflow-hidden">
        
        <div className="flex justify-center mb-10 relative z-20">
          <div className="w-fit">
            <h2 className="view-typing-title text-lg md:text-2xl font-bold text-cyan-400 tracking-[5px] uppercase border-r-4 border-cyan-400">
              {userType === "teacher" ? "TEACHER_PROFILE" : "STUDENT_PROFILE"}
            </h2>
          </div>
        </div>

        <div className="space-y-6 text-sm md:text-base relative z-20">
          {[
            { label: "First Name", value: accountData?.fname },
            { label: "Last Name", value: accountData?.lname },
            { label: "Email", value: accountData?.email },
            { label: "Contact", value: accountData?.contact },
            { label: "Username", value: accountData?.username },
          ].map((item, idx) => (
            <div key={idx} className="border-b border-neutral-800 pb-2 flex flex-col sm:flex-row sm:justify-between group transition-all">
              <span className="text-cyan-500/60 text-[10px] uppercase tracking-[3px] mb-1 sm:mb-0 group-hover:text-cyan-400">{item.label}</span>
              <span className="font-medium tracking-wider break-all">{item.value || "---"}</span>
            </div>
          ))}

          {userType === "teacher" && (
            <div className="border-b border-neutral-800 pb-2 flex flex-col sm:flex-row sm:justify-between group">
              <span className="text-cyan-500/60 text-[10px] uppercase tracking-[3px] mb-1 sm:mb-0 group-hover:text-cyan-400">Experience</span>
              <span className="font-medium tracking-wider">{accountData?.experienceYears || "0"} Years</span>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-10 relative z-20">
          <button 
            onClick={() => navigate("/edit")} 
            className="flex-1 py-3 border border-cyan-500/30 text-cyan-500 hover:text-white hover:bg-cyan-500/10 rounded-sm uppercase text-[10px] md:text-xs tracking-[4px] transition-all order-2 sm:order-1"
          >
            EDIT_CORE
          </button>
          <button 
            onClick={() => setShowConfirm(true)} 
            className="flex-1 py-3 bg-gradient-to-r from-red-600 to-red-900 text-white font-bold rounded-sm uppercase shadow-[0_0_20px_rgba(255,0,0,0.3)] hover:brightness-125 transition-all text-[10px] md:text-xs tracking-[4px] order-1 sm:order-2"
          >
            TERMINATE
          </button>
        </div>

        {message && (
          <div className={`relative z-20 text-center font-bold text-[10px] md:text-xs mt-6 tracking-widest ${messageType === "success" ? "text-emerald-400" : "text-red-500 animate-pulse"}`}>
            {`> ${message}`}
          </div>
        )}
      </div>
    </div>
  );
}