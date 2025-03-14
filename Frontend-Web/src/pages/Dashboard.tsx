import React, { useState } from 'react';
import Header from '../components/layouts/Header';
import Content from '../components/layouts/Content/Content';
import Footer from '../components/layouts/Footer';
import ChatbotButton from '../components/ui/ChatbotButton';
import ChatbotModal from '../components/ui/ChatbotModal';

const Dashboard: React.FC = () => {
  const [isChatOpen, setChatOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <div className="flex flex-col flex-1">
        <Header />
        <Content />
        <Footer />

        {/* Botão do Chatbot */}
        <ChatbotButton onClick={() => setChatOpen(true)} />

        {/* Modal do Chatbot */}
        <ChatbotModal isOpen={isChatOpen} onClose={() => setChatOpen(false)} />
      </div>
    </div>
  );
};

export default Dashboard;
