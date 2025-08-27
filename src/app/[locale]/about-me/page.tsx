import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import PathSection from "@/components/section/PathSection";
import StackSection from "@/components/section/StackSection";
import { fetcher } from "@/lib/api";
import { ICourse } from "@/types/course.type";
import { IJob } from "@/types/job.type";

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
