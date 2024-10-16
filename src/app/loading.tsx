import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-graycustom to-black">
      <div className="flex items-center space-x-2 mt-5">
        <div className="w-5 h-5 bg-white rounded-full animate-bounce" />
        <div className="w-5 h-5 bg-white rounded-full animate-bounce delay-1000" />
        <div className="w-5 h-5 bg-white rounded-full animate-bounce delay-700" />
      </div>
      <p className="mt-4 text-white text-2xl font-semibold px-2">Loading...</p>
    </div>
  );
};

export default Loading;
