import { ReactNode } from "react";
import { cn } from "@/utils/classnames";

interface MaxWidthWrapperProps {
  className?: string;
  children: ReactNode;
}

export default function MaxWidthWrapper({
  className,
  children,
}: MaxWidthWrapperProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-screen-3xl px-0 sm:px-6 lg:px-8",
        className
      )}
    >
      {children}
    </div>
  );
}
