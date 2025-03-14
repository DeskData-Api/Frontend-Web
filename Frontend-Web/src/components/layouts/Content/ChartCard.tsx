import React from "react";

interface ChartCardProps {
  title: string;
  imageSrc: string;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, imageSrc }) => {
  return (
    <div className="bg-gray-200 rounded-lg shadow-md p-4 h-full flex flex-col">
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      <img src={imageSrc} alt={title} className="w-full h-full object-cover mt-2 rounded" />
    </div>
  );
};

export default ChartCard;
