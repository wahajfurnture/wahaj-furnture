import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import z from "zod";
import { useEditFabric } from "./useEditFabric";
import { Fabric } from "../../furniture/[furnId]/types";

const fabricForm = z.object({
  name: z.string(),
  description: z.string(),
});

type FabricFormType = z.infer<typeof fabricForm>;

function EditFabricForm({
  close,
  fabric,
}: {
  close: () => void;
  fabric: Fabric;
}) {
  const { register, handleSubmit, reset } = useForm<FabricFormType>({
    resolver: zodResolver(fabricForm),
    defaultValues: {
      name: fabric.name,
      description: fabric.description,
    },
  });
  const { mutate: editFabric, isPending } = useEditFabric();

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        editFabric(
          { fabricId: fabric._id, data },
          {
            onSettled: () => {
              reset();
              close();
            },
          },
        );
      })}
      className="flex flex-col gap-4 mt-4"
    >
      <label htmlFor="name" className="block text-sm font-medium mb-2">
        الاسم
      </label>
      <Input
        {...register("name")}
        placeholder="اضف اسم الى القماش"
        type="text"
        id="name"
      />
      <label htmlFor="description" className="block text-sm font-medium mb-2">
        الوصف
      </label>
      <Input
        {...register("description")}
        placeholder="اضف وصف الى القماش"
        type="text"
        id="description"
      />
      <div className="flex gap-2 justify-end mt-4">
        <Dialog.Close>
          <Button type="button" variant="soft" disabled={isPending}>
            إلغاء
          </Button>
        </Dialog.Close>
        <Button type="submit" disabled={isPending}>
          {isPending ? "جاري الإضافة..." : "إضافة"}
        </Button>
      </div>
    </form>
  );
}

export default EditFabricForm;
