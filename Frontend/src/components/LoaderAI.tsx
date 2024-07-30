import React, { useState, useEffect } from 'react';

const AIWorkingLoader = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length < 3 ? prev + '.' : ''));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center justify-center ">
      <svg className="w-24 h-24 mb-4" viewBox="0 0 24 24">
        <circle className="text-gray-300" strokeWidth="2" stroke="currentColor" fill="none" r="10" cx="12" cy="12" />
        <path className="text-blue-600" strokeWidth="2" stroke="currentColor" fill="none" d="M12 6v6l4 2" >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 12 12"
            to="360 12 12"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
      <div className="text-lg font-semibold text-gray-700 mb-2">AI is generating your diagram</div>
      <div className="text-sm text-gray-500">This may take a moment{dots}</div>
    </div>
  );
};

export default AIWorkingLoader;