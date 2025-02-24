import { twMerge } from "tailwind-merge";

export default function Label({ label, className }) {
  return (
    <label
      htmlFor={label}
      className={twMerge(
        "text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
    >
      {label}
    </label>
  );
}
