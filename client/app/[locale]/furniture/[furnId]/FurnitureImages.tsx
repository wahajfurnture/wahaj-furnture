"use client";
import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y } from "swiper/modules";
import { useColorContext } from "./context/ColorContext";
import "swiper/css";
import "swiper/css/pagination";

interface FurnitureImagesProps {
  furnitureName: string;
}

export default function FurnitureImages({
  furnitureName,
}: FurnitureImagesProps) {
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const { selectedColor } = useColorContext();

  if (!selectedColor) {
    return (
      <div className="w-full aspect-square bg-gray-200 rounded-lg animate-pulse" />
    );
  }

  const images = [];
  if (selectedColor.thumbnail) {
    images.push(selectedColor.thumbnail);
  }
  if (selectedColor.images?.length) {
    images.push(...selectedColor.images);
  }

  if (images.length === 0) {
    return (
      <div className="relative w-full aspect-square overflow-hidden rounded-lg bg-gray-100 border border-gray-200">
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-gray-400 text-sm">No images available</span>
        </div>
      </div>
    );
  }

  const handleImageError = (index: number) => {
    setImageErrors((prev) => new Set(prev).add(index));
  };

  return (
    <div className="relative w-full rounded-lg overflow-visible pb-8">
      <Swiper
        modules={[Pagination, A11y]}
        pagination={{
          clickable: true,
          dynamicBullets: false,
          renderBullet: (index, className) =>
            `<span class="${className} bg-gray-800 hover:bg-gray-600 transition-colors"></span>`,
        }}
        loop={images.length > 1}
        className="w-full pb-10"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full aspect-square overflow-hidden rounded-lg bg-gray-100 border border-gray-200">
              {!imageErrors.has(index) ? (
                <Image
                  src={image}
                  alt={`${furnitureName} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  onError={() => handleImageError(index)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-400 text-sm">
                    Image not available
                  </span>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
