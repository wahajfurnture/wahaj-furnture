import { Box, Flex, Text } from "@radix-ui/themes";
import { useColors } from "../sofas/hooks/useColors";
import ColorCard, { AdminColor } from "./ColorCard";
import AddColorDialog from "./AddColorDialog";

interface ColorListProps {
  fabricId: string;
  furnId: string;
}

function ColorList({ fabricId, furnId }: ColorListProps) {
  const { data, isPending, isError } = useColors(fabricId, furnId);

  if (isPending) {
    return <Text>جاري التحميل...</Text>;
  }

  if (isError) {
    return <Text color="red">حدث خطأ في تحميل الألوان</Text>;
  }

  return (
    <Box width={"100%"}>
      <Flex direction="column" gap={{ initial: "2", sm: "3" }}>
        {data?.map((color: AdminColor) => (
          <ColorCard
            key={color._id}
            color={color}
            fabricId={fabricId}
            furnId={furnId}
          />
        ))}

        <AddColorDialog fabricId={fabricId} furnId={furnId} />
      </Flex>
    </Box>
  );
}

export default ColorList;
