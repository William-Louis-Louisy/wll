import { useTranslations } from "next-intl";
import ContactForm from "@/components/ContactForm";
import CardContent from "@/components/businessCard/CardContent";
import BusinessCard from "@/components/businessCard/BusinessCard";
import BusinessLogo from "@/components/businessCard/BusinessLogo";
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";

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
