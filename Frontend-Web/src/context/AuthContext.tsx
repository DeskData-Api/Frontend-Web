import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

// Interface com base no token que você recebe
interface TokenPayload {
  id: number;
  nome: string;
  email: string;
  senha: string;
  cargo: string;
  data_criacao: string;
  iat: number;
}

interface AuthContextType {
  user: TokenPayload | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<TokenPayload | null>(null);
  const navigate = useNavigate();

  const login = async (email: string, senha: string) => {
    try {
      const response = await axios.post("http://localhost:3004/login", { email, senha });
      const { token } = response.data;

      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const decoded = jwtDecode<TokenPayload>(token);
      console.log("Payload do token:", decoded);
      setUser(decoded);

      navigate("/dashboard");
    } catch (error) {
      alert("Falha na autenticação!");
      console.error("Erro ao fazer login:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const decoded = jwtDecode<TokenPayload>(token);
        setUser(decoded);
      } catch (err) {
        console.error("Token inválido:", err);
        logout();
      }
    }
  }, []);

  const contextValue = useMemo(() => ({ user, login, logout }), [user]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  return context;
};
