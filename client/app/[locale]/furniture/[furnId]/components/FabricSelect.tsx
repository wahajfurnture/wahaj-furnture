"use client";

import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon, CheckIcon } from "@radix-ui/react-icons";
import { Fabric } from "../types";
import { useTranslations } from "next-intl";

interface FabricSelectProps {
  fabrics: Fabric[];
  selectedFabricId: string | undefined;
  onFabricChange: (fabric: Fabric) => void;
  selectedFabricDescription: string | undefined;
}

export function FabricSelect({
  fabrics,
  selectedFabricId,
  onFabricChange,
  selectedFabricDescription,
}: FabricSelectProps) {
  const t = useTranslations("model");
  console.log(!!selectedFabricId)

  return (
    <div className="border-t pt-6">
      <label
        htmlFor="fabric-select"
        className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-3 block"
      >
        {t("fabricType")}
      </label>

      <Select.Root
        value={selectedFabricId || ""}
        onValueChange={(fabricId) => {
          const fabric = fabrics.find((f) => fabricId === f._id);
          if (fabric) {
            onFabricChange(fabric);
          }
        }}
        disabled={!selectedFabricId}
      >
        <Select.Trigger
          id="fabric-select"
          className="inline-flex w-full items-center justify-between rounded-lg px-4 py-2 text-base leading-none h-10 
                     gap-2 bg-white text-gray-900 font-medium border border-gray-300
                     hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500 disabled:border-gray-200
                     data-[placeholder]:text-gray-500 transition-colors"
          aria-label="Fabric Type"
        >
          <Select.Value placeholder="Select a fabric..." />
          <Select.Icon asChild>
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            className="overflow-hidden bg-white rounded-lg shadow-lg border border-gray-200 z-50"
            position="popper"
            side="bottom"
            sideOffset={8}
          >
            <Select.Viewport className="p-1">
              {fabrics.map((fabric) => (
                <Select.Item
                  key={fabric._id}
                  value={fabric._id}
                  className="relative flex h-10 select-none items-center rounded-md pl-8 pr-4
                           text-gray-900 hover:bg-blue-50 focus:bg-blue-100 focus:outline-none
                           data-[disabled]:pointer-events-none data-[disabled]:opacity-50
                           cursor-pointer transition-colors"
                >
                  <Select.ItemIndicator className="absolute left-2 inline-flex w-6 items-center justify-center">
                    <CheckIcon className="h-4 w-4" />
                  </Select.ItemIndicator>
                  <Select.ItemText>{fabric.name}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
            <Select.Separator className="m-1 h-px bg-gray-200" />
          </Select.Content>
        </Select.Portal>
      </Select.Root>

      {selectedFabricDescription && (
        <p className="text-xs text-gray-500 mt-2">
          {selectedFabricDescription}
        </p>
      )}
    </div>
  );
}
