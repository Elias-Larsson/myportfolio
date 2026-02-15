import { Button } from "./button";

export const Navbar = () => {
 

  return (
    <nav className="flex flex-col sm:flex-row gap-4 items-center justify-center">
      <Button route="/about">about me</Button>
      <Button route="/">home</Button>
      <Button route="/projects">projects</Button>
    </nav>
  );
};
