import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Login from "./components/Login";
import Signup from "./components/Signup";
import ViewAccount from "./components/ViewAccount";
import EditAccount from "./components/EditAccount";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/account" element={<ViewAccount />} />
        <Route path="/edit" element={<EditAccount />} />
      </Routes>
    </Router>
  )
}

export default App
