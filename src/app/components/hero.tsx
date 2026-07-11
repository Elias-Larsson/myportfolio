"use client";

import { useScrollY } from "@/app/hooks/scrollY";
import { Button } from "./button";
import { VectorTransition } from "./background/depthbg";
import { IconButton } from "./iconbutton";

type Props = {
  description?: string;
};

export const Hero = ({ description }: Props) => {
  const scrollY = useScrollY({ disabledOnMobile: true });

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between">
      <span
        aria-hidden="true"
        className="absolute right-8 top-8 z-20 hidden size-[20vw] rounded-full bg-secondary sm:block lg:size-[10vw]"
        style={{
          transform: `translateY(${scrollY * 0.55}px)`,
        }}
      />
      <section
        className="relative z-10 flex flex-grow items-end overflow-visible px-4 pt-10"
        style={{
          transform: `translateY(${scrollY * 0.375}px)`,
        }}
      >
        <div className="flex flex-col">
          <h1 className="pb-4 text-[10.5dvw] sm:text-6xl md:text-7xl">
            FUTURE OF WEB
            <br />
            <span className="text-secondary">DEVELOPMENT.</span>
          </h1>
          <div className="flex max-w-128 flex-col gap-4">
            <p>{description ?? "Full-stack developer building secure, user-friendly web experiences."}</p>
            <div className="flex flex-row items-center gap-4">
              <Button route="https://mail.google.com/mail/?view=cm&fs=1&to=aroezi05@gmail.com">
                Contact me
              </Button>
              <IconButton route="linkedin" />
              <IconButton route="github" />
            </div>
          </div>
        </div>
      </section>
      <VectorTransition />
    </main>
  );
};
