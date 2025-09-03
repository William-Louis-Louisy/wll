import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import PathSection from "@/components/section/PathSection";
import StackSection from "@/components/section/StackSection";
import { fetcher } from "@/lib/api";
import { LOCALE_MAP } from "@/lib/seo";
import { ICourse } from "@/types/course.type";
import { IJob } from "@/types/job.type";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "fr" | "en" }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "SEO" });
  const p = (k: string) => t(`pages.about.${k}`);

  return {
    title: p("title"),
    description: p("description"),
    alternates: {
      canonical: `/${locale}/about`,
      languages: { "fr-FR": "/fr/about", "en-US": "/en/about" },
    },
    openGraph: {
      title: p("ogTitle"),
      description: p("ogDescription"),
      images: [
        { url: "/og/about.png", width: 1200, height: 630, alt: t("ogAlt") },
      ],
      locale: LOCALE_MAP[locale],
    },
    twitter: {
      card: "summary_large_image",
      title: p("ogTitle"),
      description: p("ogDescription"),
      images: ["/og/about.png"],
    },
  };
}

export default async function AboutMe() {
  const { data: courses, error: coursesError } = await fetcher<ICourse[]>(
    "/courses"
  );
  const { data: jobs, error: jobsError } = await fetcher<IJob[]>("/jobs");

  if (coursesError || jobsError) {
    return <p>Erreur lors du chargement : {coursesError || jobsError}</p>;
  }

  const careerPath: (ICourse | IJob)[] = [
    ...(courses ? [...courses].reverse() : []),
    ...(jobs ?? []),
  ];

  return (
    <main>
      <MaxWidthWrapper
        className="lg:overflow-y-auto lg:overscroll-contain lg:snap-y lg:snap-mandatory lg:scroll-smooth scrollbar-none
      min-h-page lg:h-page my-24 lg:mt-16 mb-0 px-0
      flex flex-col items-center"
      >
        <PathSection careerPath={careerPath} />
        <StackSection />
      </MaxWidthWrapper>
    </main>
  );
}
