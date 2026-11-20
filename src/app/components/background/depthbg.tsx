"use client";
import { layers } from "@/app/constants/layersbg";
import Image from "next/image";

export const VectorTransition = ({ scrollY }: { scrollY: number }) => (
  <div aria-hidden="true" className="relative h-[45vh] w-full">
    {layers.map((layer, index) => (
      <div
        key={layer.src}
        className="absolute inset-0 w-full will-change-transform"
        style={{
          transform: `translate3d(0, ${layer.offsetY + scrollY * layer.speed}px, 0)`,
          zIndex: index,
        }}
      >
        <Image
          src={layer.src}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
    ))}
  </div>
);
