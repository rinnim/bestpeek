"use client";

import { UserContext } from "@/context/UserContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { FiMenu, FiMinus, FiPlus, FiSearch, FiUser, FiX } from "react-icons/fi";
import categories from "../api/data/categories";
import Container from "./ui/container";
import Logo from "./ui/logo";
export default function Header() {
  const [state, setState] = useContext(UserContext);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State to toggle mobile menu
  const [openCategory, setOpenCategory] = useState(null);

  const redirect = (url) => {
    setTimeout(() => {
      if (!state.user) {
        router.push("/user/sign-in");
      } else {
        const baseUrl = state.user.role === "admin" ? "/admin" : "/user";
        router.push(baseUrl + url);
      }
    }, 200);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return; // Prevent empty searches

    const currentUrl = new URL(window.location.href); // Get full URL
    currentUrl.searchParams.set("search", searchTerm.trim()); // Update or add 'search' param
    currentUrl.searchParams.set("page", "1"); // Reset to first page when searching

    if (currentUrl.pathname === "/product") {
      router.push(currentUrl.pathname + currentUrl.search, { shallow: true });
    } else {
      router.push(`/product?search=${searchTerm}&page=1&limit=12`);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    const currentUrl = new URL(window.location.href); // Get full URL
    currentUrl.searchParams.delete("search"); // Remove only 'search' query
    currentUrl.searchParams.delete("page");
    router.push(currentUrl.pathname + currentUrl.search);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const toggleCategory = (categoryId) => {
    setOpenCategory((prev) => (prev === categoryId ? null : categoryId));
  };

  // Close the mobile menu when a category or subcategory is clicked
  const handleCategoryClick = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false); // Close the menu
    }
  };

  return (
    <div>
      {/* Web view */}
      <div>
        <Container className="hidden items-center justify-between gap-10 px-5 py-5 lg:flex">
          <Logo />
          <form
            onSubmit={handleSearch}
            className="relative flex max-w-screen-md flex-grow"
          >
            <input
              name="search"
              type="text"
              placeholder="Search product here"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-10 w-full rounded-md border border-border bg-transparent px-4 py-1 text-xs text-white placeholder:text-muted focus-visible:border-white"
            />
            {searchTerm && (
              <button
                type="button"
                className="absolute right-10 top-1/2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded text-muted transition-all duration-200 hover:bg-red-600 hover:text-white"
                onClick={handleClearSearch}
              >
                <FiX size={13} />
              </button>
            )}
            <button
              type="submit"
              className="absolute right-1 top-1/2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded text-muted transition-all duration-200 hover:bg-white hover:text-[#1F2937]"
            >
              <FiSearch size={13} />
            </button>
          </form>
          <button
            onClick={() => redirect("/dashboard")}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-xl text-white duration-200 hover:bg-white hover:text-[#1F2937]"
          >
            <FiUser />
          </button>
        </Container>

        {/* Web category */}
        <nav className="hidden bg-white py-4 shadow-lg lg:block">
          <div className="mx-auto hidden max-w-screen-xl flex-wrap items-center justify-center md:flex">
            <div className="mx-auto w-full max-w-screen-xl px-3">
              <ul className="flex w-full flex-wrap items-center justify-center gap-4">
                {categories.map((category, index) => (
                  <li
                    key={category._id}
                    className="group relative font-medium hover:cursor-pointer"
                  >
                    <span className="text-sm text-gray-600 group-hover:text-black">
                      {category.name}
                    </span>

                    {category.subCategoryIds.length > 0 && (
                      <div
                        className={`invisible absolute m-2 ${index < 3 ? "left-0" : index > 8 ? "right-0" : "left-1/2 -translate-x-1/2"} z-50 translate-y-2 transform rounded-md border-t-4 border-[#1F2937] bg-white p-2 opacity-0 shadow-lg transition-all duration-300 ease-in-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 ${category.subCategoryIds.length > 4 ? "grid w-96 grid-cols-2 gap-2" : "w-48"} `}
                      >
                        <Link
                          href={`/product?page=1&limit=12&category=${category.slug}`}
                          className="relative block w-full text-nowrap rounded px-2 py-1 text-sm text-gray-600 transition-colors hover:text-black"
                        >
                          All {category.name}
                        </Link>
                        {category.subCategoryIds.map((subcategory) => (
                          <Link
                            href={`/product?page=1&limit=12&category=${category.slug}&subCategory=${subcategory.slug}`}
                            key={subcategory._id}
                            className="relative block w-full text-nowrap rounded px-2 py-1 text-sm text-gray-600 transition-colors hover:text-black"
                          >
                            {subcategory.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile View */}
      <Container className="py-2 lg:hidden">
        <div className="flex items-center justify-between py-2">
          <button
            onClick={toggleMobileMenu}
            className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-xl text-white transition-all duration-300 ${isMobileMenuOpen ? "bg-white bg-opacity-10" : ""}`}
          >
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>

          <Logo />

          <button
            onClick={() => redirect("/dashboard")}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-xl text-white duration-200 hover:bg-white hover:text-[#1F2937]"
          >
            <FiUser />
          </button>
        </div>

        <form onSubmit={handleSearch} className="relative mb-2 flex">
          <input
            name="search"
            type="text"
            placeholder="Search product here"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-8 w-full rounded-md border border-border bg-transparent px-4 py-1 text-xs text-white placeholder:text-muted focus-visible:border-white"
          />
          {searchTerm && (
            <button
              type="button"
              className="absolute right-8 top-1/2 flex h-6 w-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded text-muted transition-all duration-200 hover:bg-red-600 hover:text-white"
              onClick={handleClearSearch}
            >
              <FiX size={13} />
            </button>
          )}
          <button
            type="submit"
            className="absolute right-1 top-1/2 flex h-6 w-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded text-muted transition-all duration-200 hover:bg-white hover:text-[#1F2937]"
          >
            <FiSearch size={13} />
          </button>
        </form>
      </Container>

      {/* Mobile category */}
      <nav
        className={`absolute z-50 w-3/4 bg-white shadow-xl transition-all duration-500 ease-in-out lg:hidden ${isMobileMenuOpen ? "left-0" : "-left-full"}`}
      >
        {categories.map((category) => (
          <div key={category._id} className="border-b py-2">
            <button
              onClick={() => toggleCategory(category._id)}
              className="flex w-full items-center justify-between px-4 text-sm font-medium text-gray-900 hover:text-red-600"
            >
              {category.name}
              {openCategory === category._id ? <FiMinus /> : <FiPlus />}
            </button>

            {openCategory === category._id &&
              category.subCategoryIds.length > 0 && (
                <div className="mt-1 pl-8">
                  <Link
                    href={`/product?category=${category.slug}&page=1&limit=12`}
                    className="block py-1.5 text-xs text-gray-500 hover:text-red-600"
                    onClick={handleCategoryClick}
                  >
                    {`All ${category.name}`}
                  </Link>
                  {category.subCategoryIds.map((subcategory) => (
                    <Link
                      href={`/product?category=${category.slug}&subCategory=${subcategory.slug}&page=1&limit=12`}
                      key={subcategory._id}
                      onClick={handleCategoryClick}
                      className="block py-1.5 text-xs text-gray-500 hover:text-red-600"
                    >
                      {subcategory.name}
                    </Link>
                  ))}
                </div>
              )}
          </div>
        ))}
      </nav>
    </div>
  );
}
