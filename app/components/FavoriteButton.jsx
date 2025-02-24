"use client";

import { useSignInAlert } from "@/context/SigninAlertContext";
import { UserContext } from "@/context/UserContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import ToolTip from "./ui/tool-tip";

export default function FavoriteButton({ product, position = "center" }) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [state, setState] = useContext(UserContext);
  const { showAlert } = useSignInAlert();

  // Check if the product is in the user's favorites
  useEffect(() => {
    if (
      state?.user?.favorites &&
      state.user.favorites.some((id) => id.product === product._id)
    ) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [state?.user?.favorites, product._id]);

  // Handle favorite click
  const handleFavorite = async () => {
    // Redirect to login if not logged in
    if (!state.user) {
      showAlert();
      return;
    }

    try {
      // toast.loading("Updating Favorite List");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/actions/add-to-favorite/${product._id}`,
        {},
        { headers: { Authorization: `Bearer ${state.token}` } },
      );

      setState((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          favorites: response.data.data.favorites,
        },
      }));

      const updatedAuth = {
        ...JSON.parse(window.localStorage.getItem("auth")),
        user: {
          ...state.user,
          favorites: response.data.data.favorites,
        },
      };

      window.localStorage.setItem("auth", JSON.stringify(updatedAuth));
      // toast.dismiss();
      toast.success(response.data.message);
    } catch (error) {
      // toast.dismiss();
      toast.error(error.response?.data?.message || error.message);
      console.error(error);
    }
  };
  return (
    <button
      onClick={handleFavorite}
      className="group relative flex h-10 w-10 items-center justify-center rounded-full text-base transition-colors duration-200 hover:bg-black hover:text-white sm:h-11 sm:w-11 sm:text-lg"
    >
      {isFavorite ? <FaHeart /> : <FaRegHeart />}
      <ToolTip position={position}>
        {isFavorite ? "Remove from favorite" : "Add to favorite"}
      </ToolTip>
    </button>
  );
}
