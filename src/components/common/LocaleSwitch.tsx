"use client";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useTransition } from "react";
import { cn } from "@/utils/classnames";
import { routing } from "@/i18n/routing";
import { useParams } from "next/navigation";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useLocale, useTranslations } from "next-intl";
import { Check, CaretUpDown } from "@phosphor-icons/react";
import { useRouter, usePathname } from "@/i18n/navigation";

type AppLocale = (typeof routing.locales)[number];

interface LocaleOption {
  id: number;
  code: AppLocale;
  label: string;
}

export default function LocaleSwitch() {
  const t = useTranslations("LocaleSwitch");
  const currentLocale = useLocale() as AppLocale;
  const router = useRouter();
  const isMobile = useIsMobile();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  const locales: ReadonlyArray<LocaleOption> = routing.locales.map(
    (loc, index) => ({
      id: index,
      code: loc as AppLocale,
      label: t("locale", { locale: loc }),
    })
  );

  const selected = locales.find((l) => l.code === currentLocale) ?? locales[0];

  const handleChange = (localeOption: LocaleOption): void => {
    startTransition(() => {
      router.replace(
        { pathname, query: params },
        { locale: localeOption.code }
      );
    });
  };

  return (
    <div className="w-20">
      <Listbox value={selected} onChange={handleChange}>
        <div className="relative">
          <ListboxButton
            aria-label={t("label", { defaultMessage: "Change language" })}
            aria-busy={isPending}
            className={cn(
              "relative w-full rounded-md bg-element py-2 pl-3 pr-10 text-left shadow-sm cursor-pointer"
            )}
          >
            <span className="block truncate">{selected.label}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <CaretUpDown aria-hidden className="h-4 w-4 text-gray-400" />
            </span>
          </ListboxButton>

          <ListboxOptions
            className={cn(
              "absolute z-10 max-h-60 w-full overflow-auto rounded-md bg-element py-1 text-base shadow-lg focus:outline-none sm:text-sm",
              isMobile ? "bottom-full mb-1" : "top-full mt-1"
            )}
          >
            {locales.map((loc) => (
              <ListboxOption
                key={loc.id}
                value={loc}
                className={({ active }) =>
                  cn(
                    "relative cursor-pointer select-none py-2 pl-4 pr-9",
                    active
                      ? "bg-alternative text-background"
                      : "text-foreground"
                  )
                }
              >
                {({ selected: isSelected }) => (
                  <>
                    <span
                      className={cn(
                        "block truncate",
                        isSelected ? "font-semibold" : "font-normal"
                      )}
                    >
                      {loc.label}
                    </span>

                    {isSelected && (
                      <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                        <Check aria-hidden className="h-5 w-5" />
                      </span>
                    )}
                  </>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  );
}
