"use client";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import BrandLoader from "../common/BrandLoader";
import HeroParagraph from "../hero/HeroParagraph";
import HeroCallToAction from "../hero/HeroCallToAction";
import MaxWidthWrapper from "../common/MaxWidthWrapper";
import GradualSpacingTitle from "../hero/GradualSpacingTitle";
import HeroPicture from "../hero/HeroPicture";

const DynamicCanvas = dynamic(() => import("../DynamicCanvas"), {
  ssr: false,
});

export default function HeroSection() {
  const t = useTranslations("HomePage");
  const [gridReady, setGridReady] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [canvasLoaded, setCanvasLoaded] = useState(false);
  const [pointer, setPointer] = useState<[number, number]>([0, 0]);

  return (
    <section
      className="relative min-h-page overflow-hidden mt-16"
      onPointerMove={(e) => {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = (e.clientY / window.innerHeight) * 2 - 1;
        setPointer([x, y]);
      }}
    >
      {/* Background Canvas WebGL */}
      {!canvasLoaded && <BrandLoader />}

      <div className="absolute inset-0 z-0">
        <DynamicCanvas
          pointer={pointer}
          onReady={() => {
            setGridReady(true);
            setCanvasLoaded(true);
            setShowButton(true);
          }}
        />
      </div>

      {gridReady && (
        <MaxWidthWrapper className="relative min-h-page z-10 place-items-center grid grid-cols-1 md:grid-cols-2 md:px-4">
          <div className="flex flex-col gap-6 px-4 md:px-0 justify-center items-start mt-12 mb-6 md:my-0">
            <GradualSpacingTitle text={t("title")} />
            <HeroParagraph />
            <HeroCallToAction showButton={showButton} />
          </div>
          <HeroPicture />
        </MaxWidthWrapper>
      )}
    </section>
  );
}
