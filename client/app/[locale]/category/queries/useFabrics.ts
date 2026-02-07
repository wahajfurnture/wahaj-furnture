import { useQuery } from "@tanstack/react-query";
import { getFabrics } from "@/app/[locale]/services/furniture-api";

export interface Fabric {
  _id: string;
  name: string;
  description: string;
  furnId: string;
}

export function useFabrics(furnId: string, loadFabric: boolean) {
  return useQuery({
    queryKey: ["fabrics", furnId],
    queryFn: () => getFabrics(furnId),
    enabled: loadFabric,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}
