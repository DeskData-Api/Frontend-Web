import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Historico from "./pages/Historico"


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/historico" element={<Historico />} />
      <Route path="/usuarios" element={<Users />} />
    </Routes>
  );
}

export default App;
