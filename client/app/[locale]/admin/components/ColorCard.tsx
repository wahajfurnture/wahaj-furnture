import { Box, Flex, Text, Button, Card } from "@radix-ui/themes";
import Image from "next/image";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useDeleteColor } from "../sofas/hooks/useDeleteColor";
import EditColorDialog from "./EditColorDialog";

export interface AdminColor {
  _id: string;
  name: string;
  description?: string;
  thumbnail: string;
  images?: string[];
}

interface ColorCardProps {
  color: AdminColor;
  fabricId: string;
  furnId: string;
}

function ColorCard({ color, fabricId, furnId }: ColorCardProps) {
  const deleteColorMutation = useDeleteColor();

  const handleDelete = () => {
    deleteColorMutation.mutate({
      colorId: color._id,
      fabricId,
      furnId,
    });
  };

  return (
    <Card style={{ padding: 0 }}>
      <Flex
        justify="between"
        align="center"
        gap={{ initial: "2", sm: "3" }}
        p={{ initial: "2", sm: "3" }}
      >
        <Flex
          align="center"
          gap={{ initial: "2", sm: "3" }}
          style={{ flex: 1, minWidth: 0 }}
        >
          <Box
            style={{
              position: "relative",
              borderRadius: "8px",
              overflow: "hidden",
              flexShrink: 0,
            }}
            width={{ initial: "40px", sm: "60px" }}
            height={{ initial: "40px", sm: "60px" }}
          >
            <Image
              src={color.thumbnail}
              alt={color.name}
              fill
              style={{ objectFit: "cover" }}
            />
          </Box>
          <Flex direction="column" gap="1" style={{ minWidth: 0, flex: 1 }}>
            <Text size={{ initial: "2", sm: "3" }} weight="bold" truncate>
              {color.name}
            </Text>
            {color.description && (
              <Text size={{ initial: "1", sm: "2" }} color="gray" truncate>
                {color.description}
              </Text>
            )}
          </Flex>
        </Flex>
        <Flex gap={{ initial: "1", sm: "2" }} align="center">
          <EditColorDialog color={color} fabricId={fabricId} furnId={furnId} />
          <Button
            size={{ initial: "1", sm: "2" }}
            color="red"
            variant="soft"
            onClick={handleDelete}
            disabled={deleteColorMutation.isPending}
          >
            <Cross2Icon />
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}

export default ColorCard;
