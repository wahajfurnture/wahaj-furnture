"use client";

import { FabricColor } from "../types";

interface ColorSwatchesProps {
  colors: FabricColor[];
  selectedColorId: string | undefined;
  onColorSelect: (color: FabricColor) => void;
  isLoading: boolean;
}

export function ColorSwatches({
  colors,
  selectedColorId,
  onColorSelect,
  isLoading,
}: ColorSwatchesProps) {
  if (isLoading) {
    return (
      <div className="flex gap-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-12 h-12 rounded-lg bg-gray-200 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (colors.length === 0) {
    return (
      <p className="text-gray-500 text-sm">
        No colors available for this fabric
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {/* Color Swatches */}
      <div className="flex flex-wrap gap-2">
        {colors.map((color) => (
          <button
            key={color._id}
            onClick={() => onColorSelect(color)}
            title={color.name}
            className={`w-12 h-12 rounded-lg border-2 transition-all ${
              selectedColorId === color._id
                ? "border-gray-900 shadow-md ring-2 ring-offset-2 ring-blue-400"
                : "border-gray-200 hover:border-gray-400"
            }`}
            aria-label={`Select ${color.name}`}
            aria-pressed={selectedColorId === color._id}
          >
            <span className="sr-only">{color.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
