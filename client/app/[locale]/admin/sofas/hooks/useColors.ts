import { getFabricColors } from "@/app/[locale]/services/furniture-api";
import { useQuery } from "@tanstack/react-query";

export function useColors(fabricId: string, furnId: string) {
  return useQuery({
    queryKey: ["admin-color", fabricId, furnId],
    queryFn: () => getFabricColors(fabricId, furnId),
  });
}
