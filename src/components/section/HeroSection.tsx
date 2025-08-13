"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import BrandLoader from "../common/BrandLoader";
import MaxWidthWrapper from "../common/MaxWidthWrapper";
import ScrewedContentPanel from "../vault/ScrewedContentPanel";

const DynamicCanvas = dynamic(() => import("../DynamicCanvas"), {
  ssr: false,
});

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.5,
    },
  },
};

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
      {/* Canvas WebGL en fond */}
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

      {/* Contenu HTML / React au premier plan */}
      {gridReady && (
        <MaxWidthWrapper className="relative min-h-page z-10 grid grid-cols-1 md:grid-cols-2 md:px-4">
          <motion.div
            className="flex flex-col gap-6 px-4 md:px-0 justify-center items-start my-20 md:my-0"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <h1>{t("title")}</h1>
            <h2 className="w-full font-orbitron md:text-lg leading-7">
              {t.rich("description", {
                name: (chunks) => (
                  <span className="text-primary font-bold">{chunks}</span>
                ),
              })}
            </h2>

            {showButton ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="mt-10"
              >
                <Link
                  className="px-8 py-3 bg-primary text-foreground font-semibold rounded-md hover:bg-secondary transition-colors"
                  href="/my-projects"
                >
                  Découvrir mes projets
                </Link>
              </motion.div>
            ) : (
              <div
                className="h-12 mt-10
              "
              ></div>
            )}
          </motion.div>
          <ScrewedContentPanel />
        </MaxWidthWrapper>
      )}
    </section>
  );
}
