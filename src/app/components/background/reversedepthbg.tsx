"use client";

import { reverseLayers } from "@/app/constants/layersbg";
import Image from "next/image";
import { useEffect, useRef } from "react";

const MAX_LAYER_SPEED = 0.55;

export const ReverseVectorTransition = () => {
  const transitionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const transition = transitionRef.current;
    if (!transition) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const phoneViewport = window.matchMedia("(max-width: 639px)");
    const layerElements = transition.querySelectorAll<HTMLElement>(
      "[data-reverse-parallax-layer]",
    );
    let animationFrame: number | null = null;

    const updateLayers = () => {
      animationFrame = null;

      const bounds = transition.getBoundingClientRect();
      const transitionTop = window.scrollY + bounds.top;
      const animationStart = transitionTop - window.innerHeight;
      const maximumScroll = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      const animationRange = Math.max(1, maximumScroll - animationStart);
      const progress = reducedMotion.matches || phoneViewport.matches
        ? 1
        : Math.min(
            1,
            Math.max(0, (window.scrollY - animationStart) / animationRange),
          );

      layerElements.forEach((element, index) => {
        const layer = reverseLayers[index];
        const depth = layer.speed / MAX_LAYER_SPEED;
        const hiddenOffset = 100 + depth * 35;
        const offset = -(1 - progress) * hiddenOffset;
        element.style.transform = `translate3d(0, ${offset}%, 0)`;
      });
    };

    const requestUpdate = () => {
      if (animationFrame !== null) return;
      animationFrame = window.requestAnimationFrame(updateLayers);
    };

    const updateScrollListener = () => {
      window.removeEventListener("scroll", requestUpdate);

      if (!reducedMotion.matches && !phoneViewport.matches) {
        window.addEventListener("scroll", requestUpdate, { passive: true });
      }

      requestUpdate();
    };

    updateScrollListener();
    window.addEventListener("resize", requestUpdate);
    reducedMotion.addEventListener("change", updateScrollListener);
    phoneViewport.addEventListener("change", updateScrollListener);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      reducedMotion.removeEventListener("change", updateScrollListener);
      phoneViewport.removeEventListener("change", updateScrollListener);

      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="relative isolate h-[20.833vw] min-h-[12.5rem] w-full overflow-hidden bg-midnight"
      ref={transitionRef}
    >
      {reverseLayers.map((layer, index) => (
        <div
          className="absolute inset-x-0 top-0 will-change-transform"
          data-reverse-parallax-layer
          key={layer.src}
          style={{ zIndex: index }}
        >
          <Image
            alt=""
            className="relative left-1/2 h-auto w-full min-w-[60rem] max-w-none -translate-x-1/2"
            height={layer.height}
            sizes="100vw"
            src={layer.src}
            width={1440}
          />
        </div>
      ))}
    </div>
  );
};
