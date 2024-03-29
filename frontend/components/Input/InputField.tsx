"use client";
import React, { useState } from "react";

export default function InputField({
    placeholder,
    required,
    type,
    label,
    className,
    value,
    OnChange,
    validate
}:{
    placeholder: string,
    required?: boolean,
    type?: string,
    label: string
    className?: string
    value?: string
    OnChange?: (value:string) => void
    validate ?: (value:string) => string
}) {
  const [error, setError] = useState("");

  return (
    <div>
      <label
        className="block mb-2 text-sm font-medium text-gray-900 "
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => OnChange && OnChange(e.target.value)}
        className={"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " + (error ? "border-red-500" : "border-gray-300")
        + (className ? ` ${className}` : "")}
        placeholder={placeholder}
        required={required}
        onBlur={() => {
          if (required && !value) {
            setError("This field is required");
          }
          else if (validate && value) {
            setError(validate(value));
          }
          else{
            setError("");
          
          }

        }}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
