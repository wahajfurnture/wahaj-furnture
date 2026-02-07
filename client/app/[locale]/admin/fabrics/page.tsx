import { Grid, Heading } from "@radix-ui/themes";
import Fabrics from "./Fabrics";

function page() {
  return (
    <Grid height={"100%"} rows={"auto 1fr"}>
      <Heading mb="3" as="h1">
        الأقمشه
      </Heading>

      <Fabrics />
    </Grid>
  );
}

export default page;
