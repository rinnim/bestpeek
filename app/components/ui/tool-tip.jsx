export default function ToolTip({ position = "center", children }) {
  return (
    <div
      className={` ${position === "left" ? "left-1" : position === "right" ? "right-1" : "left-1/2 -translate-x-1/2"} invisible absolute -top-12 z-30 whitespace-nowrap rounded-md bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-all duration-200 group-hover:visible group-hover:-top-10 group-hover:opacity-100`}
    >
      <div className="bottom-full rounded px-1 py-1 text-xs text-white">
        {children}
        <svg
          className={`${position === "left" ? "left-0 ml-3" : position === "right" ? "right-0 mr-3" : "left-0 w-full"} absolute top-full h-2 text-black`}
          viewBox="0 0 255 255"
        >
          <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
        </svg>
      </div>
    </div>
  );
}
