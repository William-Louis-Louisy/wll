"use client";

import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { Moon, Sun } from "@phosphor-icons/react";
import { JSX, useCallback, useEffect, useState } from "react";

export default function ThemeToggle(): JSX.Element | null {
  const t = useTranslations("ThemeToggle");
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch: only render after mount.
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  const toggleTheme = useCallback((): void => {
    setTheme(isDark ? "light" : "dark");
  }, [isDark, setTheme]);

  if (!mounted) return null;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={t("label")}
      aria-pressed={isDark}
      title={isDark ? t("light") : t("dark")}
      data-state={isDark ? "dark" : "light"}
      className="inline-flex items-center justify-center rounded-full bg-element p-2 transition-colors hover:opacity-90 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-primary/60"
    >
      {isDark ? (
        <Sun size={20} weight="bold" aria-hidden="true" />
      ) : (
        <Moon size={20} weight="bold" aria-hidden="true" />
      )}
      <span className="sr-only">{isDark ? t("light") : t("dark")}</span>
    </button>
  );
}
