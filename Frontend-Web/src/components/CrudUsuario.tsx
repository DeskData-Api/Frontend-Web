import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { BiUserPlus } from 'react-icons/bi';
import UserIcon from '../assets/images/User-icon.png';
import AdminIcon from '../assets/images/Admin-icon.png';
import axios from "axios";

interface CrudUsuarioProps {
  onClose: () => void;
  userToEdit?: {
    id: number;
    nome: string;
    email: string;
    cargo: "Administrativo" | "Visualizador";
  };
}

const CrudUsuario: React.FC<CrudUsuarioProps> = ({ onClose, userToEdit }) => {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [cargo, setCargo] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [errors, setErrors] = useState<{
    nome?: string;
    email?: string;
    cargo?: string;
    senha?: string;
    confirmarSenha?: string;
  }>({});

  const validateForm = () => {
    const newErrors: {
      nome?: string;
      email?: string;
      cargo?: string;
      senha?: string;
      confirmarSenha?: string;
    } = {};

    if (!nome.trim()) newErrors.nome = 'Nome é obrigatório.';
    if (!email.trim()) {
      newErrors.email = 'Email é obrigatório.';
    } else if (!email.includes('@') || !email.endsWith('.com')) {
      newErrors.email = 'Email deve conter @ e terminar com .com';
    }
    if (!cargo) newErrors.cargo = 'Cargo é obrigatório.';
    if (senha !== confirmarSenha) newErrors.confirmarSenha = 'Senhas não coincidem.';

    return newErrors;
  };

  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case 'nome':
        setNome(value);
        if (value.trim()) setErrors((prev) => ({ ...prev, nome: undefined }));
        break;
      case 'email':
        setEmail(value);
        if (value.trim() && value.includes('@') && value.endsWith('.com')) {
          setErrors((prev) => ({ ...prev, email: undefined }));
        }
        break;
      case 'senha':
        setSenha(value);
        if (value === confirmarSenha) setErrors((prev) => ({ ...prev, confirmarSenha: undefined }));
        break;
      case 'confirmarSenha':
        setConfirmarSenha(value);
        if (value === senha) setErrors((prev) => ({ ...prev, confirmarSenha: undefined }));
        break;
      case 'cargo':
        setCargo(value);
        if (value) setErrors((prev) => ({ ...prev, cargo: undefined }));
        break;
    }
  };

  useEffect(() => {
    if (userToEdit) {
      setNome(userToEdit.nome ?? '');
      setEmail(userToEdit.email ?? '');
      setCargo(userToEdit.cargo ?? 'Visualizador');
      // Não preenche senha por segurança
    }
  }, [userToEdit]);

  const handleSubmit = async () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload = {
      nome,
      email,
      senha,
      cargo,
      confirmarSenha,
    };

    try {
      if (userToEdit) {
        await axios.put(`${import.meta.env.VITE_API_URL}/usuario/atualizar/${userToEdit.id}`, payload);
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/usuario/criar`, payload);
      }

      onClose(); // fecha o popup imediatamente após sucesso
      window.location.reload(); // recarrega a página para refletir as mudanças
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
    }
  };

  const iconSrc = cargo === 'Administrador' ? AdminIcon : UserIcon;

  return (
    <div className="min-h-screen flex items-center justify-center absolute z-10 px-4">
      <div className="relative w-full max-w-5xl bg-white shadow-2xl rounded-xl p-8 animate-popup">
        {/* Botão de Fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl font-bold"
        >
          &times;
        </button>

        {/* Conteúdo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Coluna Esquerda - Avatar */}
          <div className="flex justify-center items-start pt-4">
            <img
              src={iconSrc}
              alt={cargo === 'Administrador' ? 'Admin Icon' : 'User Icon'}
              className="w-48 h-48 object-contain"
            />
          </div>

          {/* Coluna Direita - Formulário */}
          <div className="space-y-4">
            {/* Nome */}
            <div>
              <label className="text-lg font-semibold text-gray-700">Nome:</label>
              <input
                type="text"
                placeholder="Adicione um nome completo"
                value={nome}
                onChange={(e) => handleInputChange('nome', e.target.value)}
                className={`w-full px-4 py-2 mt-1 border ${errors.nome ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
              />
            </div>

            {/* Senha */}
            <div className="relative">
              <label className="text-lg font-semibold text-gray-700">Senha:</label>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Insira uma senha"
                value={senha}
                onChange={(e) => handleInputChange('senha', e.target.value)}
                className={`w-full px-4 py-2 mt-1 border ${errors.senha ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-9 right-4 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>

            {/* Confirmar Senha */}
            <div className="relative">
              <label className="text-lg font-semibold text-gray-700">Confirmar Senha:</label>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirme a senha"
                value={confirmarSenha}
                onChange={(e) => handleInputChange('confirmarSenha', e.target.value)}
                className={`w-full px-4 py-2 mt-1 border ${errors.confirmarSenha ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-9 right-4 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>

            {/* Cargo */}
            <div>
              <label className="text-lg font-semibold text-gray-700">Cargo:</label>
              <select
                value={cargo}
                onChange={(e) => handleInputChange('cargo', e.target.value)}
                className={`w-full px-4 py-2 mt-1 border ${errors.cargo ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
              >
                <option value="" disabled>Selecione um Cargo</option>
                <option value="Administrador">Administrador</option>
                <option value="Visualizador">Visualizador</option>
              </select>
            </div>

            {/* Email */}
            <div>
              <label className="text-lg font-semibold text-gray-700">Email:</label>
              <input
                type="text"
                placeholder="Adicione um email"
                value={email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full px-4 py-2 mt-1 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
              />
            </div>

            {/* Botão Criar/Salvar */}
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={handleSubmit}
                className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                <BiUserPlus size={22} />
                {userToEdit ? "Salvar" : "Criar"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes popup {
            0% { opacity: 0; transform: scale(0.9); }
            100% { opacity: 1; transform: scale(1); }
          }
          .animate-popup {
            animation: popup 0.3s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default CrudUsuario;