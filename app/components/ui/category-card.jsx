import Link from "next/link";
import { twMerge } from "tailwind-merge";

export default function CategoryCard({ icon, name, slug, className }) {
  return (
    <Link
      href={`/category/${slug}`}
      className={twMerge(
        "group relative h-auto w-full shadow-sm overflow-hidden rounded-md",
        className
      )}
    >
      <div className="h-full w-full overflow-hidden">
        {icon}
        <div className="w-full text-center">
          <p className="text-sm font-bold md:text-base">{name}</p>
        </div>
      </div>
    </Link>
  );
}
