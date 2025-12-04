import React from 'react';

const ComputerParts = ({ part, isUsed, onDragStart }) => {
  const typeColors = {
    hardware: 'border-yellow-500 bg-yellow-900/20',
    os: 'border-purple-500 bg-purple-900/20',
    software: 'border-blue-500 bg-blue-900/20',
    cloud: 'border-green-500 bg-green-900/20',
  };

  return (
    <div
      draggable={!isUsed}
      onDragStart={(e) => !isUsed && onDragStart(e, part)}
      className={`
        p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-3
        transition-all duration-300 cursor-move
        ${typeColors[part.type]}
        ${isUsed 
          ? 'opacity-50 cursor-not-allowed' 
          : 'hover:scale-105 hover:shadow-lg active:scale-95'
        }
      `}
    >
      <div className="text-4xl">{part.icon}</div>
      <div className="text-center">
        <h3 className="font-bold">{part.name}</h3>
        <p className="text-xs text-text-secondary mt-1">
          {part.type === 'hardware' && 'Matériel'}
          {part.type === 'os' && 'Système d\'exploitation'}
          {part.type === 'software' && 'Logiciel libre'}
          {part.type === 'cloud' && 'Cloud local'}
        </p>
      </div>
      {isUsed && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
          <span className="text-xs">✓</span>
        </div>
      )}
    </div>
  );
};

export default ComputerParts;