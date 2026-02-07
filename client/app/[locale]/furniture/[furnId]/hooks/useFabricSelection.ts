import { useState, useCallback } from "react";
import { Fabric } from "../types";

export function useFabricSelection(fabrics: Fabric[]) {
  const [selectedFabric, setSelectedFabric] = useState<Fabric | null>(
    fabrics[0] || null,
  );

  const handleFabricChange = useCallback(
    (fabricId: string) => {
      const fabric = fabrics.find((f) => f._id === fabricId);
      if (fabric) {
        setSelectedFabric(fabric);
      }
    },
    [fabrics],
  );

  return {
    selectedFabric,
    handleFabricChange,
  };
}
