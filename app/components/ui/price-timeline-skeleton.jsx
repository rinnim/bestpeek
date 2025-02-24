export default function PriceTimelineSkeleton() {
  return (
    <div className="mt-10 bg-white flex flex-col gap-5 p-5 rounded-lg">
      <div className="w-full flex items-center justify-between flex-row gap-2">
        <div className="w-1/12 h-5 bg-gray-300 animate-pulse rounded-md"></div>
        <div className="w-1/12 h-9 bg-gray-300 animate-pulse rounded-md"></div>
      </div>
      <div className="w-full flex-col gap-5 h-[390px]">
        <div className="w-full h-[340px] bg-gray-200 animate-pulse rounded-lg"></div>
        <div className="w-full flex items-center justify-center mt-5 flex-row gap-5">
          <div className="w-1/12 h-5 bg-gray-200 animate-pulse rounded-lg"></div>
          <div className="w-1/12 h-5 bg-gray-200 animate-pulse rounded-lg"></div>
          <div className="w-1/12 h-5 bg-gray-200 animate-pulse rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}
