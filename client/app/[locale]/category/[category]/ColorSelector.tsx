"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Spinner } from "@radix-ui/themes";
import { useFabricColors, type FabricColor } from "../../hook/useFabricColors";

interface ColorSelectorProps {
  fabricId: string;
  furnId: string;
  onColorChange?: (color: FabricColor | null) => void;
}

export default function ColorSelector({
  fabricId,
  onColorChange,
  furnId,
}: ColorSelectorProps) {
  const t = useTranslations("model");
  const [selectedColorId, setSelectedColorId] = useState<string | null>(null);
  const {
    data: colors = [],
    isLoading,
    isError,
  } = useFabricColors(fabricId, furnId);

  const selectedColor = !selectedColorId
    ? colors[0] || null
    : colors.find((c: FabricColor) => c._id === selectedColorId) ||
      colors[0] ||
      null;

  useEffect(() => {
    if (selectedColor) {
      onColorChange?.(selectedColor);
    }
  }, [selectedColor, onColorChange]);

  const handleColorSelect = (color: FabricColor) => {
    setSelectedColorId(color._id);
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-medium text-gray-600">
        {isLoading ? (
          <>
            {t("loadingColorsList")} <Spinner size="1" />
          </>
        ) : (
          t("selectColor")
        )}
      </label>

      {isLoading ? (
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-9 h-9 rounded-full bg-gray-200 animate-pulse"
            />
          ))}
        </div>
      ) : isError ? (
        <p className="text-xs text-red-500">{t("errorLoadingColors")}</p>
      ) : colors.length === 0 ? (
        <p className="text-xs text-gray-500">{t("noColorsAvailable")}</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {colors.map((color: FabricColor) => (
            <button
              key={color._id}
              onClick={() => handleColorSelect(color)}
              title={color.name}
              className={`hover:border-blue-500 border-2 rounded-full duration-300 transition-all ${
                selectedColor?._id === color._id
                  ? "border-blue-500 ring-2 ring-blue-200"
                  : "border-gray-300"
              }`}
            >
              <Image
                src={color.thumbnail}
                width={35}
                height={35}
                className="rounded-full object-cover aspect-square"
                alt={color.name}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
