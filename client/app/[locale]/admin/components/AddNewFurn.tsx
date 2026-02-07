"use client";

import { Button, Dialog, TextField, TextArea } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { uploadToCloudinary } from "../../lib/uploadToCloudinary";
import { useCreateFurn } from "../hooks/useCreateFurn";
import { toast } from "sonner";
import { PlusIcon } from "lucide-react";

interface AddNewFurnProps {
  category: "sofa" | "curtain";
}

interface AddNewFurnFormValues {
  name: string;
  description: string;
}

function AddNewFurn({ category }: AddNewFurnProps) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddNewFurnFormValues>({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [thumbnailError, setThumbnailError] = useState("");
  const createMutation = useCreateFurn();

  useEffect(() => {
    if (!thumbnailFile) {
      setPreviewUrl("");
      return undefined;
    }

    const objectUrl = URL.createObjectURL(thumbnailFile);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [thumbnailFile]);

  const onSubmit = async (values: AddNewFurnFormValues) => {
    if (!thumbnailFile) {
      setThumbnailError("الصورة المصغرة مطلوبة");
      return;
    }

    try {
      setIsUploading(true);
      const thumbnailUrl = await uploadToCloudinary(thumbnailFile);

      const payload = {
        name: values.name,
        description: values.description,
        thumbnail: thumbnailUrl,
        category: category,
      };

      await createMutation.mutateAsync(payload);
      toast.success("تم إضافة الأثاث بنجاح");
      handleClose();
    } catch (error) {
      console.error("Create furniture submit failed", error);
      toast.error("فشل في إضافة الأثاث");
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    reset();
    setThumbnailFile(null);
    setPreviewUrl("");
    setThumbnailError("");
    setIsOpen(false);
  };

  const isBusy = isUploading || createMutation.isPending;

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger>
        <Button size="3" className="cursor-pointer">
          <PlusIcon width="20" height="20" />
          {category === "sofa" ? "إضافة كنبة جديدة" : "إضافة ستارة جديدة"}
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="550px">
        <Dialog.Title>
          {category === "sofa" ? "إضافة كنبة جديدة" : "إضافة ستارة جديدة"}
        </Dialog.Title>
        <Dialog.Description>
          {category === "sofa"
            ? "أدخل بيانات الكنبة الجديدة"
            : "أدخل بيانات الستارة الجديدة"}
        </Dialog.Description>

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
                  placeholder="أدخل اسم الموديل"
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
              الوصف *
            </label>
            <Controller
              control={control}
              name="description"
              rules={{ required: "الوصف مطلوب" }}
              render={({ field }) => (
                <TextArea
                  id="description"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="أدخل الوصف"
                  rows={3}
                />
              )}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
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
                if (file) {
                  setThumbnailError("");
                }
              }}
              className="w-full"
            />
            {thumbnailError && (
              <p className="text-red-500 text-sm mt-1">{thumbnailError}</p>
            )}
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="thumbnail preview"
                className="mt-3 h-24 w-24 rounded object-cover"
              />
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

export default AddNewFurn;
