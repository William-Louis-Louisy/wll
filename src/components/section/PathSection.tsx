"use client";
import React from "react";
import TimeLine from "../TimeLine";
import Image from "next/image";
import { ICourse } from "@/types/course.type";
import { IJob } from "@/types/job.type";
import { useTranslations } from "next-intl";

export default function PathSection({
  careerPath,
}: {
  careerPath: (ICourse | IJob)[];
}) {
  const t = useTranslations("Location");
  return (
    <section className="min-h-page px-4 grid grid-cols-1 lg:grid-cols-2 place-items-center gap-8">
      <TimeLine careerPath={careerPath} />

      <div className="flex flex-col place-items-center mb-4 lg:mb-8">
        <Image
          src="https://ucarecdn.com/2a595c2b-4fec-4a28-878c-eab8fb1bc7b2/lyonWLL.png"
          alt="Lyon Points of Interest"
          priority
          width={560}
          height={560}
        />
        <p className="text-sm max-w-[560px] text-foreground/75 text-prettty bg-element border border-foreground/5 md:-mt-16 3xl:mt-0 px-4 py-2 md:py-4 rounded-2xl">
          {t("description")}
        </p>
      </div>
    </section>
  );
}
