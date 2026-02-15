"use client";
import { ReverseVectorTransition } from "./background/reversedepthbg";
import { Button } from "./button";
import { IconButton } from "./iconbutton";

export const Footer = () => {
  return (
    <>
      <ReverseVectorTransition />
      <footer className="flex-main items-center gap-4 px-4 py-32 md:py-56">
        <h1 className="text-[10.5dvw] sm:text-6xl md:text-7xl text-center">
          HEAR MORE <br />
          <span className="text-secondary">ABOUT ME</span>
        </h1>
        <div className="flex flex-row gap-2 items-center">
          <Button route="https://mail.google.com/mail/?view=cm&fs=1&to=aroezi05@gmail.com">
            Contact me
          </Button>
          <IconButton route="linkedin" />
          <IconButton route="github" />
        </div>
      </footer>
    </>
  );
};
