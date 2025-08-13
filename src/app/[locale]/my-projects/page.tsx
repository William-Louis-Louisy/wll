import React from "react";
import { fetcher } from "@/lib/api";
import { Project } from "@/types/projects.type";
import ProjectCard from "@/components/ProjectCard";
import BrandLoader from "@/components/common/BrandLoader";
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";

export default async function MyProjects() {
  const { data: myProjects, error } = await fetcher<Project[]>(
    "/personal-projects"
  );

  const { data: dagProjects, error: dagError } = await fetcher<Project[]>(
    "/professional-projects"
  );

  if (error || dagError) {
    return <p>Erreur lors du chargement : {error || dagError}</p>;
  }

  const projects = [...(myProjects ?? []), ...(dagProjects ?? [])];

  if (!projects) return <BrandLoader />;

  return (
    <MaxWidthWrapper className="min-h-page mt-16 md:px-4 divide-night divide-y">
      <>
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </>
    </MaxWidthWrapper>
  );
}
