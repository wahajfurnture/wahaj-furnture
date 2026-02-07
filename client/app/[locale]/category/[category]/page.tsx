import { setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import Furnitures from "./Furnitures";
import Spinner from "../../admin/components/Spinner";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category } = await params;
  let message;
  const fixedCategory =
    locale === "en" ? category : category === "sofa" ? "كنبتك" : "ستائرك";

  if (locale === "en") {
    message = "Choose the appropriate * for you";
  } else {
    message = "اختر * المناسبه لك";
  }
  message = message.replace("*", fixedCategory);

  return {
    title: message,
  };
}

interface PageTypes {
  params: Promise<{ category: string; locale: string }>;
  searchParams: Promise<URLSearchParams>;
}

export const dynamic = "force-dynamic";

async function page({ params, searchParams }: PageTypes) {
  const { category, locale } = await params;
  setRequestLocale(locale);
  const queries = new URLSearchParams(await searchParams);

  return (
    <Suspense fallback={<Spinner />}>
      <Furnitures category={category} queries={queries} />
    </Suspense>
  );
}

export default page;
