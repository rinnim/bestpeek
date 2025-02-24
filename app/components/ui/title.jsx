import { twMerge } from "tailwind-merge";

export default function Title({ children, className }) {
  return (
    <h1
      className={twMerge(
        "text-md md:text-xl font-medium text-black",
        className
      )}
    >
      {children}
    </h1>
  );
}
