import { twMerge } from "tailwind-merge";

export default function Button({
  disabled = false,
  children,
  className,
  type = "button",
  variant = "primary",
  size = "md",
  onClick,
}) {
  const variants = {
    primary:
      "bg-foreground text-background border border-foreground hover:bg-blue-900 hover:border-blue-900",
    outline:
      "bg-transparent text-foreground border border-foreground hover:bg-blue-100 hover:border-blue-100 ",
    error:
      "bg-error text-background border border-error hover:bg-blue-900 hover:border-blue-900",
    text: "bg-transparent text-foreground hover:bg-blue-100",
  };

  const sizes = {
    sm: "h-8 text-xs px-2 py-1",
    md: "h-10 text-sm px-3 py-2",
    lg: "h-12 text-sm px-4 py-2",
  };
  return (
    <button
      type={type}
      className={twMerge(
        "flex items-center justify-center w-full rounded-md duration-300 text-primary-foreground transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <div className="font-semibold">{children}</div>
    </button>
  );
}
