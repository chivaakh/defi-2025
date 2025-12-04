import React from 'react';
import '../../styles/theme.css';

const ProgressBar = ({
  progress,
  total = 100,
  label,
  showPercentage = true,
  color = 'neon-blue',
  className = '',
}) => {
  const percentage = Math.min(100, Math.max(0, (progress / total) * 100));
  
  const colorClasses = {
    'neon-blue': 'bg-neon-blue',
    'neon-green': 'bg-neon-green',
    'neon-purple': 'bg-neon-purple',
    'neon-red': 'bg-neon-red',
  };
  
  const glowClasses = {
    'neon-blue': 'glow-blue',
    'neon-green': 'glow-green',
    'neon-purple': 'glow-purple',
    'neon-red': 'shadow-[0_0_20px_rgba(255,51,102,0.5)]',
  };
  
  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="text-sm text-text-secondary">{label}</span>}
          {showPercentage && (
            <span className="text-sm font-semibold text-neon-blue">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      
      <div className="h-3 bg-bg-card rounded-full overflow-hidden">
        <div
          className={`h-full ${colorClasses[color]} ${glowClasses[color]} transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;