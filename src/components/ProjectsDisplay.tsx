"use client";

import React, { useRef } from "react";
import ProjectCard from "./ProjectCard";
import { Project } from "@/types/projects.type";
import { motion, useReducedMotion } from "framer-motion";
import ScrollIndicator from "./common/ScrollIndicator";

interface ProjectsDisplayProps {
  projects: Project[];
}

export default function ProjectsDisplay({ projects }: ProjectsDisplayProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const prefersReducedMotion = useReducedMotion();

  const setItemRef = (el: HTMLDivElement | null, i: number) => {
    itemRefs.current[i] = el;
  };

  return (
    <div className="relative">
      <ScrollIndicator
        array={projects}
        containerRef={containerRef}
        itemRefs={itemRefs}
      />
      <div
        ref={containerRef}
        className="mt-16 h-page overflow-y-auto overscroll-contain snap-y snap-mandatory scroll-smooth divide-night/40 divide-y scrollbar-none"
        role="region"
        aria-label="Liste de projets à défilement par écran"
      >
        {projects.map((project, i) => (
          <motion.section
            key={project._id}
            ref={(el) => setItemRef(el as HTMLDivElement | null, i)}
            className="snap-start snap-always min-h-page grid place-items-center"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={
              prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
            }
            viewport={{ root: containerRef, amount: 0.4, once: false }}
            transition={
              prefersReducedMotion
                ? undefined
                : { type: "tween", duration: 0.65, ease: "easeIn" }
            }
          >
            <ProjectCard project={project} />
          </motion.section>
        ))}
      </div>
    </div>
  );
}
