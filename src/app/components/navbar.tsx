import { Button } from "./button";

export const Navbar = () => {
  return (
    <nav
      aria-label="About page navigation"
      className="flex items-center justify-center"
    >
      <Button route="/">home</Button>
    </nav>
  );
};
