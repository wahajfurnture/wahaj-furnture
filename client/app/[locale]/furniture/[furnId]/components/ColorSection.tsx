"use client";

import { Flex } from "@radix-ui/themes";
import { useColorContext } from "../context/ColorContext";
import { FabricColor } from "../types";
import Image from "next/image";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useFabricColors } from "@/app/[locale]/hook/useFabricColors";
import { useParams } from "next/navigation";

interface ColorSectionProps {
  fabricId: string;
}

export function ColorSection({ fabricId }: ColorSectionProps) {
  const t = useTranslations("model");
  const { furnId } = useParams<{ furnId: string }>();
  const {
    data: colors,
    isPending,
    isError,
  } = useFabricColors(fabricId, furnId);
  const { selectedColor, setSelectedColor, setIsColorLoading, setHasColors } =
    useColorContext();

  useEffect(() => {
    setIsColorLoading(isPending);
  }, [isPending, setIsColorLoading]);

  useEffect(() => {
    if (isPending) return;

    if (colors && colors.length > 0) {
      setSelectedColor(colors[0]);
      setHasColors(true);
      return;
    }

    setSelectedColor(null);
    setHasColors(false);
  }, [colors, fabricId, isPending, setHasColors, setSelectedColor]);

  const handleColorSelect = (color: FabricColor) => {
    setSelectedColor(color);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-gray-600 uppercase tracking-wider">
          {t("fabricColor")}
        </p>
        {isPending && (
          <span className="text-xs text-gray-500">{t("loadingColors")}</span>
        )}
      </div>

      {isPending && (
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-12 h-12 rounded-lg bg-gray-200 animate-pulse"
            />
          ))}
        </div>
      )}

      {isError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm mb-3">
          {t("errorMessage")}
        </div>
      )}

      {colors?.length === 0 && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm mb-3">
          {t("noFabricAvailable")}
        </div>
      )}

      {colors?.length ? (
        <Flex gap={"3"} wrap={"wrap"}>
          {colors.map((color: FabricColor) => (
            <button
              key={color._id}
              onClick={() => handleColorSelect(color)}
              className={`hover:border-blue-500 border-2 rounded-full duration-300 ${
                selectedColor?._id === color._id
                  ? "border-blue-500"
                  : "border-transparent"
              }`}
            >
              <Image
                src={color.thumbnail}
                width={35}
                height={35}
                className="rounded-full object-cover aspect-square"
                alt={t("fabricColorAlt")}
              />
            </button>
          ))}
        </Flex>
      ) : null}
    </div>
  );
}
