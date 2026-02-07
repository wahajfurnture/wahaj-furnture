import { Button, Dialog, TextArea, TextField } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FurnitureTypes } from "../../category/[category]/types";
import { uploadToCloudinary } from "../../lib/uploadToCloudinary";
import { useUpdateFurn } from "../hooks/useUpdateFurn";
import ManageFabric from "./ManageFabric";

interface EditFurnFormProps {
  furn: FurnitureTypes;
  onSuccessClose?: () => void;
}

interface EditFurnFormValues {
  name: string;
  description: string;
}

function EditFurnForm({ furn, onSuccessClose }: EditFurnFormProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<EditFurnFormValues>({
    defaultValues: {
      name: furn?.name || "",
      description: furn?.description || "",
    },
  });

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(furn?.thumbnail || "");
  const [isUploading, setIsUploading] = useState(false);
  const updateMutation = useUpdateFurn();

  useEffect(() => {
    if (!thumbnailFile) return undefined;

    const objectUrl = URL.createObjectURL(thumbnailFile);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [thumbnailFile]);

  const onSubmit = async (values: EditFurnFormValues) => {
    try {
      setIsUploading(true);
      let thumbnailUrl = furn.thumbnail;

      if (thumbnailFile) {
        thumbnailUrl = await uploadToCloudinary(thumbnailFile);
      }

      const payload = {
        name: values.name,
        description: values.description,
        thumbnail: thumbnailUrl,
      };

      await updateMutation.mutateAsync({ furnId: furn._id, data: payload });
      onSuccessClose?.();
    } catch (error) {
      console.error("Edit furniture submit failed", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    reset({
      name: furn?.name || "",
      description: furn?.description || "",
    });
    setThumbnailFile(null);
    setPreviewUrl(furn?.thumbnail || "");
  };

  const isBusy = isSubmitting || isUploading || updateMutation.isPending;

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          الاسم
        </label>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <TextField.Root
              id="name"
              value={field.value}
              onChange={field.onChange}
              placeholder="أدخل اسم الموديل"
            />
          )}
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-2">
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
              placeholder="أدخل الوصف"
            />
          )}
        />
      </div>

      <div>
        <label htmlFor="thumbnail" className="block text-sm font-medium mb-2">
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
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="thumbnail preview"
            className="mt-3 h-24 w-24 rounded object-cover"
          />
        ) : null}
      </div>

      <ManageFabric furnId={furn._id} />

      <div className="flex gap-2 justify-end">
        <Dialog.Close>
          <Button variant="soft" disabled={isBusy} onClick={handleCancel}>
            الغاء
          </Button>
        </Dialog.Close>
        <Button type="submit" disabled={isBusy}>
          {isBusy ? "جاري الحفظ..." : "حفظ"}
        </Button>
      </div>
    </form>
  );
}

export default EditFurnForm;
