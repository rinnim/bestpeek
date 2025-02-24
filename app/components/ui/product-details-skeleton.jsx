export default function ProductDetailsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Image Section Skeleton */}
      <div className="flex flex-col gap-2 md:gap-4">
        <div className="w-full aspect-square bg-white animate-pulse rounded-lg"></div>
        <div className="flex items-center justify-center gap-2">
          {/* Thumbnail Image Skeletons */}
          {Array(7)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className=" h-10 md:w-16 w-10 md:h-16 bg-white animate-pulse rounded-lg"
              ></div>
            ))}
        </div>
      </div>

      {/* Product Details Section Skeleton */}
      <div className="flex flex-col w-full gap-4">
        <div className="bg-white p-5 rounded-lg w-full pb-7">
          {/* Product Name Skeleton */}
          <div className="w-4/6 h-7 bg-gray-300 animate-pulse rounded-full mb-2"></div>
          <div className="w-3/6 h-7 bg-gray-300 animate-pulse rounded-full mb-2"></div>

          {/* Brand and Views Skeleton */}
          <div className="py-3 w-full ">
            <div className="flex w-full justify-between mb-2">
              <div className="flex gap-2 w-full">
                <div className="w-3/12 h-4 bg-gray-300 animate-pulse rounded-full"></div>
                <div className="w-4/12 h-4 bg-gray-300 animate-pulse rounded-full"></div>
              </div>
              <div className=" flex w-full justify-end gap-2">
                <div className="w-4 h-4 bg-gray-300 animate-pulse rounded-full"></div>
                <div className="w-1/12 h-4 bg-gray-300 animate-pulse rounded-full"></div>
              </div>
            </div>
            <div className="flex w-full justify-between mb-2">
              <div className="flex gap-2 w-full">
                <div className="w-3/12 h-4 bg-gray-300 animate-pulse rounded-full"></div>
                <div className="w-6/12 h-4 bg-gray-300 animate-pulse rounded-full"></div>
              </div>
              <div className=" flex w-full justify-end gap-2">
                <div className="w-4 h-4 bg-gray-300 animate-pulse rounded-full"></div>
                <div className="w-2/12 h-4 bg-gray-300 animate-pulse rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Key Features Skeleton */}
          <div className="w-full my-1 ">
            <div className="w-3/12 h-5 bg-gray-300 animate-pulse rounded-full mb-1"></div>
            <table className="w-full">
              <tbody>
                <tr className="flex justify-between">
                  <td className="w-2/12 h-4 mt-2 bg-gray-300 animate-pulse rounded-full"></td>
                  <td className="w-4/12 h-4 mt-2 bg-gray-300 animate-pulse rounded-full"></td>
                </tr>
                <tr className="flex justify-between">
                  <td className="w-3/12 h-4 mt-2 bg-gray-300 animate-pulse rounded-full"></td>
                  <td className="w-5/12 h-4 mt-2 bg-gray-300 animate-pulse rounded-full"></td>
                </tr>
                <tr className="flex justify-between">
                  <td className="w-1/12 h-4 mt-2 bg-gray-300 animate-pulse rounded-full"></td>
                  <td className="w-3/12 h-4 mt-2 bg-gray-300 animate-pulse rounded-full"></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Buttons Skeleton */}
          <div className="flex gap-4 mt-5 justify-around">
            <div className="w-7 h-7 bg-gray-300 animate-pulse rounded-full"></div>
            <div className="w-7 h-7 bg-gray-300 animate-pulse rounded-full"></div>
            <div className="w-7 h-7 bg-gray-300 animate-pulse rounded-full"></div>
          </div>
        </div>

        {/* Source Card Skeleton */}
        <div className="flex flex-col   gap-4">
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-lg animate-pulse"
              >
                <div className="flex justify-between items-center gap-4">
                  <div className="w-full flex items-center gap-10">
                    <div className="w-12  h-12 bg-gray-300 animate-pulse rounded-lg"></div>
                    <div className="w-5/12 h-12  bg-gray-300 animate-pulse rounded-lg"></div>
                  </div>
                  <div className="w-full flex flex-col gap-1 items-end">
                    <div className="w-4/12 h-6 bg-gray-300 animate-pulse rounded-full"></div>
                    <div className="w-2/12 h-2 bg-gray-300 animate-pulse rounded-full"></div>
                    <div className="w-3/12 h-2 bg-gray-300 animate-pulse rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
