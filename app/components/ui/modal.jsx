"use client";

import { twMerge } from "tailwind-merge";
import Title from "./title";
export default function Modal({ children, title, isOpen, className }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black backdrop-blur-[2.5px] bg-opacity-40">
      <div
        className={twMerge(
          "rounded-md md:w-[450px] w-full mx-10 flex flex-col gap-2 bg-white p-10 shadow-lg",
          className
        )}
      >
        <Title className=" font-semibold text-center">{title}</Title>
        <div className="flex flex-col w-full">{children}</div>
      </div>
    </div>
  );
}
