import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom"; // Importando useLocation
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/images/LogoAPI.png";
import avatar from "../../assets/react.svg";

const Header: React.FC = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { logout } = useAuth();
  const location = useLocation(); // Obtém a URL atual

  const user = {
    name: "João Silva",
    avatar: avatar,
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
      {/* Lado Esquerdo: Logo + Navegação */}
      <div className="flex items-center gap-6">
        {/* Logo do Site */}
        <Link to="/">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
        </Link>

        {/* Botões de Navegação */}
        <nav className="flex gap-6">
          <Link
            to="/dashboard"
            className={`relative hover:text-gray-300 transition ${
              location.pathname === "/dashboard" ? "after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[2px] after:bg-white" : ""
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/usuarios"
            className={`relative hover:text-gray-300 transition ${
              location.pathname === "/usuarios" ? "after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[2px] after:bg-white" : ""
            }`}
          >
            Usuários
          </Link>
        </nav>
      </div>

      {/* Lado Direito: Nome do usuário + Ícone */}
      <div className="relative flex items-center gap-2" ref={dropdownRef}>
        <span className="text-sm font-medium">{user.name}</span>
        <button onClick={() => setDropdownOpen(!isDropdownOpen)} className="focus:outline-none">
          <img
            src={user.avatar}
            alt="Usuário"
            className="h-10 w-10 rounded-full border-2 border-gray-400 hover:border-white transition"
          />
        </button>

        {/* Dropdown (Menu do Usuário) */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 shadow-lg rounded-md">
            <ul>
              <li>
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">
                  Perfil
                </Link>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  Sair
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
