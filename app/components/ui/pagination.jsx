import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { twMerge } from "tailwind-merge";

export default function Pagination({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange,
  className,
}) {
  return (
    <div
      className={twMerge(
        "flex flex-col md:flex-row gap-2 justify-center items-center md:justify-between w-full",
        className
      )}
    >
      <div className="text-center text-gray-600 text-sm md:text-left">
        {totalItems > 0 ? (
          <p>
            Showing {Math.min(itemsPerPage * (currentPage - 1) + 1, totalItems)}{" "}
            to {Math.min(itemsPerPage * currentPage, totalItems)} of{" "}
            {totalItems} entries
          </p>
        ) : (
          <p>No entries found</p>
        )}
      </div>
      <div className="w-full md:w-auto">
        <ReactPaginate
          previousLabel={<FaArrowLeft className="text-xs md:text-sm" />}
          nextLabel={<FaArrowRight className="text-xs md:text-sm" />}
          pageCount={totalPages}
          onPageChange={onPageChange}
          forcePage={currentPage - 1}
          containerClassName="flex items-center justify-center gap-2 flex-nowrap"
          pageClassName="px-3 py-1 rounded-md bg-white text-gray-700 hover:bg-gray-200 cursor-pointer"
          previousClassName="flex items-center justify-center w-8 h-8 rounded-md bg-white text-gray-700 hover:bg-gray-200"
          nextClassName="flex items-center justify-center w-8 h-8 rounded-md bg-white text-gray-700 hover:bg-gray-200"
          breakClassName="px-3 py-1 text-gray-600"
          activeClassName="!bg-[#1E2836] !text-white"
          disabledClassName="bg-gray-100 text-gray-400 cursor-not-allowed hover:bg-red-600"
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
        />
      </div>
    </div>
  );
}