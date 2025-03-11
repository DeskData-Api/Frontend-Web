import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import RiveAnimation from "../components/RiveAnimation.tsx";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <RiveAnimation animationFile="/animations/login-animation.riv" stateMachine="LoginState" />
      <div className="p-6 bg-white shadow-md rounded-md">
        <h2 className="text-lg font-semibold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded-md mb-2" />
          <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded-md mb-2" />
          <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded-md">Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
