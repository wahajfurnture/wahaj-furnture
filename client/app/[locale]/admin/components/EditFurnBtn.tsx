"use client";

import { Button, Dialog } from "@radix-ui/themes";
import EditFurnForm from "./EditFurnForm";
import { useState } from "react";
import { FurnitureTypes } from "../../category/[category]/types";

interface EditFurnBtnProps {
  furn: FurnitureTypes;
}

function EditFurnBtn({ furn }: EditFurnBtnProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button>Edit</Button>
      </Dialog.Trigger>

      {open && (
        <Dialog.Content maxWidth="450px">
          <Dialog.Title>تعديل الكنبه</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            هل تريد تعديل الكنبه
          </Dialog.Description>

          <EditFurnForm furn={furn} />
        </Dialog.Content>
      )}
    </Dialog.Root>
  );
}

export default EditFurnBtn;
