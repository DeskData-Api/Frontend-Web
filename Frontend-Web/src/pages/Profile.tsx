import React, { useState } from "react";

interface EditAccountModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: { name: string; avatar: string };
}

const EditAccountModal: React.FC<EditAccountModalProps> = ({ isOpen, onClose, user }) => {
    const [name, setName] = useState(user.name);
    const [avatar, setAvatar] = useState(user.avatar);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSaveChanges = () => {
        alert(`Alterações salvas:\nNome: ${name}\nEmail: ${email}`);
        onClose();
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setAvatar(URL.createObjectURL(e.target.files[0]));
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4 text-black">Editar Conta</h2>
                <div className="flex flex-col items-center mb-6">
                    <div
                        className="relative w-24 h-24 rounded-full border-2 border-blue-500 cursor-pointer hover:opacity-50"
                        onClick={() => document.getElementById("avatarInput")?.click()}
                    >
                        <img
                            src={avatar}
                            alt="Avatar do usuário"
                            className="w-full h-full rounded-full object-cover"
                        />
                        <input
                            type="file"
                            id="avatarInput"
                            className="hidden"
                            onChange={handleAvatarChange}
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1 text-black">Nome</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md text-black"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1 text-black">E-mail</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md text-black"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1 text-black">Senha</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md text-black"
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 px-4 py-2 rounded-md mr-2 text-black cursor-pointer"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSaveChanges}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
                    >
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditAccountModal;
