import React from "react";
import { fetcher } from "@/lib/api";
import { Project } from "@/types/projects.type";
import BrandLoader from "@/components/common/BrandLoader";
import ProjectsDisplay from "@/components/ProjectsDisplay";
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";

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
    <MaxWidthWrapper>
      <ProjectsDisplay projects={projects} />
    </MaxWidthWrapper>
  );
}
