"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { FabricColor } from "../types";

interface ColorContextType {
  selectedColor: FabricColor | null;
  setSelectedColor: (color: FabricColor | null) => void;
  isColorLoading: boolean;
  setIsColorLoading: (isLoading: boolean) => void;
  hasColors: boolean;
  setHasColors: (hasColors: boolean) => void;
}

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export function ColorProvider({ children }: { children: ReactNode }) {
  const [selectedColor, setSelectedColor] = useState<FabricColor | null>(null);
  const [isColorLoading, setIsColorLoading] = useState<boolean>(false);
  const [hasColors, setHasColors] = useState<boolean>(true);

  return (
    <ColorContext.Provider
      value={{
        selectedColor,
        setSelectedColor,
        isColorLoading,
        setIsColorLoading,
        hasColors,
        setHasColors,
      }}
    >
      {children}
    </ColorContext.Provider>
  );
}

export function useColorContext() {
  const context = useContext(ColorContext);
  if (context === undefined) {
    throw new Error("useColorContext must be used within ColorProvider");
  }
  return context;
}
