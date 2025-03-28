import React from "react";
import { FaRobot } from "react-icons/fa"; // Ícone do Chatbot

interface ChatbotButtonProps {
  onClick: () => void;
}

const ChatbotButton: React.FC<ChatbotButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition cursor-pointer"
    >
      <FaRobot size={24} />
    </button>
  );
};

export default ChatbotButton;
