"use client";

import { Button, Flex } from "@radix-ui/themes";
import { useSofas } from "./hooks/useSofas";
import SofasCard from "../components/SofasCard";
import AddNewFurn from "../components/AddNewFurn";

function Sofas() {
  const { data, isPending, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useSofas();

  const allSofas = data?.pages.flatMap((page) => page.data) || [];

  if (isPending) {
    return <div className="p-4 text-center">جاري التحميل...</div>;
  }

  return (
    <div className="space-y-4">
      <Flex justify="end" gap="3" className="mb-4">
        <AddNewFurn category="sofa" />
      </Flex>

      <div className="grid grid-cols-1 gap-4">
        {allSofas.map((sofa) => (
          <SofasCard key={sofa._id} sofa={sofa} />
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

export default Sofas;
