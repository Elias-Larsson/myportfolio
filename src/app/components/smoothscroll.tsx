"use client";

import type { LenisOptions } from "lenis";
import { ReactLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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
  const [reduceMotion, setReduceMotion] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduceMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  if (reduceMotion || pathname.startsWith("/studio")) return null;

  return <ReactLenis root options={options} />;
};
