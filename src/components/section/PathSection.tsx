"use client";
import React from "react";
import TimeLine from "../TimeLine";
import { IJob } from "@/types/job.type";
import { useTranslations } from "next-intl";
import { ICourse } from "@/types/course.type";
import LocationCard from "../LocationCard";

export default function PathSection({
  careerPath,
}: {
  careerPath: (ICourse | IJob)[];
}) {
  const t = useTranslations("Location");
  return (
    <section className="relative min-h-page px-4 md:px-0 grid grid-cols-1 lg:grid-cols-2 place-items-center gap-8">
      <TimeLine careerPath={careerPath} />

      <LocationCard
        image="https://ucarecdn.com/2a595c2b-4fec-4a28-878c-eab8fb1bc7b2/lyonWLL.png"
        description={t("description")}
        alt={t("alt")}
        priority
      />
    </section>
  );
}
