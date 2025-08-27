"use client";
import React from "react";
import TimeLine from "../TimeLine";
import { IJob } from "@/types/job.type";
import LocationCard from "../LocationCard";
import { ICourse } from "@/types/course.type";

export default function PathSection({
  careerPath,
}: {
  careerPath: (ICourse | IJob)[];
}) {
  return (
    <section className="relative min-h-page px-4 md:px-0 grid grid-cols-1 lg:grid-cols-2 place-items-center gap-8 snap-start snap-always">
      <TimeLine careerPath={careerPath} />

      <LocationCard
        image="https://ucarecdn.com/2a595c2b-4fec-4a28-878c-eab8fb1bc7b2/lyonWLL.png"
        priority
      />
    </section>
  );
}
