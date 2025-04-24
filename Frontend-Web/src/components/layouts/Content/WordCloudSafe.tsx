import React, { useEffect, useRef } from "react";
import WordCloud from "wordcloud";

interface WordCloudCanvasProps {
  data: { name: string; qtd: number }[];
}

const WordCloudCanvas: React.FC<WordCloudCanvasProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const words = data.map((item) => [item.name, item.qtd]);

    WordCloud(canvasRef.current, {
      list: words,
      gridSize: 5,
      weightFactor: 2,
      fontFamily: "Montserrat, sans-serif",
      color: "random-dark",
      rotateRatio: 0.5,
      backgroundColor: "rgb(243 244 246)",
    });
  }, [data]);

  return (
    <div className="bg-gray-100 rounded-lg p-4 flex flex-col h-[350px]">
      <canvas ref={canvasRef} width={500} height={250} />
    </div>
  );
};

export default WordCloudCanvas;
