"use client";

import { Button, Dialog } from "@radix-ui/themes";
import { PlusIcon } from "lucide-react";
import NewFabricForm from "./NewFabricForm";
import { useState } from "react";

function AddNewFabric() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button size="3" className="cursor-pointer">
          <PlusIcon width="20" height="20" />
          إضافة قماش جديد
        </Button>
      </Dialog.Trigger>
      <Dialog.Content maxWidth={"550px"}>
        <Dialog.Title>أضافة قماش جديد</Dialog.Title>
        <Dialog.Description>أدخل اسم و وصف القماش</Dialog.Description>
        <NewFabricForm close={() => setOpen(false)} />
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default AddNewFabric;
