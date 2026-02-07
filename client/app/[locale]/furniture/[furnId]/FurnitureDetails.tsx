"use client";

import { Grid } from "@radix-ui/themes";
import { useState } from "react";
import BookButton from "../../components/BookButton";
import { ColorSection } from "./components/ColorSection";
import { FabricSelect } from "./components/FabricSelect";
import { FurnitureHeader } from "./components/FurnitureHeader";
import { Fabric } from "./types";

interface FurnitureDetailsProps {
  furnitureName: string;
  description: string;
  category: string;
  fabrics: Fabric[];
}

export default function FurnitureDetails({
  furnitureName,
  description,
  category,
  fabrics,
}: FurnitureDetailsProps) {
  const [selectedFabric, setSelectedFabric] = useState<Fabric>(fabrics[0]);

  return (
    <div className="flex flex-col gap-6">
      <FurnitureHeader
        name={furnitureName}
        category={category}
        description={description}
      />

      <FabricSelect
        fabrics={fabrics}
        selectedFabricId={selectedFabric._id}
        onFabricChange={(fabric: Fabric) => setSelectedFabric(fabric)}
        selectedFabricDescription={selectedFabric?.description}
      />

      {selectedFabric && <ColorSection fabricId={selectedFabric._id} />}
      <Grid>
        <BookButton />
      </Grid>
    </div>
  );
}
