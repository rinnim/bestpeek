import Link from "next/link";
import FavoriteButton from "../FavoriteButton";
import ProductImage from "./ProductImage";

export default function FavoriteProductCard({ product }) {
  return (
    <div className="flex w-full items-center gap-3 rounded-md border border-border p-3 duration-200 md:gap-4">
      <ProductImage
        image={product?.images[0]}
        className="aspect-square w-12 md:w-full md:max-w-16"
        height={100}
        width={100}
      />

      <div className="flex w-full flex-col text-xs">
        <Link
          href={`/product/${product?._id}`}
          className="text-xs font-medium md:text-sm"
        >
          {product?.name}
        </Link>
        <div className="flex items-center justify-between">
          <div className="text-muted">{product?.brand}</div>
          <div className="flex items-center gap-2">
            {product?.bestPrice > 0 ? (
              <p className="text-sm font-semibold md:text-lg">
                ৳{product?.bestPrice}
              </p>
            ) : (
              <p className="text-sm font-semibold md:text-lg text-red-600">Stock Out</p>
            )}
            <FavoriteButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
