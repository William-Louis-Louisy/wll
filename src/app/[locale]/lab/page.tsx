import React from "react";
import { Metadata } from "next";
import { LOCALE_MAP } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import LabClient from "@/components/section/LabClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "fr" | "en" }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "SEO" });
  const p = (k: string) => t(`pages.lab.${k}`);

  return {
    title: p("title"),
    description: p("description"),
    alternates: {
      canonical: `/${locale}/lab`,
      languages: { "fr-FR": "/fr/lab", "en-US": "/en/lab" },
    },
    openGraph: {
      title: p("ogTitle"),
      description: p("ogDescription"),
      images: [
        { url: "/og/lab.png", width: 1200, height: 630, alt: t("ogAlt") },
      ],
      locale: LOCALE_MAP[locale],
    },
    twitter: {
      card: "summary_large_image",
      title: p("ogTitle"),
      description: p("ogDescription"),
      images: ["/og/lab.png"],
    },
  };
}

export default function Lab() {
  return <LabClient />;
}
