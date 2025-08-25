"use client";
import WorkingMethods from "../WorkingMethods";
import ScrewedContentPanel from "../vault/ScrewedContentPanel";

export default function StackSection() {
  return (
    <section className="relative min-h-page w-full overflow-hidden grid grid-cols-1 lg:grid-cols-2 place-items-center mb-8 md:mb-0 md:py-3 gap-4 3xl:gap-24">
      <ScrewedContentPanel />
      <WorkingMethods />
    </section>
  );
}
