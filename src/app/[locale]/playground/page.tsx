"use client";

import React from "react";
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import AkaiMPC from "@/components/vault/mpc/AkaiMPC";

export default function Playground() {
  return (
    <main>
      <MaxWidthWrapper className="relative h-page mt-16 z-10 grid grid-cols-2 px-4">
        <AkaiMPC />
      </MaxWidthWrapper>
    </main>
  );
}
