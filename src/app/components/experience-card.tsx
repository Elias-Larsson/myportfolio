import Link from "next/link";
import type { ReactNode } from "react";

type ExperienceCardProps = {
  company: string;
  href: string;
  children?: ReactNode;
};

export const ExperienceCard = ({
  company,
  href,
  children,
}: ExperienceCardProps) => (
  <li>
    <Link
      aria-label={company}
      className="relative isolate grid h-24 place-items-center border-b border-r border-white/10 bg-midnight text-primary transition-colors hover:z-10 hover:bg-tertiary hover:ring-1 hover:ring-secondary/60 hover:ring-inset focus-visible:z-10 focus-visible:bg-tertiary focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-secondary motion-reduce:transition-none md:h-32"
      href={href}
    >
      {children ? (
        <span className="relative block h-11 w-2/3 max-w-36 md:h-14">
          {children}
        </span>
      ) : (
        <span className="wrap-anywhere px-3 text-center font-[family-name:var(--font-heading)] text-sm leading-tight sm:text-base">
          {company}
        </span>
      )}
    </Link>
  </li>
);
