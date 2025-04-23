import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-4 shadow-md">
      &copy; {new Date().getFullYear()} Time DeskData - Todos os direitos reservados.
    </footer>
  );
};

export default Footer;
