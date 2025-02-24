"use client";
import { homeImage } from "@/app/assets/index";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
export default function PopularOffers() {
  const images = [
    "https://www.techlandbd.com/image/cache/wp/gj/AAA-Offer/Daily-content-banner/slider-01-1024x476w.webp",
    "https://www.techlandbd.com/image/cache/wp/ge/AAA-Offer/Daily-content-banner/xiaomi-tv-offer-1024x476.webp",
    "https://www.techlandbd.com/image/cache/wp/gj/AAA-Offer/Daily-content-banner/Ultra%20series%20laptop%20banner-640x300.webp",
    "https://www.techlandbd.com/image/cache/wp/gj/AAA-Offer/Daily-content-banner/asus%20creator%20-%20laptop%20deals-1500x400w.webp",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    let nextIndex = currentIndex + 1;
    if (nextIndex >= images.length) {
      nextIndex = 0;
    }
    setCurrentIndex(nextIndex);
  };

  const handlePrev = () => {
    let prevIndex = currentIndex - 1;
    if (prevIndex <= 0) {
      prevIndex = images.length - 1;
    }
    setCurrentIndex(prevIndex);
  };

  return (
    <div className="relative aspect-[2.42285] overflow-hidden rounded-md">
      {/* {images?.map((src, index) => (
        <Image
          key={index}
          src={src}
          alt={`offer-${index + 1}`}
          width={1024}
          height={476}
          className={`absolute left-0 top-0 h-full w-full object-cover transition-transform duration-300 ease-in-out`}
          style={{
            transform: `translateX(${(index - currentIndex) * 100}%)`,
          }}aspect-[2.1512605042]
        />
      ))} */}

      <Image
        src={homeImage}
        alt=""
        width={(2150)}
        height={852}
        className={`absolute left-0 top-0 h-full w-full object-cover transition-transform duration-300 ease-in-out`}
      />

      {/* Dots */}
    </div>
  );
}
