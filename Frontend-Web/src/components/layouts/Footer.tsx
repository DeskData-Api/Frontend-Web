import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 w-full bg-gray-800 text-white text-center p-4 shadow-md">
      &copy; {new Date().getFullYear()} Meu Projeto - Todos os direitos reservados.
    </footer>
  );
};

export default Footer;
