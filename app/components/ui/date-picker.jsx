"use client";

import { useState } from "react";
import { twMerge } from "tailwind-merge";

// Function to format date like "1 Jan, 2024"
const formatDate = (date) => {
  const options = { day: "numeric", month: "short", year: "numeric" };
  return new Date(date).toLocaleDateString("en-GB", options); // 'en-GB' gives "1 Jan, 2024"
};

export default function InputDate({
  placeholder = "Select a date",
  className,
  value,
  onChange,
  required = false,
  disabled = false,
  ...props
}) {
  const [formattedDate, setFormattedDate] = useState(
    value ? formatDate(value) : ""
  );

  // Update formatted date when value changes
  const handleDateChange = (event) => {
    const rawValue = event.target.value;
    setFormattedDate(formatDate(rawValue)); // Format the date input
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <div className="relative">
      <input
        type="date"
        value={value || ""}
        onChange={handleDateChange}
        placeholder={placeholder}
        className={twMerge(
          "h-10 w-full rounded-md border border-border bg-transparent px-3 py-1 text-base transition-colors placeholder:text-muted focus-visible:outline-none focus-visible:border-foreground disabled:cursor-not-allowed disabled:text-muted md:text-sm",
          className
        )}
        required={required}
        disabled={disabled}
        {...props}
      />
      {/* Display the formatted date */}
      <div className="absolute inset-y-0 right-3 flex items-center text-muted">
        {formattedDate && !value && <span>{formattedDate}</span>}
      </div>
    </div>
  );
}
