import { getFurniture } from "@/app/[locale]/services/furniture-api";
import { Box, Container, Grid, Heading, Section } from "@radix-ui/themes";
import FurnitureList from "./FurnitureList";
import { getTranslations } from "next-intl/server";

interface FurnitureProps {
  category: string;
  queries: URLSearchParams;
}

async function Furnitures({ category, queries }: FurnitureProps) {
  const furnitures = await getFurniture(category, queries.toString());
  const t = await getTranslations();

  return (
    <Section>
      <Container px="4">
        <Heading mb={"6"} as="h1" size={"8"}>
          {t(category + "s")}
        </Heading>

        <Grid columns={{ initial: "1", md: "1fr" }} gap="5" className="w-full">
          <Box>
            <FurnitureList furnitures={furnitures} />
          </Box>
        </Grid>
      </Container>
    </Section>
  );
}

export default Furnitures;
