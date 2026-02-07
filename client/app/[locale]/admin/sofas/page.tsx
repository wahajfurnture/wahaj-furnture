import { Grid, Heading } from "@radix-ui/themes";
import Sofas from "./Sofas";

function page() {
  return (
    <Grid height={"100%"} rows={"auto 1fr"}>
      <Heading mb="3" as="h1">
        الكنب
      </Heading>

      <Sofas />
    </Grid>
  );
}

export default page;
