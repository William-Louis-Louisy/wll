"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { heroLeftBtn, heroRightBtn } from "@/lib/motionVariants";

export default function HeroCallToAction({
  showButton,
}: {
  showButton: boolean;
}) {
  const t = useTranslations("HomePage");

  return (
    <>
      {showButton ? (
        <div className="mt-0 md:mt-10 w-full md:w-fit grid grid-cols-2 text-sm place-items-center md:place-items-start gap-4">
          <Link className="w-full" href="/my-projects">
            <motion.div
              className="cta-btn"
              variants={heroLeftBtn}
              initial="initial"
              animate="animate"
              whileTap="clicked"
            >
              {t("leftBtn")}
            </motion.div>
          </Link>

          <Link className="w-full" href="/contact-me">
            <motion.div
              className="cta-btn"
              variants={heroRightBtn}
              initial="initial"
              animate="animate"
              whileTap="clicked"
            >
              {t("rightBtn")}
            </motion.div>
          </Link>
        </div>
      ) : (
        <div className="h-12 mt-10"></div>
      )}
    </>
  );
}
