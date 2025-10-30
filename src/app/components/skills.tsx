"use client";
import { Icon } from "./techstackIcon";

export const Skills = ({
  skills,
}: {
  skills: { label: string; url: string; color: string; icon: string }[];
}) => {
  return (
    <section className="flex-main items-center">
      <div className="flex flex-col items-start gap-4 max-w-128">
        <h1 className="text-3xl">Skills</h1>
        <p className="text-neutral-400">
          Some knowledge I have picked up along the way to becoming an awesome
          developer.
        </p>
        <div className="flex justify-center flex-wrap gap-6">
          {skills?.map((skill) => (
            <a
              href={skill.url}
              key={skill.label}
              className="flex gap-1 transition hover:text-red-400"
            >
              <Icon name={skill.icon} />
              {skill.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
