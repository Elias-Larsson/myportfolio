"use client";

import type Lenis from "lenis";
import type { LenisOptions } from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const options: LenisOptions = {
  anchors: true,
  autoRaf: true,
  lerp: 0.085,
  smoothWheel: true,
  stopInertiaOnNavigate: true,
  syncTouch: false,
  wheelMultiplier: 0.9,
};

export const SmoothScroll = () => {
  const pathname = usePathname();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let instance: Lenis | undefined;
    let cancelled = false;
    let requestId = 0;

    const start = async () => {
      const id = ++requestId;

      if (mediaQuery.matches) return;

      const { default: Lenis } = await import("lenis");

      if (cancelled || mediaQuery.matches || id !== requestId) return;

      instance = new Lenis(options);
    };

    const updatePreference = () => {
      requestId += 1;
      instance?.destroy();
      instance = undefined;

      if (!mediaQuery.matches) void start();
    };

    if (!pathname.startsWith("/studio")) {
      updatePreference();
      mediaQuery.addEventListener("change", updatePreference);
    }

    return () => {
      cancelled = true;
      requestId += 1;
      instance?.destroy();
      mediaQuery.removeEventListener("change", updatePreference);
    };
  }, [pathname]);

  return null;
};
