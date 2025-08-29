import CardContent from "@/components/businessCard/CardContent";
import BusinessCard from "@/components/businessCard/BusinessCard";
import BusinessLogo from "@/components/businessCard/BusinessLogo";
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import { useTranslations } from "next-intl";

export default function ContactMe() {
  const t = useTranslations("BusinessCard");
  return (
    <main>
      <MaxWidthWrapper className="min-h-page mt-16 md:px-4 flex items-center justify-center">
        <BusinessCard
          frontContent={<BusinessLogo height={64} />}
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
      </MaxWidthWrapper>
    </main>
  );
}
