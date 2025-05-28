import React from "react";
import WordCloudChart from "./WordCloudChart";

interface TopicResponse {
  topico: string;
  palavras: string[];
}

interface Props {
  topics: TopicResponse[];

  
}

const topicTitles: Record<string, string> = {
  topico_1: "Conectividade e Equipamentos de Rede",
  topico_2: "Solicitações de Acesso e E-mail",
  topico_3: "Ordens de Serviço e Atividades Preventivas",
};

const TopicsWordClouds: React.FC<Props> = ({ topics }) => {
  if (!topics?.length)
    return (
      <div className="col-span-full text-gray-500 text-sm">
        Nenhum tópico encontrado.
      </div>
    );

  return (
    <>
      {topics.map((t, idx) => (
        <div key={idx} className="lg:col-span-1 col-span-1">
          <WordCloudChart
            title={topicTitles[t.topico] || `Tópico ${idx + 1}`}
            words={t.palavras.slice(0, 50)}
          />
        </div>
      ))}
    </>
  );
};
export default TopicsWordClouds;