"use client";

import CompareButton from "@/app/components/CompareButton";
import FavoriteButton from "@/app/components/FavoriteButton";
import Breadcrumb from "@/app/components/ui/breadcrumb";
import BreadcrumbSkeleton from "@/app/components/ui/breadcrumb-skeleton";
import Container from "@/app/components/ui/container";
import LineChartComponent from "@/app/components/ui/line-chart";
import NotFoundCard from "@/app/components/ui/not-found-card";
import PriceTimelineSkeleton from "@/app/components/ui/price-timeline-skeleton";
import ProductCard from "@/app/components/ui/product-card";
import ProductDetailsSkeleton from "@/app/components/ui/product-details-skeleton";
import ProductSpecificationSkeleton from "@/app/components/ui/product-specification-skeleton";
import ProductImage from "@/app/components/ui/ProductImage";
import RelatedProductCard from "@/app/components/ui/realted-product-card";
import RelatedProductCardSkeleton from "@/app/components/ui/related-product-card-skeleton";
import ShareButton from "@/app/components/ui/share-button";
import SourceCard from "@/app/components/ui/source-card";
import Subtitle from "@/app/components/ui/subtitle";
import Title from "@/app/components/ui/title";
import WishlistButton from "@/app/components/WishlistButton";
import { generatePriceTimeline } from "@/app/utils/products";
import { useSignInAlert } from "@/context/SigninAlertContext";
import { UserContext } from "@/context/UserContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaRegEye, FaRegHeart } from "react-icons/fa";

export default function ProductDetailsPage({ params }) {
  const { id } = params;

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [sources, setSources] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [relatedProductsLoading, setRelatedProductsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [state] = useContext(UserContext);
  const { showAlert } = useSignInAlert();

  // Fetch product details
  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/product/${id}`,
      );
      setProduct(response.data.data.product);
      setSources(response.data.data.sources);
    } catch (error) {
      setError(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const recordProductViewHistory = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/history/record`,
        {
          productId: id,
          userId: state?.user?._id || null,
        },
      );
    } catch (error) {
      // toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchProductDetails();
    recordProductViewHistory();
  }, [id]);

  // Fetch related products
  const fetchRelatedProducts = async () => {
    setRelatedProductsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/product/filter`,
        {
          params: {
            limit: 12,
            page: 1,
            minPrice:
              !isNaN(product?.bestPrice) && product?.bestPrice > 0
                ? product?.bestPrice * 0.75
                : 1,
            maxPrice:
              !isNaN(product?.bestPrice) && product?.bestPrice > 0
                ? product?.bestPrice * 1.25
                : undefined,
            category: product?.subCategoryId?.categoryId?.slug,
            subCategory: product?.subCategoryId?.slug,
          },
        },
      );
      setRelatedProducts(response.data.data.products);
    } catch (error) {
      console.error("Failed to fetch related products:", error);
    } finally {
      setRelatedProductsLoading(false);
    }
  };

  useEffect(() => {
    fetchRelatedProducts();
  }, [product]);

  const recordShopVisitHistory = async (source) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/history/record`,
        {
          shopId: source?.shopId?._id,
          productId: id,
          userId: state?.user?._id,
          href: source?.href,
        },
      );
      // window.location.href = source.href;
    } catch (error) {
      // toast.error("Something went wrong");
    }
  };

  if (error) {
    return (
      <Container className="flex w-full flex-grow flex-col items-center justify-center">
        <div className="flex w-full flex-grow items-center justify-center rounded-md bg-white p-10">
          <NotFoundCard>
            <Title className="text-2xl font-semibold md:text-3xl">Oops!</Title>
            <Subtitle className="font-light capitalize">{error}</Subtitle>
          </NotFoundCard>
        </div>
      </Container>
    );
  }

  return (
    <Container className="pb-3 pt-0 md:pb-10 md:pt-0">
      {loading ? (
        <BreadcrumbSkeleton />
      ) : (
        <Breadcrumb
          category={product?.subCategoryId?.categoryId?.name}
          categorySlug={product?.subCategoryId?.categoryId?.slug}
          subcategory={product?.subCategoryId?.name}
          subcategorySlug={product?.subCategoryId?.slug}
          brand={product?.brand}
          brandSlug={product?.brandSlug}
        />
      )}

      {loading ? (
        <ProductDetailsSkeleton />
      ) : (
        // Product image, details, sources
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Product Main */}
          <div className="flex flex-col gap-2 md:gap-4">
            <ProductImage image={product?.images[selectedImageIndex]} />
            {/* Product thumbnails */}
            <div className="flex items-center justify-center gap-2">
              {product?.images.slice(0, 7).map((image, index) => (
                <ProductImage
                  onClick={() => setSelectedImageIndex(index)}
                  key={index}
                  isSubImg={true}
                  image={image}
                  height={100}
                  width={100}
                  priority={index === selectedImageIndex}
                  className={`border ${
                    selectedImageIndex === index
                      ? "border-blue-500"
                      : "border-transparent"
                  } w-10 cursor-pointer rounded-md md:w-full md:max-w-16`}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {/* Product details */}
            <div className="rounded-md bg-white p-5 md:mt-0">
              <div className="text-xl font-semibold md:text-2xl">
                {product?.name}
              </div>
              {/* brand & model */}
              <div className="md:text-md py-3 text-sm md:py-4">
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
                  <div className="text-md font-light">
                    Model: <span className="font-medium">{product?.model}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    {" "}
                    <FaRegEye />
                    <span>{product?.views}</span>
                  </div>
                </div>
              </div>

              {/* Key Features only show if there are features */}
              {product?.features && product?.features.length > 0 && (
                <div className="w-full">
                  <Title className="font-semibold">Key Features</Title>
                  <table className="w-full">
                    <tbody>
                      {product?.features.slice(0, 3).map((feature) => (
                        <tr
                          key={feature._id}
                          className="flex justify-between gap-4 text-sm md:gap-8"
                        >
                          <td>{feature.name}</td>
                          <td
                            className="text-right font-light"
                            dangerouslySetInnerHTML={{
                              __html: feature.value,
                            }}
                          />
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Favorite, Wishlist and Compare Button */}
              <div className="mt-4 flex justify-around">
                <FavoriteButton product={product} />
                <WishlistButton product={product} />
                <CompareButton product={product} />
                <ShareButton />
              </div>
            </div>

            <div className="flex flex-col gap-2 md:gap-4">
              {sources
                ?.sort((a, b) => {
                  if (a.currentPrice === 0) return 1;
                  if (b.currentPrice === 0) return -1;
                  return a.currentPrice - b.currentPrice;
                })
                .map((source, index) => (
                  <SourceCard
                    onClick={() => {
                      if (!state?.user) {
                        showAlert();
                      } else {
                        recordShopVisitHistory(source);
                      }
                    }}
                    key={index}
                    source={source}
                    index={index}
                    bestPrice={product.bestPrice}
                  />
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Price Timeline */}
      {loading ? (
        <PriceTimelineSkeleton />
      ) : (
        <div className="mt-10 flex h-full w-full flex-col gap-4 rounded-md bg-white p-5 shadow-sm">
          <LineChartComponent
            chartData={generatePriceTimeline(sources)}
            title={"Price Timeline"}
          />
        </div>
      )}

      {/* Skeleton for Specifications and Related Products */}
      {loading && (
        <div className="mt-10 flex flex-col justify-between gap-10 md:flex-row">
          <ProductSpecificationSkeleton />
          <div className="w-full rounded-md md:w-1/4">
            <div className="rounded-md bg-white p-5">
              <div className="h-5 w-24 animate-pulse rounded bg-gray-200" />
            </div>
            <div className="mt-5 flex flex-col gap-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <RelatedProductCardSkeleton key={index} />
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Specifications and Related Products */}
      {!loading && product?.features && product?.features.length > 0 ? (
        <div className="mt-10 flex flex-col justify-between gap-10 md:flex-row">
          {/* Specifications */}
          <div className="flex-1 rounded-md bg-white p-5">
            <Title className="font-bold">Specifications</Title>

            <div className="flex w-full">
              <table className="mt-2 w-full min-w-full overflow-hidden">
                <tbody>
                  {product?.features.map((feature) => (
                    <tr
                      key={feature._id}
                      className={`flex flex-col items-center border-b border-gray-100 text-xs duration-200 hover:bg-background md:flex-row md:text-sm`}
                    >
                      <td className="flex-1 px-2 pt-2 font-medium md:p-4">
                        {feature.name}
                      </td>
                      <td
                        className="flex-1 px-2 pb-2 text-center font-light text-gray-800 md:p-4 md:text-start"
                        dangerouslySetInnerHTML={{ __html: feature.value }}
                      />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Related Products */}
          {relatedProductsLoading ? (
            <div className="w-full rounded-md md:w-1/4">
              <div className="rounded-md bg-white p-5">
                <div className="h-5 w-24 animate-pulse rounded bg-gray-200" />
              </div>
              <div className="mt-5 flex flex-col gap-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <RelatedProductCardSkeleton key={index} />
                ))}
              </div>
            </div>
          ) : relatedProducts.length > 0 ? (
            <div className="w-full rounded-md md:w-1/4">
              <Title className="rounded-md bg-white p-5 font-bold">
                Related Products
              </Title>
              <div className="mt-4 flex flex-col gap-2 md:gap-4">
                {relatedProducts.map((product) => (
                  <RelatedProductCard key={product._id} product={product} />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <div>
          {/* Related Products When no features */}
          {relatedProducts.length > 0 && (
            <div className="mx-auto w-full max-w-screen-xl">
              <Title className="mt-10 rounded-md bg-white p-5 font-bold">
                Related Products
              </Title>
              <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-6">
                {relatedProducts.map((product) => (
                  <div key={product._id}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Container>
  );
}
