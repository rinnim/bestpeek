import {
  appleLogo,
  asusLogo,
  gigabyteLogo,
  hpLogo,
  msiLogo,
  samsungLogo,
} from "@/app/assets/index";

import BrandItemChip from "@/app/components/ui/brand-item-chip";
import Subtitle from "@/app/components/ui/subtitle";
import Title from "@/app/components/ui/title";
import { twMerge } from "tailwind-merge";

const popularBrands = [
  { name: "Apple", slug: "apple", image: appleLogo },
  { name: "Asus", slug: "asus", image: asusLogo },
  { name: "Gigabyte", slug: "gigabyte", image: gigabyteLogo },
  { name: "HP", slug: "hp", image: hpLogo },
  { name: "MSI", slug: "msi", image: msiLogo },
  { name: "Samsung", slug: "samsung", image: samsungLogo },
];

export default function PopularBrands({ className }) {
  return (
    <div className={twMerge("w-full", className)}>
      <Title className="text-center text-xl sm:text-2xl font-bold">
        Popular Brands
      </Title>
      <Subtitle className="text-center text-xs md:text-sm mb-4">
        Find your product from popular brands
      </Subtitle>
      <div className="grid grid-cols-2 sm:grid-cols-3  lg:grid-cols-6 gap-3 sm:gap-4">
        {popularBrands?.map(({ name, slug, image }, index) => (
          <BrandItemChip
            key={index}
            name={name}
            href={`/product?limit=12&page=1&brand=${slug}`}
            image={image}
          />
        ))}
      </div>
    </div>
  );
}
