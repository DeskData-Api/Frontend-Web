import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Profile from "./pages/Profile"
import CrudUsuario from "./components/CrudUsuario";
import Historico from "./pages/Historico"
import InputCsv from "./pages/InputCsv";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/historico" element={<Historico />} />
      <Route path="/usuarios" element={<Users />} />
      <Route path="/inserircsv" element={<InputCsv />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/crud" element={<CrudUsuario />} />

    </Routes>
  );
}

export default App;
