import Link from "next/link";
import { twMerge } from "tailwind-merge";

export default function CategoryItemChip({ name, href, icon, className }) {
  return (
    <Link
      href={href}
      className={twMerge(
        " group duration-200 bg-white shadow-md rounded-md p-5 flex flex-col items-center justify-center hover:shadow-xl",
        className
      )}
    >
      <div className="flex flex-col items-center gap-2">
        <div className="group-hover:scale-125 md:text-xl text-md transition-all duration-200">
          {icon}
        </div>
        <p className="text-xs md:text-sm text-center">{name}</p>
      </div>
    </Link>
  );
}
