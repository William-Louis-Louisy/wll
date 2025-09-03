import "@/app/globals.css";
import Providers from "../providers";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Bebas_Neue, Inter, Orbitron, Space_Grotesk } from "next/font/google";
import { LOCALE_MAP } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "fr" | "en" }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "SEO" });
  const brand = "William Louis-Louisy";

  return {
    metadataBase: new URL("https://williamlouislouisy.com"),
    title: { default: t("siteTitle"), template: `%s · ${brand}` },
    description: t("siteDescription"),
    alternates: {
      canonical: locale === "fr" ? "/fr" : "/en",
      languages: { "fr-FR": "/fr", "en-US": "/en" },
    },
    openGraph: {
      type: "website",
      siteName: brand,
      title: t("siteTitle"),
      description: t("siteDescription"),
      locale: LOCALE_MAP[locale],
      images: [
        { url: "/og/home.png", width: 1200, height: 630, alt: t("ogAlt") },
      ],
      url:
        locale === "fr"
          ? "https://williamlouislouisy.com/fr"
          : "https://williamlouislouisy.com/en",
    },
    twitter: {
      card: "summary_large_image",
      title: t("siteTitle"),
      description: t("siteDescription"),
      images: ["/og/home.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas-neue",
});
const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-orbitron",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: "fr" | "en" }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    console.error("Missing or invalid messages for locale:", locale, error);
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`antialiased ${inter.variable} ${bebasNeue.variable} ${orbitron.variable} ${spaceGrotesk.variable}`}
      >
        <Providers locale={locale} messages={messages}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
