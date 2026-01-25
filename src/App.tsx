import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Login from "./components/Login";
import Signup from "./components/Signup";
import ViewAccount from "./components/ViewAccount";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/account" element={<ViewAccount />} />
      </Routes>
    </Router>
  )
}

export default App
