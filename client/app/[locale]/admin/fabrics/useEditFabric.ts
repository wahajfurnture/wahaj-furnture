import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFabric } from "../../services/admin-api";
import { toast } from "sonner";

export function useEditFabric() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateFabric,
    onSuccess: () => {
      toast.success("تم تعديل القماش بنجاح");
      queryClient.invalidateQueries({ queryKey: ["admin-fabrics"] });
    },
    onError: () => {
      toast.error("فشل تعديل القماش");
    },
  });
}
