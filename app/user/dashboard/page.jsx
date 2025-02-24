"use client";

import Button from "@/app/components/ui/button";
import FavoriteProductCard from "@/app/components/ui/favorite-product-card";
import FavoriteProductCardSkeleton from "@/app/components/ui/favorite-product-card-skeleton";
import HistoryProductCard from "@/app/components/ui/history-product-card";
import HistoryProductCardSkeleton from "@/app/components/ui/history-product-card-skeleton";
import InnerContainer from "@/app/components/ui/inner-container";
import NotFoundCard from "@/app/components/ui/not-found-card";
import StatItem from "@/app/components/ui/stat-item";
import Title from "@/app/components/ui/title";
import WishlistProductCard from "@/app/components/ui/wishlist-product-card";
import WishlistProductCardSkeleton from "@/app/components/ui/wishlist-product-card-skeleton";
import { UserContext } from "@/context/UserContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const [state] = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    favorites: [],
    wishlist: [],
    history: [],
  });
  // const [favorites, setFavorites] = useState([]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [favoritesRes, wishlistRes, historyRes] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/product/favorite`, {
          headers: { Authorization: `Bearer ${state.token}` },
        }),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/product/wishlist`, {
          headers: { Authorization: `Bearer ${state.token}` },
        }),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/history`, {
          headers: { Authorization: `Bearer ${state.token}` },
        }),
      ]);

      setData({
        favorites: favoritesRes.data.data.favorites.slice(0, 3),
        wishlist: wishlistRes.data.data.wishlist.slice(0, 3),
        history: historyRes.data.data.slice(0, 3),
      });
    } catch (error) {
      // toast.error(error.response?.data?.message || error.message);
      console.log(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (state?.user) {
      fetchDashboardData();
    }
  }, [state?.user]);

  return (
    <InnerContainer>
      {/* User Info & Statistics */}
      <Title>Welcome, {state?.user?.firstName}!</Title>
      {/* Account Statistics */}
      <div className="border md:p-5 p-4 rounded-md">
        <Title className="text-md mb-4">Take a glance</Title>
        <div className="grid text-xs grid-cols-2 gap-4">
          <StatItem
            label="Favorites"
            value={state?.user?.favorites?.length || 0}
          />
          <StatItem
            label="Compare List"
            value={state?.user?.compare?.length || 0}
          />
          <StatItem
            label="Wishlist"
            value={state?.user?.wishlist?.length || 0}
          />
          <StatItem
            label="Role"
            value={state?.user?.role || "..."}
            className="capitalize"
          />
        </div>
      </div>

      {/* Recent Favorites */}
      <div className="border border-border p-4 md:p-5 rounded-md">
        <div className="flex justify-between items-center  mb-2 md:mb-4">
          <Title>Recent Favorites</Title>
          <Button
            variant="text"
            size="sm"
            className="w-fit"
            onClick={() => router.push("/user/favorite")}
          >
            View All
          </Button>
        </div>

        {loading ? (
          <div className="flex flex-col gap-2 md:gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <FavoriteProductCardSkeleton key={index} />
            ))}
          </div>
        ) : data.favorites?.length > 0 ? (
          <div className="flex flex-col gap-2 md:gap-4">
            {data.favorites.map((item) => (
              <FavoriteProductCard key={item._id} product={item.product} />
            ))}
          </div>
        ) : data.favorites?.length === 0 ? (
          <NotFoundCard title="No favorite products yet" />
        ) : null}
      </div>

      {/* Recent Wishlist */}
      <div className="border border-border p-4 md:p-5 rounded-md">
        <div className="flex justify-between items-center mb-2 md:mb-4">
          <Title>Recent Wishlist</Title>
          <Button
            variant="text"
            size="sm"
            className="w-fit"
            onClick={() => router.push("/user/wishlist")}
          >
            View All
          </Button>
        </div>

        {loading ? (
          <div className="flex flex-col gap-2 md:gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <WishlistProductCardSkeleton key={index} />
            ))}
          </div>
        ) : data.wishlist?.length > 0 ? (
          <div className="flex flex-col gap-2 md:gap-4">
            {data.wishlist.map((item) => (
              <WishlistProductCard
                key={item._id}
                product={item.product}
                targetPrice={item.targetPrice}
              />
            ))}
          </div>
        ) : (
          <NotFoundCard title="No wishlist items yet" />
        )}
      </div>

      {/* Recent History */}
      <div className="border border-border p-5 rounded-md">
        <div className="flex justify-between items-center mb-2 md:mb-4">
          <Title>Recent History</Title>
          <Button
            variant="text"
            size="sm"
            className="w-fit"
            onClick={() => router.push("/user/history")}
          >
            View All
          </Button>
        </div>

        {loading ? (
          <div className="flex flex-col gap-2 md:gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <HistoryProductCardSkeleton key={index} />
            ))}
          </div>
        ) : data.history?.length > 0 ? (
          <div className="flex flex-col gap-2 md:gap-4">
            {data.history.map((history) => (
              <HistoryProductCard key={history._id} history={history} />
            ))}
          </div>
        ) : (
          <NotFoundCard title="No history yet" />
        )}
      </div>
    </InnerContainer>
  );
}
