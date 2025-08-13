import React from "react";
import { motion } from "framer-motion";
import { feedbackContent } from "@/lib/dartboardGame";
import { FeedbackCardProps } from "@/types/dartgame.type";

export default function FeedbackCard({
  feedback,
  countdown,
}: FeedbackCardProps) {
  return (
    <>
      {feedback && (
        <motion.div
          className="absolute z-30 flex flex-col items-center justify-center gap-3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background shadow-2xl border-2 border-yellow-500 rounded-lg p-6 max-w-3xs max-h-48"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
          }}
        >
          <p className="font-bold uppercase text-center text-yellow-500">
            {feedbackContent[feedback].title}
          </p>
          <p className="text-sm font-medium text-center text-muted-foreground">
            {feedbackContent[feedback].message}
          </p>
          {countdown !== null && (
            <span className="flex items-center justify-center font-black size-12 rounded-full bg-yellow-500 text-background">
              {countdown}
            </span>
          )}
        </motion.div>
      )}
    </>
  );
}
