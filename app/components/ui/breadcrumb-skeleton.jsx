import { TbChevronRight } from "react-icons/tb";
import Container from "./container";

export default function BreadcrumbSkeleton() {
  return (
    <Container className="w-full justify-self-start px-0 py-3">
      <nav className="animate-pulse rounded-md bg-white px-5 py-3 text-gray-700">
        <ol className="flex max-w-screen-xl items-center text-xs capitalize md:text-sm">
          {/* Home Skeleton */}
          <li className="flex items-center">
            <span className="h-4 w-4 md:w-16 rounded-md bg-gray-300"></span>
          </li>

          {/* Dynamic Placeholder for Other Breadcrumbs */}
          {Array.from({ length: 4 }).map((_, index) => (
            <li key={index} className="flex items-center mr-1">
              <TbChevronRight className="text-lg text-gray-300 mx-1 " />
              <span className="h-4 w-8 md:w-20 rounded-md bg-gray-300"></span>
            </li>
          ))}
        </ol>
      </nav>
    </Container>
  );
}
