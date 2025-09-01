"use client";
import { useTranslations } from "next-intl";
import {
  ITransferableSkill,
  tranferableSkills as transferableSkillsData,
} from "@/lib/skills";
import { downFadeIn, rightFadeIn, upFadeIn } from "@/lib/motionVariants";
import SectionCard from "./section/SectionCard";

export default function WorkingMethods() {
  const t = useTranslations("WorkingMethods");
  const skills = transferableSkillsData as ReadonlyArray<ITransferableSkill>;

  return (
    <div className="min-h-page flex flex-col items-center justify-start lg:justify-between 3xl:justify-start gap-4 lg:gap-0 3xl:gap-8 px-4 md:px-0 py-4">
      {/* Craftsmanship */}
      <SectionCard title={t("craftsmanship")} variants={downFadeIn}>
        <ul className="mt-2 space-y-1.5 text-sm leading-relaxed list-disc list-inside">
          <li>{t("dry")}</li>
          <li>{t("solid")}</li>
          <li>{t("kiss")}</li>
          <li>{t("typescript")}</li>
          <li>{t("tests")}</li>
        </ul>
      </SectionCard>

      {/* Adaptability */}
      <SectionCard title={t("adaptability")} variants={rightFadeIn}>
        <dl className="mt-2 space-y-1.5 text-sm leading-relaxed">
          <div>
            <dt className="font-medium">{t("scrumTitle")}</dt>
            <dd className="text-foreground/75 italic">{t("scrum")}</dd>
          </div>
          <div>
            <dt className="font-medium">{t("reviewingTitle")}</dt>
            <dd className="text-foreground/75 italic">{t("reviewing")}</dd>
          </div>
          <div>
            <dt className="font-medium">{t("communicationTitle")}</dt>
            <dd className="text-foreground/75 italic">{t("communication")}</dd>
          </div>
        </dl>
      </SectionCard>

      {/* Transferable Skills */}
      <SectionCard title={t("transferableSkills")} variants={upFadeIn}>
        <ul className="mt-2 flex flex-wrap gap-2" role="list">
          {skills.map((skill) => (
            <li
              key={skill.titleKey}
              title={t(skill.definitionKey)}
              className="inline-flex items-center gap-2 rounded-md bg-background px-3 py-1 text-xs cursor-default"
            >
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 rounded-full bg-primary"
              />
              {t(skill.titleKey)}
            </li>
          ))}
        </ul>
      </SectionCard>
    </div>
  );
}
