import { useState, useEffect } from "react";
import { FabricColor } from "../types";

export function useSelectedColor() {
  const [selectedColor, setSelectedColor] = useState<FabricColor | null>(null);

  const selectColor = (color: FabricColor) => {
    setSelectedColor(color);
  };

  const resetColor = () => {
    setSelectedColor(null);
  };

  return {
    selectedColor,
    selectColor,
    resetColor,
  };
}
