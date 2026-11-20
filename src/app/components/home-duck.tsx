import Image from "next/image";
import Link from "next/link";

export const HomeDuck = () => (
  <Link
    aria-label="Go back home"
    className="group absolute right-4 top-4 z-40 flex min-h-12 items-center gap-2.5 rounded-sm px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-4 focus-visible:ring-offset-tertiary sm:right-6 sm:top-6"
    href="/"
  >
    <span className="font-[family-name:var(--font-heading)] text-sm uppercase tracking-[0.12em] text-primary underline decoration-secondary/70 underline-offset-4 transition-colors group-hover:text-secondary motion-reduce:transition-none">
      ← Home
    </span>
    <Image
      alt=""
      aria-hidden="true"
      className="h-auto w-8 -rotate-6 transition-transform duration-300 ease-out group-hover:-rotate-12 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100 sm:w-9"
      height={43}
      src="/awesomeduck.svg"
      width={36}
    />
  </Link>
);
