import CompareButton from "@/app/components/CompareButton";
import FavoriteButton from "@/app/components/FavoriteButton";
import ProductImage from "@/app/components/ui/ProductImage";
import WishlistButton from "@/app/components/WishlistButton";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export default function ProductCard({ product, className }) {
  return (
    <div
      className={twMerge(
        "flex h-auto cursor-pointer flex-col justify-between rounded-md bg-white p-4 shadow-lg duration-200 hover:shadow-xl",
        className,
      )}
    >
      <Link href={`/product/${product?._id}`} className="group">
        <ProductImage image={product?.images[0]} />
        <div className="mt-2 flex flex-col gap-2">
          {/* <p className="text-xs font-light uppercase text-muted">
            {product?.subCategoryId.name}
          </p> */}
          <p className="line-clamp-2 h-10 text-sm font-medium">
            {product?.name}
          </p>
        </div>
      </Link>
      <div className="mt-2 flex flex-col">
        <p className="text-sm md:text-lg">
          {product?.bestPrice > 0 ? (
            <p className="font-semibold text-foreground">
              {"৳" + product?.bestPrice}
            </p>
          ) : (
            <p className="font-semibold text-red-600">
              {/* {"৳" + product?.bestPrice} */}
              Stock Out
            </p>
          )}
        </p>
        <div className="flex items-center justify-around">
          <FavoriteButton product={product} position="left" />
          <WishlistButton product={product} />
          <CompareButton product={product} position="right" />
        </div>
      </div>
    </div>
  );
}
