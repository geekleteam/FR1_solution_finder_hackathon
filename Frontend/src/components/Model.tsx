import React from 'react';

const Modal:React.FC<any> = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative">
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;