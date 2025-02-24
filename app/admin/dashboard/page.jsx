"use client";

import ShopRecordsBarChart from "@/app/components/ui/bar-chart-external-clicks";
import ProductViewsBarChart from "@/app/components/ui/bar-chart-product-view";
import BarChartUserStats from "@/app/components/ui/bar-chart-user-stats";
import InnerContainer from "@/app/components/ui/inner-container";
import Loader from "@/app/components/ui/loader";
import NotFoundCard from "@/app/components/ui/not-found-card";
import PieChartComponent from "@/app/components/ui/pie-chart";
import StatItem from "@/app/components/ui/stat-item";
import Subtitle from "@/app/components/ui/subtitle";
import Title from "@/app/components/ui/title";

import { UserContext } from "@/context/UserContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const router = useRouter();
  const [state] = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [shopProducts, setShopProducts] = useState([]);
  const [userStats, setUserStats] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [externalClickStats, setExternalClickStats] = useState([]);
  const [totalExternalClickStats, setTotalExternalClickStats] = useState([]);
  const [productViewStats, setProductViewStats] = useState([]);
  const [totalProductViewStats, setTotalProductViewStats] = useState([]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const longAgo = new Date("2000-01-01"); // Long ago
      const endDate = new Date(); // Today
      const startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 3); // Last 3 months

      const [
        productsResponse,
        userResponse,
        totalUsersResponse,
        externalClickStatsResponse,
        totalExternalClickStatsResponse,
        productViewStatsResponse,
        totalProductViewStatsResponse,
      ] = await Promise.all([
        axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/analytics/shop/products/all`,
          { headers: { Authorization: `Bearer ${state.token}` } }
        ),
        axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/analytics/user/date`,
          {
            headers: { Authorization: `Bearer ${state.token}` },
            params: { startDate, endDate },
          }
        ),
        axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/analytics/user/date`,
          {
            headers: { Authorization: `Bearer ${state.token}` },
            params: { startDate: longAgo, endDate },
          }
        ),
        axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/analytics/shop/date`,
          {
            headers: { Authorization: `Bearer ${state.token}` },
            params: { startDate, endDate },
          }
        ),
        axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/analytics/shop/date`,
          {
            headers: { Authorization: `Bearer ${state.token}` },
            params: { startDate: longAgo, endDate },
          }
        ),
        axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/analytics/product/date`,
          {
            headers: { Authorization: `Bearer ${state.token}` },
            params: { startDate, endDate },
          }
        ),
        axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/analytics/product/date`,
          {
            headers: { Authorization: `Bearer ${state.token}` },
            params: { startDate: longAgo, endDate },
          }
        ),
      ]);

      setShopProducts(productsResponse.data.data);
      setUserStats(userResponse.data.data.stats);
      setTotalUsers(totalUsersResponse.data.data.totalUsers);
      setExternalClickStats(externalClickStatsResponse.data.data.stats);
      setProductViewStats(productViewStatsResponse.data.data.stats);
      setTotalExternalClickStats(
        totalExternalClickStatsResponse.data.data.stats
      );
      setTotalProductViewStats(totalProductViewStatsResponse.data.data.stats);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      console.log(error);
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
      <div className="p-4 md:p-5 border-border border rounded-md">
        <Title className="text-md mb-4">Take a glance</Title>

        <div className="grid grid-cols-2 mt-2 text-xs gap-4">
          
          <StatItem label="Total Shops" value={shopProducts?.length || 0} />
          <StatItem
            label="Total Products"
            value={shopProducts.reduce(
              (sum, item) => sum + item.totalProducts,
              0
            )}
          />
          <StatItem label="Total Users" value={totalUsers} />
          <StatItem
            label="Total Product Viewed"
            value={totalProductViewStats.reduce(
              (total, stat) => total + stat.views,
              0
            )}
          />
          <StatItem
            label="Total External Clicked"
            value={totalExternalClickStats.reduce(
              (total, stat) =>
                total +
                stat.shops.reduce(
                  (shopTotal, shop) => shopTotal + shop.records,
                  0
                ),
              0
            )}
          />
        </div>
      </div>

      {/* Shop Statistics */}
      <div className="border border-border p-4 md:p-5 rounded-md">
        <div className="flex justify-between items-center mb-4">
          <div>
            <Title>Shop Statistics</Title>
            <Subtitle className="text-xs">
              Your shop products statistics
            </Subtitle>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center w-full h-[400px]">
            <Loader />
          </div>
        ) : error ? (
          <NotFoundCard title="Failed to fetch data" />
        ) : (
          <div
            className="h-[350px] 
              w-full md:h-[400px]"
          >
            <PieChartComponent data={shopProducts} />
          </div>
        )}
      </div>

      {/* User Statistics */}
      <div className="border border-border p-4 md:p-5 rounded-md">
        {loading ? (
          <div className="flex justify-center items-center w-full h-[300px]">
            <Loader />
          </div>
        ) : error ? (
          <NotFoundCard title="Failed to fetch data" />
        ) : (
          <BarChartUserStats
            title="User Statistics"
            subTitle="Users registered in the last few months"
            data={userStats}
          />
        )}
      </div>

      {/* Product Views */}
      <div className="border border-border p-4 md:p-5 rounded-md">
        {loading ? (
          <div className="flex justify-center items-center w-full h-[400px]">
            <Loader />
          </div>
        ) : error ? (
          <NotFoundCard title="Failed to fetch data" />
        ) : (
          <ProductViewsBarChart
            title="Product Views"
            subTitle="Total products viewed in the last few months"
            stats={productViewStats}
          />
        )}
      </div>

      {/* External Clicks */}
      <div className="border border-border p-4 md:p-5 rounded-md">
        {loading ? (
          <div className="flex justify-center items-center w-full h-[400px]">
            <Loader />
          </div>
        ) : error ? (
          <NotFoundCard title="Failed to fetch data" />
        ) : (
          <ShopRecordsBarChart
            stats={externalClickStats}
            title="External Clicks"
            subTitle="Total external clicks in the last few months"
          />
        )}
      </div>
    </InnerContainer>
  );
}
