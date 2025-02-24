import { twMerge } from "tailwind-merge";

export default function Divider({ className }) {
  return <div className={twMerge("w-full h-[1px] bg-border", className)} />;
}
