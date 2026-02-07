import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFabric } from "../../services/admin-api";
import { toast } from "sonner";

export function useAddFabric() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFabric,
    onSuccess: () => {
      toast.success("تم اضافه القماش بنجاح");
      queryClient.invalidateQueries({ queryKey: ["admin-fabrics"] });
    },
    onError: () => toast.error("فشل اضافه القماش"),
  });
}
