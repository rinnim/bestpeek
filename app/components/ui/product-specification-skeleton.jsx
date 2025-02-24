export default function ProductSpecificationSkeleton() {
  return (
    <div className="flex-1 p-5 bg-white rounded-lg">
      {/* Skeleton for Title */}
      <div className="w-full flex mb-4">
        <div className="w-2/12 bg-gray-300 animate-pulse h-5 rounded-md"></div>
      </div>

      <div className="flex ">
        <div className="w-full">
          <table className="mt-2 min-w-full overflow-hidden">
            <tbody className="w-full">
              {/* Skeleton for Specifications Table Rows */}
              {Array.from({ length: 23 }).map((_, index) => (
                <tr
                  key={index}
                  className={`flex flex-col border-b w-full justify-between border-gray-100 duration-200 hover:bg-background md:flex-row`}
                >
                  <td
                    className={`px-2 py-2 my-2 font-medium md:p-2 bg-gray-300 animate-pulse h-2 rounded-md w-${
                      (index % 2) + 1
                    }/12`}
                  />
                  {/* Skeleton for Key */}
                  <td
                    className={`px-2 py-2 my-2 font-light md:p-2 bg-gray-300 animate-pulse h-2 rounded-md w-${
                      (index % 4) + 1
                    }/12`}
                  />
                  {/* Skeleton for Value */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
