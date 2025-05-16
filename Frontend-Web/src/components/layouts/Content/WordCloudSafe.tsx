import React, { useRef, useEffect } from "react";
import WordCloud from "wordcloud";

interface WordCloudCanvasProps {
  data: { name: string; qtd: number }[];
}

const WordCloudCanvas: React.FC<WordCloudCanvasProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !data.length) return;
  
    const words = data.map((item) => [item.name, item.qtd]);
  
    WordCloud(canvasRef.current, {
      list: words,
      gridSize: Math.round(8 * canvasRef.current.width / 1024), // antes era 16 → diminui para dar mais espaço
      weightFactor: (size:any) => size * 0.15, // antes 0.2 → diminui para caber mais palavras
      fontFamily: "Montserrat, sans-serif",
      color: "random-dark",
      rotateRatio: 0.3, // permite mais rotações → encaixa melhor
      backgroundColor: "rgb(243 244 246)",
      drawOutOfBound: false,
      shuffle: true,
      minSize: 10,
      maxRotation: Math.PI / 2, // até 90 graus
    });
  }, [data]);
  

  return (
    <div className="bg-gray-100 rounded-lg p-4 flex flex-col h-[350px]">
      <canvas ref={canvasRef} width={500} height={250} />
    </div>
  );
};

export default WordCloudCanvas;
