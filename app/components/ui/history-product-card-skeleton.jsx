export default function FavoriteProductCardSkeleton() {
  return (
    <div>
      <div className="flex items-center w-full border border-border px-5 rounded-xl py-4 pr-3 gap-4">
        <div className="flex items-center w-full gap-8">
          <div className="aspect-square">
            <div className="w-16 aspect-square h-16 bg-gray-200 rounded-lg"></div>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <div className="flex flex-col gap-2">
              <div className="h-4 bg-gray-200 rounded-full w-8/12 animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded-full w-2/12 animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded-full w-1/12 animate-pulse"></div>
            </div>
          </div>
          <div className="flex items-end flex-col gap-2 justify-center">
            <div className="h-5 bg-gray-200 rounded-full w-16 animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded-full w-20 animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded-full w-24 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
