"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();
  const menuitems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
  ];
  const current =
    menuitems.find((item) => item.href === pathname)?.name || null;
  const [hovered, setHovered] = useState<string | null>(current);

  return (
    <nav
      onMouseLeave={() => setHovered(current)}
      className="pt-4 fixed top-0 z-50 w-full flex justify-center"
    >
      <ul className="bg-neutral-300/30 bg-blur p-2 flex rounded-4xl gap-2 backdrop-blur-[4px] shadow-lg">
        {menuitems.map((item) => (
          <Link key={item.name} href={item.href}>
            <li
              onMouseEnter={() => setHovered(item.name)}
              className="navbarList relative cursor-pointer"
            >
              {item.name}
              {hovered === item.name && (
                <motion.div
                  className="bg-neutral-300/30 absolute inset-0 rounded-4xl"
                  layoutId="hover"
                ></motion.div>
              )}
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};
