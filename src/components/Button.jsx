// Button.jsx
import React from 'react';

const Button = ({ children, onClick, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-lg"
    >
      {children}
    </button>
  );
};

export default Button;
