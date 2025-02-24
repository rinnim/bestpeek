"use client";

import { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
export default function SearchableDropdown({
  options,
  value,
  onChange,
  placeholder,
  disabled = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  const getOptionLabel = (option) => {
    if (typeof option === "string") return option;
    return option.label || "";
  };

  const getOptionValue = (option) => {
    if (typeof option === "string") return option;
    return option.value || "";
  };

  const allOptions = [
    { label: placeholder, value: "" },
    ...options.map((opt) =>
      typeof opt === "string" ? { label: opt, value: opt } : opt
    ),
  ];

  const filteredOptions = allOptions.filter((option) =>
    getOptionLabel(option).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayValue = value
    ? options.find((opt) => getOptionValue(opt) === value)
    : null;

  const displayLabel = displayValue
    ? getOptionLabel(displayValue)
    : placeholder;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionClick = (option) => {
    onChange(getOptionValue(option));
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className={`w-full rounded-lg bg-white capitalize px-3 py-2 text-left md:text-sm text-xs focus:outline-none ${
          disabled ? "cursor-not-allowed bg-gray-100" : ""
        }`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <span className={!value ? "text-gray-500" : ""}>{displayLabel}</span>
        <span className={`absolute right-3 top-3 ${!value ? "text-gray-500" : ""}`}>
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white shadow-lg scrollbar-hide">
          <input
            type="text"
            className="w-full border-b border-border p-2 md:text-sm text-xs focus:outline-none"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {filteredOptions.length === 0 ? (
            <div className="p-2 md:text-sm text-xs text-gray-500">
              No options found
            </div>
          ) : (
            filteredOptions.map((option, index) => (
              <div
                key={index}
                className={`cursor-pointer px-3 py-2 md:text-sm text-xs capitalize text-gray-500 hover:bg-gray-100 ${getOptionValue(option) === value ? "bg-gray-50 text-black font-semibold" : ""}`}
                onClick={() => handleOptionClick(option)}
              >
                {getOptionLabel(option)}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
