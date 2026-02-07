import { Button, Dialog } from "@radix-ui/themes";
import EditFabricForm from "./EditFabricForm";
import { useState } from "react";
import { Fabric } from "../../furniture/[furnId]/types";

function EditFabric({
  isPending,
  fabric,
}: {
  isPending: boolean;
  fabric: Fabric;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger disabled={isPending}>
        <Button size={{ initial: "1", sm: "2" }} variant="soft">
          تعديل
        </Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Title>تعديل القماش</Dialog.Title>
        <Dialog.Description>عدل بيانات القماش</Dialog.Description>
        <EditFabricForm fabric={fabric} close={() => setOpen(false)} />
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default EditFabric;
