export async function getAllFabrics(query: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API}/api/v1/admin/fabric?${query}`,
    {
      credentials: "include",
    },
  );
  if (!response.ok) throw new Error("Failed to fetch fabrics");
  const data = await response.json();
  return data.data;
}

export async function getFabricsByFurnId(furnId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API}/api/v1/admin/fabric/${furnId}`,
    {
      credentials: "include",
    },
  );
  if (!response.ok) throw new Error("Failed to fetch furniture fabrics");
  const data = await response.json();
  return data.data;
}

export async function createFurniture(data: unknown) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API}/api/v1/admin/furniture`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    },
  );
  if (!response.ok) throw new Error("Failed to create furniture");
  const result = await response.json();
  return result.data;
}

export async function createFabric(data: unknown) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API}/api/v1/admin/fabric`,
    {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    },
  );
  if (!response.ok) throw new Error("Failed to create fabric");
  const result = await response.json();
  return result.data;
}

export async function createColor(data: unknown) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API}/api/v1/admin/color`,
    {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    },
  );
  if (!response.ok) throw new Error("Failed to create color");
  const result = await response.json();
  return result.data;
}

export async function updateFurniture(furnId: string, data: unknown) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API}/api/v1/admin/furniture/${furnId}`,
    {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    },
  );
  if (!response.ok) throw new Error("Failed to update furniture");
  const result = await response.json();
  return result.data;
}

export async function updateFabric({
  fabricId,
  data,
}: {
  fabricId: string;
  data: unknown;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API}/api/v1/admin/fabric/${fabricId}`,
    {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    },
  );
  if (!response.ok) throw new Error("Failed to update fabric");
  const result = await response.json();
  return result.data;
}

export async function updateColor(colorId: string, data: unknown) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API}/api/v1/admin/color/${colorId}`,
    {
      credentials: "include",
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    },
  );
  if (!response.ok) throw new Error("Failed to update color");
  const result = await response.json();
  return result.data;
}

export async function deleteFurniture(furnId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API}/api/v1/admin/furniture/${furnId}`,
    {
      credentials: "include",
      method: "DELETE",
    },
  );
  if (!response.ok) throw new Error("Failed to delete furniture");
  return true;
}

export async function deleteFabric(fabricId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API}/api/v1/admin/fabric/${fabricId}`,
    {
      credentials: "include",
      method: "DELETE",
    },
  );
  if (!response.ok) throw new Error("Failed to delete fabric");
  return true;
}

export async function deleteColor(colorId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API}/api/v1/admin/color/${colorId}`,
    {
      credentials: "include",
      method: "DELETE",
    },
  );
  if (!response.ok) throw new Error("Failed to delete color");
  return true;
}

export async function associateFabricWithFurniture(
  furnId: string,
  fabricId: string,
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API}/api/v1/admin/associate`,
    {
      credentials: "include",

      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ furnId, fabricId }),
    },
  );
  if (!response.ok)
    throw new Error("Failed to associate fabric with furniture");
  const result = await response.json();
  return result.data;
}

export async function removeAssociationFabricFurniture(
  furnId: string,
  fabricId: string,
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API}/api/v1/admin/associate`,
    {
      credentials: "include",
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ furnId, fabricId }),
    },
  );
  if (!response.ok) throw new Error("Failed to remove association");
  return true;
}
