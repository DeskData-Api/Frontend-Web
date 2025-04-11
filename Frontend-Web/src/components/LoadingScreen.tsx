import React from "react";

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-white">
      <div className="relative flex items-center justify-center w-20 h-20">
        <div
          className="absolute w-16 h-16 rounded-full border-4 border-blue-500 border-dashed animate-spin"
          style={{ animationDuration: "2s" }} // Mais lento (default é ~1s)
        ></div>
        <div
          className="w-8 h-8 bg-blue-500 rounded-full animate-pulse"
          style={{ animationDuration: "2s" }} // Deixa o pulse mais calmo também
        ></div>
      </div>
      <p className="mt-6 text-blue-600 text-lg font-semibold">Carregando dashboard...</p>
    </div>
  );
};

export default LoadingScreen;
