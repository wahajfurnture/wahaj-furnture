import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  associateFabricWithFurniture,
  removeAssociationFabricFurniture,
} from "@/app/[locale]/services/admin-api";

export function useAssociateFabric() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ furnId, fabricId }: { furnId: string; fabricId: string }) =>
      associateFabricWithFurniture(furnId, fabricId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["fabrics-by-furn", variables.furnId],
      });
    },
  });
}

export function useRemoveFabricAssociation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ furnId, fabricId }: { furnId: string; fabricId: string }) =>
      removeAssociationFabricFurniture(furnId, fabricId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["fabrics-by-furn", variables.furnId],
      });
    },
  });
}
