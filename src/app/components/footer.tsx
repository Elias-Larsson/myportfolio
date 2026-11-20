import { contactHref } from "@/app/site";
import { getHomepage } from "@/sanity/lib/homepage";
import { ReverseVectorTransition } from "./background/reversedepthbg";
import { Button } from "./button";
import { IconButton } from "./iconbutton";

export const Footer = async () => {
  const homepage = await getHomepage();
  const heading = homepage?.footerHeading;
  const headingAccent = homepage?.footerHeadingAccent;
  return (
    <div className="w-full bg-midnight">
      <ReverseVectorTransition />
      <footer
        className="relative z-10 bg-midnight px-4 py-14 wrap-anywhere md:py-20"
        id="footer"
      >
        <div
          className={`mx-auto grid w-full max-w-6xl gap-10 lg:items-end lg:gap-16 ${
            heading || headingAccent
              ? "lg:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.65fr)]"
              : ""
          }`}
        >
          {(heading || headingAccent) && (
            <h2 className="text-[9.5dvw] leading-[0.98] sm:text-5xl md:text-6xl xl:text-7xl">
              {heading}
              {headingAccent && (
                <span className="block text-secondary">{headingAccent}</span>
              )}
            </h2>
          )}

          <div className="lg:pb-1">
            <p className="text-xs uppercase tracking-[0.2em] text-primary/50">
              Stockholm, Sweden
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <Button route={contactHref}>Email me</Button>
              <IconButton route="linkedin" />
              <IconButton route="github" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
