"use client";

import { tranferableSkills } from "@/lib/skills";
import { useTranslations } from "next-intl";

export default function WorkingMethods() {
  const t = useTranslations("WorkingMethods");
  return (
    <div className="min-h-page px-4 flex flex-col gap-4 md:px-0 lg:gap-0 3xl:gap-8 md:justify-evenly 3xl:justify-center overflow-hidden">
      <div className="rounded-2xl border border-foreground/5 px-5 py-4 bg-element/70">
        <h3 className="font-semibold text-primary">{t("craftsmanship")}</h3>
        <ul className="mt-2 space-y-1.5 text-sm leading-relaxed list-disc list-inside">
          <li>{t("dry")}</li>
          <li>{t("solid")}</li>
          <li>{t("kiss")}</li>
          <li>{t("typescript")}</li>
          <li>{t("tests")}</li>
        </ul>
      </div>

      <div className="rounded-2xl border border-foreground/5 px-5 py-4 bg-element/70">
        <h3 className="font-semibold text-primary">{t("adaptability")}</h3>
        <ul className="mt-2 space-y-1.5 text-sm leading-relaxed list-disc list-inside">
          <li>
            <span>{t("scrumTitle")}&nbsp;:</span>
            <p className="text-foreground/75 italic">{t("scrum")}</p>
          </li>
          <li>
            <span>{t("reviewingTitle")}&nbsp;:</span>
            <p className="text-foreground/75 italic">{t("reviewing")}</p>
          </li>
          <li>
            <span>{t("communicationTitle")}&nbsp;:</span>
            <p className="text-foreground/75 italic">{t("communication")}</p>
          </li>
        </ul>
      </div>

      <div className="rounded-2xl border border-foreground/5 px-5 py-4 bg-element/70">
        <h3 className="font-semibold text-primary">
          {t("transferableSkills")}
        </h3>
        <ul className="mt-2 flex flex-wrap gap-2">
          {tranferableSkills.map((skill) => (
            <li
              key={skill.titleKey}
              title={t(skill.definitionKey)}
              className="inline-flex items-center gap-2 rounded-md bg-background px-3 py-1 text-xs cursor-default"
            >
              <span
                aria-hidden="true"
                role="presentation"
                className="inline-block h-1.5 w-1.5 rounded-full bg-primary"
              />
              {t(skill.titleKey)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
