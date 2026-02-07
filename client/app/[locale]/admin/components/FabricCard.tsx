"use client";

import { Button, Flex, Box, Text } from "@radix-ui/themes";
import { Plus } from "lucide-react";
import { Fabric } from "../../category/queries/useFabrics";
import {
  useAssociateFabric,
  useRemoveFabricAssociation,
} from "../sofas/hooks/useFabricMutations";
import { toast } from "sonner";
import { useState } from "react";
import ColorList from "./ColorList";

interface FabricCardProps {
  fabric: Fabric;
  associatedFabricIds?: string[];
  furnId: string;
}

function FabricCard({
  fabric,
  associatedFabricIds = [],
  furnId,
}: FabricCardProps) {
  const [open, setOpen] = useState(false);
  const switchOpen = () => setOpen((o) => !o);
  const isAssociated = associatedFabricIds.includes(fabric._id);
  const associateMutation = useAssociateFabric();
  const removeMutation = useRemoveFabricAssociation();

  const handleAddFabric = () => {
    toast.promise(
      associateMutation.mutateAsync({ furnId, fabricId: fabric._id }),
      {
        loading: "جاري إضافة القماش...",
        success: "تم إضافة القماش بنجاح",
        error: "فشل إضافة القماش",
      },
    );
  };

  const handleRemoveFabric = () => {
    toast.promise(
      removeMutation.mutateAsync({ furnId, fabricId: fabric._id }),
      {
        loading: "جاري حذف القماش...",
        success: "تم حذف القماش بنجاح",
        error: "فشل حذف القماش",
      },
    );
  };

  return (
    <>
      <Flex
        justify="between"
        align="center"
        gap={{ initial: "2", sm: "3" }}
        p={{ initial: "2", sm: "3" }}
        style={{
          borderBottom: "1px solid #f0f0f0",
          marginBottom: "8px",
        }}
        wrap={"wrap"}
      >
        <Box style={{ flex: 1 }}>
          <Text weight="bold" as="p" size="2">
            {fabric.name}
          </Text>
          <Text size="1" color="gray">
            {fabric.description}
          </Text>
        </Box>

        <Flex gap="2">
          {isAssociated ? (
            <>
              <Button
                size="1"
                variant="soft"
                color="red"
                onClick={handleRemoveFabric}
                disabled={removeMutation.isPending}
              >
                X
              </Button>
              <Button onClick={switchOpen}>
                {open ? "اغلاق" : "إداره الالوان"}
              </Button>
            </>
          ) : (
            <Button
              size="1"
              variant="outline"
              color="blue"
              onClick={handleAddFabric}
              disabled={associateMutation.isPending}
            >
              <Plus size={14} /> أضافه
            </Button>
          )}
        </Flex>
        {open && <ColorList furnId={furnId} fabricId={fabric._id} />}
      </Flex>
    </>
  );
}

export default FabricCard;
