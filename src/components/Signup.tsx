import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../componentCSS/Signup.css";

interface StudentForm {
  fname: string;
  lname: string;
  email: string;
  contact: string;
  username: string;
  password: string;
}

interface TeacherForm extends StudentForm {
  experienceYears: string;
}

type UserType = "student" | "teacher";

export default function Signup() {
  const [userType, setUserType] = useState<UserType>("student");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const [studentData, setStudentData] = useState<StudentForm>({
    fname: "", lname: "", email: "", contact: "", username: "", password: "",
  });

  const [teacherData, setTeacherData] = useState<TeacherForm>({
    fname: "", lname: "", email: "", contact: "", username: "", password: "", experienceYears: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("error");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (userType === "student") {
      setStudentData({ ...studentData, [name]: value });
    } else {
      setTeacherData({ ...teacherData, [name]: value });
    }
  };

  const validateForm = (): boolean => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
    const contactPattern = /^\d{10}$/;
    const data = userType === "student" ? studentData : teacherData;

    if (!contactPattern.test(data.contact)) {
      setMessage("Contact number must be exactly 10 digits.");
      setMessageType("error");
      return false;
    }
    if (!passwordPattern.test(data.password)) {
      setMessage("Password must include uppercase, lowercase, number, symbol, and be 10+ characters.");
      setMessageType("error");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const endpoint = userType === "student"
          ? "http://localhost:8083/api/students/signup"
          : "http://localhost:8082/api/teachers/signup";

      const payload = userType === "student" ? studentData : teacherData;
      await axios.post(endpoint, payload);
      
      setMessage("Signup successful! Redirecting to login...");
      setMessageType("success");
      setTimeout(() => navigate("/Login"), 2000);

    } catch (error: unknown) {
      setMessageType("error");
      if (axios.isAxiosError(error) && error.response) {
        const data = error.response.data as { message?: string; error?: string };
        setMessage(data.message || data.error || "Signup failed!");
      } else {
        setMessage("An unexpected error occurred.");
      }
    }
  };

  const handleCancel = () => {
    const emptyForm = { fname: "", lname: "", email: "", contact: "", username: "", password: "" };
    setStudentData(emptyForm);
    setTeacherData({ ...emptyForm, experienceYears: "" });
    setMessage("");
  };

  const currentData = userType === "student" ? studentData : teacherData;

  return (
    <div className="bg-black min-h-screen flex items-center justify-center p-4 font-['Orbitron']">
      {/* Box with original glow and scan effect class */}
      <div className="signup-box-glow relative w-full max-w-[500px] bg-[#0a0a0a] border border-cyan-500/30 p-6 md:p-10 rounded-xl text-white shadow-[0_0_30px_rgba(0,255,200,0.4)] overflow-hidden">
        
        {/* Title Section */}
        <div className="flex justify-center mb-8">
          <div className="w-fit">
            <h2 className="signup-typing-title text-lg md:text-2xl font-bold text-cyan-400 tracking-widest border-r-4 border-cyan-400">
              USER_SIGNUP
            </h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          {/* Dropdown Selection */}
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
              <div className="absolute z-50 left-0 right-0 mt-1 bg-neutral-900 border border-cyan-500/50 shadow-2xl custom-dropdown-list">
                <div 
                  className="p-3 hover:bg-cyan-500/20 cursor-pointer text-cyan-400 border-b border-neutral-800 text-sm transition-colors"
                  onClick={() => { setUserType("student"); setIsDropdownOpen(false); }}
                >
                  STUDENT_UNIT
                </div>
                <div 
                  className="p-3 hover:bg-cyan-500/20 cursor-pointer text-cyan-400 text-sm transition-colors"
                  onClick={() => { setUserType("teacher"); setIsDropdownOpen(false); }}
                >
                  TEACHER_UNIT
                </div>
              </div>
            )}
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="fname" placeholder="First Name" value={currentData.fname} onChange={handleChange} required className="p-3 bg-transparent border-b-2 border-neutral-800 text-cyan-300 placeholder:text-neutral-700 focus:border-cyan-400 outline-none text-base transition-all" />
            <input type="text" name="lname" placeholder="Last Name" value={currentData.lname} onChange={handleChange} required className="p-3 bg-transparent border-b-2 border-neutral-800 text-cyan-300 placeholder:text-neutral-700 focus:border-cyan-400 outline-none text-base transition-all" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="contact" placeholder="Contact" value={currentData.contact} onChange={handleChange} required className="p-3 bg-transparent border-b-2 border-neutral-800 text-cyan-300 placeholder:text-neutral-700 focus:border-cyan-400 outline-none text-base transition-all" />
            <input type="text" name="username" placeholder="Username" value={currentData.username} onChange={handleChange} required className="p-3 bg-transparent border-b-2 border-neutral-800 text-cyan-300 placeholder:text-neutral-700 focus:border-cyan-400 outline-none text-base transition-all" />
          </div>

          <input type="email" name="email" placeholder="Email Address" value={currentData.email} onChange={handleChange} required className="w-full p-3 bg-transparent border-b-2 border-neutral-800 text-cyan-300 placeholder:text-neutral-700 focus:border-cyan-400 outline-none text-base transition-all" />
          <input type="password" name="password" placeholder="Password" value={currentData.password} onChange={handleChange} required className="w-full p-3 bg-transparent border-b-2 border-neutral-800 text-cyan-300 placeholder:text-neutral-700 focus:border-cyan-400 outline-none text-base transition-all" />

          {userType === "teacher" && (
            <input type="number" name="experienceYears" placeholder="Years of Experience" value={teacherData.experienceYears} onChange={handleChange} required className="w-full p-3 bg-transparent border-b-2 border-neutral-800 text-cyan-300 placeholder:text-neutral-700 focus:border-cyan-400 outline-none text-base transition-all" />
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button type="button" onClick={handleCancel} className="flex-1 py-3 border border-neutral-700 text-neutral-500 hover:text-white hover:bg-neutral-900 rounded uppercase text-[10px] md:text-xs transition-all tracking-[2px]">Cancel</button>
            <button type="submit" className="flex-[2] py-3 bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-bold rounded uppercase shadow-[0_0_15px_rgba(0,150,255,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] hover:from-blue-700 hover:to-cyan-600 transition-all text-xs md:text-sm tracking-[2px]">Sign Up</button>
          </div>

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