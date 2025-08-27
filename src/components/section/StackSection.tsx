"use client";
import WorkingMethods from "../WorkingMethods";
import ScrewedContentPanel from "../stackDisplay/ScrewedContentPanel";

export default function StackSection() {
  return (
    <section className="relative min-h-page lg:h-page w-full overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-4 place-items-center mb-8 md:mb-0 3xl:gap-24 snap-start snap-always">
      <ScrewedContentPanel />
      <WorkingMethods />
    </section>
  );
}
