import React from 'react';

const GlassCard = ({ children, className = "", onClick }) => (
  <div 
    onClick={onClick}
    className={`backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-xl ${className}`}
  >
    {children}
  </div>
);

export default GlassCard;
