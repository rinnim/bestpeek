import { twMerge } from "tailwind-merge";
import Link from "next/link";
export default function TextButton({ children, className, href, ...props }) {
  return (
    <Link
      href={href}
      className={twMerge(
        "text-muted text-sm hover:underline hover:text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
