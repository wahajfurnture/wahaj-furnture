import { useTranslations } from "next-intl";

function CategoryHeader() {
  const t = useTranslations("category");
  return (
    <div className="max-w-7xl mx-auto mb-16">
      <h1 className="text-4xl md:text-5xl font-black text-gray-900 text-center mb-4">
        {t("catHead")}
      </h1>
      <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto">
        {t("catText")}
      </p>
    </div>
  );
}

export default CategoryHeader;
