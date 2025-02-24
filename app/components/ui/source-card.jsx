"use client";

import { formatDate } from "@/app/utils/date";
import { UserContext } from "@/context/UserContext";
import Image from "next/image";
import { useContext } from "react";
import { GiQueenCrown } from "react-icons/gi";
import { twMerge } from "tailwind-merge";
export default function SourceCard({
  source,
  bestPrice,
  onClick,
  className,
  index,
}) {
  const [state] = useContext(UserContext);

  return (
    <a
      href={state?.user ? source?.href : "#"}
      target={state?.user ? "_blank" : "_self"}
      className={twMerge(
        "flex cursor-pointer items-center justify-between gap-4 rounded-md bg-white p-4 transition-all duration-300 hover:shadow-md",
        className,
      )}
      onClick={onClick}
    >
      {/* Index and Shop Logo */}
      <div className="flex items-center gap-10">
        {/* Index */}
        <div className="flex aspect-square h-12 items-center justify-center rounded-full bg-gray-100 text-center text-xl font-semibold text-foreground md:text-2xl">
          {bestPrice === source.currentPrice && source.currentPrice !== 0 ? (
            // <FaCrown className="animate-bounce text-foreground" />
            <GiQueenCrown className="animate-bounce text-foreground" />
          ) : (
            // <FaTag className="text-gray-600" />
            <p>{index + 1}</p>
          )}
        </div>
        {/* Shop Logo */}
        <Image
          src={source?.shopId?.logo}
          alt={source?.shopId?.name}
          height={100}
          width={100}
        />
      </div>
      {/* Price and Status */}
      <div className="flex flex-col items-end justify-end">
        {source?.currentPrice > 0 ? (
          <div className="text-xl font-bold text-foreground md:text-2xl">
            ৳{source?.currentPrice}
          </div>
        ) : (
          <div className="text-xl font-bold text-red-600 md:text-2xl">
            Stock Out
          </div>
        )}
        <div className="text-xs capitalize text-gray-600">{source?.status}</div>
        <div className="text-xs capitalize text-gray-600">
          {formatDate(source?.timeline?.[source?.timeline?.length - 1]?.date)}
        </div>
      </div>
    </a>
  );
}
