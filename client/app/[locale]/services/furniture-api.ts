import { FurnitureTypes } from "../category/[category]/types";

export async function getFurnitureDetails(furnId: string) {
  const response = await fetch(
    `/api/v1/furniture/details/${furnId}`,
  );
  const furnitures = await response.json();
  return furnitures.data;
}

export async function getFabrics(furnId: string) {
  const response = await fetch(
    `/api/v1/furniture/details/${furnId}`,
  );
  const data = await response.json();
  return data.data.fabrics || [];
}

export async function getFabricColors(fabricId: string, furnId: string) {
  const response = await fetch(
    `/api/v1/furniture/fabric/${fabricId}/${furnId}`,
  );

  const fabricColors = await response.json();
  return fabricColors.data;
}

export async function getFurniture(
  category: string,
  filter: unknown,
): Promise<{ data: FurnitureTypes[]; count: number }> {
  const res = await fetch(
    `/api/v1/furniture/${category}?${filter}`,
  );

  if (!res.ok) throw new Error("Something Went Wrong");

  const furniture = await res.json();

  return furniture.data;
}
