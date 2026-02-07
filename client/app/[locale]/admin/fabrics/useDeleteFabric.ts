import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFabric } from "../../services/admin-api";
import { toast } from "sonner";

export function useDeleteFabric() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFabric,
    onSuccess: () => {
      toast.success("تم حذف القماش");
      queryClient.invalidateQueries({ queryKey: ["admin-fabrics"] });
    },
    onError: () => toast.error("فشل حذف القماش"),
  });
}
