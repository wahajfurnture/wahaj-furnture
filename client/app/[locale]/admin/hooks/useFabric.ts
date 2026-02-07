import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllFabrics } from "@/app/[locale]/services/admin-api";

export function useFabric() {
  return useInfiniteQuery({
    queryKey: ["admin-fabrics"],
    queryFn: async ({ pageParam = 1 }) => {
      const query = new URLSearchParams({
        page: String(pageParam),
      }).toString();

      return getAllFabrics(query);
    },
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      const currentPage = lastPageParam as number;

      if (lastPage?.hasNextPage) {
        return currentPage + 1;
      }

      return undefined;
    },
    initialPageParam: 1,
  });
}
