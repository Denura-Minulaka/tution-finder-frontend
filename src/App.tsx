import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Login from "./components/Login";
import Signup from "./components/Signup";
import ViewAccount from "./components/ViewAccount";
import EditAccount from "./components/EditAccount";
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TeacherHome from "./components/TeacherHome";
import AddClass from "./components/AddClass";
import ViewClass from "./components/ViewClass";
import EditClass from "./components/EditClass";

function App() {

  return (
    <Router>
      <Navbar /> 

      <main className="pt-24 min-h-screen bg-black flex flex-col">
        <div className="flex-grow">

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/account" element={<ViewAccount />} />
            <Route path="/edit" element={<EditAccount />} />
            <Route path="/TeacherHome" element={<TeacherHome />} />
            <Route path="/AddClass" element={<AddClass />} />
            <Route path="/ViewClass/:id" element={<ViewClass />} />
            <Route path="/EditClass/:id" element={<EditClass />} />
          </Routes>
          
        </div>

        <Footer/>
        
        </main>
      
    </Router>
  )
}

export default App
