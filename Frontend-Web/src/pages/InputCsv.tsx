import React, { useState } from "react";
import Header from "../components/layouts/Header";

const InputCsv: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
      setMessage("");
    } else {
      setMessage("Por favor, selecione um arquivo CSV válido.");
      setFile(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setMessage("Nenhum arquivo selecionado.");
      return;
    }

    const formData = new FormData();
    formData.append("csv", file);

    try {
      const response = await fetch("http://localhost:3001/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setMessage("Arquivo enviado com sucesso!");
        setFile(null);
      } else {
        setMessage("Erro ao enviar o arquivo.");
      }
    } catch (error) {
      console.error("Erro:", error);
      setMessage("Erro ao enviar o arquivo.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-gray-100 p-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-12 w-full max-w-3xl rounded-2xl shadow-2xl flex flex-col items-center gap-8"
        >
          <h1 className="text-3xl font-bold text-gray-800">Enviar arquivo CSV</h1>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="w-full text-lg px-6 py-4 border border-gray-300 rounded-xl file:mr-6 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 px-8 rounded-xl transition shadow-md"
          >
            Enviar
          </button>
          {message && (
            <p className="text-lg text-center text-gray-700 font-medium">{message}</p>
          )}
        </form>
      </main>
    </div>
  );
};

export default InputCsv;