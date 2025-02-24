export default function ProductCardSkeleton() {
  return (
    <div className="flex bg-white cursor-pointer flex-col justify-between rounded-lg  p-4 h-auto duration-200 hover:border-foreground">
      {/* Image Skeleton */}
      <div className="w-full aspect-square bg-gray-300 animate-pulse rounded-lg mb-3"></div>

      <div className="mt-2 flex flex-col gap-2">
        {/* Subcategory Skeleton */}
        {/* <div className="w-24 h-4 bg-gray-300 animate-pulse rounded-full "></div> */}

        {/* Product Name Skeleton */}
        <div className="w-3/4 h-4 bg-gray-300 animate-pulse rounded-full "></div>
        <div className="w-4/4 h-4 bg-gray-300 animate-pulse rounded-full "></div>
      </div>

      <div className="mt-2 flex flex-col">
        {/* Price Skeleton */}
        <div className="w-2/6 h-5 bg-gray-300 animate-pulse rounded-full  mb-2"></div>

        <div className="flex mt-1 justify-around gap-2">
          {/* Button Skeletons */}
          <div className="w-7 h-7 bg-gray-300 animate-pulse rounded-full "></div>
          <div className="w-7 h-7 bg-gray-300 animate-pulse rounded-full "></div>
          <div className="w-7 h-7 bg-gray-300 animate-pulse rounded-full "></div>
        </div>
      </div>
    </div>
  );
}
