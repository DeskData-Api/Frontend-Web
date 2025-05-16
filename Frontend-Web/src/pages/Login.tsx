import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import LogoIcon from "../assets/images/LogoAPI.png";
import TelaFundoDireito from '../assets/images/TelaFundoDireito.png';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Verifica se os dados correspondem a "admin"
    if (email === "admin@gmail.com" && password === "admin") {
      navigate("/dashboard");
    } else {
      login(email, password);
      alert("Credenciais inválidas!");
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-full md:w-1/2 flex justify-center items-center bg-white p-8">
        <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-6">
          <img
            src={LogoIcon}
            alt="Logo"
            className="absolute top-4 left-4"
            style={{ width: "150px", height: "auto" }} // Logo menor
          />
          <h2 className="text-2xl font-semibold text-center text-[#34A9E9] mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md mb-4"
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md mb-4"
            />
            <button
              type="submit"
              className="w-full py-3 bg-[#34A9E9] text-white font-semibold rounded-md hover:bg-[#2D94CC]"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
      <div
        className="hidden md:flex w-1/2 justify-center items-center p-12"
        style={{
          backgroundImage: `url(${TelaFundoDireito})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        
      </div>
    </div>
  );
};

export default Login;
