"use client";

import { Button } from "@radix-ui/themes";
import { useTranslations } from "next-intl";

function BookButton({ ...props }: React.ComponentProps<typeof Button>) {
  const t = useTranslations();

  return (
    <Button
      {...props}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        const whatsapp = `https://wa.me/${process.env.NEXT_PUBLIC_PHONE_NUMBER}`;
        window.open(whatsapp, "_blank");
      }}
      size={{ initial: "2", lg: "1" }}
    >
      {t("book")}
    </Button>
  );
}

export default BookButton;
