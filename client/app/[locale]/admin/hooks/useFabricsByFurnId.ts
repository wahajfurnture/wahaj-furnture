import { useQuery } from "@tanstack/react-query";
import { getFabricsByFurnId } from "@/app/[locale]/services/admin-api";

export function useFabricsByFurnId(furnId: string) {
  return useQuery({
    queryKey: ["fabrics-by-furn", furnId],
    queryFn: () => getFabricsByFurnId(furnId),
    enabled: !!furnId,
  });
}
