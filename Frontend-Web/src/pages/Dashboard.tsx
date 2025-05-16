import React, { useState } from 'react';
import Header from '../components/layouts/Header';
import Content from '../components/layouts/Content/Content';
import Footer from '../components/layouts/Footer';
import ChatbotButton from '../components/ui/ChatbotButton';
import ChatbotModal from '../components/ui/ChatbotModal';

const Dashboard: React.FC = () => {
  const [ChatOpen, setChatOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-grow">
          <Content />
        </main>
        <Footer />

        <ChatbotButton onClick={() => setChatOpen(true)} />
        <ChatbotModal isOpen={ChatOpen} onClose={() => setChatOpen(false)} />
      </div>
    </div>
  );
};

export default Dashboard;
