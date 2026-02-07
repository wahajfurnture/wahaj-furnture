"use client";

import { Button, Flex } from "@radix-ui/themes";
import AddNewFabric from "./AddNewFabric";
import { useFabric } from "../hooks/useFabric";
import FabricCard from "./FabricCard";

function Fabrics() {
  const { data, isPending, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useFabric();

  const allFabrics = data?.pages.flatMap((page) => page.data) || [];

  if (isPending) {
    return <div className="p-4 text-center">جاري التحميل...</div>;
  }

  return (
    <div className="space-y-4">
      <Flex justify="end" gap="3" className="mb-4">
        <AddNewFabric />
      </Flex>

      <div className="grid grid-cols-1 gap-4">
        {allFabrics.map((fabric) => (
          <FabricCard key={fabric._id} fabric={fabric} />
        ))}
      </div>

      {hasNextPage && (
        <Flex justify="center" className="mt-6">
          <Button
            size="3"
            variant="soft"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="cursor-pointer"
          >
            {isFetchingNextPage ? "جاري التحميل..." : "تحميل المزيد"}
          </Button>
        </Flex>
      )}
    </div>
  );
}

export default Fabrics;
