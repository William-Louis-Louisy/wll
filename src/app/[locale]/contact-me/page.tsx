import { Metadata } from "next";
import { LOCALE_MAP } from "@/lib/seo";
import { useTranslations } from "next-intl";
import ContactForm from "@/components/ContactForm";
import { getTranslations } from "next-intl/server";
import CardContent from "@/components/businessCard/CardContent";
import BusinessCard from "@/components/businessCard/BusinessCard";
import BusinessLogo from "@/components/businessCard/BusinessLogo";
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "fr" | "en" }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "SEO" });
  const p = (k: string) => t(`pages.contact.${k}`);

  return {
    title: p("title"),
    description: p("description"),
    alternates: {
      canonical: `/${locale}/contact`,
      languages: { "fr-FR": "/fr/contact", "en-US": "/en/contact" },
    },
    openGraph: {
      title: p("ogTitle"),
      description: p("ogDescription"),
      images: [
        { url: "/og/contact.png", width: 1200, height: 630, alt: t("ogAlt") },
      ],
      locale: LOCALE_MAP[locale],
    },
    twitter: {
      card: "summary_large_image",
      title: p("ogTitle"),
      description: p("ogDescription"),
      images: ["/og/contact.png"],
    },
  };
}

export default function ContactMe() {
  const t = useTranslations("BusinessCard");
  return (
    <main>
      <MaxWidthWrapper className="relative min-h-page w-full mt-16 grid grid-cols-1 lg:grid-cols-2 place-items-center">
        <BusinessCard
          frontContent={<BusinessLogo />}
          backContent={
            <CardContent
              name={t("name")}
              title={t("title")}
              github="https://github.com/William-Louis-Louisy"
              linkedin="https://www.linkedin.com/in/william-louis-louisy/"
              website="https://williamlouislouisy.com/"
              email="contact@williamlouislouisy.com"
              phone="+33 6 95 03 14 20"
            />
          }
          label={t("flip")}
        />
        <ContactForm />
      </MaxWidthWrapper>
    </main>
  );
}
