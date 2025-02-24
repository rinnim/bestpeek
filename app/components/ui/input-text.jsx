"use client";

import { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { twMerge } from "tailwind-merge";

export default function InputText({
  placeholder,
  className,
  type,
  onChange,
  value,
  required = false,
  disabled = false,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className="relative">
      <input
        className={twMerge(
          "md:h-10 h-8 w-full rounded-sm border border-border bg-transparent px-3 md:py-1 text-xs transition-colors placeholder:text-muted focus-visible:outline-none focus-visible:border-foreground disabled:cursor-not-allowed disabled:text-muted md:text-sm",
          className
        )}
        placeholder={placeholder}
        type={inputType}
        onChange={onChange}
        value={value}
        required={required}
        disabled={disabled}
        {...props}
      />
      {type === "password" && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-1/2 text-xs md:text-sm -translate-y-1/2 text-muted hover:text-foreground"
        >
          {showPassword ? <LuEye /> : <LuEyeOff />}
        </button>
      )}
    </div>
  );
}
