import { Link } from "@/i18n/navigation";
import { Card, Grid, Heading, Text } from "@radix-ui/themes";
import { useTranslations } from "next-intl";
import FurnitureCardContent from "./FurnitureCardContent";
import { FurnitureTypes } from "./types";

interface FurnitureCardProps {
  furniture: FurnitureTypes;
}

export default function FurnitureCard({ furniture }: FurnitureCardProps) {
  const t = useTranslations("model");

  return (
    <Card className="h-full transition-all duration-300 hover:shadow-lg overflow-visible">
      <Link href={`/furniture/${furniture._id}`}>
        <Grid columns={"1"} className="flex flex-col h-full gap-4">
          <FurnitureCardContent
            furnId={furniture._id}
            furnitureName={furniture.name}
            thumbnail={furniture.thumbnail}
          />

          <Grid columns={"1"} className="order-2" gap="2">
            <Heading
              size="4"
              className="truncate transition-colors cursor-pointer"
            >
              {furniture.name}
            </Heading>
            <Text size="2" color="gold" className="line-clamp-2">
              {t("cat")}: {t(furniture.category)}
            </Text>
            <Text size="2" color="gold" className="line-clamp-2">
              {furniture.description}
            </Text>
          </Grid>
        </Grid>
      </Link>
    </Card>
  );
}
