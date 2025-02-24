import { twMerge } from "tailwind-merge";

export default function InnerContainer({ children, className }) {
  return (
    <div
      className={twMerge(
        "flex flex-col flex-grow bg-white shadow-sm rounded-md gap-4 md:gap-6 p-4 md:p-16",
        className
      )}
    >
      {children}
    </div>
  );
}
