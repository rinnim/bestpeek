export default function FavoriteProductCardSkeleton() {
  return (
    <div>
      <div className="flex items-center w-full border rounded-xl py-4 px-5 gap-4">
        <div className="flex items-center w-full gap-8">
          <div className="aspect-square">
            <div className="w-16 aspect-square h-16 bg-gray-200 rounded-lg"></div>
          </div>
          <div className="flex flex-col w-full gap-2">
            <div className="flex flex-col gap-2">
              <div className="h-4 bg-gray-200 rounded-full w-8/12 animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded-full w-2/12 animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded-full w-1/12 animate-pulse"></div>
            </div>
          </div>
          <div className="h-6 bg-gray-200 rounded-full w-1/12 animate-pulse"></div>
          <div className="h-6 bg-gray-200 w-6 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
