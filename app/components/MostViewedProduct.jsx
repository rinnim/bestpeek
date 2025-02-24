"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import NotFoundCard from "./ui/not-found-card";
import ProductCard from "./ui/product-card";
import ProductCardSkeleton from "./ui/product-card-skeleton";
import Subtitle from "./ui/subtitle";
import Title from "./ui/title";

export default function MostViewedProduct({ className }) {
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
            sortBy: "views-high",
            page: 1,
          },
        }
      );
      setProducts(response.data.data.products);
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
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
        Most Viewed Products
      </Title>
      <Subtitle className="text-center text-xs md:text-sm mb-4">
        Check out the most viewed products
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
