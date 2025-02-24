"use client";

import { useSignInAlert } from "@/context/SigninAlertContext";
import { UserContext } from "@/context/UserContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdLibraryAddCheck, MdOutlineLibraryAdd } from "react-icons/md";
import ToolTip from "./ui/tool-tip";

export default function CompareButton({ product, position = "center" }) {
  const router = useRouter();
  const [isCompare, setIsCompare] = useState(false);
  const [state, setState] = useContext(UserContext);
  const { showAlert } = useSignInAlert();

  // Check if the product is in the user's compare
  useEffect(() => {
    if (
      state?.user?.compare &&
      state.user.compare.some((id) => id.product === product._id)
    ) {
      setIsCompare(true);
    } else {
      setIsCompare(false);
    }
  }, [state?.user?.compare, product._id]);

  // Handle compare click
  const handleCompare = async () => {
    // Redirect to login if not logged in
    if (!state.user) {
      showAlert();
      return;
    }

    try {
      // toast.loading("Updating Compare List");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/actions/add-to-compare/${product._id}`,
        {},
        { headers: { Authorization: `Bearer ${state.token}` } }
      );

      setState((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          compare: response.data.data.compare,
        },
      }));

      console.log(state.user.compare);
      const updatedAuth = {
        ...JSON.parse(window.localStorage.getItem("auth")),
        user: {
          ...state.user,
          compare: response.data.data.compare,
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
      onClick={handleCompare}
      className="group relative flex h-10 w-10 items-center justify-center rounded-full text-base transition-colors duration-200 hover:bg-black hover:text-white sm:h-11 sm:w-11 sm:text-lg"
    >
      {isCompare ? <MdLibraryAddCheck /> : <MdOutlineLibraryAdd />}
      <ToolTip position={position}>
        {isCompare ? "Remove from compare" : "Add to compare"}
      </ToolTip>
    </button>
  );
}
