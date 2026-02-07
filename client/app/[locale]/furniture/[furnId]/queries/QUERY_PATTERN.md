/\*\*

- Query Hook Pattern Guide
-
- This file demonstrates how to create TanStack Query hooks for data fetching.
- All query hooks should:
- 1.  Be placed in `queries/` folder
- 2.  Be named using the pattern: `useThingName`
- 3.  Only run on the client side
- 4.  Use meaningful names that describe what they fetch
-
- Example: useFabricColors, useFurniture, useCategories
  \*/

import { useQuery } from "@tanstack/react-query";

/\*\*

- Example 1: Simple query that depends on a parameter
- Usage: const { data, isLoading, error } = useFabricColors(fabricId)
  _/
  export function useExampleQueryWithParam(id: string | null) {
  return useQuery({
  queryKey: ["exampleData", id],
  queryFn: () => {
  // Your API call here
  return fetch(`/api/example/${id}`).then((res) => res.json());
  },
  enabled: !!id, // Only fetch when id is provided
  staleTime: 1000 _ 60 \* 5, // 5 minutes
  });
  }

/\*\*

- Example 2: Query without parameters
- Usage: const { data, isLoading, error } = useExampleQuery()
  _/
  export function useExampleQuery() {
  return useQuery({
  queryKey: ["exampleData"],
  queryFn: () => {
  // Your API call here
  return fetch("/api/example").then((res) => res.json());
  },
  staleTime: 1000 _ 60 \* 10, // 10 minutes
  });
  }

/\*\*

- Example 3: Query with custom options
- Usage: const { data, isLoading, error } = useExampleQueryAdvanced(options)
  _/
  export function useExampleQueryAdvanced(options?: { retry?: number }) {
  return useQuery({
  queryKey: ["exampleData"],
  queryFn: async () => {
  const response = await fetch("/api/example");
  if (!response.ok) throw new Error("Failed to fetch");
  return response.json();
  },
  retry: options?.retry ?? 1,
  staleTime: 1000 _ 60 \* 5,
  });
  }
