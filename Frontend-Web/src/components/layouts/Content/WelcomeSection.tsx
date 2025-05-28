import React from "react";

const WelcomeSection: React.FC = () => {
  return (
    <section className="h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-6 snap-start">
      <h1 className="text-4xl font-bold text-gray-800">Seja bem-vindo!</h1>
      <p className="text-xl text-gray-600 mt-4">Veja as análises mais recentes</p>
    </section>
  );
};

export default WelcomeSection;
