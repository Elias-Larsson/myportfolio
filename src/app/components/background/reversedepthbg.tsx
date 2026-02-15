"use client";
import { reverseLayers } from "@/app/constants/layersbg";
import Image from "next/image";

export const ReverseVectorTransition = () => {
  const scrollY = 0

  return (
    <div className="w-full relative h-[120px] overflow-hidden">
      {reverseLayers.map((layer, i) => (
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
