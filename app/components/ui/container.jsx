import { twMerge } from "tailwind-merge";

export default function Container({ children, className }) {
  return (
    <div
      className={twMerge(
        "mx-auto py-10 px-3 w-full max-w-screen-xl",
        className
      )}
    >
      {children}
    </div>
  );
}
