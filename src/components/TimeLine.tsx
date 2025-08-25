"use client";
import React from "react";
import { cn } from "@/utils/classnames";
import { IJob } from "@/types/job.type";
import { formatDate } from "@/lib/date";
import { ICourse } from "@/types/course.type";
import { Check } from "@phosphor-icons/react";
import { useLocale, useTranslations } from "next-intl";

interface TimeLineProps {
  careerPath: (ICourse | IJob)[];
}

export default function TimeLine({ careerPath }: TimeLineProps) {
  const currentLocale = useLocale();
  const t = useTranslations("TimeLine");

  return (
    <div aria-label="Progress">
      <ol role="list" className="overflow-hidden">
        {careerPath.map((item) => (
          <li key={item._id} className={cn("relative pb-8")}>
            <>
              <div
                aria-hidden="true"
                className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-primary"
              />
              <div className="group relative flex items-start">
                <span className="flex h-9 items-center">
                  <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                    <Check aria-hidden="true" className="h-5 w-5 text-white" />
                  </span>
                </span>
                <div className="inline-flex items-center">
                  <span className="ml-4 flex min-w-0 flex-col gap-1">
                    <span className="inline-flex items-baseline gap-2">
                      <span className="font-bold text-primary">
                        {"school" in item ? item.school : item.company}
                      </span>
                      <span className="text-xs text-foreground/75">
                        {"(" +
                          formatDate(item.startDate) +
                          " - " +
                          formatDate(item.endDate) +
                          ")"}
                      </span>
                    </span>

                    <span className="text-sm font-medium ml-4">
                      {currentLocale === "en" ? item.title : item.title_fr}
                    </span>
                    <span className="text-sm text-foreground/75 ml-4">
                      {currentLocale === "en"
                        ? item.description
                        : item.description_fr}
                    </span>
                  </span>
                </div>
              </div>
            </>
          </li>
        ))}
        <li className="relative">
          <>
            <div className="group relative flex items-start">
              <span className="flex h-9 items-center">
                <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-background">
                  <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                </span>
              </span>
              <div className="inline-flex items-center">
                <span className="ml-4 flex min-w-0 flex-col gap-1">
                  <span className="inline-flex items-baseline gap-2">
                    <span className="font-bold text-primary">Freelance</span>
                    <span className="text-xs text-foreground/75">
                      {"(04/2024" + " - " + t("today") + ")"}
                    </span>
                  </span>

                  <span className="text-sm font-medium ml-4">
                    {t("fullstack")}
                  </span>
                  <span className="text-sm text-foreground/75 ml-4">
                    {t("freelancer")}
                  </span>
                </span>
              </div>
            </div>
          </>
        </li>
      </ol>
    </div>
  );
}
