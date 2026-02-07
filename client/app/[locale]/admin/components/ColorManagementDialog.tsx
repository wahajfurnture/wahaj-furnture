"use client";

import { Button } from "@radix-ui/themes";
import { useState } from "react";
import ColorList from "./ColorList";

interface ColorManagementDialogProps {
  fabricId: string;
  furnId: string;
}

function ColorManagementDialog({
  fabricId,
  furnId,
}: ColorManagementDialogProps) {
  const [open, setOpen] = useState(false);
  const switchOpen = () => setOpen((o) => !o);

  return (
    <>
      <Button onClick={switchOpen}>إداره الالوان</Button>

      {open && <ColorList fabricId={fabricId} furnId={furnId} />}
    </>
  );
}

export default ColorManagementDialog;
