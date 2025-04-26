import React from 'react';

interface InfoBlockProps {
  title: string;
  value: number;
  unit: string;
  color?: string;
  icon1?: string; // Ícone à esquerda (opcional)
  icon2?: string; // Ícone à direita (opcional)
}

const InfoBlock: React.FC<InfoBlockProps> = ({ title, value, unit, color, icon1, icon2 }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center">
      <div className="flex items-center gap-3">
      <div className="flex flex-row justify-evenly w-full gap-5">
        {icon1 && (
          <img
            src={icon1}
            alt={`${title} - ícone esquerda`}
            className="h-10 w-10"
          />
        )}
        <p
          className={`text-4xl font-bold ${
            color ? `text-${color}` : 'text-gray-900'
          }`}
          style={{ color: color || '#111827' }}
        >
          {value}
        </p>
        {icon2 && (
          <img
            src={icon2}
            alt={`${title} - ícone direita`}
            className="h-10 w-10"
          />
        )}
        </div>

      </div>
      <h3 className="text-lg font-semibold text-gray-600 mt-2">{title}</h3>
    </div>
  );
};

export default InfoBlock;