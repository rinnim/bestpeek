import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

const BrandItemChip = ({
  image,
  name = "Brand Name",
  href = "#",
  className,
}) => {
  return (
    <Link
      href={href}
      className={twMerge(
        "group flex cursor-pointer shadow-lg items-center justify-center rounded-md bg-white p-2 md:p-5 duration-200 hover:bg-black",
        className
      )}
    >
      <Image
        height={100}
        width={100}
        src={image}
        alt={name}
        className="h-5 w-36 object-contain duration-200 group-hover:brightness-0 group-hover:invert group-hover:filter"
      />
    </Link>
  );
};

export default BrandItemChip;
