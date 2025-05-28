import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Historico from "./pages/Historico"
import InputCsv from "./pages/InputCsv";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/historico" element={<Historico />} />
      <Route path="/usuarios" element={<AdminRoute><Users /></AdminRoute>} />
      <Route path="/inserircsv" element={<AdminRoute><InputCsv /></AdminRoute>} />
    </Routes>
  );
}

export default App;
