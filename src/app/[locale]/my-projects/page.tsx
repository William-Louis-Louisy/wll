import React from "react";
import { Metadata } from "next";
import { fetcher } from "@/lib/api";
import { LOCALE_MAP } from "@/lib/seo";
import { Project } from "@/types/projects.type";
import { getTranslations } from "next-intl/server";
import BrandLoader from "@/components/common/BrandLoader";
import ProjectsDisplay from "@/components/ProjectsDisplay";
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "fr" | "en" }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "SEO" });
  const p = (k: string) => t(`pages.projects.${k}`);

  return {
    title: p("title"),
    description: p("description"),
    alternates: {
      canonical: `/${locale}/projects`,
      languages: { "fr-FR": "/fr/projects", "en-US": "/en/projects" },
    },
    openGraph: {
      title: p("ogTitle"),
      description: p("ogDescription"),
      images: [
        { url: "/og/projects.png", width: 1200, height: 630, alt: t("ogAlt") },
      ],
      locale: LOCALE_MAP[locale],
    },
    twitter: {
      card: "summary_large_image",
      title: p("ogTitle"),
      description: p("ogDescription"),
      images: ["/og/projects.png"],
    },
  };
}

export default async function MyProjects() {
  const { data: myProjects, error } = await fetcher<Project[]>(
    "/personal-projects"
  );

  const { data: dagProjects, error: dagError } = await fetcher<Project[]>(
    "/professional-projects"
  );

  if (error || dagError) {
    return <p>Error occurred while fetching projects : {error || dagError}</p>;
  }

  const projects = [...(myProjects?.reverse() ?? []), ...(dagProjects ?? [])];
  if (!projects) return <BrandLoader />;

  return (
    <main>
      <MaxWidthWrapper>
        <ProjectsDisplay projects={projects} />
      </MaxWidthWrapper>
    </main>
  );
}
