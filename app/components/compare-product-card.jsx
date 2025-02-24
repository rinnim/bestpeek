import { UserContext } from "@/context/UserContext";
import axios from "axios";
import Image from "next/image";
import { useContext } from "react";
import { MdClose } from "react-icons/md";
import { twMerge } from "tailwind-merge";

// import toast from "react-hot-toast";

export default function CompareProductCard({ product, className }) {
  const [state, setState] = useContext(UserContext);

  // Handle compare click
  const handleCompare = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/actions/add-to-compare/${product._id}`,
        {},
        { headers: { Authorization: `Bearer ${state.token}` } },
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

      // toast.success(response.data.message);
    } catch (error) {
      // toast.error(error.response?.data?.message || error.message);
      console.error(error);
    }
  };
  return (
    <div
      className={twMerge(
        "flex w-full items-center gap-4 rounded-md border border-border px-2 duration-200 md:px-4",
        className,
      )}
    >
      <div className="flex w-full items-center gap-2 md:gap-4">
        <div className="aspect-square overflow-hidden rounded-md">
          <Image
            src={product?.images[0]}
            alt="productImage"
            width={100}
            height={100}
            className="object-cover"
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          <div className="flex flex-col gap-1">
            <div className="text-xs font-medium md:text-sm">
              {product?.name}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <MdClose
          size={20}
          className="cursor-pointer hover:text-red-600"
          onClick={handleCompare}
        />
      </div>
    </div>
  );
}
