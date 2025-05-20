// src/components/ui/input.jsx
import React from "react";

export const Input = ({
  type = "text",
  value,
  onChange,
  placeholder,
  ...props
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
      {...props}
    />
  );
};

export default Input;
