"use client";
import React, { useEffect, useState } from "react";

interface ScrollIndicatorProps<T extends { _id?: string; name?: string }> {
  array: T[];
  containerRef: React.RefObject<HTMLDivElement | null>;
  itemRefs: React.RefObject<(HTMLDivElement | null)[]>;
}

export default function ScrollIndicator<
  T extends { _id?: string; name?: string }
>({ array, containerRef, itemRefs }: ScrollIndicatorProps<T>) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sectionH, setSectionH] = useState<number>(0);
  const scrollToIndex = (i: number) => {
    if (!itemRefs.current || !containerRef.current) return;
    const target = itemRefs.current[i];
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const update = () => {
      const c = containerRef.current;
      if (!c) return;
      setSectionH(c.clientHeight);
    };
    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const c = containerRef.current;
    if (!c || !sectionH) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const idx = Math.round(c.scrollTop / sectionH);
        setActiveIndex((prev) =>
          prev === idx ? prev : Math.max(0, Math.min(idx, array.length - 1))
        );
        ticking = false;
      });
    };

    c.addEventListener("scroll", onScroll, { passive: true });
    return () => c.removeEventListener("scroll", onScroll);
  }, [sectionH, array.length]);

  return (
    <div
      className="
          pointer-events-none
          fixed right-0 top-1/2 z-30 hidden -translate-y-1/2 md:flex md:flex-col md:items-center md:gap-3
        "
      aria-hidden
    >
      {/* Dots cliquables */}
      <ul className="pointer-events-auto w-8 flex flex-col items-center gap-3">
        {array.map((item, i) => {
          const isActive = i === activeIndex;
          return (
            <li
              key={item._id}
              className="w-full flex items-center justify-center"
            >
              <button
                onClick={() => scrollToIndex(i)}
                className="px-2 flex items-center justify-center cursor-pointer"
                aria-label={
                  `Reach the project ${item.name}` ||
                  `Reach the screen ${i + 1}`
                }
                title={item.name || `Écran ${i + 1}`}
              >
                <span
                  className="
                    relative block h-6 w-1 rounded-full
                    outline-none ring-0
                    transition-transform
                    focus-visible:scale-110
                  "
                  style={{
                    background: isActive
                      ? "var(--primary)"
                      : "color-mix(in oklab, var(--primary) 35%, transparent)",
                    transform: isActive ? "scale(1.1)" : "scale(1)",
                  }}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
