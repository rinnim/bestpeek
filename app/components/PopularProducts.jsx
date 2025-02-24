"use client";

import axios from "axios"; // for sending http request
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import NotFoundCard from "./ui/not-found-card";
import ProductCard from "./ui/product-card";
import ProductCardSkeleton from "./ui/product-card-skeleton";
import Subtitle from "./ui/subtitle";
import Title from "./ui/title";

export default function PopularProducts({ className }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const productLimit = 12;

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/product/filter`,
        {
          params: {
            limit: productLimit,
            sortBy: "popularity-high",
            page: 1,
          },
        }
      );
      setProducts(response.data.data.products);
      // toast.success(response.data.message);
      // console.log(response.data.data.products);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      // toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className={twMerge("w-full", className)}>
      <Title className="text-center text-xl sm:text-2xl font-bold">
        Popular Products
      </Title>
      <Subtitle className="text-center text-xs md:text-sm mb-4">
        Check out our most popular products
      </Subtitle>

      {error ? (
        <NotFoundCard title={error} />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {loading
            ? Array.from({ length: productLimit }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            : products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
        </div>
      )}
    </section>
  );
}
