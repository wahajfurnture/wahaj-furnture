"use client";

import { useTranslations } from "next-intl";

interface FurnitureHeaderProps {
  name: string;
  category: string;
  description: string;
}

export function FurnitureHeader({
  name,
  category,
  description,
}: FurnitureHeaderProps) {
  const t = useTranslations("model");

  return (
    <div className="flex flex-col gap-6 text-center md:text-start">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{name}</h1>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-600 uppercase tracking-wider">
          {t("cat")}
        </p>
        <p className="text-lg text-gray-700 mt-1">{category}</p>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-600 uppercase tracking-wider">
          {t("desc")}
        </p>
        <p className="text-gray-700 mt-2 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
