"use client";

import { Input } from "@/components/ui/input";
import { Button, Flex, Box, Heading } from "@radix-ui/themes";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/app/[locale]/lib/auth";
import { toast } from "sonner";

const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
    newPassword: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
    confirmPassword: z
      .string()
      .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "كلمات المرور غير متطابقة",
    path: ["confirmPassword"],
  });

type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

function ChangePasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: ChangePasswordFormValues) => {
    try {
      setIsLoading(true);
      await authClient.changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        fetchOptions: {
          onSuccess: () => {
            toast.success("تم تغيير كلمة المرور بنجاح");
          },
          onError: () => {
            toast.error("فشل في تغيير كلمة المرور");
          },
        },
      });
    } catch (error) {
      console.error("Change password failed", error);
    } finally {
      setIsLoading(false);
      reset();
    }
  };

  return (
    <Flex align="center" justify="center" minHeight="100vh">
      <Box style={{ maxWidth: "400px", width: "100%" }}>
        <Box mb="6">
          <Heading as="h1" size="6" weight="bold">
            تغيير كلمة المرور
          </Heading>
        </Box>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="currentPassword"
              className="block text-sm font-medium mb-2"
            >
              كلمة المرور الحالية *
            </label>
            <Input
              id="currentPassword"
              type="password"
              placeholder="أدخل كلمة المرور الحالية"
              {...register("currentPassword", {
                required: "كلمة المرور الحالية مطلوبة",
              })}
            />
            {errors.currentPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium mb-2"
            >
              كلمة المرور الجديدة *
            </label>
            <Input
              id="newPassword"
              type="password"
              placeholder="أدخل كلمة المرور الجديدة"
              {...register("newPassword", {
                required: "كلمة المرور الجديدة مطلوبة",
              })}
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium mb-2"
            >
              تأكيد كلمة المرور *
            </label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="أدخل كلمة المرور الجديدة مرة أخرى"
              {...register("confirmPassword", {
                required: "تأكيد كلمة المرور مطلوب",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            style={{ marginTop: "8px" }}
          >
            {isLoading ? "جاري التحديث..." : "تغيير كلمة المرور"}
          </Button>
        </form>
      </Box>
    </Flex>
  );
}

export default ChangePasswordPage;
