import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFurniture } from "@/app/[locale]/services/admin-api";

export function useCreateFurn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: unknown) => createFurniture(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-sofa"] });
      queryClient.invalidateQueries({ queryKey: ["admin-curtains"] });
    },
  });
}
