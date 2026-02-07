import { Card, Container, Heading } from "@radix-ui/themes";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { BiLogoWhatsapp } from "react-icons/bi";

export default function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("contactUs");

  return (
    <div className="min-h-[calc(100vh-74px-85px)] flex flex-col bg-slate-50 px-4">
      <Container className="flex flex-col h-full justify-center">
        <Heading as="h1" size={{ initial: "5", md: "6", lg: "8" }} mb="8">
          {t("heading")}
        </Heading>

        <a
          target="_blank"
          href={`https://wa.me/${process.env.NEXT_PUBLIC_PHONE_NUMBER}`}
        >
          <Card className="p-4 cursor-pointer hover:shadow-lg transition-shadow duration-300">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <BiLogoWhatsapp className="w-6 h-6" />
                <span className="font-semibold text-lg">{t("startChat")}</span>
              </div>
              <p className="text-base">
                +{process.env.NEXT_PUBLIC_PHONE_NUMBER}
              </p>
            </div>
          </Card>
        </a>
      </Container>
    </div>
  );
}
