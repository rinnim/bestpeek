"use client";

import Button from "@/app/components/ui/button";
import HistoryProductCard from "@/app/components/ui/history-product-card";
import HistoryProductCardSkeleton from "@/app/components/ui/history-product-card-skeleton";
import InnerContainer from "@/app/components/ui/inner-container";
import NotFoundCard from "@/app/components/ui/not-found-card";
import SearchInput from "@/app/components/ui/search-input";
import Title from "@/app/components/ui/title";
import { UserContext } from "@/context/UserContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const dateRanges = [
  { label: "All Time", value: "all" },
  { label: "Past 7 Days", value: "7" },
  { label: "Past 15 Days", value: "15" },
  { label: "Past 30 Days", value: "30" },
];

export default function HistoryPage() {
  const [state, setState] = useContext(UserContext);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRange, setSelectedRange] = useState("all");
  const router = useRouter();

  // get history products
  const getHistory = async () => {
    try {
      setLoading(true);
      let config = {
        headers: { Authorization: `Bearer ${state.token}` },
      };

      // Only add date range params if not "all"
      if (selectedRange !== "all") {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - parseInt(selectedRange));

        config.params = {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        };
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/history`,
        config
      );
      setHistory(response.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (state.user) {
      getHistory();
    }
  }, [state.token, state.user, selectedRange]);

  // Filter products
  const getFilteredHistory = () => {
    if (!searchQuery) return history;

    return history.filter(
      (item) =>
        item.productId.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.productId.brand
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        item.productId.model.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredHistory = getFilteredHistory();

  return (
    <InnerContainer>
      {/* Title, Dropdown and Search */}
      <div className="flex flex-col w-full md:flex-row gap-2 md:justify-between md:items-center">
        <div className="flex w-full md:w-7/12 justify-between items-center">
          <Title>My History</Title>
          {/* Date dropdown */}
          <select
            value={selectedRange}
            onChange={(e) => setSelectedRange(e.target.value)}
            className="rounded-sm border border-gray-200 px-1 md:py-1 text-xs md:text-sm  focus:border-gray-500 focus:outline-none"
          >
            {dateRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>
        {/* Search Input */}
        <SearchInput
          className="w-full md:w-5/12"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Products Grid  */}
      {loading ? (
        <div className="flex flex-col gap-2 md:gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <HistoryProductCardSkeleton key={index} />
          ))}
        </div>
      ) : filteredHistory.length > 0 ? (
        <div className="flex flex-col gap-2 md:gap-4">
          {filteredHistory.map((history) => (
            <HistoryProductCard key={history._id} history={history} />
          ))}
        </div>
      ) : error ? (
        <NotFoundCard title={error} />
      ) : history.length === 0 ? (
        <NotFoundCard title="No product found">
          <Button className="mt-5" onClick={() => router.push("/product")}>
            Add Product
          </Button>
        </NotFoundCard>
      ) : filteredHistory.length === 0 ? (
        <NotFoundCard title="No matching product found" />
      ) : null}
    </InnerContainer>
  );
}
