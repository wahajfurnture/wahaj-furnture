import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteColor } from "@/app/[locale]/services/admin-api";

interface DeleteColorPayload {
  colorId: string;
  fabricId: string;
  furnId: string;
}

export function useDeleteColor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ colorId }: DeleteColorPayload) => deleteColor(colorId),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["admin-color", variables.fabricId, variables.furnId],
      });
    },
  });
}