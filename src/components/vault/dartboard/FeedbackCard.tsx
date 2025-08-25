import React from "react";
import { motion } from "framer-motion";
import { feedbackContent } from "@/lib/dartboardGame";
import { FeedbackCardProps } from "@/types/dartgame.type";
import { useTranslations } from "next-intl";

export default function FeedbackCard({
  feedback,
  onAction,
}: FeedbackCardProps) {
  const t = useTranslations("DartGame");

  return (
    <>
      {feedback && (
        <motion.div
          className="absolute z-30 flex flex-col items-center justify-center gap-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-md"
          initial={{ opacity: 0, scale: 0, rotateY: 90 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{
            duration: 0.6,
            scale: { type: "spring", visualDuration: 0.6, bounce: 0.3 },
            rotateY: { duration: 0.5, ease: "easeOut" },
          }}
        >
          <div className="relative px-8 py-14 rounded-lg border-2 border-amber-800 bg-gradient-to-br from-amber-100 via-amber-200 to-amber-100">
            {/* Texture overlay */}
            <div className="absolute inset-0 rounded-lg opacity-20 pointer-events-none" />

            {/* Content */}
            <div className="relative z-99 text-center flex flex-col items-center gap-4">
              <motion.h2
                className="font-bold text-2xl font-bebas-neue text-amber-900 tracking-wide drop-shadow-md"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {t(`${feedbackContent[feedback].title}`)}
              </motion.h2>

              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                <div className="text-amber-700/70 text-2xl">♛</div>
              </motion.div>

              {/* Action Button */}
              <motion.button
                onClick={onAction}
                className="w-fit px-6 py-2 rounded-md font-bebas-neue tracking-wide text-sm text-amber-900 border border-amber-900 transition-all duration-150 hover:bg-amber-900 hover:text-white cursor-pointer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                {t(`${feedbackContent[feedback].message}`)}
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
