import FavoriteButton from "@/app/components/FavoriteButton";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export default function RelatedProductCard({ product, className }) {
  return (
    <div
      className={twMerge(
        "bg-white cursor-pointer rounded-md shadow-sm hover:shadow-md duration-300",
        className
      )}
    >
      <div className="flex md:flex-row justify-between gap-4 p-4">
        {/* Product Image */}
        <Link
          href={`/product/${product?._id}`}
          className="w-[110px] h-[110px] relative rounded-md overflow-hidden"
        >
          <Image
            src={product?.images[0]}
            alt={product?.name}
            width={110}
            height={110}
            className="object-cover w-full h-full"
          />
        </Link>

        {/* Product Details */}
        <div className="flex-1 flex flex-col justify-between">
          <div className="flex flex-col gap-1">
            {/* Subcategory */}
            <div className="text-xs font-light text-muted uppercase md:hidden block">
              {product?.subCategoryId?.name}
            </div>
            {/* Product Name */}
            <div className="line-clamp-3 text-sm font-medium text-black pr-2">
              {product?.name}
            </div>
          </div>

          {/* Pricing and Favorite Button */}
          <div className="mt-2 flex justify-between items-center">
            <div className="text-sm md:text-lg font-bold text-foreground">
              {product?.bestPrice > 0 ? (
                <div>৳{product?.bestPrice}</div>
              ) : (
                <div className="text-red-600">Stock Out</div>
              )}
            </div>
            <FavoriteButton product={product} position="right" />
          </div>
        </div>
      </div>
    </div>
  );
}
