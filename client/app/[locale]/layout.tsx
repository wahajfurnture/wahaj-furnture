import { Toaster } from "@/components/ui/sonner";
import { routing } from "@/i18n/routing";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./globals.css";
import { QueryProvider } from "./providers/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return {
    title: locale === "ar" ? "وهَج للأثاث" : "Wahaj Furniture",
    description:
      locale === "ar"
        ? "واهج – متخصصون في الكنب والستائر في السعودية. تصاميم فاخرة وعصرية للمنازل السعودية. تسوق كنب مجالس وستائر مخصصة الآن"
        : "Discover premium sofas and elegant curtains at Wahaj in Saudi Arabia. Quality designs for modern & traditional homes – shop luxury seating and custom curtains online now",
  };
}

type Props = {
  children: React.ReactNode;
  params: { locale: string } | Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <Theme accentColor="gold" panelBackground="solid" radius="small">
            <NextIntlClientProvider>
              <Header />
              {children}
              <Footer />
              <Toaster />
              {/* <ThemePanel /> */}
            </NextIntlClientProvider>
          </Theme>
        </QueryProvider>
      </body>
    </html>
  );
}
