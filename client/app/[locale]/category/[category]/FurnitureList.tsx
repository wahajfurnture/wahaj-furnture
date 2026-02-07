import { Grid, Box } from "@radix-ui/themes";
import { FurnitureTypes } from "./types";
import Pagination from "./Pagination";
import { Suspense } from "react";
import FurnitureCard from "./FurnitureCard";

function FurnitureList({
  furnitures: { data: furnitures, count },
}: {
  furnitures: { data: FurnitureTypes[]; count: number };
}) {
  return (
    <Box>
      <Grid columns={{ initial: "1", sm: "2", md: "3", lg: "4" }} gap="4">
        {furnitures.map((furniture) => (
          <FurnitureCard key={furniture._id} furniture={furniture} />
        ))}
      </Grid>

      <Suspense fallback={<p>Calculating pages...</p>}>
        <Pagination count={count} />
      </Suspense>
    </Box>
  );
}

export default FurnitureList;
