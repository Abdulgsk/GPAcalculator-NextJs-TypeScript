import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="flex items-center space-x-2">
        <div className="w-5 h-5 bg-white rounded-full animate-bounce" />
        <div className="w-5 h-5 bg-white rounded-full animate-bounce delay-200" />
        <div className="w-5 h-5 bg-white rounded-full animate-bounce delay-400" />
      </div>
      <p className="mt-4 text-white text-2xl font-semibold">Loading...</p>
    </div>
  );
};

export default Loading;
