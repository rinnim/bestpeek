export default function RelatedProductCardSkeleton() {
  return (
    <div className="bg-white cursor-pointer rounded-lg shadow-sm overflow-hidden duration-200 hover:border-foreground">
      <div className="flex md:flex-row justify-between gap-4 p-4">
        {/* Skeleton for Product Image */}
        <div className="w-[110px] h-[110px] relative bg-gray-200 rounded-md overflow-hidden animate-pulse">
          <div className="bg-gray-300 w-full h-full rounded-md" />
        </div>

        {/* Skeleton for Product Details */}
        <div className="flex-1 flex flex-col justify-between">
          <div className="flex flex-col gap-1">
            {/* Skeleton for Subcategory */}
            <div className="h-3 bg-gray-200 rounded w-24 animate-pulse" />
            {/* Skeleton for Product Name */}
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
          </div>

          {/* Skeleton for Pricing and Favorite Button */}
          <div className="mt-2 flex justify-between items-center">
            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
            <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
