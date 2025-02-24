import { logo } from "@/app/assets/index";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export default function Logo({ className }) {
  return (
    <Link
      className={twMerge(
        "flex cursor-pointer items-center justify-center",
        className,
      )}
      href={"/"}
    >
      <Image src={logo} alt="logo" width={30} height={30} className="h-8 w-8" />
      <h1 className="text-2xl text-white">estPeek</h1>
    </Link>
  );
}
