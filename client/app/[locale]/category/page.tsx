import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import CategoryCards from "./CategoryCards";
import CategoryHeader from "./CategoryHeader";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return {
    title: locale === "ar" ? "اختر نوع الاثاث" : "Choose furniture type",
  };
}

export default function IndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);

  setRequestLocale(locale);

  const t = useTranslations("category");

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <CategoryHeader />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <CategoryCards
          href="/category/curtain"
          actionText={t("curtainsActoin")}
          heading={t("curtainsHead")}
          text={t("curtainsText")}
          src="/img-3.webp"
        />

        <CategoryCards
          href="/category/sofa"
          actionText={t("sofasActoin")}
          heading={t("sofasHead")}
          text={t("sofasText")}
          src="/img-7.webp"
        />
      </div>
    </div>
  );
}
