"use client";
import dynamic from "next/dynamic";
import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { useTranslations } from "next-intl";
import HeroPicture from "../hero/HeroPicture";
import BrandLoader from "../common/BrandLoader";
import { useReducedMotion } from "framer-motion";
import HeroParagraph from "../hero/HeroParagraph";
import HeroCallToAction from "../hero/HeroCallToAction";
import MaxWidthWrapper from "../common/MaxWidthWrapper";
import GradualSpacingTitle from "../hero/GradualSpacingTitle";

const DynamicCanvas = dynamic(() => import("../DynamicCanvas"), {
  ssr: false,
});

type Vec2 = [number, number];

export default function HeroSection() {
  const t = useTranslations("HomePage");
  const prefersReducedMotion = useReducedMotion();
  const [isReady, setIsReady] = useState<boolean>(false);
  const [pointer, setPointer] = useState<Vec2>([0, 0]);

  const rafId = useRef<number | null>(null);

  const handleReady = useCallback(() => {
    setIsReady(true);
  }, []);

  const handlePointerMove = useCallback((e: ReactPointerEvent<HTMLElement>) => {
    if (rafId.current != null) return;

    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;

    rafId.current = requestAnimationFrame(() => {
      setPointer([x, y]);
      rafId.current = null;
    });
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsReady(true);
    }
    return () => {
      if (rafId.current != null) cancelAnimationFrame(rafId.current);
    };
  }, [prefersReducedMotion]);

  return (
    <section
      className="relative min-h-page overflow-hidden mt-16"
      onPointerMove={prefersReducedMotion ? undefined : handlePointerMove}
    >
      {/* Background Canvas WebGL */}
      {!isReady && <BrandLoader aria-hidden="true" />}

      {!prefersReducedMotion && (
        <div className="absolute inset-0 z-0">
          <DynamicCanvas pointer={pointer} onReady={handleReady} />
        </div>
      )}

      {isReady && (
        <MaxWidthWrapper className="relative min-h-page z-10 place-items-center grid grid-cols-1 lg:grid-cols-2 lg:px-4">
          <div className="flex flex-col w-full gap-6 px-4 lg:px-0 justify-center items-start mt-12 mb-6 lg:my-0">
            <GradualSpacingTitle text={t("title")} />
            <HeroParagraph />
            <HeroCallToAction showButton={isReady} />
          </div>
          <HeroPicture />
        </MaxWidthWrapper>
      )}
    </section>
  );
}
