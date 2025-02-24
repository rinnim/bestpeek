import FeaturedCategory from "@/app/components/FeaturedCategory";
import MostViewedProduct from "@/app/components/MostViewedProduct";
import PopularBrands from "@/app/components/PopularBrands";
import PopularOffers from "@/app/components/PopularOffers";
import PopularProducts from "@/app/components/PopularProducts";
import PopularSearch from "@/app/components/PopularSearch";
import Container from "@/app/components/ui/container";

export default function Home() {
  return (
    <Container>
      <PopularOffers />
      <FeaturedCategory className="mt-8 md:mt-16" />
      <PopularProducts className="mt-8 md:mt-16" />
      <MostViewedProduct className="mt-8 md:mt-16" />
      <PopularBrands className="mt-8 md:mt-16" />
      <PopularSearch className="mt-8 md:mt-16" />
    </Container>
  );
}
