import React from 'react';

const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  className = '',
  icon,
  ...props
}) => {
  const baseStyles = 'rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 border-2';
  
  const variants = {
    primary: 'bg-transparent border-neon-blue text-neon-blue hover:bg-neon-blue/10 hover:glow-blue',
    secondary: 'bg-transparent border-neon-green text-neon-green hover:bg-neon-green/10 hover:glow-green',
    success: 'bg-transparent border-neon-green text-neon-green hover:bg-neon-green/20',
    danger: 'bg-transparent border-neon-red text-neon-red hover:bg-neon-red/10',
    ghost: 'bg-transparent border-transparent text-white hover:bg-white/5',
  };
  
  const sizes = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
  };
  
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105 active:scale-95';
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${disabledStyles}
        ${className}
      `}
      {...props}
    >
      {icon && <span className="text-xl">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;