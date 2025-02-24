"use client";

import { useSignInAlert } from "@/context/SigninAlertContext";
import { UserContext } from "@/context/UserContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TbTargetArrow } from "react-icons/tb";
import { VscTarget } from "react-icons/vsc";
import Button from "./ui/button";
import FormInputField from "./ui/form-input-field";
import LoadingButton from "./ui/loading-button";
import Modal from "./ui/modal";
import ToolTip from "./ui/tool-tip";

export default function WishlistButton({ product, position = "center" }) {
  const [isWishlist, setIsWishlist] = useState(false);
  const [loading, setLoading] = useState(false);
  const [targetPrice, setTargetPrice] = useState(null);
  const [targetPriceError, setTargetPriceError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useContext(UserContext);
  const { showAlert } = useSignInAlert();

  // Check if the product is in the user's compare
  useEffect(() => {
    if (
      state?.user?.wishlist &&
      state.user.wishlist.some((id) => id.product === product._id)
    ) {
      setIsWishlist(true);
    } else {
      setIsWishlist(false);
    }
  }, [state?.user?.wishlist, product._id]);

  // Handle initial click
  const handleInitialClick = (e) => {
    e.preventDefault();

    // show signup alert if not logged in
    if (!state.user) {
      showAlert();
      return;
    }

    if (!isWishlist) {
      setIsOpen(true);
    } else {
      handleWishlist(e);
    }
  };

  // Handle wishlist click
  const handleWishlist = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (targetPrice === null && !isWishlist) {
        setTargetPriceError("Target price is required");
        setLoading(false);
        return;
      }

      // toast.loading("Updating Wishlist");

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/actions/add-to-wishlist/${product._id}`,
        { targetPrice },
        { headers: { Authorization: `Bearer ${state.token}` } },
      );

      setState((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          wishlist: response.data.data.wishlist,
        },
      }));

      console.log(state.user.wishlist);
      const updatedAuth = {
        ...JSON.parse(window.localStorage.getItem("auth")),
        user: {
          ...state.user,
          wishlist: response.data.data.wishlist,
        },
      };

      window.localStorage.setItem("auth", JSON.stringify(updatedAuth));

      // toast.dismiss();
      toast.success(response.data.message);

      setLoading(false);
      setIsOpen(false);
      setTargetPrice(null);
      setTargetPriceError(null);
    } catch (error) {
      console.error(error);
      // toast.dismiss();
      toast.error(error.response?.data?.message || error.message);
      setLoading(false);
      setIsOpen(false);
      setTargetPrice(null);
      setTargetPriceError(null);
    }
  };
  return (
    <div>
      <button
        onClick={handleInitialClick}
        className="group relative flex h-10 w-10 items-center justify-center rounded-full text-base transition-colors duration-200 hover:bg-black hover:text-white sm:h-11 sm:w-11 sm:text-lg"
      >
        {isWishlist ? <TbTargetArrow /> : <VscTarget />}
        <ToolTip position={position}>
          {isWishlist ? "Remove from wishlist" : "Add to wishlist"}
        </ToolTip>
      </button>

      <Modal title="Set Your Target Price" isOpen={isOpen}>
        <form onSubmit={handleWishlist} className="flex flex-col gap-5">
          <FormInputField
            label="Target Price"
            type="number"
            max={product.bestPrice}
            min={1}
            placeholder={`৳${product.bestPrice}`}
            error={targetPriceError}
            onChange={(e) => setTargetPrice(e.target.value)}
          />
          <div className="flex justify-between gap-5">
            <Button
              variant="outline"
              onClick={() => {
                setIsOpen(false);
                setTargetPriceError(null);
              }}
              disabled={loading}
            >
              Cancel
            </Button>
            <LoadingButton type="submit" loading={loading} disabled={loading}>
              Set
            </LoadingButton>
          </div>
        </form>
      </Modal>
    </div>
  );
}
