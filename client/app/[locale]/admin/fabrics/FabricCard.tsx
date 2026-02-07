import { Card, Flex, Box, Text, Button } from "@radix-ui/themes";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useDeleteFabric } from "./useDeleteFabric";
import EditFabricForm from "./EditFabric";
import { Fabric } from "../../furniture/[furnId]/types";

interface FabricCardProps {
  fabric: Fabric;
}

function FabricCard({ fabric }: FabricCardProps) {
  const { mutate: deleteFabric, isPending } = useDeleteFabric();

  return (
    <Card className="rounded-md overflow-hidden">
      <Flex
        justify="between"
        align="center"
        gap={{ initial: "2", sm: "3" }}
        p={{ initial: "3", sm: "4" }}
      >
        <Box style={{ flex: 1, minWidth: 0 }}>
          <Text
            weight="bold"
            size={{ initial: "3", sm: "4" }}
            as="p"
            className="truncate"
          >
            {fabric.name}
          </Text>
          <Text
            size={{ initial: "1", sm: "2" }}
            color="gray"
            className="line-clamp-2"
          >
            {fabric.description}
          </Text>
        </Box>

        <Flex gap="2" align="center" style={{ flexShrink: 0 }}>
          <EditFabricForm fabric={fabric} isPending={isPending} />
          <Button
            onClick={() => deleteFabric(fabric._id)}
            size={{ initial: "1", sm: "2" }}
            color="red"
            variant="soft"
            disabled={isPending}
          >
            <Cross2Icon />
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}

export default FabricCard;
