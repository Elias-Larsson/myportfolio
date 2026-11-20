"use client";

import Link from "next/link";
import { HomeDuck } from "../components/home-duck";

type ProjectsErrorProps = {
  reset: () => void;
};

export default function ProjectsError({ reset }: ProjectsErrorProps) {
  return (
    <main className="relative flex min-h-svh items-center bg-tertiary px-4 py-24 sm:px-8">
      <HomeDuck />
      <div className="mx-auto w-full max-w-3xl border-y border-primary/20 py-16">
        <p className="text-xs uppercase tracking-[0.18em] text-secondary-readable">
          [ Projects unavailable ]
        </p>
        <h1 className="mt-5 text-4xl sm:text-6xl">Something went wrong.</h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-primary/70">
          The project stories could not be loaded just now. You can try again
          or return home.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-sm border border-primary/20 px-4 py-2 font-[family-name:var(--font-body)] text-sm uppercase transition hover:bg-primary hover:text-tertiary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-sm border border-primary/20 px-4 py-2 font-[family-name:var(--font-body)] text-sm uppercase transition hover:bg-primary hover:text-tertiary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
          >
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
