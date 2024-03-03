"use client";
import React from "react";

export default function InputField({
    placeholder,
    required,
    type,
    label,
    className,
    value,
    OnChange
}:{
    placeholder: string,
    required?: boolean,
    type?: string,
    label: string
    className?: string
    value?: string
    OnChange?: (value:string) => void
}) {
  return (
    <div>
      <label
        htmlFor="email"
        className="block mb-2 text-sm font-medium text-gray-900 "
      >
        {label}
      </label>
      <input
        type="email"
        name="email"
        id="email"
        value={value}
        onChange={(e) => OnChange && OnChange(e.target.value)}
        className={"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
        + (className ? ` ${className}` : "")}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}
