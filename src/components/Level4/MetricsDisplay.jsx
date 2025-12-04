import React from 'react';

const MetricsDisplay = ({ metrics, isTransforming }) => {
  const metricItems = [
    {
      label: "Économies",
      value: Math.round(metrics.savings),
      unit: "€",
      icon: "💰",
      color: "text-neon-green",
      bgColor: "bg-green-900/20",
      borderColor: "border-neon-green"
    },
    {
      label: "Impact écologique",
      value: Math.round(metrics.ecoImpact),
      unit: "%",
      icon: "🌱",
      color: "text-neon-green",
      bgColor: "bg-emerald-900/20",
      borderColor: "border-emerald-500"
    },
    {
      label: "Sécurité",
      value: Math.round(metrics.security),
      unit: "%",
      icon: "🛡️",
      color: "text-neon-blue",
      bgColor: "bg-blue-900/20",
      borderColor: "border-neon-blue"
    },
    {
      label: "Transformation",
      value: Math.round(metrics.transformation),
      unit: "%",
      icon: "⚡",
      color: "text-neon-purple",
      bgColor: "bg-purple-900/20",
      borderColor: "border-neon-purple"
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-neon-blue mb-6">📊 INDICATEURS EN TEMPS RÉEL</h2>
      
      {metricItems.map((metric, index) => (
        <div 
          key={index}
          className={`p-4 rounded-xl border-2 ${metric.borderColor} ${metric.bgColor} transition-all duration-300
            ${isTransforming ? 'animate-pulse' : ''}
          `}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="text-2xl">{metric.icon}</div>
              <div>
                <div className="font-bold">{metric.label}</div>
                <div className={`text-2xl font-bold ${metric.color}`}>
                  {metric.value}{metric.unit}
                </div>
              </div>
            </div>
          </div>
          
          {/* Barre de progression */}
          <div className="w-full bg-black/30 h-2 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000
                ${metric.label === 'Économies' ? 'bg-gradient-to-r from-green-400 to-green-600' :
                  metric.label === 'Impact écologique' ? 'bg-gradient-to-r from-emerald-400 to-emerald-600' :
                  metric.label === 'Sécurité' ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
                  'bg-gradient-to-r from-purple-400 to-purple-600'
                }
              `}
              style={{ width: `${Math.min(100, metric.value)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsDisplay;