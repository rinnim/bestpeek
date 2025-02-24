"use client";

import NotFoundCard from "@/app/components/ui/not-found-card";
import Pagination from "@/app/components/ui/pagination";
import ProductCard from "@/app/components/ui/product-card";
import ProductCardSkeleton from "@/app/components/ui/product-card-skeleton";
import SearchableDropdown from "@/app/components/ui/searchable-dropdown";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import brands from "../api/data/brand";
import categories from "../api/data/categories";
import sortOptions from "../api/data/product-short-options";
import Breadcrumb from "../components/ui/breadcrumb";
import Container from "../components/ui/container";
import Loader from "../components/ui/loader";
import Title from "../components/ui/title";

const ProductPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [totalProducts, setTotalProducts] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedShop, setSelectedShop] = useState("");
  const [selectedStockStatus, setSelectedStockStatus] = useState("");
  const [selectedSortOption, setSelectedSortOption] = useState("");
  const [selectedMinPrice, setSelectedMinPrice] = useState("");
  const [selectedMaxPrice, setSelectedMaxPrice] = useState("");

  const categoryOptions = categories.map((cat) => ({
    label: cat.name,
    value: cat.slug,
  }));

  const getSubcategoryOptions = (categorySlug) => {
    if (!categorySlug) return [];

    const category = categories.find((cat) => cat.slug === categorySlug);
    if (!category) return [];

    return category.subCategoryIds.map((sub) => ({
      label: sub.name,
      value: sub.slug,
    }));
  };

  // Initialize filter states based on URL query parameters
  const getQueryParams = () => {
    const querySearchTerm = searchParams.get("search");
    if (querySearchTerm) {
      setSearchTerm(querySearchTerm);
    } else {
      setSearchTerm("");
    }
    const queryPage = searchParams.get("page") || 1;
    if (queryPage) {
      setCurrentPage(Number(queryPage));
    } else {
      setCurrentPage(1);
    }
    const queryItemsPerPage = searchParams.get("limit") || 12;
    if (queryItemsPerPage) {
      setItemsPerPage(Number(queryItemsPerPage));
    }
    const querySubcategory = searchParams.get("subCategory");
    if (querySubcategory) {
      setSelectedSubcategory(querySubcategory);
    } else {
      setSelectedSubcategory("");
    }
    const queryCategory = searchParams.get("category");
    if (queryCategory) {
      setSelectedCategory(queryCategory);
    } else {
      setSelectedCategory("");
    }
    const queryBrand = searchParams.get("brand");
    if (queryBrand) {
      setSelectedBrand(queryBrand);
    } else {
      setSelectedBrand("");
    }
    const queryShop = searchParams.get("shop");
    if (queryShop) {
      setSelectedShop(queryShop);
    } else {
      setSelectedShop("");
    }
    const queryStockStatus = searchParams.get("stockStatus");
    if (queryStockStatus) {
      setSelectedStockStatus(queryStockStatus);
    } else {
      setSelectedStockStatus("");
    }
    const querySortOption = searchParams.get("sortBy");
    if (querySortOption) {
      setSelectedSortOption(querySortOption);
    } else {
      setSelectedSortOption("");
    }
    const queryMinPrice = searchParams.get("minPrice");
    if (queryMinPrice) {
      setSelectedMinPrice(queryMinPrice);
    } else {
      setSelectedMinPrice("");
    }
    const queryMaxPrice = searchParams.get("maxPrice");
    if (queryMaxPrice) {
      setSelectedMaxPrice(queryMaxPrice);
    } else {
      setSelectedMaxPrice("");
    }
  };

  // Fetch products whenever the query params change
  const fetchProducts = async () => {
    try {
      if (currentPage !== null) {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/product/filter`,
          {
            params: {
              search: searchTerm,
              page: currentPage,
              limit: itemsPerPage,
              category: selectedCategory,
              subCategory: selectedSubcategory,
              brand: selectedBrand,
              shop: selectedShop,
              stockStatus: selectedStockStatus,
              sortBy: selectedSortOption,
              minPrice: selectedMinPrice,
              maxPrice: selectedMaxPrice,
            },
          },
        );

        setFilteredProducts(response.data.data.products);
        setTotalPages(response.data.data.totalPages);
        setTotalProducts(response.data.data.totalProducts);
      }
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || error.message);
      setFilteredProducts([]);
      setTotalProducts(null);
      setTotalPages(null);
      setCurrentPage(1);
    } finally {
      setLoading(false);
    }
  };

  // Effect to get query parameters whenever URL changes
  useEffect(() => {
    getQueryParams();
  }, [searchParams]);

  // Effect to fetch products whenever filter states change
  useEffect(() => {
    fetchProducts();
  }, [
    searchTerm,
    currentPage,
    itemsPerPage,
    selectedCategory,
    selectedSubcategory,
    selectedBrand,
    selectedShop,
    selectedStockStatus,
    selectedSortOption,
    selectedMinPrice,
    selectedMaxPrice,
  ]);

  // Effect to update URL query params when filters change
  useEffect(() => {
    updateQueryParams();
  }, [
    itemsPerPage,
    currentPage,
    selectedCategory,
    selectedSubcategory,
    selectedBrand,
    selectedShop,
    selectedStockStatus,
    selectedSortOption,
    selectedMinPrice,
    selectedMaxPrice,
    searchTerm,
  ]);

  const updateQueryParams = () => {
    const query = {
      category: selectedCategory,
      subCategory: selectedSubcategory,
      brand: selectedBrand,
      shop: selectedShop,
      stockStatus: selectedStockStatus,
      sortBy: selectedSortOption,
      limit: itemsPerPage,
      page: currentPage,
      search: searchTerm,
    };

    const updatedSearchParams = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        updatedSearchParams.append(key, value);
      }
    });

    router.push(`/product?${updatedSearchParams}`);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <Container className="flex w-full flex-grow flex-col justify-between pb-3 pt-0 md:pb-10 md:pt-0">
      {/* Breadcrumb */}
      <Breadcrumb />
      {/* Headings and filters */}
      <div>
        {/* Headings */}
        <div className="flex items-center justify-between">
          <Title>Product List</Title>
          <div className="flex items-center gap-2 text-xs md:text-sm">
            <label htmlFor="itemsPerPage" className="text-gray-500">
              Show
            </label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="rounded-md border border-gray-200 px-2 focus:border-gray-500 focus:outline-none md:py-1"
            >
              <option value={12}>12</option>
              <option value={24}>24</option>
              <option value={36}>36</option>
              <option value={48}>48</option>
              <option value={96}>96</option>
            </select>
            <span className="text-gray-500">entries</span>
          </div>
        </div>

        {/* Filter Dropdowns */}
        <div className="my-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {/* Category Dropdown */}
          <SearchableDropdown
            options={categoryOptions}
            value={selectedCategory}
            onChange={(value) => {
              setSelectedCategory(value);
              setSelectedSubcategory("");
              setCurrentPage(1);
            }}
            placeholder="All Categories"
          />

          {/* Subcategory Dropdown */}
          <SearchableDropdown
            options={getSubcategoryOptions(selectedCategory)}
            value={selectedSubcategory}
            onChange={(value) => {
              setSelectedSubcategory(value);
              setCurrentPage(1);
            }}
            placeholder="All Subcategories"
            disabled={!selectedCategory}
          />

          {/* Brand Dropdown */}
          <SearchableDropdown
            options={brands.map((brand) => ({
              label: brand.name,
              value: brand.slug,
            }))}
            value={selectedBrand}
            onChange={(value) => {
              setSelectedBrand(value);
              setCurrentPage(1);
            }}
            placeholder="All Brand"
          />

          {/* Sort Dropdown */}
          <SearchableDropdown
            options={sortOptions.map((option) => option.label)}
            value={
              selectedSortOption
                ? sortOptions.find((opt) => opt.value === selectedSortOption)
                    ?.label
                : ""
            }
            onChange={(label) => {
              const option = sortOptions.find((opt) => opt.label === label);
              setSelectedSortOption(option ? option.value : "");
              setCurrentPage(1);
            }}
            placeholder="Sort By Default"
          />
        </div>
      </div>

      {/* Product List */}
      <div>
        {loading ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6">
            {Array.from({ length: itemsPerPage }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <NotFoundCard title={error || "No products found"} />
        ) : (
          <div>
            {/* Products Grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6">
              {filteredProducts.map((product, index) => (
                <ProductCard
                  product={product}
                  index={index}
                  key={product?._id}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      <Pagination
        className="mt-5"
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        totalItems={totalProducts}
        onPageChange={handlePageChange}
      />
    </Container>
  );
};

export default function ProductPageSuspense() {
  return (
    <Suspense fallback={<Loader />}>
      <ProductPage />
    </Suspense>
  );
}
