import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFurniture } from "@/app/[locale]/services/admin-api";

export function useDeleteFurn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFurniture,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-sofa"] });
      queryClient.invalidateQueries({ queryKey: ["admin-curtains"] });
    },
  });
}
