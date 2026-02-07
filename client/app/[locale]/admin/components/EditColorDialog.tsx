"use client";

import { Button, Dialog, TextArea, TextField } from "@radix-ui/themes";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { uploadToCloudinary } from "../../lib/uploadToCloudinary";
import { useUpdateColor } from "../sofas/hooks/useUpdateColor";
import { toast } from "sonner";
import { Cross2Icon } from "@radix-ui/react-icons";

interface EditColorDialogProps {
  color: {
    _id: string;
    name: string;
    description?: string;
    thumbnail: string;
    images?: string[];
  };
  fabricId: string;
  furnId: string;
}

interface EditColorFormValues {
  name: string;
  description: string;
}

function EditColorDialog({ color, fabricId, furnId }: EditColorDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(color.thumbnail);
  const [existingImages, setExistingImages] = useState<string[]>(
    color.images || [],
  );
  const [newImageFiles, setNewImageFiles] = useState<File[]>([]);
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);
  const [imagesError, setImagesError] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const updateColorMutation = useUpdateColor();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditColorFormValues>({
    defaultValues: {
      name: color.name,
      description: color.description || "",
    },
  });

  useEffect(() => {
    if (!thumbnailFile) {
      setThumbnailPreview(color.thumbnail);
      return undefined;
    }

    const objectUrl = URL.createObjectURL(thumbnailFile);
    setThumbnailPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [thumbnailFile, color.thumbnail]);

  useEffect(() => {
    if (!newImageFiles.length) {
      setNewImagePreviews([]);
      return undefined;
    }

    const urls = newImageFiles.map((file) => URL.createObjectURL(file));
    setNewImagePreviews(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [newImageFiles]);

  useEffect(() => {
    if (!isOpen) return;

    reset({
      name: color.name,
      description: color.description || "",
    });
    setThumbnailFile(null);
    setThumbnailPreview(color.thumbnail);
    setExistingImages(color.images || []);
    setNewImageFiles([]);
    setNewImagePreviews([]);
    setImagesError("");
  }, [isOpen, color, reset]);

  const totalImagesCount = existingImages.length + newImageFiles.length;

  const canAddMoreImages = totalImagesCount < 6;

  const handleRemoveExistingImage = (imageUrl: string) => {
    setExistingImages((prev) => prev.filter((img) => img !== imageUrl));
  };

  const handleNewImagesChange = (files: File[]) => {
    const remainingSlots = 6 - existingImages.length;
    if (files.length > remainingSlots) {
      setImagesError("الحد الأقصى 6 صور");
      setNewImageFiles(files.slice(0, remainingSlots));
      return;
    }

    setImagesError("");
    setNewImageFiles(files);
  };

  const imagesChanged = useMemo(() => {
    const initialImages = color.images || [];
    if (newImageFiles.length > 0) return true;
    if (existingImages.length !== initialImages.length) return true;
    return initialImages.some((img) => !existingImages.includes(img));
  }, [color.images, existingImages, newImageFiles.length]);

  const onSubmit = async (values: EditColorFormValues) => {
    try {
      setIsUploading(true);

      let thumbnailUrl = color.thumbnail;
      if (thumbnailFile) {
        thumbnailUrl = await uploadToCloudinary(thumbnailFile);
      }

      let imagesPayload: string[] | undefined;
      if (imagesChanged) {
        const uploadedNewImages: string[] = [];
        for (const file of newImageFiles) {
          const url = await uploadToCloudinary(file);
          uploadedNewImages.push(url);
        }
        imagesPayload = [...existingImages, ...uploadedNewImages];
      }

      await updateColorMutation.mutateAsync({
        colorId: color._id,
        fabricId,
        furnId,
        data: {
          name: values.name,
          description: values.description,
          thumbnail: thumbnailFile ? thumbnailUrl : undefined,
          images: imagesPayload,
        },
      });

      toast.success("تم تحديث اللون بنجاح");
      setIsOpen(false);
    } catch (error) {
      console.error("Edit color submit failed", error);
      toast.error("فشل في تحديث اللون");
    } finally {
      setIsUploading(false);
    }
  };

  const isBusy = isUploading || updateColorMutation.isPending;

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger>
        <Button size={{ initial: "1", sm: "2" }} variant="soft">
          تعديل
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="600px">
        <Dialog.Title>تعديل اللون</Dialog.Title>
        <Dialog.Description>قم بتعديل بيانات اللون</Dialog.Description>

        <form
          className="flex flex-col gap-4 mt-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              الاسم *
            </label>
            <Controller
              control={control}
              name="name"
              rules={{ required: "الاسم مطلوب" }}
              render={({ field }) => (
                <TextField.Root
                  id="name"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="أدخل اسم اللون"
                />
              )}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-2"
            >
              الوصف
            </label>
            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <TextArea
                  id="description"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="أدخل وصف اللون"
                  rows={3}
                />
              )}
            />
          </div>

          <div>
            <label
              htmlFor="thumbnail"
              className="block text-sm font-medium mb-2"
            >
              الصورة المصغرة
            </label>
            <input
              id="thumbnail"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setThumbnailFile(file);
              }}
              className="w-full"
            />
            {thumbnailPreview ? (
              <img
                src={thumbnailPreview}
                alt="thumbnail preview"
                className="mt-3 h-24 w-24 rounded object-cover"
              />
            ) : null}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              الصور الحالية ({existingImages.length}/6)
            </label>
            {existingImages.length ? (
              <div className="grid grid-cols-3 gap-2">
                {existingImages.map((url) => (
                  <div key={url} className="relative">
                    <img
                      src={url}
                      alt="color"
                      className="h-20 w-20 rounded object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveExistingImage(url)}
                      className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow"
                    >
                      <Cross2Icon />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">لا توجد صور حالية</p>
            )}
          </div>

          <div>
            <label htmlFor="images" className="block text-sm font-medium mb-2">
              إضافة صور جديدة (حتى 6 إجمالي)
            </label>
            <input
              id="images"
              type="file"
              accept="image/*"
              multiple
              disabled={!canAddMoreImages}
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                handleNewImagesChange(files);
              }}
              className="w-full"
            />
            {imagesError && (
              <p className="text-red-500 text-sm mt-1">{imagesError}</p>
            )}
            {newImagePreviews.length ? (
              <div className="mt-3 grid grid-cols-3 gap-2">
                {newImagePreviews.map((url, index) => (
                  <img
                    key={url}
                    src={url}
                    alt={`new color ${index + 1}`}
                    className="h-20 w-20 rounded object-cover"
                  />
                ))}
              </div>
            ) : null}
          </div>

          <div className="flex gap-2 justify-end mt-4">
            <Dialog.Close>
              <Button type="button" variant="soft" disabled={isBusy}>
                إلغاء
              </Button>
            </Dialog.Close>
            <Button type="submit" disabled={isBusy}>
              {isBusy ? "جاري الحفظ..." : "حفظ"}
            </Button>
          </div>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default EditColorDialog;
