"use client";
import React from "react";
import Link from "next/link";
import { motion, Transition, useReducedMotion } from "framer-motion";
import { cn } from "@/utils/classnames";
import { underlineLeftToRight } from "@/lib/motionVariants";

interface AnimatedNavLinkProps {
  id: string;
  /** Destination path (internal) */
  url: string;
  /** Visible label */
  label: string;
  /** Current pathname to determine active state */
  pathname: string;
}

export default function AnimatedNavLink({
  id,
  url,
  label,
  pathname,
}: AnimatedNavLinkProps) {
  const isActive = pathname === url;
  // Respect user's reduced motion preference
  const prefersReducedMotion = useReducedMotion();
  const underlineTransition: Transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.3, ease: "easeOut" };

  return (
    <div id={id} className="relative size-full">
      <motion.div
        className="size-full"
        whileHover="hover"
        initial="initial"
        animate={isActive ? "active" : "initial"}
      >
        <Link
          href={url}
          className={cn(
            "inline-flex items-center justify-center relative w-full h-full min-w-16 px-6 text-sm font-orbitron transition-colors",
            isActive
              ? "text-primary font-bold"
              : "hover:text-secondary focus-visible:text-secondary",
            // A11y: clear keyboard focus ring
            "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          )}
          aria-current={isActive ? "page" : undefined}
        >
          {label}

          <motion.div
            aria-hidden="true"
            className={cn(
              "absolute bottom-0 left-0 w-full h-1 origin-left",
              isActive ? "bg-primary" : "bg-secondary"
            )}
            variants={underlineLeftToRight}
            transition={underlineTransition}
          />
        </Link>
      </motion.div>
    </div>
  );
}
