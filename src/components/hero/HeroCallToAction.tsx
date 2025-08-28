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
        <div className="mt-0 md:mt-10 w-full md:w-fit grid grid-cols-2 text-sm items-center gap-4">
          <motion.div
            variants={heroLeftBtn}
            initial="initial"
            animate="animate"
          >
            <Link className="cta-btn" href="/my-projects">
              {t("leftBtn")}
            </Link>
          </motion.div>
          <motion.div
            variants={heroRightBtn}
            initial="initial"
            animate="animate"
          >
            <Link className="cta-btn" href="/contact-me">
              {t("rightBtn")}
            </Link>
          </motion.div>
        </div>
      ) : (
        <div className="h-12 mt-10"></div>
      )}
    </>
  );
}
