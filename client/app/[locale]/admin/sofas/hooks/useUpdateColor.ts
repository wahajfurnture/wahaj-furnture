import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateColor } from "@/app/[locale]/services/admin-api";

interface UpdateColorPayload {
  colorId: string;
  fabricId: string;
  furnId: string;
  data: {
    name: string;
    description?: string;
    thumbnail?: string;
    images?: string[];
  };
}

export function useUpdateColor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ colorId, data }: UpdateColorPayload) =>
      updateColor(colorId, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["admin-color", variables.fabricId, variables.furnId],
      });
    },
  });
}