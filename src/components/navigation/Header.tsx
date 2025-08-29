import {
  Disclosure,
  DisclosurePanel,
  DisclosureButton,
} from "@headlessui/react";
import Link from "next/link";
import Logo from "../common/Logo";
import { cn } from "@/utils/classnames";
import { useTranslations } from "next-intl";
import ThemeToggle from "../common/ThemeToggle";
import { usePathname } from "@/i18n/navigation";
import { List, X } from "@phosphor-icons/react";
import { navlinks } from "@/lib/navigationLinks";
import LocaleSwitch from "../common/LocaleSwitch";
import MaxWidthWrapper from "../common/MaxWidthWrapper";
import AnimatedNavLink from "./AnimatedNavLink";

export default function Header() {
  const pathname = usePathname();
  const t = useTranslations("Navigation");
  return (
    <Disclosure as="nav" className="fixed inset-x-0 top-0 z-50 bg-background">
      <MaxWidthWrapper className="px-4">
        <header className="h-header w-full flex items-center justify-between">
          <Logo />

          <div className="hidden md:inline-flex items-center h-full">
            {/* Navigation links */}
            <div className="grid grid-cols-4 h-full">
              {navlinks.map((link) => (
                <AnimatedNavLink
                  id={link.id}
                  key={link.id}
                  url={link.url}
                  label={t(link.id)}
                  pathname={pathname}
                />
              ))}
            </div>
            {/* Lang & Theme */}
            <div className="hidden md:ml-6 md:flex md:items-center md:gap-4">
              <ThemeToggle />
              <LocaleSwitch />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex items-center md:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 focus:outline-none">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">{t("openMainMenu")}</span>
              <List
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <X
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
        </header>
      </MaxWidthWrapper>

      {/* Mobile Menu */}
      <DisclosurePanel className="md:hidden relative h-page">
        <div className="space-y-1 pb-6 pt-6">
          {navlinks.map((link) => (
            <DisclosureButton
              key={link.id}
              as={Link}
              href={link.url}
              className={cn(
                "block w-full border-l-4 py-2 pl-3 pr-4 text-base font-medium",
                pathname === link.url
                  ? "border-primary text-primary"
                  : "border-transparent"
              )}
            >
              {t(link.id)}
            </DisclosureButton>
          ))}
        </div>

        <div className="absolute bottom-4 inset-x-0 inline-flex items-center justify-end gap-6 w-full px-4">
          <ThemeToggle />
          <LocaleSwitch />
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
