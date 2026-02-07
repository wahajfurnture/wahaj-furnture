"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const heroImages = ["/img-1.webp", "/img-2.webp", "/img-3.webp", "/img-4.webp"];

export default function HeroSwiper() {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
        bulletClass: "swiper-bullet",
        bulletActiveClass: "swiper-bullet-active",
      }}
      loop={true}
      className="absolute inset-0 w-full h-full"
    >
      {heroImages.map((image, index) => (
        <SwiperSlide key={index} className="relative">
          <Image
            src={image}
            alt={`Hero ${index + 1}`}
            fill
            className="object-cover w-full h-full"
            priority={index === 0}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
