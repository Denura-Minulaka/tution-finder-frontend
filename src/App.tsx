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
          </Routes>
          
        </div>

        <Footer/>
        
        </main>
      
    </Router>
  )
}

export default App
