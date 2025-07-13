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
    { name: "Contact", href: "/contact" },
  ];
  const current = menuitems.find((item) => item.href === pathname)?.name || null;
  const [hovered, setHovered] = useState<string | null>(current);

  return (
    <nav onMouseLeave={() => setHovered(current)} className="pt-4 sticky top-0 z-50">
      <ul className="bg-neutral-300/30 bg-blur p-2 flex rounded-4xl gap-2 backdrop-blur-[4px] shadow-lg">
        {menuitems.map((item) => (
          <li
            onMouseEnter={() => setHovered(item.name)}
            key={item.name}
            className="navbarList relative cursor-pointer"
          >
            <Link href={item.href}>{item.name}</Link>
            {hovered === item.name && (
              <motion.div className="bg-neutral-300/30 absolute inset-0 rounded-4xl" layoutId="hover"></motion.div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
