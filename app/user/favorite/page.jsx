"use client";

import Button from "@/app/components/ui/button";
import FavoriteProductCard from "@/app/components/ui/favorite-product-card";
import FavoriteProductCardSkeleton from "@/app/components/ui/favorite-product-card-skeleton";
import InnerContainer from "@/app/components/ui/inner-container";
import NotFoundCard from "@/app/components/ui/not-found-card";
import SearchInput from "@/app/components/ui/search-input";
import Title from "@/app/components/ui/title";
import { UserContext } from "@/context/UserContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function FavoritePage() {
  const [state] = useContext(UserContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // get favorite products
  const getFavorites = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/product/favorite`,
        { headers: { Authorization: `Bearer ${state.token}` } }
      );
      setFavorites(response.data.data.favorites);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (state.user) {
      getFavorites();
    }
  }, [state.user]);

  // Filter products
  const getFilteredProducts = () => {
    if (!searchQuery) return favorites;

    // Filter products by name ,brand, model
    return favorites.filter(
      (item) =>
        item.product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.product.model.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredProducts = getFilteredProducts();

  return (
    <InnerContainer>
      {/* Title and Search */}
      <div className="flex flex-col w-full md:flex-row gap-2 md:justify-between md:items-center">
        <Title>Favorite Products</Title>
        {/* Search Input */}
        <SearchInput
          className="w-full md:w-5/12"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Products Grid  */}
      {loading ? (
        // loading skeleton
        <div className="flex flex-col gap-2 md:gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <FavoriteProductCardSkeleton key={index} />
          ))}
        </div>
      ) : filteredProducts.length > 0 ? (
        // products grid
        <div className="flex flex-col gap-2 md:gap-4">
          {filteredProducts.map((item) => (
            <FavoriteProductCard key={item._id} product={item.product} />
          ))}
        </div>
      ) : error ? (
        // error
        <NotFoundCard title={error} />
      ) : favorites.length === 0 ? (
        // for no favorite products
        <NotFoundCard title="No product found">
          <Button
            className="mt-5"
            size="sm"
            onClick={() => router.push("/product")}
          >
            Add Product
          </Button>
        </NotFoundCard>
      ) : filteredProducts.length === 0 ? (
        // for no filtered products
        <NotFoundCard title="No matching product found" />
      ) : null}
    </InnerContainer>
  );
}
