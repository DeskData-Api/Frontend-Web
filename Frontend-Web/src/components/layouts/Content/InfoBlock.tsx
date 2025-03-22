import React from "react";

interface InfoBlockProps {
  title: string;
  value: number;
  unit: string;
}

const InfoBlock: React.FC<InfoBlockProps> = ({ title, value, unit }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
      <h3 className="text-lg font-semibold text-gray-600">{title}</h3>
      <p className="text-4xl font-bold text-gray-900">{value}</p>
      <span className="text-sm text-gray-500">{unit}</span>
    </div>
  );
};

export default InfoBlock;
