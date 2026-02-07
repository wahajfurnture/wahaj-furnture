import { Input } from "@/components/ui/input";
import { Button, Dialog } from "@radix-ui/themes";
import { useAddFabric } from "./useAddFabric";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const fabricForm = z.object({
  name: z.string(),
  description: z.string(),
});

type FabricFormType = z.infer<typeof fabricForm>;

function NewFabricForm({ close }: { close: () => void }) {
  const { register, handleSubmit, reset } = useForm<FabricFormType>({
    resolver: zodResolver(fabricForm),
  });
  const { mutate: addFabric, isPending } = useAddFabric();

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        addFabric(data, {
          onSettled: () => {
            reset();
            close();
          },
        });
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

export default NewFabricForm;
