import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFurniture } from "@/app/[locale]/services/admin-api";

interface UpdateFurnPayload {
  furnId: string;
  data: unknown;
}

export function useUpdateFurn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ furnId, data }: UpdateFurnPayload) =>
      updateFurniture(furnId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-sofa"] });
      queryClient.invalidateQueries({ queryKey: ["admin-curtains"] });
    },
  });
}
