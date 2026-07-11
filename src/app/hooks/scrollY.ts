import { useEffect, useState } from "react";

type ScrollYOptions = {
  disabledOnMobile?: boolean;
};

export const useScrollY = ({ disabledOnMobile = false }: ScrollYOptions = {}) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const mobileQuery = window.matchMedia("(max-width: 639px)");

    const updateScrollListener = () => {
      window.removeEventListener("scroll", handleScroll);

      if (disabledOnMobile && mobileQuery.matches) {
        setScrollY(0);
        return;
      }

      setScrollY(window.scrollY);
      window.addEventListener("scroll", handleScroll, { passive: true });
    };

    updateScrollListener();
    mobileQuery.addEventListener("change", updateScrollListener);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      mobileQuery.removeEventListener("change", updateScrollListener);
    };
  }, [disabledOnMobile]);

  return scrollY;
};
