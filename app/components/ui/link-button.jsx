import Button from "@/app/components/ui/button";
import Link from "next/link";
export default function LinkButton({ href, children, ...props }) {
  return (
    <Link href={href} className="w-full">
      <Button {...props}>{children}</Button>
    </Link>
  );
}
