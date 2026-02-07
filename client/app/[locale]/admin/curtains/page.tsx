import { Grid, Heading } from "@radix-ui/themes";
import Curtains from "./Curtains";

function page() {
  return (
    <Grid height={"100%"} rows={"auto 1fr"}>
      <Heading mb="3" as="h1">
        الستائر
      </Heading>

      <Curtains />
    </Grid>
  );
}

export default page;
