"use client";

import dynamic from "next/dynamic";
import React from "react";

const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });
const AlienMascot = dynamic(() => import("@/components/AlienMascot"), { ssr: false });

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <CustomCursor />
      {children}
      <AlienMascot />
    </SmoothScroll>
  );
}
