"use client";

import { UserContext } from "@/context/UserContext";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { MdAddToPhotos, MdClose } from "react-icons/md";
import CompareProductCard from "./compare-product-card";
import Button from "./ui/button";

export default function ComparePopup() {
  const router = useRouter();
  const pathname = usePathname();
  const [state, setState] = useContext(UserContext);
  const [compareProducts, setCompareProducts] = useState([]);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  // fetch compare products
  const fetchCompareProducts = async () => {
    try {
      if (state?.user?.compare?.length > 0) {
        const responses = await Promise.all(
          state.user.compare.map((item) =>
            axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/api/product/${item.product}`,
            ),
          ),
        );

        setCompareProducts(
          responses.map((response) => response.data.data.product),
        );
      } else {
        setCompareProducts([]);
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchCompareProducts();
  }, [state?.user?.compare]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCompare = () => {
    handleClose();
    router.push("/user/compare");
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClearAll = async () => {
    handleClose();
    try {
      for (const item of state.user.compare) {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/user/actions/add-to-compare/${item.product}`,
          {},
          { headers: { Authorization: `Bearer ${state.token}` } },
        );
        setCompareProducts(res.data.data.compare);
        setState((prev) => ({
          ...prev,
          user: {
            ...prev.user,
            compare: [],
          },
        }));
        const updatedAuth = {
          ...JSON.parse(window.localStorage.getItem("auth")),
          user: {
            ...state.user,
            compare: [],
          },
        };
        window.localStorage.setItem("auth", JSON.stringify(updatedAuth));
      }
    } catch (error) {
      console.error("Error clearing compare list:", error);
    }
  };

  if (pathname.includes("/admin") || pathname.includes("/user")) {
    return null;
  }

  return (
    <div className="fixed bottom-0 right-0 z-[999] m-8 flex justify-end">
      {!open ? (
        <div
          className="relative ml-auto flex w-fit cursor-pointer flex-col items-center justify-center gap-1 rounded-md border border-background bg-[#1F2937] p-3 text-xl text-white shadow-lg transition-colors duration-300 hover:bg-foreground"
          onClick={handleOpen}
        >
          <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-sm font-semibold text-white">
            {compareProducts.length}
          </span>
          <MdAddToPhotos />
          <p className="text-xs uppercase">Compare</p>
        </div>
      ) : (
        <div className="w-full overflow-hidden rounded-md shadow-lg">
          <div className="flex items-center justify-between bg-[#1F2937] px-5 py-3 text-sm">
            <p className="font-semibold text-white">Compare Products</p>
            <MdClose
              className="cursor-pointer text-lg text-white hover:text-red-500"
              onClick={handleClose}
            />
          </div>
          {compareProducts.length === 0 ? (
            <p className="w-full text-nowrap bg-white px-14 py-8 text-center text-sm text-red-500 md:px-24">
              Your compare list is empty!
            </p>
          ) : (
            <div className="flex flex-col gap-2 bg-white p-3 md:gap-4 md:p-5">
              {compareProducts.map((product) => (
                <CompareProductCard key={product._id} product={product} />
              ))}
              <div className="bottom-0 flex gap-5 pt-1.5 md:pt-2.5">
                <Button variant="outline" size="sm" onClick={handleClearAll}>
                  Clear
                </Button>
                <Button variant="primary" size="sm" onClick={handleCompare}>
                  Compare
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}