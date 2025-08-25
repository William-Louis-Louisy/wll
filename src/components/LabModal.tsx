"use client";
import { X } from "@phosphor-icons/react";
import { Dialog } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

interface LabModalProps {
  storageKey?: string;
}

export default function LabModal({
  storageKey = "lab:intro:seen:v1",
}: LabModalProps) {
  const t = useTranslations("LabModal");
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    try {
      const seen = localStorage.getItem(storageKey);
      if (!seen) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, [storageKey]);

  const closeAndPersist = () => {
    try {
      localStorage.setItem(storageKey, "1");
    } catch {
      // ignore write errors
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={closeAndPersist} className="relative z-50">
      <div className="fixed inset-0">
        {/* Backdrop */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.2 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-md"
          aria-hidden="true"
        />
        {/* Centered panel */}
        <div className="fixed inset-0 flex items-end md:items-center justify-center md:p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-0 md:gap-4 relative w-full max-w-xl rounded-t-2xl md:rounded-2xl bg-element shadow-2xl ring-1 ring-black/10 p-6 sm:p-7">
            <motion.div
              className="order-2 md:order-1 -mt-6 md:-mt-0 mb-8 md:mb-0"
              initial={reduce ? false : { opacity: 0, y: 24, scale: 0.98 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              exit={
                reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }
              }
              transition={{ type: "spring", stiffness: 220, damping: 26 }}
              role="dialog"
              aria-modal="true"
            >
              <button
                aria-label="Fermer"
                onClick={closeAndPersist}
                className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-foreground/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <h2 className="text-xl font-semibold text-primary tracking-tight">
                {t("title")}
              </h2>
              <p className="mt-2 text-sm text-alternative text-pretty">
                {t("description")}
              </p>
              <p className="mt-3 text-xs text-alternative/90">{t("tips")}</p>
            </motion.div>

            <Image
              src="https://ucarecdn.com/afb8a684-9e5a-411c-96b5-093d9eba64c4/LabWLL.png"
              className="order-1 md:order-2"
              alt="Lab"
              width={240}
              height={240}
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
}
