import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { BiUserPlus } from 'react-icons/bi';
import UserIcon from '../assets/images/User-icon.png';
import AdminIcon from '../assets/images/Admin-icon.png';
import CrudUsuarioPop from './CrudPopUp';

interface CrudUsuarioProps {
  onClose: () => void;
}

const CrudUsuario: React.FC<CrudUsuarioProps> = ({ onClose }) => {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [cpf, setCpf] = useState('');
  const [cargo, setCargo] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [errors, setErrors] = useState<{
    nome?: string;
    email?: string;
    cpf?: string;
    cargo?: string;
    senha?: string;
    confirmarSenha?: string;
  }>({});

  const formatCpf = (value: string) => {
    const digits = value.replace(/\D/g, '');
    return digits
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      .slice(0, 14);
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCpf = formatCpf(e.target.value);
    setCpf(formattedCpf);
    if (formattedCpf.length === 14) {
      setErrors((prev) => ({ ...prev, cpf: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: {
      nome?: string;
      email?: string;
      cpf?: string;
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
    if (!cpf || cpf.length !== 14) newErrors.cpf = 'CPF inválido.';
    if (!cargo) newErrors.cargo = 'Cargo é obrigatório.';
    if (senha.length < 6) newErrors.senha = 'Senha deve ter pelo menos 6 caracteres.';
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
        if (value.length >= 6) setErrors((prev) => ({ ...prev, senha: undefined }));
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

  const handleCreate = () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setNome('');
    setSenha('');
    setConfirmarSenha('');
    setCpf('');
    setCargo('');
    setEmail('');
    setErrors({});
  };

  const iconSrc = cargo === 'desenvolvedor' ? AdminIcon : UserIcon;

  return (
    <div className="min-h-screen flex items-center justify-center absolute z-10">
      <button
        onClick={onClose}
        className="w-6 h-6 flex items-center justify-center absolute z-20 top-60 left-237 text-xl cursor-pointer hover:bg-gray-200 rounded-l"
      >
        x
      </button>
      <div className="relative w-252 min-h-128 bg-white shadow-lg rounded-xl p-6 animate-popup">
        {showPopup && (
          <CrudUsuarioPop
            userData={{ nome, email, cargo }}
            onClose={handleClosePopup}
            onCloseParent={onClose}
          />
        )}
        <div className="flex flex-row">
          <img
            src={iconSrc}
            alt={cargo === 'desenvolvedor' ? 'Admin Icon' : 'User Icon'}
            className="w-60 h-60 object-contain m-10"
          />
          <div className="flex flex-col pt-12">
            <div className="w-full">
              <label className="block text-gray-700 text-sm font-semibold mb-1 text-xl">Nome:</label>
              <div className="w-160 relative overflow-visible">
                <input
                  type="text"
                  placeholder="Adicione um nome completo"
                  value={nome}
                  onChange={(e) => handleInputChange('nome', e.target.value)}
                  className={`w-full px-4 py-2 border ${errors.nome ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2`}
                />
                {errors.nome && (
                  <p className="absolute text-red-500 text-sm right-4 bottom-[-1.25rem] text-left">{errors.nome}</p>
                )}
              </div>
            </div>
            <div className="w-full pt-3">
              <label className="block text-gray-700 text-sm font-semibold mb-1 text-xl">Senha:</label>
              <div className="w-160 relative overflow-visible">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Insira uma senha"
                  value={senha}
                  onChange={(e) => handleInputChange('senha', e.target.value)}
                  className={`w-full px-4 py-2 border ${errors.senha ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-2.75 text-gray-600 hover:text-gray-800 transition cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
                {errors.senha && (
                  <p className="absolute text-red-500 text-sm right-4 bottom-[-1.25rem] text-left">{errors.senha}</p>
                )}
              </div>
            </div>
            <div className="w-full pt-3">
              <label className="block text-gray-700 text-sm font-semibold mb-1 text-xl">Confirmar Senha:</label>
              <div className="w-160 relative overflow-visible">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirme a senha"
                  value={confirmarSenha}
                  onChange={(e) => handleInputChange('confirmarSenha', e.target.value)}
                  className={`w-full px-4 py-2 border ${errors.confirmarSenha ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-5 top-2.75 text-gray-600 hover:text-gray-800 transition cursor-pointer"
                >
                  {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
                {errors.confirmarSenha && (
                  <p className="absolute text-red-500 text-sm right-4 bottom-[-1.25rem] text-left">{errors.confirmarSenha}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="pt-1 pl-15">
            <label className="block text-gray-700 text-sm font-semibold mb-1 text-xl">CPF:</label>
            <div className="w-100 relative overflow-visible">
              <input
                type="text"
                placeholder="Adicione o CPF"
                value={cpf}
                onChange={handleCpfChange}
                className={`w-full px-4 py-2 border ${errors.cpf ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2`}
                maxLength={14}
              />
              {errors.cpf && (
                <p className="absolute text-red-500 text-sm right-4 bottom-[-1.25rem] text-left">{errors.cpf}</p>
              )}
            </div>
          </div>
          <div className="pt-1 pl-25">
            <label className="block text-gray-700 text-sm font-semibold mb-1 text-xl">Cargo:</label>
            <div className="w-99 relative overflow-visible">
              <select
                value={cargo}
                onChange={(e) => handleInputChange('cargo', e.target.value)}
                className={`w-full px-4 py-2 border ${errors.cargo ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2 text-gray-700`}
              >
                <option value="" disabled>Selecione um Cargo</option>
                <option value="desenvolvedor">Administrador</option>
                <option value="gerente">Viewer</option>
              </select>
              {errors.cargo && (
                <p className="absolute text-red-500 text-sm right-4 bottom-[-1.25rem] text-left">{errors.cargo}</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="w-full pt-1 pl-15">
            <label className="block text-gray-700 text-sm font-semibold mb-1 text-xl">Email:</label>
            <div className="w-150 relative overflow-visible">
              <input
                type="text"
                placeholder="Adicione um Email"
                value={email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2`}
              />
              {errors.email && (
                <p className="absolute text-red-500 text-sm right-4 bottom-[-1.25rem] text-left">{errors.email}</p>
              )}
            </div>
          </div>
          <div className="w-full pt-8 pl-15 pr-12.5 flex justify-end">
            <button
              type="submit"
              className="w-35 h-11.5 gap-2 text-xl font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition flex items-center cursor-pointer justify-center"
              onClick={handleCreate}
            >
              <BiUserPlus size={30} />
              Criar
            </button>
          </div>
        </div>
      </div>
      <style>
        {`
          @keyframes popup {
            0% {
              opacity: 0;
              transform: scale(0.8);
            }
            50% {
              opacity: 8;
              transform: scale(1.03);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }
          .animate-popup {
            animation: popup 0.35s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default CrudUsuario;