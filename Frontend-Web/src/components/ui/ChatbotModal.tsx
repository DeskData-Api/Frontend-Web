import React, { useState, useEffect } from "react";

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatbotModal: React.FC<ChatbotModalProps> = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [responses, setResponses] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 300); // Tempo da animação
    }
  }, [isOpen]);

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    // Simulação de resposta do PLN (Substituir pela integração real)
    const botResponse = `🤖 Resposta do PLN para: "${message}"`;
    setResponses([...responses, botResponse]);

    setMessage("");
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white rounded-lg shadow-lg p-6 w-[500px] md:w-[600px] lg:w-[700px] transition-transform transform ${
          isOpen ? "scale-100" : "scale-90"
        }`}
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Chatbot</h2>

        <div className="h-60 overflow-y-auto border p-4 rounded bg-gray-100">
          {responses.length === 0 ? (
            <p className="text-gray-500">Comece a conversar...</p>
          ) : (
            responses.map((res, index) => (
              <p key={index} className="text-gray-700 mb-2">{res}</p>
            ))
          )}
        </div>

        <div className="flex mt-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 border p-3 rounded-l outline-none"
            placeholder="Digite sua pergunta..."
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-600 text-white px-4 py-3 rounded-r hover:bg-blue-700"
          >
            Enviar
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-4 text-red-500 font-semibold hover:text-red-700 transition"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default ChatbotModal;
