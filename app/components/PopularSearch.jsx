import SearchItemChip from "@/app/components/ui/search-item-chip";
import Subtitle from "@/app/components/ui/subtitle";
import Title from "@/app/components/ui/title";
import { twMerge } from "tailwind-merge";

export default function PopularSearch({ className }) {
  const popularSearchItems = [
    { title: "Computer", link: "/product?limit=12&page=1&search=computer" },
    { title: "Laptop", link: "/product?limit=12&page=1&search=laptop" },
    { title: "Smartphone", link: "/product?limit=12&page=1&search=smartphone" },
    {
      title: "Accessories",
      link: "/product?limit=12&page=1&search=accessories",
    },
    { title: "Tablet", link: "/product?limit=12&page=1&search=tablet" },
    { title: "Headphone", link: "/product?limit=12&page=1&search=headphone" },
  ];
  return (
    <div className={twMerge("w-full", className)}>
      <Title className="text-center text-xl sm:text-2xl font-bold">
        Popular Search
      </Title>
      <Subtitle className="text-center text-xs md:text-sm mb-4">
        Find your product from popular search
      </Subtitle>
      <div className="grid grid-cols-3 sm:grid-cols-3  lg:grid-cols-6 gap-3 sm:gap-4">
        {popularSearchItems?.map(({ title, link }, index) => (
          <SearchItemChip key={index} title={title} href={link} />
        ))}
      </div>
    </div>
  );
}
