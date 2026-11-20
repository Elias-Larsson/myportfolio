"use client";

import { useScrollY } from "@/app/hooks/scrollY";
import { Button } from "./button";
import { VectorTransition } from "./background/depthbg";
import { IconButton } from "./iconbutton";

type Props = {
  credibilityItems?: string[] | null;
  description?: string | null;
  eyebrow?: string | null;
  heading?: string | null;
  headingAccent?: string | null;
};

const defaultCredibilityItems = [
  "App Developer at Samples",
  "Computer Engineering at KTH",
  "Stockholm",
];

const defaultDescription =
  "I build web, mobile, and backend products—from interface to infrastructure. Currently building at Samples and studying computer engineering at KTH.";

export const Hero = ({
  credibilityItems = defaultCredibilityItems,
  description = defaultDescription,
  eyebrow = "Elias Larsson · Stockholm",
  heading = "Full-stack.",
  headingAccent = "Backend-minded.",
}: Props) => {
  const scrollY = useScrollY({ disabledOnMobile: true });
  const visibleCredibilityItems = credibilityItems?.length
    ? credibilityItems
    : defaultCredibilityItems;
  const visibleDescription = description?.trim() || defaultDescription;
  const visibleEyebrow = eyebrow?.trim() || "Elias Larsson · Stockholm";
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
          <p className="mb-5 text-xs uppercase tracking-[0.2em] text-primary/70">
            [ {visibleEyebrow} ]
          </p>
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
              <Button route="mailto:aroezi05@gmail.com">
                Contact me
              </Button>
              <IconButton route="linkedin" />
              <IconButton route="github" />
            </div>
            <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/10 pt-4 text-[0.68rem] uppercase tracking-[0.16em] text-primary/65">
              {visibleCredibilityItems.map((item, index) => (
                <li className="flex items-center gap-5" key={item}>
                  {index > 0 && (
                    <span aria-hidden="true" className="text-secondary">
                      /
                    </span>
                  )}
                  {item}
                </li>
              ))}
            </ul>
            <a
              className="mt-1 w-fit text-xs uppercase tracking-[0.2em] text-primary/65 underline decoration-transparent underline-offset-8 transition hover:text-primary hover:decoration-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
              href="#selected-work"
            >
              Selected work ↓
            </a>
          </div>
        </div>
      </section>
      <VectorTransition />
    </header>
  );
};
