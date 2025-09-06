"use client";

import { Techstacks } from "./techstacks";

export const Skills = ({ skills }: { skills: string[] }) => {
  return (
    <section className="flex-main items-center">
      <div className="flex flex-col items-start gap-4 max-w-128">
        <h1 className="text-3xl">Skills</h1>
        <p className="text-neutral-400">
          Some knowledge I have picked up along the way to becoming an awesome
          developer.
        </p>
        <Techstacks techstacks={skills} />
      </div>
    </section>
  );
};