"use client";

import Button from "@/app/components/ui/button";
import InnerContainer from "@/app/components/ui/inner-container";
import LineChartComponent from "@/app/components/ui/line-chart";
import Loader from "@/app/components/ui/loader";
import NotFoundCard from "@/app/components/ui/not-found-card";
import ProductImage from "@/app/components/ui/ProductImage";
import SourceCardSmall from "@/app/components/ui/SourceCardSmall";
import Title from "@/app/components/ui/title";
import { generatePriceTimeline } from "@/app/utils/products";
import { UserContext } from "@/context/UserContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaRegEye, FaRegHeart } from "react-icons/fa";

export default function ComparePage() {
  const [state] = useContext(UserContext);
  const [compareProducts, setCompareProducts] = useState([]);
  const [productSources, setProductSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchCompareProducts = async () => {
    try {
      setLoading(true);

      if (state.user && state.user.compare.length > 0) {
        const responses = await Promise.all(
          state.user.compare.map((item) =>
            axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/api/product/${item.product}`,
            ),
          ),
        );
        console.log(responses);

        setCompareProducts(
          responses.map((response) => response.data.data.product),
        );
        setProductSources(
          responses.map((response) => response.data.data.sources),
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompareProducts();
  }, [state.user]);

  const recordHistory = async (source) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/history/record`,
        {
          shopId: source.shopId._id,
          productId: product?._id,
          userId: state?.user?._id,
        },
      );
      window.location.href = source.href;
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-md bg-white p-4">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-md bg-white p-4">
        <NotFoundCard title={error} />
      </div>
    );
  }

  if (compareProducts.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-md bg-white p-4">
        <NotFoundCard title="No products to compare">
          <Button className="mt-5" onClick={() => router.push("/product")}>
            Add Product
          </Button>
        </NotFoundCard>
      </div>
    );
  }
  if (compareProducts.length === 1) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-md bg-white p-4">
        <NotFoundCard title="Add another product to compare">
          <Button className="mt-5" onClick={() => router.push("/product")}>
            Add Product
          </Button>
        </NotFoundCard>
      </div>
    );
  }
  return (
    <InnerContainer>
      {/* Images and Details */}
      <div className="grid grid-cols-2 gap-2 md:gap-4">
        {compareProducts.map((product, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-md border border-border"
          >
            <ProductImage image={product.images[0]} />
            <div className="p-2 md:p-4">
              <p className="md:text-md text-sm font-semibold">
                {product?.name}
              </p>
              <div className="py-2 text-xs md:py-3">
                <div className="flex justify-between">
                  <div className="font-light">
                    Brand: <span className="font-medium">{product?.brand}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    {" "}
                    <FaRegHeart />
                    <span>{product?.favorites}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="font-light">
                    Model: <span className="font-medium">{product?.model}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    {" "}
                    <FaRegEye />
                    <span>{product?.views}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Available at */}
      <div className="mt-3 w-full rounded-md border border-border md:mt-5">
        <Title className="py-2 text-center font-semibold md:py-3">
          Available At
        </Title>
        <div className="grid w-full grid-cols-2 gap-2 px-2 pb-4 md:gap-4 md:px-4">
          {productSources.map((singleProductSources, index) => (
            <div key={index}>
              <div className="flex w-full flex-col gap-2 md:gap-4">
                {singleProductSources
                  ?.sort((a, b) => {
                    if (a.currentPrice === 0) return 1;
                    if (b.currentPrice === 0) return -1;
                    return a.currentPrice - b.currentPrice;
                  })
                  .map((source, index) => (
                    <SourceCardSmall
                      onClick={() => recordHistory(source)}
                      key={index}
                      source={source}
                      index={index}
                      className="border border-border"
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Price Timeline */}
      <div className="mt-3 w-full rounded-md border border-border md:mt-5">
        <Title className="py-2 text-center font-semibold md:py-3">
          Price Timeline
        </Title>
        <div className="grid w-full grid-cols-1 gap-2 px-2 pb-4 md:grid-cols-2 md:gap-4 md:px-4">
          {productSources.map((singleProductSources, index) => (
            <div
              key={index}
              className="rounded-md border border-border p-2 md:p-4"
            >
              <LineChartComponent
                chartData={generatePriceTimeline(singleProductSources)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Specifications */}
      <div className="mt-3 w-full rounded-md border border-border md:mt-5">
        <Title className="py-2 text-center font-semibold md:py-3">
          Specifications
        </Title>
        <div className="grid w-full grid-cols-2 gap-2 px-2 pb-2 md:gap-4 md:px-4 md:pb-4">
          {compareProducts.map(
            (product) =>
              product?.features &&
              product?.features.length > 0 && (
                <div
                  className="w-full rounded-md border border-border p-1 md:p-4"
                  key={product._id}
                >
                  <table className="min-w-full overflow-hidden">
                    <tbody>
                      {product?.features.map((feature) => (
                        <tr
                          key={feature._id}
                          className={`flex flex-col border-b border-gray-100 text-sm duration-200 hover:bg-background md:flex-row`}
                        >
                          <td className="flex-1 px-2 pt-2 font-medium md:p-4">
                            {feature.name}
                          </td>
                          <td
                            className="flex-1 px-2 pb-2 font-light text-gray-800 md:p-4"
                            dangerouslySetInnerHTML={{ __html: feature.value }}
                          ></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ),
          )}
        </div>
      </div>
    </InnerContainer>
  );
}
