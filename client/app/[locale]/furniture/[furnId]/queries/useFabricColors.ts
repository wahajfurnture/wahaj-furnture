import { useQuery } from "@tanstack/react-query";
import { getFabricColors } from "@/app/[locale]/services/furniture-api";

export function useFabricColors(fabricId: string, furnId: string) {
  return useQuery({
    queryKey: ["fabricColors", fabricId],
    queryFn: () => getFabricColors(fabricId, furnId),
    enabled: !!fabricId,
    staleTime: 1000 * 60 * 10,
  });
}
