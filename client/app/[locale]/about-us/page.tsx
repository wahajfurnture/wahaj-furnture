import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { use } from "react";

export default function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("aboutUs");

  return (
    <section className="relative w-full min-h-[calc(100vh-74px)] overflow-hidden">
      <Image
        src={"/img-1.webp"}
        fill
        alt="Background image"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/40 z-10"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
        <div className="text-white text-center max-w-3xl px-4">
          <h2 className="text-3xl lg:text-5xl font-bold mb-5 drop-shadow-lg">
            {t("heading")}
          </h2>
          <p className="drop-shadow-lg text-lg">{t("content")}</p>
        </div>
      </div>
    </section>
  );
}
