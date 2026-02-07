"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Box, Grid } from "@radix-ui/themes";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import FabricColorSelector from "./FabricColorSelector";
import BookButton from "@/app/[locale]/components/BookButton";
import type { FabricColor } from "../../hook/useFabricColors";

import "swiper/css";
import "swiper/css/autoplay";

interface FurnitureCardContentProps {
  furnId: string;
  furnitureName: string;
  thumbnail: string;
}

export default function FurnitureCardContent({
  furnId,
  furnitureName,
  thumbnail,
}: FurnitureCardContentProps) {
  const t = useTranslations("model");
  const [selectedColor, setSelectedColor] = useState<FabricColor | null>(null);

  return (
    <>
      <Box className="order-1">
        <Box
          position="relative"
          width="100%"
          height="250px"
          className="overflow-hidden rounded-md cursor-pointer"
        >
          {selectedColor &&
          selectedColor.images &&
          selectedColor.images.length > 0 ? (
            <Swiper
              modules={[Autoplay]}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop={true}
              className="w-full h-full"
            >
              {[...selectedColor.images, selectedColor.thumbnail].map(
                (image, index) => (
                  <SwiperSlide key={index}>
                    <Image
                      src={image}
                      alt={`${furnitureName} - ${selectedColor.name} ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </SwiperSlide>
                ),
              )}
            </Swiper>
          ) : (
            <Image
              src={thumbnail}
              alt={`${t("thumbnailOf")} ${furnitureName}`}
              fill
              className="object-cover transition-transform duration-300 hover:scale-110"
            />
          )}
        </Box>
      </Box>

      <Grid columns={"1"} gapY={"4"} className="order-3">
        <FabricColorSelector furnId={furnId} onColorChange={setSelectedColor} />
        <BookButton />
      </Grid>
    </>
  );
}
