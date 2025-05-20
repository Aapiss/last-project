// src/components/ui/button.jsx
import React from "react";

export const Button = ({ children, onClick, className = "", ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
