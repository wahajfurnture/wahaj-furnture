import ShowFurniture from "./ShowFurniture";

import { setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import Spinner from "../../admin/components/Spinner";

export const revalidate = 86400

async function Page({
  params,
}: {
  params: Promise<{ locale: string; furnId: string }>;
}) {
  const { locale, furnId } = await params;

  setRequestLocale(locale);

  return (
    <Suspense fallback={<Spinner />}>
      <ShowFurniture furnId={furnId} />
    </Suspense>
  );
}

export default Page;
