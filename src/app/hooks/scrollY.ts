import { useEffect, useState } from "react";

type ScrollYOptions = {
  disabledOnMobile?: boolean;
  disabledOnReducedMotion?: boolean;
};

export const useScrollY = ({
  disabledOnMobile = false,
  disabledOnReducedMotion = true,
}: ScrollYOptions = {}) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 639px)");
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let animationFrame: number | null = null;

    const updateScrollPosition = () => {
      animationFrame = null;
      setScrollY(window.scrollY);
    };

    const requestScrollUpdate = () => {
      if (animationFrame !== null) return;
      animationFrame = window.requestAnimationFrame(updateScrollPosition);
    };

    const motionIsDisabled = () =>
      (disabledOnMobile && mobileQuery.matches) ||
      (disabledOnReducedMotion && reducedMotionQuery.matches);

    const updateScrollListener = () => {
      window.removeEventListener("scroll", requestScrollUpdate);

      if (motionIsDisabled()) {
        if (animationFrame !== null) {
          window.cancelAnimationFrame(animationFrame);
          animationFrame = null;
        }
        setScrollY(0);
        return;
      }

      requestScrollUpdate();
      window.addEventListener("scroll", requestScrollUpdate, {
        passive: true,
      });
    };

    updateScrollListener();
    mobileQuery.addEventListener("change", updateScrollListener);
    reducedMotionQuery.addEventListener("change", updateScrollListener);

    return () => {
      window.removeEventListener("scroll", requestScrollUpdate);
      mobileQuery.removeEventListener("change", updateScrollListener);
      reducedMotionQuery.removeEventListener("change", updateScrollListener);

      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, [disabledOnMobile, disabledOnReducedMotion]);

  return scrollY;
};
