"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Select, Box } from "@radix-ui/themes";

function ChangeLangSelect() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    router.push(pathname, { locale: newLocale });
  };

  return (
    <Box>
      <Select.Root value={locale} onValueChange={handleLanguageChange}>
        <Select.Trigger
          aria-label="Change language"
          className="p-0 min-w-fit w-10 h-10 flex items-center justify-center"
        >
          <span className="text-lg">{locale === "ar" ? "🇸🇦" : "🇺🇸"}</span>
        </Select.Trigger>
        <Select.Content>
          <Select.Group>
            <Select.Item value="ar">
              <span className="mr-2">🇸🇦</span> العربية
            </Select.Item>
            <Select.Item value="en">
              <span className="mr-2">🇺🇸</span> English
            </Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </Box>
  );
}

export default ChangeLangSelect;
