import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatResponse {
  id: string;
  text: string;
}

const ChatbotModal: React.FC<ChatbotModalProps> = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState("");
  const [responses, setResponses] = useState<ChatResponse[]>([]);

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    const botResponse = {
      id: uuidv4(),
      text: `🤖 Resposta do PLN para: "${message}"`,
    };

    setResponses([...responses, botResponse]);
    setMessage("");
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-end bg-opacity-10 transition-all duration-300 ease-in-out pr-[40px] ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      onClick={handleOutsideClick}
    >
      <div
        className={`rounded-xl shadow-lg p-10 w-[450px] md:w-[500px] lg:w-[700px] h-[790px] transition-transform duration-300 ease-in-out transform pb-10${
          isOpen ? "scale-100" : "scale-90"
        }`}
        style={{ backgroundColor: "rgba(230, 230, 230, 0.9)" }}
      >
        <h2 className="text-2xl font-bold font-rubik mb-4 text-gray-800 flex justify-center items-center ">Chatbot</h2>

        <div className="h-155 overflow-y-auto border p-4 rounded-t-xl bg-gray-100">
          {responses.length === 0 ? (
            <p className="text-gray-500">Comece a conversar...</p>
          ) : (
            responses.map((res) => (
              <p key={res.id} className="text-gray-700 mb-2">{res.text}</p>
            ))
          )}
        </div>

        <div className="flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
            className="flex-1 border p-3 rounded-bl-xl outline-none"
            placeholder="Digite sua pergunta..."
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-600 text-white px-4 py-3 rounded-br-xl hover:bg-blue-700"
          >
            <IoSend className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotModal;