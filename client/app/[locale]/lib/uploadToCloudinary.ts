const cloudinaryCloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "";
const cloudinaryUploadPreset =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "";

export async function uploadToCloudinary(file: File): Promise<string> {
  if (!cloudinaryUploadPreset) {
    throw new Error("Missing Cloudinary upload preset");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", cloudinaryUploadPreset);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Cloudinary upload failed", {
      status: response.status,
      statusText: response.statusText,
      errorText,
    });
    throw new Error("Cloudinary upload failed");
  }

  const data = await response.json();
  return data.secure_url as string;
}
