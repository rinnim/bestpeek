import { formatDate } from "@/app/utils/date";
import Link from "next/link";
import ProductImage from "./ProductImage";

export default function HistoryProductCard({ history }) {
  return (
    <div className="flex w-full items-center gap-3 rounded-md border border-border p-3 duration-200 md:gap-4">
      <ProductImage
        image={history?.productId?.images[0]}
        className="aspect-square w-12 md:w-full md:max-w-16"
        height={100}
        width={100}
      />

      <div className="flex w-full flex-col text-xs">
        <Link
          href={`/product/${history?.productId?._id}`}
          className="relative text-xs font-medium md:text-sm"
        >
          {" "}
          {history?.productId?.name}
        </Link>

        <div className="relative mt-2 flex w-full items-center justify-between text-xs">
          <div className="flex w-4/12 flex-col">
            <p className="text-muted"> {history?.productId?.brand}</p>
          </div>
          <div className="flex w-6/12 items-center justify-end gap-2">
            <div className="flex flex-col items-end justify-center">
              <p className="text-sm font-semibold md:text-lg">
                {history?.productId?.bestPrice > 0 ? (
                  <p>৳{history?.productId?.bestPrice}</p>
                ) : (
                  <p className="text-red-600">Stock Out</p>
                )}
              </p>
              <p className="font-light text-muted">
                {formatDate(history?.createdAt)}
              </p>
              <p className="text-nowrap font-light capitalize text-muted">
                {history?.shopId?.name
                  ? `Visited ${history?.shopId?.name}`
                  : "Viewed Product"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
