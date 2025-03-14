import { Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Login />} /> */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/usuarios" element={<Users />} />
    </Routes>
  );
}

export default App;
