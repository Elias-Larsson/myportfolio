import Link from "next/link";
import { ReverseVectorTransition } from "./background/reversedepthbg";
import { Button } from "./button";
import { IconButton } from "./iconbutton";

type FooterProps = {
  heading?: string;
  headingAccent?: string;
};

export const Footer = ({
  heading = "LET’S BUILD",
  headingAccent = "SOMETHING USEFUL.",
}: FooterProps) => {
  return (
    <div className="w-full bg-midnight">
      <ReverseVectorTransition />
      <footer
        className="relative z-10 bg-midnight px-4 py-14 md:py-20"
        id="footer"
      >
        <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.65fr)] lg:items-end lg:gap-16">
          <div>
            <h2 className="text-[9.5dvw] leading-[0.98] sm:text-5xl md:text-6xl xl:text-7xl">
              {heading} <br />
              <span className="text-secondary">{headingAccent}</span>
            </h2>
          </div>

          <div className="lg:pb-1">
            <p className="text-xs uppercase tracking-[0.2em] text-primary/50">
              Stockholm, Sweden
            </p>
            <Link
              className="mt-3 inline-block break-all font-[family-name:var(--font-body)] text-lg underline decoration-secondary/60 underline-offset-4 transition-colors hover:text-secondary sm:text-xl"
              href="mailto:aroezi05@gmail.com"
            >
              aroezi05@gmail.com
            </Link>

            <div className="mt-6 flex flex-row flex-wrap items-center gap-2">
              <Button route="mailto:aroezi05@gmail.com">Email me</Button>
              <IconButton route="linkedin" />
              <IconButton route="github" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
