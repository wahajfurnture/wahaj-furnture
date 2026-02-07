"use client";

import { Button, Dialog, Flex } from "@radix-ui/themes";
import { useDeleteFurn } from "../sofas/hooks/useDeleteFurn";
import { toast } from "sonner";
import { useState } from "react";

function DeleteFurn({ furnId }: { furnId: string }) {
  const [open, setOpen] = useState(false);
  const { mutateAsync: deleteFurn } = useDeleteFurn();

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button>X</Button>
      </Dialog.Trigger>

      {open && (
        <Dialog.Content maxWidth="450px">
          <Dialog.Title>حذف الكنب</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            هل انت متأكد انك تريد حذف الكنب
          </Dialog.Description>
          <Flex gapX={"2"} mt="4">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                اغلاق
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button
                onClick={() => {
                  toast.promise(deleteFurn(furnId), {
                    success: "تم حذف الكنبه",
                    loading: "جاري حذف الكنبه",
                    error: "فشل حذف الكنبه",
                  });
                }}
              >
                تأكيد
              </Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      )}
    </Dialog.Root>
  );
}

export default DeleteFurn;
