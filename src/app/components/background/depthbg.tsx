"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const layers = [
  { src: "/depthBackground/Vector.svg", speed: 0.7, offsetY: 40 },
  { src: "/depthBackground/Vector-1.svg", speed: 0.6, offsetY: 140 },
  { src: "/depthBackground/Vector-2.svg", speed: 0.45, offsetY: 200 },
  { src: "/depthBackground/Vector-3.svg", speed: 0.3, offsetY: 300 },
  { src: "/depthBackground/Vector-4.svg", speed: 0, offsetY: 340 },
];

export const VectorTransition = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full relative h-[420px] overflow-hidden">
      {layers.map((layer, i) => (
        <div
          key={i}
          className="absolute inset-0 w-full"
          style={{
            transform: `translateY(${layer.offsetY + scrollY * layer.speed}px)`,
            zIndex: i,
          }}
        >
          <Image
            src={layer.src}
            alt={`parallax layer ${i}`}
            fill
            className="object-cover object-center"
            priority={i === 0}
          />
        </div>
      ))}
    </div>
  );
};