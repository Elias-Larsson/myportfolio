"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

export const Navbar = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  const menuitems = ["Home", "About", "Projects", "Contact"];
  return (
    <nav onMouseLeave={() => setHovered(null)} className="pt-4 sticky top-0 z-50">
      <ul className="bg-neutral-300/30 bg-blur p-2 flex rounded-4xl gap-2 backdrop-blur-[4px] shadow-lg">
        {menuitems.map((item) => (
          <li 
            onMouseEnter={() => setHovered(item)} 
            key={item} 
            className="navbarList relative">
            <Link href="/">{item}</Link>
            {hovered === item && (
              <motion.div className="bg-neutral-200/30 absolute inset-0 rounded-4xl" layoutId="hover"></motion.div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
