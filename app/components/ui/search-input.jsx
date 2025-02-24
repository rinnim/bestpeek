import InputText from "@/app/components/ui/input-text";
import { LuSearch } from "react-icons/lu";
import { twMerge } from "tailwind-merge";

export default function SearchInput({ className, ...props }) {
  return (
    <div className={twMerge("relative w-full", className)}>
      <InputText
        className="pl-8 placeholder:text-xs text-xs h-8"
        type="text"
        placeholder="Search..."
        {...props}
      />
      <LuSearch
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={12}
      />
    </div>
  );
}
