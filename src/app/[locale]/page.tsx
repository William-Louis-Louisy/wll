import HeroSection from "@/components/section/HeroSection";
import { LOCALE_MAP } from "@/lib/seo";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "fr" | "en" }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "SEO" });
  const p = (k: string) => t(`pages.home.${k}`);

  return {
    title: p("title"),
    description: p("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: { "fr-FR": "/fr", "en-US": "/en" },
    },
    openGraph: {
      title: p("ogTitle"),
      description: p("ogDescription"),
      images: [
        { url: "/og/home.png", width: 1200, height: 630, alt: t("ogAlt") },
      ],
      locale: LOCALE_MAP[locale],
    },
    twitter: {
      card: "summary_large_image",
      title: p("ogTitle"),
      description: p("ogDescription"),
      images: ["/og/home.png"],
    },
  };
}

export default function Home() {
  return (
    <main>
      <HeroSection />
    </main>
  );
}
