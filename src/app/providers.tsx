"use client";

import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider } from "next-intl";
import Header from "@/components/navigation/Header";
import { AudioProvider } from "@/contexts/AudioContext";
import { VideoProvider } from "@/contexts/VideoContext";

export default function Providers({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: string;
  messages: Record<string, string>;
}) {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone="Europe/Paris"
    >
      <ThemeProvider
        attribute="data-theme"
        defaultTheme="system"
        enableSystem={true}
      >
        <VideoProvider>
          <AudioProvider>
            <Header />
            {children}
          </AudioProvider>
        </VideoProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
