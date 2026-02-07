"use client";

import { Button, Dialog, TextArea, TextField } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { PlusIcon } from "@radix-ui/react-icons";
import { uploadToCloudinary } from "../../lib/uploadToCloudinary";
import { useCreateColor } from "../sofas/hooks/useCreateColor";
import { toast } from "sonner";

interface AddColorDialogProps {
  fabricId: string;
  furnId: string;
}

interface AddColorFormValues {
  name: string;
  description: string;
}

function AddColorDialog({ fabricId, furnId }: AddColorDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [thumbnailError, setThumbnailError] = useState("");
  const [imagesError, setImagesError] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const createColorMutation = useCreateColor();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddColorFormValues>({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (!thumbnailFile) {
      setThumbnailPreview("");
      return undefined;
    }

    const objectUrl = URL.createObjectURL(thumbnailFile);
    setThumbnailPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [thumbnailFile]);

  useEffect(() => {
    if (!imageFiles.length) {
      setImagePreviews([]);
      return undefined;
    }

    const urls = imageFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imageFiles]);

  const handleClose = () => {
    reset();
    setThumbnailFile(null);
    setThumbnailPreview("");
    setImageFiles([]);
    setImagePreviews([]);
    setThumbnailError("");
    setImagesError("");
    setIsOpen(false);
  };

  const onSubmit = async (values: AddColorFormValues) => {
    if (!thumbnailFile) {
      setThumbnailError("الصورة المصغرة مطلوبة");
      return;
    }

    if (!imageFiles.length) {
      setImagesError("الصور مطلوبة");
      return;
    }

    try {
      setIsUploading(true);

      const thumbnailUrl = await uploadToCloudinary(thumbnailFile);
      const imageUrls: string[] = [];

      for (const file of imageFiles) {
        const url = await uploadToCloudinary(file);
        imageUrls.push(url);
      }

      await createColorMutation.mutateAsync({
        fabricId,
        furnId,
        name: values.name,
        description: values.description,
        thumbnail: thumbnailUrl,
        images: imageUrls,
      });

      toast.success("تم إضافة اللون بنجاح");
      handleClose();
    } catch (error) {
      console.error("Create color submit failed", error);
      toast.error("فشل في إضافة اللون");
    } finally {
      setIsUploading(false);
    }
  };

  const isBusy = isUploading || createColorMutation.isPending;

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger>
        <Button
          size={{ initial: "2", sm: "3" }}
          variant="outline"
          style={{ marginTop: "8px" }}
        >
          <PlusIcon />
          اضافه لون جديد
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="550px">
        <Dialog.Title>إضافة لون جديد</Dialog.Title>
        <Dialog.Description>أدخل بيانات اللون الجديد</Dialog.Description>

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
              الصورة المصغرة *
            </label>
            <input
              id="thumbnail"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setThumbnailFile(file);
                if (file) setThumbnailError("");
              }}
              className="w-full"
            />
            {thumbnailError && (
              <p className="text-red-500 text-sm mt-1">{thumbnailError}</p>
            )}
            {thumbnailPreview ? (
              <img
                src={thumbnailPreview}
                alt="thumbnail preview"
                className="mt-3 h-24 w-24 rounded object-cover"
              />
            ) : null}
          </div>

          <div>
            <label htmlFor="images" className="block text-sm font-medium mb-2">
              صور اللون (حتى 6 صور) *
            </label>
            <input
              id="images"
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                if (files.length > 6) {
                  setImagesError("الحد الأقصى 6 صور");
                  setImageFiles(files.slice(0, 6));
                  return;
                }
                setImagesError("");
                setImageFiles(files);
              }}
              className="w-full"
            />
            {imagesError && (
              <p className="text-red-500 text-sm mt-1">{imagesError}</p>
            )}
            {imagePreviews.length ? (
              <div className="mt-3 grid grid-cols-3 gap-2">
                {imagePreviews.map((url, index) => (
                  <img
                    key={url}
                    src={url}
                    alt={`color preview ${index + 1}`}
                    className="h-20 w-20 rounded object-cover"
                  />
                ))}
              </div>
            ) : null}
          </div>

          <div className="flex gap-2 justify-end mt-4">
            <Dialog.Close>
              <Button
                type="button"
                variant="soft"
                disabled={isBusy}
                onClick={handleClose}
              >
                إلغاء
              </Button>
            </Dialog.Close>
            <Button type="submit" disabled={isBusy}>
              {isBusy ? "جاري الإضافة..." : "إضافة"}
            </Button>
          </div>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default AddColorDialog;
