import Link from "next/link";
import { TbChevronRight, TbHome2 } from "react-icons/tb";
import Container from "./container";
export default function Breadcrumb({
  category,
  categorySlug,
  subcategory,
  subcategorySlug,
  brand,
  brandSlug,
  page = 1,
  limit = 12,
}) {
  return (
    <Container className="w-full justify-self-start px-0 py-3">
      <nav className="rounded-md bg-white px-5 py-3 text-gray-600">
        <ol className="text-muted-foreground flex max-w-screen-xl flex-wrap items-center text-xs capitalize md:text-sm">
          {/* Home breadcrumb as the starting point */}
          <li className="hover:text-black">
            <Link href="/" className="flex items-center">
              <TbHome2 className="text-md" />
              <span className="hidden px-1 md:block md:px-2">Home</span>
              <TbChevronRight className="text-lg" />
            </Link>
          </li>
          <li className="flex items-center hover:text-black">
            <Link
              href={`/product?limit=${limit}&page=${page}`}
              className="flex items-center"
            >
              {/* <AiOutlineProduct className="text-md" /> */}
              <span className="px-1 md:px-2">Product</span>
            </Link>
          </li>

          {/* Category breadcrumb */}
          {category && (
            <li className="flex items-center hover:text-black">
              <TbChevronRight className="text-lg" />
              <Link
                href={`/product?category=${categorySlug}&limit=${limit}&page=${page}`}
              >
                <span className="px-1 md:px-2">{category}</span>
              </Link>
              <TbChevronRight className="text-lg" />
            </li>
          )}
          {/* Subcategory breadcrumb */}
          {subcategory && (
            <li className="flex items-center hover:text-black">
              <Link
                href={`/product?category=${categorySlug}&subCategory=${subcategorySlug}&limit=${limit}&page=${page}`}
              >
                <span className="px-1 md:px-2">{subcategory}</span>
              </Link>
              <TbChevronRight className="text-lg" />
            </li>
          )}
          {/* Brand breadcrumb */}
          {brand && (
            <li className="flex items-center hover:text-black">
              <Link
                href={`/product?category=${categorySlug}&subCategory=${subcategorySlug}&brand=${brandSlug}&limit=${limit}&page=${page}`}
              >
                <span className="px-1 md:px-2">{brand}</span>
              </Link>
            </li>
          )}
        </ol>
      </nav>
    </Container>
  );
}
