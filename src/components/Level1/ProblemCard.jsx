import React from 'react';

const ProblemCard = ({ problem }) => {
  const colorClasses = {
    blue: 'border-neon-blue',
    red: 'border-neon-red',
    purple: 'border-neon-purple',
    orange: 'border-yellow-500',
  };

  return (
    <div className={`bg-bg-darker rounded-lg p-4 border-l-4 ${colorClasses[problem.color]}`}>
      <div className="flex items-start gap-3">
        <div className="text-2xl">{problem.icon}</div>
        <div className="flex-1">
          <h3 className="font-bold text-lg">{problem.name}</h3>
          <p className="text-sm text-text-secondary mb-2">{problem.location}</p>
          <ul className="space-y-1">
            {problem.problems.map((p, index) => (
              <li key={index} className="text-sm flex items-start gap-2">
                <span className="text-red-400 mt-1">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProblemCard;