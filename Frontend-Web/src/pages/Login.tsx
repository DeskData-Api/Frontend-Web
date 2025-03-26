import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import RiveAnimation from "../components/RiveAnimation.tsx";
import LogoIcon from "../assets/images/Logo-Icon.png";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Verifica se os dados correspondem a "admin"
    if (email === "admin@gmail" && password === "admin") {
      navigate("/dashboard"); 
    } else {
      login(email, password); 
      alert("Credenciais inválidas!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <img src={LogoIcon} alt="Logo" className="mb-4" style={{ width: "250px", height: "auto" }} />
      <h1 className="text-lg font-semibold mb-4" style={{ color: "#34A9E9", fontSize: 30 }}>DeskData</h1>
      <div className="p-6 bg-white shadow-md rounded-md mt-4">
        <h2 className="text-lg font-semibold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md mb-2"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md mb-2"
          />
          <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-[#2D94CC]">
            Entrar
          </button>
          <RiveAnimation animationFile="/animations/login-animation.riv" stateMachine="LoginState" />
        </form>
      </div>
    </div>
  );
};

export default Login;
