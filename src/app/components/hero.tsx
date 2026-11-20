"use client";

import { useScrollY } from "@/app/hooks/scrollY";
import { contactHref } from "@/app/site";
import { Button } from "./button";
import { VectorTransition } from "./background/depthbg";
import { IconButton } from "./iconbutton";

type Props = {
  description?: string | null;
  heading?: string | null;
  headingAccent?: string | null;
};

const defaultDescription =
  "I build web, mobile, and backend products—from interface to infrastructure.";

export const Hero = ({
  description = defaultDescription,
  heading = "Full-stack.",
  headingAccent = "Backend-minded.",
}: Props) => {
  const scrollY = useScrollY({ disabledOnMobile: true });
  const visibleDescription = description?.trim() || defaultDescription;
  const visibleHeading = heading?.trim() || "Full-stack.";
  const visibleHeadingAccent =
    headingAccent?.trim() || "Backend-minded.";

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
        className="relative z-10 flex flex-grow items-end overflow-visible px-4 pt-10"
        style={{
          transform: `translateY(${scrollY * 0.375}px)`,
        }}
      >
        <div className="flex max-w-3xl flex-col">
          <h1 className="pb-5 text-[10.5dvw] leading-[0.96] sm:text-6xl md:text-7xl lg:text-8xl">
            {visibleHeading}
            <br />
            <span className="text-secondary">{visibleHeadingAccent}</span>
          </h1>
          <div className="flex max-w-2xl flex-col gap-5">
            <p className="max-w-xl text-base leading-7 text-primary/75 md:text-lg md:leading-8">
              {visibleDescription}
            </p>
            <div className="flex flex-row flex-wrap items-center gap-2 sm:gap-4">
              <Button route={contactHref}>Contact me</Button>
              <IconButton route="linkedin" />
              <IconButton route="github" />
            </div>
            <a
              className="mt-1 w-fit text-xs uppercase tracking-[0.2em] text-primary/65 underline decoration-transparent underline-offset-8 transition hover:text-primary hover:decoration-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
              href="#experience"
            >
              Experience ↓
            </a>
          </div>
        </div>
      </section>
      <VectorTransition />
    </header>
  );
};
