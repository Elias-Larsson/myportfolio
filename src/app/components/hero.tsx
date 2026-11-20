"use client";

import { useScrollY } from "@/app/hooks/scrollY";
import { contactHref, personName } from "@/app/site";
import { Button } from "./button";
import { VectorTransition } from "./background/depthbg";
import { IconButton } from "./iconbutton";

type Props = {
  description?: string | null;
  hasExperience: boolean;
};

export const Hero = ({ description, hasExperience }: Props) => {
  const scrollY = useScrollY();
  const lastSpace = personName.lastIndexOf(" ");

  return (
    <header className="relative flex min-h-screen flex-col items-center justify-between">
      <span
        aria-hidden="true"
        className="absolute right-8 top-8 z-20 hidden size-[20vw] rounded-full bg-secondary sm:block lg:size-[10vw]"
        style={{
          transform: `translateY(${scrollY * 0.55}px)`,
        }}
      />
      <section
        className="relative z-10 flex w-full flex-grow items-end justify-center px-4 pt-10"
        style={{
          transform: `translateY(${scrollY * 0.375}px)`,
        }}
      >
        <div className="flex min-w-0 max-w-3xl flex-col">
          <h1 className="pb-5 text-[9dvw] leading-[0.96] sm:text-6xl md:text-7xl lg:text-8xl">
            {personName.slice(0, lastSpace + 1)}
            <span className="text-secondary">
              {personName.slice(lastSpace + 1)}
            </span>
          </h1>
          <div className="flex max-w-2xl flex-col gap-5">
            {description && (
              <p className="max-w-xl text-base leading-7 text-primary/75 md:text-lg md:leading-8">
                {description}
              </p>
            )}
            <div className="flex flex-row flex-wrap items-center gap-2 sm:gap-4">
              <Button route={contactHref}>Contact me</Button>
              <IconButton route="linkedin" />
              <IconButton route="github" />
            </div>
            {hasExperience && (
              <a
                className="mt-1 w-fit text-xs uppercase tracking-[0.2em] text-primary/65 underline decoration-transparent underline-offset-8 transition hover:text-primary hover:decoration-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
                href="#experience"
              >
                Experience ↓
              </a>
            )}
          </div>
        </div>
      </section>
      <VectorTransition scrollY={scrollY} />
    </header>
  );
};
