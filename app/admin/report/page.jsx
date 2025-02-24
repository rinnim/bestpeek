"use client";

import FormInputField from "@/app/components/ui/form-input-field";
import InnerContainer from "@/app/components/ui/inner-container";
import Loader from "@/app/components/ui/loader";
import LoadingButton from "@/app/components/ui/loading-button";
import Title from "@/app/components/ui/title";
import { formatDate } from "@/app/utils/date";
import { UserContext } from "@/context/UserContext";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";

export default function ReportPage() {
  const [state] = useContext(UserContext);
  const [today, setToday] = useState(new Date().toISOString().split("T")[0]);
  const [startDate, setStartDate] = useState(() => {
    const date = new Date(today);
    date.setMonth(date.getMonth() - 1);
    return date.toISOString().split("T")[0];
  }); // 1 month ago
  const [endDate, setEndDate] = useState(today); // today

  const [selectedShop, setSelectedShop] = useState(null);
  const [mostViewedProducts, setMostViewedProducts] = useState([]);
  const [mostClickedLinks, setMostClickedLinks] = useState([]);

  const [loading, setLoading] = useState(false);
  const [shops, setShops] = useState([]);
  const [shopLoading, setShopLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPrintReady, setIsPrintReady] = useState(false);
  const pdfRef = useRef(null);

  // PDF Print Configuration
  const triggerPrint = useReactToPrint({
    contentRef: pdfRef,
    documentTitle: `report-${selectedShop?.name}-${formatDate(new Date()).toLowerCase()}`,
    pageStyle: `
      @page {
        size: portrait;
        margin: 15mm;
      }
    `,
  });

  const getShops = async () => {
    setShopLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/report/shop/all`,
        {
          headers: { Authorization: `Bearer ${state.token}` },
        },
      );
      setShops(response.data.data.shops);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setShopLoading(false);
    }
  };
  useEffect(() => {
    if (state.user) {
      getShops();
    }
  }, [state?.token]);

  const generateReport = async (e) => {
    e.preventDefault();
    if (selectedShop) {
      setError(null);
      setLoading(true);
      setIsPrintReady(false);
      try {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0); // Set to start of the day (00:00:00)

        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999); // Set to end of the day (23:59:59)

        const viewResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/report/views/${selectedShop?._id}`,
          {
            headers: { Authorization: `Bearer ${state.token}` },
            params: {
              startDate: start.toISOString(),
              endDate: end.toISOString(),
            },
          },
        );
        setMostViewedProducts(viewResponse.data.data.stats);

        const clickedResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/report/clicked/${selectedShop?._id}`,
          {
            headers: { Authorization: `Bearer ${state.token}` },
            params: {
              startDate: start.toISOString(),
              endDate: end.toISOString(),
            },
          },
        );
        setMostClickedLinks(clickedResponse.data.data.stats);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
        toast.error(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
        setIsPrintReady(true);
      }
    } else {
      toast.error("Please select a shop");
    }
  };

  useEffect(() => {
    if (isPrintReady && selectedShop && !error) {
      triggerPrint();
      setIsPrintReady(false);
    }
  }, [isPrintReady]);

  return (
    <InnerContainer>
      {shopLoading ? (
        <div className="flex flex-grow flex-col items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div>
          <div>
            <div className="mb-4 flex items-center justify-between">
              <Title>Generate PDF Report</Title>
            </div>
            <div className="rounded-xl border border-border p-4 md:p-5">
              <Title className="mb-2 text-sm">Select Shop</Title>
              <div className="flex flex-col justify-between gap-2 md:flex-row md:gap-5">
                {shops.map((shop, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedShop(shop)}
                    className={`flex w-full cursor-pointer flex-col gap-2 rounded-lg border border-border p-4 transition-all duration-200 md:p-5 ${selectedShop?._id === shop?._id ? "bg-background" : ""}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium capitalize">
                        {shop?.name}
                      </span>
                      {selectedShop?._id === shop?._id && (
                        <FaCheckCircle className="text-xl text-green-500" />
                      )}
                    </div>
                    <div className="flex h-8 items-center justify-between">
                      <Image
                        src={shop?.logo}
                        alt={shop?.name}
                        width={120}
                        height={50}
                        className="h-8 object-scale-down object-left"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={generateReport} className="mt-5 flex flex-col">
                <Title className="text-sm">Select Date Range</Title>
                <div className="flex flex-col gap-5 md:flex-row">
                  <FormInputField
                    label="Start Date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    max={endDate}
                    required
                  />
                  <FormInputField
                    label="End Date"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate}
                    max={today}
                    required
                  />
                </div>
                <LoadingButton className="mt-5" loading={loading} type="submit">
                  Generate
                </LoadingButton>
              </form>
            </div>
          </div>
          {/* PDF Report (Hidden by default) */}
          <div className="hidden print:block" ref={pdfRef}>
            {/* Header */}
            <div className="flex justify-between">
              <div className="flex flex-col">
                <span className="text-sm">
                  Shop Name:{" "}
                  <span className="font-medium capitalize">
                    {selectedShop?.name}
                  </span>
                </span>
                <span className="text-sm">
                  From:{" "}
                  <span className="font-medium capitalize">
                    {formatDate(startDate)}
                  </span>
                </span>
                <span className="text-sm">
                  To:{" "}
                  <span className="font-medium capitalize">
                    {formatDate(endDate)}
                  </span>
                </span>
                <span className="text-sm">
                  Generated On:{" "}
                  <span className="font-medium capitalize">
                    {formatDate(new Date())}
                  </span>
                </span>
                <span className="text-sm">
                  Generated By:{" "}
                  <span className="font-medium capitalize">
                    {state?.user?.firstName} {state?.user?.lastName}
                  </span>
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-semibold">
                  Best<span className="font-light">Peek</span>
                </span>
                <span className="text-xs font-light text-muted">
                  Shop Smarter,
                  <br />
                  Not Harder.
                </span>
              </div>
            </div>
            {/* Most Clicked Links */}
            <div className="mt-16">
              <Title className="text-md font-semibold">
                Most Clicked Links
              </Title>
              <div className="mt-2">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-foreground text-left text-xs font-medium text-white">
                      <th className="w-3/12 px-4 py-2">Product ID</th>
                      <th className="w-8/12 px-4 py-2">External Link</th>
                      <th className="w-1/12 px-4 py-2">Clicks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!mostClickedLinks ? (
                      <tr>
                        <td
                          colSpan={3}
                          className="px-4 py-2 text-center text-xs text-muted"
                        >
                          No links clicked
                        </td>
                      </tr>
                    ) : (
                      mostClickedLinks.map((product, index) => (
                        <tr
                          key={product?.productId}
                          className={`text-xs ${index % 2 === 0 ? "" : "bg-slate-100"}`}
                        >
                          <td className="w-3/12 px-4 py-2">
                            <Link
                              href={`/product/${product?.productId}`}
                              target="_blank"
                            >
                              {product?.productId}
                            </Link>
                          </td>
                          <td className="w-8/12 px-4 py-2">
                            <Link href={product?.href} target="_blank">
                              {product?.href}
                            </Link>
                          </td>
                          <td className="w-1/12 px-4 py-2">
                            {product?.clicks}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Most Viewed Products */}
            <div className="mt-16">
              <Title className="text-md font-semibold">
                Most Viewed Products
              </Title>
              <div className="mt-2">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-foreground text-left text-xs font-medium text-white">
                      <th className="w-3/12 px-4 py-2">Product ID</th>
                      <th className="w-8/12 px-4 py-2">Product Name</th>
                      <th className="w-1/12 px-4 py-2">Views</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!mostViewedProducts ? (
                      <tr>
                        <td
                          colSpan={3}
                          className="px-4 py-2 text-center text-xs text-muted"
                        >
                          No products viewed
                        </td>
                      </tr>
                    ) : (
                      mostViewedProducts.map((product, index) => (
                        <tr
                          key={product?.productId}
                          className={`text-xs ${index % 2 === 0 ? "" : "bg-slate-100"}`}
                        >
                          <td className="w-3/12 px-4 py-1">
                            <Link
                              href={`/product/${product?.productId}`}
                              target="_blank"
                            >
                              {product?.productId}
                            </Link>
                          </td>
                          <td className="w-8/12 px-4 py-1">{product?.name}</td>
                          <td className="w-1/12 px-4 py-1">{product?.views}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </InnerContainer>
  );
}
