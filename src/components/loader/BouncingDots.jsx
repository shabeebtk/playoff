import React from 'react';

const BouncingDots = () => {
  return (
    <div className="flex flex-row justify-center gap-2">
      <div className="w-2 h-2 rounded-full bg-white animate-bounce"></div>
      <div className="w-2 h-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '-.3s' }}></div>
      <div className="w-2 h-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '-.5s' }}></div>
    </div>
  );
};

export default BouncingDots;
