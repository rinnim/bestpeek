import Link from "next/link";
import { twMerge } from "tailwind-merge";

const SearchItemChip = ({ title, href = "#", className }) => {
  return (
    <Link
      href={href}
      className={twMerge(
        "flex cursor-pointer items-center justify-center rounded-md bg-white p-2 text-black shadow-lg duration-200 hover:border-black hover:bg-black hover:text-white hover:shadow-xl md:p-4",
        className,
      )}
    >
      <p className="text-xs font-medium capitalize md:text-sm">{title}</p>
    </Link>
  );
};

export default SearchItemChip;
