import CategoryItemChip from "@/app/components/ui/category-item-chip";
import Subtitle from "@/app/components/ui/subtitle";
import Title from "@/app/components/ui/title";
import {
  FaCalculator,
  FaCamera,
  FaCode,
  FaGamepad,
  FaHeadphones,
  FaHome,
  FaLaptop,
  FaMicrochip,
  FaNetworkWired,
  FaRobot,
  FaServer,
  FaShieldAlt,
  FaTv,
} from "react-icons/fa";
import { twMerge } from "tailwind-merge";

const categoryData = [
  {
    name: "Camera",
    slug: "camera",
    icon: <FaCamera />,
  },
  {
    name: "Components",
    slug: "components",
    icon: <FaMicrochip />,
  },
  {
    name: "Software",
    slug: "software",
    icon: <FaCode />,
  },
  {
    name: "Laptop & Tablet",
    slug: "laptop-tablet",
    icon: <FaLaptop />,
  },
  {
    name: "Accessories",
    slug: "accessories",
    icon: <FaHeadphones />,
  },
  {
    name: "Gaming",
    slug: "gaming",
    icon: <FaGamepad />,
  },

  {
    name: "Security",
    slug: "security",
    icon: <FaShieldAlt />,
  },
  {
    name: "Server",
    slug: "server",
    icon: <FaServer />,
  },
  {
    name: "Office Equipment",
    slug: "office-equipment",
    icon: <FaCalculator />,
  },
  // {
  //   name: "Component",
  //   slug: "component",
  //   icon: <FaMicrochip />,
  // },
  // {
  //   name: "Software",
  //   slug: "software",
  //   icon: <FaCode />,
  // },
  // {
  //   name: "Network",
  //   slug: "network",
  //   icon: <FaNetworkWired />,
  // },
  {
    name: "TV & Audio",
    slug: "tv-audio",
    icon: <FaTv />,
  },
  {
    name: "Home Appliance",
    slug: "home-appliance",
    icon: <FaHome />,
  },
  {
    name: "Gadgets",
    slug: "gadgets",
    icon: <FaRobot />,
  },
];

export default function FeaturedCategory({ className }) {
  return (
    <div className={twMerge("w-full", className)}>
      <Title className="text-center text-xl sm:text-2xl font-bold">
        Featured Category
      </Title>
      <Subtitle className="text-center text-xs md:text-sm mb-4">
        Find your product from featured category
      </Subtitle>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
        {categoryData?.map(({ name, slug, icon }, index) => (
          <CategoryItemChip
            key={index}
            name={name}
            icon={icon}
            href={`/product?page=1&limit=12&category=${slug}`}
          />
        ))}
      </div>
    </div>
  );
}
