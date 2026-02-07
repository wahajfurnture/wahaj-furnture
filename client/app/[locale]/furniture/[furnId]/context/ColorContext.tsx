"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { FabricColor } from "../types";

interface ColorContextType {
  selectedColor: FabricColor | null;
  setSelectedColor: (color: FabricColor | null) => void;
}

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export function ColorProvider({ children }: { children: ReactNode }) {
  const [selectedColor, setSelectedColor] = useState<FabricColor | null>(null);

  return (
    <ColorContext.Provider value={{ selectedColor, setSelectedColor }}>
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
