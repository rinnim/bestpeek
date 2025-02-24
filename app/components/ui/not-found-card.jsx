import { notFound } from "@/app/assets";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
export default function NotFoundCard({ title, className, children }) {
  return (
    <div
      className={twMerge(
        "w-full flex flex-col text-black items-center justify-center px-5 text-center",
        className
      )}
    >
      <div className="w-1/2 md:w-5/12 flex items-center justify-center py-4">
        <Image src={notFound} className="object-cover" alt="not-found" />
      </div>
      {/* <p className="text-2xl mt-1 font-semibold">Sorry!</p> */}
      <p className="text-sm mt-2 md:text-xl md:font-medium">{title}</p>
      <div>{children}</div>
    </div>
  );
}
