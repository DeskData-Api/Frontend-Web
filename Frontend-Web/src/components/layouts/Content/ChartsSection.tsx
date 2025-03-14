import React from "react";
import ChartCard from "./ChartCard";

const ChartsSection: React.FC = () => {
  return (
    <section className="h-screen bg-white p-10 snap-start">
      <div className="grid grid-cols-3 gap-6 h-full">
        <div className="col-span-3 md:col-span-2">
          <ChartCard title="Análise Geral" imageSrc="/assets/images/chart1.png" />
        </div>
        <div className="col-span-3 md:col-span-1 flex flex-col gap-6">
          <ChartCard title="Estatística 1" imageSrc="/assets/images/stats1.png" />
          <ChartCard title="Estatística 2" imageSrc="/assets/images/stats2.png" />
        </div>
        <div className="col-span-3 md:col-span-1">
          <ChartCard title="Análise Comparativa" imageSrc="/assets/images/chart2.png" />
        </div>
        <div className="col-span-3 md:col-span-1">
          <ChartCard title="Crescimento" imageSrc="/assets/images/chart3.png" />
        </div>
      </div>
    </section>
  );
};

export default ChartsSection;
