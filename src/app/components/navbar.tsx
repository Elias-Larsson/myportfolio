import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="pt-4">
      <ul
        className="bg-neutral-300/30 bg-blur text-white p-2 flex rounded-4xl gap-2 backdrop-blur-[4px] shadow-lg
        "
      >
        <li className="bg-neutral-300/40 navbarList">
          <Link href="/">Home</Link>
        </li>
        <li className="navbarList">
          <Link href="/about">About</Link>
        </li>
        <li className="navbarList">
          <Link href="/projects">Projects</Link>
        </li>
        <li className="navbarList">
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};
