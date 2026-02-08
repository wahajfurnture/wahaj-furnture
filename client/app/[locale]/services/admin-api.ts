import { toast } from "sonner";

const getAuthToken = () => sessionStorage.getItem("session");

const getAuthHeaders = (): Record<string, string> => {
  const token = getAuthToken();
  const headers: Record<string, string> = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
};

export async function login(user: { email: string; password: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API}/api/v1/auth/login`,
    {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    },
  );
  if (!response.ok) throw new Error("Failed to Login");
  const data = await response.json();

  try {
    sessionStorage.setItem("session", data.data.token);
  } catch (err) {
    console.log(err);
    toast.error("حدث خطأ");
  }

  return data.data.user;
}

export async function changePassword(password: {
  currentPassword: string;
  newPassword: string;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API}/api/v1/auth/change-password`,
    {
      method: "PATCH",
      body: JSON.stringify(password),
      headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    },
  );
  if (!response.ok) {
    toast.error("فشل تغير كلمه المرور");
    throw new Error("Failed to Change Password");
  }

  toast.success("تم تغير كلمه المرور بنجاح");
  const data = await response.json();

  sessionStorage.setItem("session", data.data.token);

  return data.data.user;
}

export async function getAllFabrics(query: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API}/api/v1/admin/fabric?${query}`,
    {
      headers: {
        ...getAuthHeaders(),
      },
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
      headers: {
        ...getAuthHeaders(),
      },
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
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
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
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
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
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
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
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
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
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
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
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
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
      method: "DELETE",
      headers: {
        ...getAuthHeaders(),
      },
    },
  );
  if (!response.ok) throw new Error("Failed to delete furniture");
  return true;
}

export async function deleteFabric(fabricId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API}/api/v1/admin/fabric/${fabricId}`,
    {
      method: "DELETE",
      headers: {
        ...getAuthHeaders(),
      },
    },
  );
  if (!response.ok) throw new Error("Failed to delete fabric");
  return true;
}

export async function deleteColor(colorId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API}/api/v1/admin/color/${colorId}`,
    {
      method: "DELETE",
      headers: {
        ...getAuthHeaders(),
      },
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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
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
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify({ furnId, fabricId }),
    },
  );
  if (!response.ok) throw new Error("Failed to remove association");
  return true;
}
