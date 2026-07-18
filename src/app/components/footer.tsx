import { ReverseVectorTransition } from "./background/reversedepthbg";
import { Button } from "./button";
import { IconButton } from "./iconbutton";

type FooterProps = {
  heading?: string;
  headingAccent?: string;
};

export const Footer = ({
  heading = "HEAR MORE",
  headingAccent = "ABOUT ME",
}: FooterProps) => {
  return (
    <div className="grid min-h-svh w-full grid-rows-[auto_1fr] bg-midnight">
      <ReverseVectorTransition />
      <footer
        className="flex-main relative z-10 items-center gap-4 bg-midnight px-4 py-16 md:py-20"
        id="footer"
      >
        <h1 className="text-[10.5dvw] sm:text-6xl md:text-7xl text-center">
          {heading} <br />
          <span className="text-secondary">{headingAccent}</span>
        </h1>
        <div className="flex flex-row gap-2 items-center">
          <Button route="https://mail.google.com/mail/?view=cm&fs=1&to=aroezi05@gmail.com">
            Contact me
          </Button>
          <IconButton route="linkedin" />
          <IconButton route="github" />
        </div>
      </footer>
    </div>
  );
};
