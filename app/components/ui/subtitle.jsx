import { twMerge } from "tailwind-merge";

export default function Subtitle({ children, className }) {
  return (
    <h2 className={twMerge(" text-xs md:text-sm  text-muted", className)}>
      {children}
    </h2>
  );
}
