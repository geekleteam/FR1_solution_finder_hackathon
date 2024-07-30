import React, { useState, useRef, useEffect } from 'react';
import { RefreshCw, X } from 'lucide-react';

interface FloatingCleanButtonProps {
  onClean: () => void;
}

const FloatingCleanButtonWithInlineConfirm: React.FC<FloatingCleanButtonProps> = ({ onClean }) => {
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const confirmRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (confirmRef.current && !confirmRef.current.contains(event.target as Node)) {
        setShowConfirm(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleConfirm = () => {
    onClean();
    setShowConfirm(false);
  };

  return (
    <div className=" clean-canvas fixed bottom-4 right-16 flex items-end">
      {showConfirm && (
        <div 
          ref={confirmRef}
          className="bg-white rounded-lg shadow-2xl p-4 mr-4 mb-2 animate-in slide-in-from-right"
        >
          <button 
            onClick={() => setShowConfirm(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            aria-label="Close confirmation"
          >
            <X size={16} />
          </button>
          <p className="text-sm font-medium mb-3">Are you sure you want to clean the canvas?</p>
          <div className="flex justify-end space-x-2">
            <button 
              onClick={() => setShowConfirm(false)}
              className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button 
              onClick={handleConfirm}
              className="px-3 py-1 text-sm bg-primary-green text-white hover:bg-hovergreen rounded"
            >
              Confirm
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => setShowConfirm(true)}
        className="p-3 bg-white text-primary-green rounded-full shadow-lg hover:bg-blue-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        aria-label="Clean Canvas"
        title="Clean Canvas"
      >
        <RefreshCw size={24} />
      </button>
    </div>
  );
};

export default FloatingCleanButtonWithInlineConfirm;