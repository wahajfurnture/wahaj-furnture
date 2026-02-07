"use client";

import { Button, Flex } from "@radix-ui/themes";
import AddNewFurn from "../components/AddNewFurn";
import SofasCard from "../components/SofasCard";
import { useCurtains } from "./hooks/useCurtains";

function Curtains() {
  const { data, isPending, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useCurtains();

  const allCurtain = data?.pages.flatMap((page) => page.data) || [];

  if (isPending) {
    return <div className="p-4 text-center">جاري التحميل...</div>;
  }

  return (
    <div className="space-y-4">
      <Flex justify="end" gap="3" className="mb-4">
        <AddNewFurn category="curtain" />
      </Flex>

      <div className="grid grid-cols-1 gap-4">
        {allCurtain.map((sofa) => (
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

export default Curtains;
