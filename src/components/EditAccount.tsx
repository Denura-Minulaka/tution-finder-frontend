import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../componentCSS/EditAccount.css";

interface UpdateForm {
  id: number;
  fname: string;
  lname: string;
  email: string;
  contact: string;
  username: string;
  password?: string;
  experienceYears?: string;
}

function getUserIdFromToken(token: string): number | null {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    // payload.sub usually contains the user ID in standard JWT
    return parseInt(payload.sub);
  } catch {
    return null;
  }
}

export default function EditAccount() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("error");
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState<UpdateForm>({
    id: 0,
    fname: "",
    lname: "",
    email: "",
    contact: "",
    username: "",
    password: "",
    experienceYears: "",
  });

  useEffect(() => {
    const fetchCurrentData = async () => {
      // Accessing standard keys used in your updated login logic
      const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
      const storedUserType = localStorage.getItem("userRole"); 
      const userId = token ? getUserIdFromToken(token) : null;

      if (!token || !storedUserType || !userId) {
        navigate("/login");
        return;
      }

      setUserType(storedUserType);

      try {
        const endpoint = storedUserType === "student"
          ? `http://localhost:8083/api/students/${userId}`
          : `http://localhost:8082/api/teachers/${userId}`;

        const response = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Pre-fill form, keep password empty for security
        setFormData({ ...response.data, password: "" }); 
      } catch {
        setMessage("FAILED_TO_LOAD_USER_DATA");
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentData();
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = (): boolean => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
    const contactPattern = /^\d{10}$/;

    if (!contactPattern.test(formData.contact)) {
      setMessage("CONTACT_ERROR: Must be 10 digits.");
      setMessageType("error");
      return false;
    }

    if (formData.password && formData.password.length > 0) {
      if (!passwordPattern.test(formData.password)) {
        setMessage("SECURITY_ERROR: Pass must be 10+ chars with Mix.");
        setMessageType("error");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const token = localStorage.getItem("token") || localStorage.getItem("accessToken");

    try {
      const endpoint = userType === "student"
        ? "http://localhost:8083/api/students/update"
        : "http://localhost:8082/api/teachers/update";

      await axios.put(endpoint, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessageType("success");
      setMessage("UPDATE_SUCCESSFUL: SYSTEM_SYNCED");
      setTimeout(() => navigate("/account"), 1500);
    } catch (error: unknown) {
      setMessageType("error");
      if (axios.isAxiosError(error) && error.response) {
        const data = error.response.data as { message?: string; error?: string };
        setMessage(data.message || data.error || "UPDATE_FAILED");
      } else {
        setMessage("UNEXPECTED_CORE_ERROR");
      }
    }
  };

  if (loading && !message) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center font-['Orbitron']">
        <p className="text-cyan-400 tracking-[10px] animate-pulse uppercase">Syncing_Identity...</p>
      </div>
    );
  }

  return (
    <div className="bg-black flex items-center justify-center min-h-screen p-4 font-['Orbitron']">
      
      <div className="edit-box-glow relative w-full max-w-[500px] p-6 md:p-10 bg-[#0a0a0a] border border-cyan-500/30 rounded-xl text-white shadow-[0_0_30px_rgba(0,255,200,0.4)] overflow-hidden">
        
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400 shadow-[0_0_15px_#00ffff]"></div>

        <div className="flex justify-center mb-8 relative z-20">
          <div className="w-fit">
            <h2 className="edit-typing-title text-lg md:text-2xl font-bold text-cyan-400 tracking-widest border-r-4 border-cyan-400">
              EDIT ACCOUNT
            </h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[9px] text-cyan-500/50 tracking-widest uppercase">First_Name</label>
              <input type="text" name="fname" value={formData.fname} onChange={handleChange} required className="p-3 bg-transparent border-b-2 border-neutral-800 text-cyan-300 focus:border-cyan-400 outline-none transition-all" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[9px] text-cyan-500/50 tracking-widest uppercase">Last_Name</label>
              <input type="text" name="lname" value={formData.lname} onChange={handleChange} required className="p-3 bg-transparent border-b-2 border-neutral-800 text-cyan-300 focus:border-cyan-400 outline-none transition-all" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[9px] text-cyan-500/50 tracking-widest uppercase">Contact_Unit</label>
              <input type="text" name="contact" value={formData.contact} onChange={handleChange} required className="p-3 bg-transparent border-b-2 border-neutral-800 text-cyan-300 focus:border-cyan-400 outline-none transition-all" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[9px] text-cyan-500/50 tracking-widest uppercase">Username_Id</label>
              <input type="text" name="username" value={formData.username} onChange={handleChange} required className="p-3 bg-transparent border-b-2 border-neutral-800 text-cyan-300 focus:border-cyan-400 outline-none transition-all" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[9px] text-neutral-600 tracking-widest uppercase">Primary_Email (Read Only)</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              readOnly 
              className="w-full p-3 bg-transparent border-b-2 border-neutral-900 text-neutral-600 cursor-not-allowed outline-none opacity-50" 
            />
          </div>
          
          <div className="flex flex-col gap-1">
            <label className="text-[9px] text-cyan-500/50 tracking-widest uppercase">Security_Key (Empty to keep)</label>
            <input 
              type="password" 
              name="password" 
              placeholder="ENTER_NEW_ENCRYPTION" 
              value={formData.password} 
              onChange={handleChange} 
              className="w-full p-3 bg-transparent border-b-2 border-neutral-800 text-cyan-300 placeholder:text-neutral-700 focus:border-cyan-400 outline-none transition-all" 
            />
          </div>

          {userType === "teacher" && (
            <div className="flex flex-col gap-1">
              <label className="text-[9px] text-cyan-500/50 tracking-widest uppercase">Exp_Years</label>
              <input type="number" name="experienceYears" value={formData.experienceYears} onChange={handleChange} required className="w-full p-3 bg-transparent border-b-2 border-neutral-800 text-cyan-300 focus:border-cyan-400 outline-none transition-all" />
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <button 
                type="button" 
                onClick={() => navigate("/account")} 
                className="flex-1 py-3 border border-neutral-700 text-neutral-500 hover:text-white hover:bg-neutral-900 rounded uppercase text-[10px] tracking-[2px] transition-all"
            >
                Cancel
            </button>
            <button 
                type="submit" 
                className="flex-[2] py-3 bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-bold rounded uppercase shadow-[0_0_15px_rgba(0,150,255,0.4)] hover:shadow-[0_0_30px_rgba(0,255,200,0.6)] transition-all text-xs tracking-[2px]"
            >
                Save Changes
            </button>
          </div>

          {message && (
            <div className={`text-center font-bold text-[10px] mt-2 tracking-widest ${messageType === "success" ? "text-green-400" : "text-red-500 animate-pulse"}`}>
              {`> ${message}`}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}