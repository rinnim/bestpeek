import Link from "next/link";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import WishlistButton from "../WishlistButton";
import ProductImage from "./ProductImage";

export default function WishlistProductCard({ product, targetPrice }) {
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
          className="relative text-xs font-medium md:text-sm"
        >
          {" "}
          {product?.name}
        </Link>

        <div className="relative mt-2 flex w-full items-center justify-between text-xs">
          <p className="w-4/12 text-muted">{product?.brand}</p>
          <span className="w-2/12 text-sm md:text-xl">
            {product?.bestPrice <= targetPrice ? (
              <FaCheckCircle className="text-green-500" />
            ) : (
              <FaTimesCircle className="text-red-600" />
            )}
          </span>
          <div className="flex w-6/12 items-center justify-end gap-2">
            <div className="flex flex-col items-end justify-center">
              <p className="text-sm font-semibold md:text-lg">
                {product?.bestPrice > 0 ? (
                  <p>৳{product?.bestPrice}</p>
                ) : (
                  <p>Stock Out</p>
                )}
              </p>
              <p className="text-xs font-light text-muted">৳{targetPrice}</p>
            </div>
            <WishlistButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
