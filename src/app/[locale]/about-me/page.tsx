import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import TimeLine from "@/components/TimeLine";
import { fetcher } from "@/lib/api";
import { simpleStackData } from "@/lib/stackLogo";
import { ICourse } from "@/types/course.type";
import { IJob } from "@/types/job.type";
import Image from "next/image";

export default async function AboutMe() {
  const { data: courses, error: coursesError } = await fetcher<ICourse[]>(
    "/courses"
  );
  const { data: jobs, error: jobsError } = await fetcher<IJob[]>("/jobs");

  if (coursesError || jobsError) {
    return <p>Erreur lors du chargement : {coursesError || jobsError}</p>;
  }

  const careerPath = [
    ...(courses ? [...courses].reverse() : []),
    ...(jobs ?? []),
  ];

  return (
    <MaxWidthWrapper className="min-h-page my-24 md:mt-16 mb-0 px-4 flex items-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <TimeLine careerPath={careerPath} />
        <div className="w-full flex items-center justify-center">
          <div className="grid grid-cols-3 md:grid-cols-4 gap-2 h-fit">
            {simpleStackData.map((logo) => (
              <div
                key={logo.id}
                className="relative size-24 p-3 bg-element rounded-md shadow-md hover:shadow-xl duration-150"
              >
                <Image src={logo.url} alt={logo.title} width={56} height={56} />
                <span className="absolute bottom-1.5 right-2 text-center text-alternative font-bebas-neue leading-4">
                  {logo.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
