import toast from "react-hot-toast";
import { IoMdShare } from "react-icons/io";

export default function ShareButton({ title, url, text, position = "center" }) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title || "Check this out!",
          text: text || "I found something interesting!",
          url: url || window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
        toast.error("Sharing failed. Please try again!");
      }
    } else {
      toast.error("Sharing not supported");
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex h-10 w-10 relative group sm:h-11 sm:w-11 items-center justify-center rounded-full text-base sm:text-lg transition-colors duration-200 hover:bg-black hover:text-white "
    >
      <IoMdShare />
      <div
        className={` ${position === "left" ? "left-1" : position === "right" ? "right-1" : "left-1/2 -translate-x-1/2"}  absolute invisible opacity-0 -top-12 z-50  whitespace-nowrap rounded-md bg-gray-800 px-2 py-1 text-xs text-white transition-all duration-200 group-hover:visible group-hover:opacity-100 group-hover:-top-10`}
      >
        <div className="text-white text-xs rounded py-1 px-1 bottom-full">
          Share
          <svg
            className={`${position === "left" ? "left-0 ml-3" : position === "right" ? "right-0 mr-3 " : "w-full left-0 "} absolute text-black h-2 top-full`}
            viewBox="0 0 255 255"
          >
            <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
          </svg>
        </div>
      </div>
    </button>
  );
}
