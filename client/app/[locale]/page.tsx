import Image from "next/image";
import HeroSwiper from "./components/HeroSwiper";
import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function IndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  const t = useTranslations("homePage");

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <HeroSwiper />

      <div className="absolute inset-0 bg-black/40 z-10"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
        <div className="mb-4">
          <Image
            src="/Wahaaj-logo-removebg.png"
            alt="Wahaaj Logo"
            width={120}
            height={120}
            className="drop-shadow-lg"
          />
        </div>

        <p className="text-white text-5xl md:text-7xl font-black mb-8 tracking-wide drop-shadow-lg text-center px-4 max-w-4xl leading-tight">
          {t("welcome")}
        </p>

        <Link
          href="/category"
          className="px-10 py-4 bg-white text-black font-semibold text-lg rounded-lg hover:bg-gray-100 duration-300 drop-shadow-lg hover:shadow-xl transform hover:scale-110"
        >
          {t("shopNow")}
        </Link>
      </div>
    </div>
  );
}
