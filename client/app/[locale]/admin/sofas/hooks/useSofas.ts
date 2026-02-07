import { useInfiniteQuery } from "@tanstack/react-query";
import { getFurniture } from "@/app/[locale]/services/furniture-api";

export function useSofas() {
  return useInfiniteQuery({
    queryKey: ["admin-sofa"],
    queryFn: async ({ pageParam = 1 }) => {
      const query = new URLSearchParams({
        page: String(pageParam),
      }).toString();

      const result = await getFurniture("sofa", query);
      return result;
    },
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      const totalPages = lastPage.count;
      const currentPage = lastPageParam as number;

      if (currentPage >= totalPages) {
        return undefined;
      }

      return currentPage + 1;
    },
    initialPageParam: 1,
  });
}
