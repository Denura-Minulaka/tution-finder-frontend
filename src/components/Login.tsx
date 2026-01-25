import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../componentCSS/Login.css";

type UserType = "student" | "teacher";

interface LoginData {
  username: string;
  password: string;
}

export default function Login() {
  const [userType, setUserType] = useState<UserType>("student");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState<LoginData>({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("error");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const endpoint = userType === "student"
          ? "http://localhost:8083/api/students/login"
          : "http://localhost:8082/api/teachers/login";

      const response = await axios.post(endpoint, loginData);
      
      // --- CRITICAL STORAGE FOR NAVBAR LOGIC ---
      localStorage.setItem("accessToken", response.data.token);
      localStorage.setItem("token", response.data.token); // Standard key for auth check
      localStorage.setItem("userRole", userType); // Saves 'student' or 'teacher'
      
      setMessageType("success");
      setMessage("ACCESS_GRANTED");

      // --- DYNAMIC NAVIGATION ---
      if (userType === "student") {
        navigate("/StudentHome");
      } else {
        navigate("/TeacherHome");
      }

    } catch (error: unknown) {
      setMessageType("error");
      if (axios.isAxiosError(error) && error.response) {
        const data = error.response.data as { message?: string; error?: string };
        setMessage(data.message || data.error || "Login failed!");
      } else {
        setMessage("Unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setLoginData({ username: "", password: "" });
    setMessage("");
  };

  return (
    <div className="login-page-wrapper bg-black flex items-center justify-center min-h-screen p-4 font-['Orbitron']">
      
      {/* The Cyberpunk Box */}
      <div className="login-box-glow relative w-full max-w-[400px] bg-[#0a0a0a] border border-cyan-500/30 p-6 md:p-10 rounded-xl text-white shadow-[0_0_30px_rgba(0,255,200,0.4)] overflow-hidden">
        
        {/* Title Section */}
        <div className="flex justify-center mb-8">
          <div className="w-fit">
            <h2 className="typing-title text-lg md:text-2xl font-bold text-cyan-400 tracking-widest uppercase border-r-4 border-cyan-400">
              USER_LOGIN
            </h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          
          {/* Unit Selection Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <label className="block text-[10px] text-cyan-500 tracking-[3px] mb-1 font-bold">IDENTIFICATION</label>
            <div
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full p-3 bg-neutral-950 border-b-2 border-neutral-800 text-cyan-400 flex justify-between items-center cursor-pointer hover:border-cyan-400 transition-colors"
            >
              <span className="text-sm md:text-base tracking-wider">{userType === "student" ? "STUDENT_UNIT" : "TEACHER_UNIT"}</span>
              <span className="text-[10px]">{isDropdownOpen ? "▲" : "▼"}</span>
            </div>

            {isDropdownOpen && (
              <div className="absolute z-50 left-0 right-0 mt-1 bg-neutral-900 border border-cyan-500/50 shadow-2xl custom-dropdown-list max-h-40 overflow-y-auto">
                <div className="p-3 hover:bg-cyan-500/20 cursor-pointer text-cyan-400 border-b border-neutral-800 text-sm tracking-wider transition-colors"
                  onClick={() => { setUserType("student"); setIsDropdownOpen(false); }}>
                  STUDENT_UNIT
                </div>
                <div className="p-3 hover:bg-cyan-500/20 cursor-pointer text-cyan-400 text-sm tracking-wider transition-colors"
                  onClick={() => { setUserType("teacher"); setIsDropdownOpen(false); }}>
                  TEACHER_UNIT
                </div>
              </div>
            )}
          </div>

          {/* Input Fields */}
          <div className="space-y-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={loginData.username}
              onChange={handleChange}
              required
              className="w-full p-3 bg-transparent border-b-2 border-neutral-800 text-cyan-300 placeholder:text-neutral-700 focus:border-cyan-400 outline-none text-base transition-all"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleChange}
              required
              className="w-full p-3 bg-transparent border-b-2 border-neutral-800 text-cyan-300 placeholder:text-neutral-700 focus:border-cyan-400 outline-none text-base transition-all"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 py-3 border border-neutral-700 text-neutral-500 hover:text-white hover:bg-neutral-900 rounded uppercase text-[10px] md:text-xs transition-all tracking-[2px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-[2] py-3 bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-bold rounded uppercase shadow-[0_0_15px_rgba(0,150,255,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] hover:from-blue-700 hover:to-cyan-600 transition-all text-xs md:text-sm tracking-[2px]"
            >
              {loading ? "..." : "Login"}
            </button>
          </div>

          {/* Feedback Message */}
          {message && (
            <div className={`text-center font-bold text-[10px] md:text-xs mt-2 tracking-widest ${messageType === "success" ? "text-green-400" : "text-red-500 animate-pulse"}`}>
              {`> ${message}`}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}