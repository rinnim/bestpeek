import { formatDate } from "@/app/utils/date";
import Image from "next/image";
import { GiQueenCrown } from "react-icons/gi";
import { twMerge } from "tailwind-merge";
export default function SourceCardSmall({ source, index, onClick, className }) {
  return (
    <a
      href={source?.href}
      target="_blank"
      className={twMerge(
        "flex h-full w-full cursor-pointer items-center justify-between rounded-md bg-white p-2 transition-all duration-300 hover:shadow-md md:gap-4 md:p-4",
        className,
      )}
      onClick={onClick}
    >
      {/* Index and Shop Logo */}
      <div className="flex h-full w-5/12 flex-col items-start md:w-auto md:flex-row md:gap-4">
        {/* Index */}
        <p className="flex aspect-square h-7 items-center justify-center rounded-full bg-gray-100 text-center text-sm font-semibold text-foreground md:h-12 md:text-2xl">
          {index === 0 ? (
            <GiQueenCrown className="animate-bounce" />
          ) : (
            <p>{index + 1}</p>
          )}
        </p>
        {/* Shop Logo */}
        <Image
          src={source?.shopId?.logo}
          alt={source?.shopId?.name}
          height={50}
          width={100}
          className="h-10 w-3/4 self-center object-contain md:h-auto md:w-16"
        />
      </div>

      {/* Price and Status */}
      <div className="flex w-7/12 flex-col items-end justify-end md:w-auto">
        <div className="text-sm font-bold text-foreground md:text-xl">
          {source?.currentPrice > 0 ? (
            <p className="text-foreground">৳{source?.currentPrice}</p>
          ) : (
            <p className="text-red-600">Stock Out</p>
          )}
        </div>
        <div className="text-right text-xs capitalize text-gray-600">
          {source?.status}
        </div>
        <div className="hidden text-xs capitalize text-gray-600 sm:block">
          {formatDate(source?.timeline?.[source?.timeline?.length - 1]?.date)}
        </div>
      </div>
    </a>
  );
}
