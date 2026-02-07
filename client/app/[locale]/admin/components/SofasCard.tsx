import {
  Card,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Dialog,
} from "@radix-ui/themes";
import Image from "next/image";
import { FurnitureTypes } from "../../category/[category]/types";
import DeleteFurn from "./DeleteFurn";
import EditFurnBtn from "./EditFurnBtn";

function SofasCard({ sofa }: { sofa: FurnitureTypes }) {
  return (
    <Card className="rounded-md overflow-hidden">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Box className="relative w-full h-40 sm:h-20 sm:w-28">
            <Image
              src={sofa.thumbnail}
              alt={sofa.name}
              fill
              className="object-cover rounded-sm"
            />
          </Box>

          <Box className="min-w-0">
            <Heading
              as="h2"
              size={{ initial: "3", sm: "5" }}
              className="font-bold text-base sm:text-lg truncate"
            >
              {sofa.name}
            </Heading>
            <Text className="text-xs sm:text-sm text-gray-600" color="gray">
              {sofa.category}
            </Text>
            <Text
              as="p"
              className="text-xs sm:text-sm text-gray-600 line-clamp-2"
              color="gray"
            >
              {sofa.description}
            </Text>
          </Box>
        </div>

        <Flex align="center" gap="2" className="justify-end sm:justify-start">
          <EditFurnBtn furn={sofa} />
          <DeleteFurn furnId={sofa._id} />
        </Flex>
      </div>
    </Card>
  );
}

export default SofasCard;
