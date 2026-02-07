"use client";

import { useQuery } from "@tanstack/react-query";
import { getFabricColors } from "@/app/[locale]/services/furniture-api";

export interface FabricColor {
  _id: string;
  name: string;
  thumbnail: string;
  fabricId: string;
  images?: string[];
}

export function useFabricColors(fabricId: string, furnId: string) {
  return useQuery({
    queryKey: ["fabricColors", fabricId],
    queryFn: () =>
      fabricId ? getFabricColors(fabricId, furnId) : Promise.resolve([]),
    enabled: !!fabricId,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}
