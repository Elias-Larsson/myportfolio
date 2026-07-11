"use client";
import { layers } from "@/app/constants/layersbg";
import { useScrollY } from "@/app/hooks/scrollY";
import Image from "next/image";

export const VectorTransition = () => {
  const scrollY = useScrollY({ disabledOnMobile: true });

  return (
    <div className="w-full relative h-[45vh]">
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
          />
        </div>
      ))}
    </div>
  );
};
