import Image from "next/image";
import { twMerge } from "tailwind-merge";

export default function ProductImage({
  image,
  height = 1000,
  width = 1000,
  className,
  ...props
}) {
  return (
    <div
      className={twMerge(
        "relative aspect-square overflow-hidden rounded-md bg-white",
        className,
      )}
    >
      <Image
        fill
        src={image}
        alt="productImage"
        className="h-full w-full rounded-md object-cover p-0 duration-300 group-hover:scale-105 md:p-2"
        {...props}
      />
    </div>
  );
}
