import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createColor } from "@/app/[locale]/services/admin-api";

interface CreateColorPayload {
  fabricId: string;
  furnId: string;
  name: string;
  description?: string;
  thumbnail: string;
  images: string[];
}

export function useCreateColor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateColorPayload) => createColor(data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["admin-color", variables.fabricId, variables.furnId],
      });
    },
  });
}
