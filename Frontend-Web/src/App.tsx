import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Profile from "./pages/Profile"


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/usuarios" element={<Users />} />
      <Route path="/profile" element={<Profile />} />
      
    </Routes>
  );
}

export default App;
