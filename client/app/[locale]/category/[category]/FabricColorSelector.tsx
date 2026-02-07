"use client";
import { Box, Flex, Select, Spinner } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useFabrics } from "../queries/useFabrics";
import { Fabric } from "@/app/[locale]/furniture/[furnId]/types";
import ColorSelector from "./ColorSelector";
import type { FabricColor } from "../../hook/useFabricColors";

interface FabricColorSelectorProps {
  furnId: string;
  onColorChange?: (color: FabricColor | null) => void;
}

export default function FabricColorSelector({
  furnId,
  onColorChange,
}: FabricColorSelectorProps) {
  const t = useTranslations("model");
  const [loadFabrics, setLoadFabrics] = useState(false);
  const { data, isLoading } = useFabrics(furnId, loadFabrics);
  const [fabric, setFabric] = useState("idle");

  useEffect(() => {
    if (["idle", "loading", ""].includes(fabric)) onColorChange?.(null);
  }, [onColorChange, fabric]);

  return (
    <Box className="w-full space-y-3">
      <Flex className="space-y-2" direction={"column"}>
        <label className="block text-xs font-medium text-gray-600">
          {isLoading ? (
            <>
              {t("loadingFabrics")} <Spinner />
            </>
          ) : (
            t("selectFabric")
          )}
        </label>
        <Select.Root
          value={fabric}
          onValueChange={setFabric}
          onOpenChange={(open) => {
            if (open && !loadFabrics) {
              setLoadFabrics(true);
            }
          }}
          defaultValue="idle"
        >
          <Select.Trigger />
          <Select.Content>
            <Select.Group>
              <Select.Label>{t("fabrics")}</Select.Label>
              <Select.Item value="idle">{t("selectFabric")}</Select.Item>

              {isLoading && (
                <Select.Item disabled value="loading">
                  <Flex>
                    {t("loadingData")} <Spinner />
                  </Flex>
                </Select.Item>
              )}

              {data &&
                data.map((fabric: Fabric) => (
                  <Select.Item key={fabric._id} value={fabric._id}>
                    {fabric.name}
                  </Select.Item>
                ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </Flex>

      {fabric && !["idle", "loading", ""].includes(fabric) && (
        <ColorSelector
          furnId={furnId}
          fabricId={fabric}
          onColorChange={onColorChange}
        />
      )}
    </Box>
  );
}
