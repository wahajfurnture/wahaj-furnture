"use client";

import { Button, Dialog, Flex, Box, Text } from "@radix-ui/themes";
import { useFabric } from "../hooks/useFabric";
import { useFabricsByFurnId } from "../hooks/useFabricsByFurnId";
import { Fabric } from "../../category/queries/useFabrics";
import FabricCard from "./FabricCard";
import { useState } from "react";

interface FurnitureProps {
  furnId: string;
}

function ManageFabric({ furnId }: FurnitureProps) {
  const [open, setOpen] = useState(false);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useFabric();
  const { data: associatedFabricIds, isLoading: isLoadingAssociated } =
    useFabricsByFurnId(furnId);

  const allFabrics = data?.pages.flatMap((page) => page.data) || [];

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button>اداره القماش لهذا الموديل</Button>
      </Dialog.Trigger>

      {open && (
        <Dialog.Content
          maxWidth="600px"
          style={{
            width: "calc(100vw - 32px)",
            maxWidth: "600px",
          }}
        >
          <Dialog.Title>إدارة القماش</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            أختر القماش المتاح لهذا الموديل
          </Dialog.Description>

          <Box
            style={{
              maxHeight: "400px",
              overflowY: "auto",
              borderRadius: "8px",
              border: "1px solid #e0e0e0",
            }}
            p={{ initial: "1", sm: "4" }}
          >
            {isLoading || isLoadingAssociated ? (
              <Text>جاري التحميل...</Text>
            ) : isError ? (
              <Text color="red">حدث خطأ في تحميل البيانات</Text>
            ) : allFabrics.length === 0 ? (
              <Text>لا توجد أقمشة متاحة</Text>
            ) : (
              <div>
                {allFabrics.map((fabric: Fabric) => (
                  <FabricCard
                    key={fabric._id}
                    fabric={fabric}
                    associatedFabricIds={associatedFabricIds || []}
                    furnId={furnId}
                  />
                ))}
              </div>
            )}
            {hasNextPage && (
              <Flex justify="center" mt="4">
                <Button
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  loading={isFetchingNextPage}
                >
                  {isFetchingNextPage ? "جاري التحميل..." : "تحميل المزيد"}
                </Button>
              </Flex>
            )}
          </Box>
          <Dialog.Close>
            <Flex mt={"4"} justify={"end"}>
              <Button>أغلاق</Button>
            </Flex>
          </Dialog.Close>
        </Dialog.Content>
      )}
    </Dialog.Root>
  );
}

export default ManageFabric;
