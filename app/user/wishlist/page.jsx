"use client";

import Button from "@/app/components/ui/button";
import InnerContainer from "@/app/components/ui/inner-container";
import NotFoundCard from "@/app/components/ui/not-found-card";
import SearchInput from "@/app/components/ui/search-input";
import Title from "@/app/components/ui/title";
import WishlistProductCard from "@/app/components/ui/wishlist-product-card";
import WishlistProductCardSkeleton from "@/app/components/ui/wishlist-product-card-skeleton";
import { UserContext } from "@/context/UserContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function WishlistPage() {
  const [state] = useContext(UserContext);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // get wishlist products
  const getWishlistProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/product/wishlist`,
        { headers: { Authorization: `Bearer ${state.token}` } }
      );

      setWishlist(response.data.data.wishlist);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (state.user) {
      getWishlistProducts();
    }
  }, [state.user]);

  // Filter products
  const getFilteredWishlist = () => {
    if (!searchQuery) return wishlist;

    return wishlist.filter(
      (item) =>
        item.product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.product.model.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredWishlist = getFilteredWishlist();

  return (
    <InnerContainer>
      {/* Title and Search */}
      <div className="flex flex-col w-full md:flex-row gap-2 md:justify-between md:items-center">
        <Title>Wishlist Products</Title>
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
            <WishlistProductCardSkeleton key={index} />
          ))}
        </div>
      ) : filteredWishlist.length > 0 ? (
        // products grid
        <div className="flex flex-col gap-2 md:gap-4">
          {filteredWishlist.map((item) => (
            <WishlistProductCard
              key={item._id}
              product={item.product}
              targetPrice={item.targetPrice}
            />
          ))}
        </div>
      ) : error ? (
        // error
        <NotFoundCard title={error} />
      ) : wishlist.length === 0 ? (
        // for no wishlist products
        <NotFoundCard title="No product found">
          <Button className="mt-5" onClick={() => router.push("/product")}>
            Add Product
          </Button>
        </NotFoundCard>
      ) : filteredWishlist.length === 0 ? (
        // for no filtered wishlist products
        <NotFoundCard title="No matching product found" />
      ) : null}
    </InnerContainer>
  );
}
