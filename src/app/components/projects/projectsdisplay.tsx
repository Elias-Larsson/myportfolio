import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import {
  DEFAULT_CASE_STUDY_SLUGS,
  PROJECT_CASE_STUDY_FALLBACKS,
  type Projects,
} from "@/sanity/types/project";
import { projectsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { Button } from "../button";
import { Icon } from "../techstackIcon";
import { formatTechnologyLabel } from "./format-project-content";

const revalidate = 60;

const getSelectedProjects = (projects: Projects[]) => {
  const selected = DEFAULT_CASE_STUDY_SLUGS.map((slug) =>
    projects.find((project) => project.slug?.current === slug),
  ).filter((project): project is Projects => Boolean(project));
  const selectedIds = new Set(selected.map((project) => project._id));

  if (selected.length < 3) {
    selected.push(
      ...projects
        .filter(
          (project) => project.featured && !selectedIds.has(project._id),
        )
        .slice(0, 3 - selected.length),
    );
  }

  return selected.slice(0, 3);
};

export const ProjectsDisplay = async () => {
  const projects = await client.fetch<Projects[]>(projectsQuery, {}, {
    next: { revalidate },
  });
  const selectedProjects = getSelectedProjects(projects ?? []);

  if (!selectedProjects.length) return null;

  return (
    <section
      aria-labelledby="selected-work-heading"
      className="relative z-10 scroll-mt-8 bg-tertiary px-4 pb-20 pt-24 md:pb-24 md:pt-32"
      id="selected-work"
    >
      <header className="mx-auto grid w-full max-w-6xl gap-8 border-t border-white/10 pt-8 md:grid-cols-[minmax(0,1fr)_minmax(18rem,0.65fr)] md:items-end">
        <h2
          className="text-[10.5dvw] leading-[0.94] sm:text-6xl md:text-7xl"
          id="selected-work-heading"
        >
          Built to <span className="text-secondary">work.</span>
        </h2>
        <p className="max-w-xl text-base leading-7 text-primary/72 md:pb-1 md:text-lg md:leading-8">
          Three projects across distributed systems, developer tooling, and
          public-facing product work—selected for the problems behind them, not
          just the finished screens.
        </p>
      </header>

      <ol className="mx-auto mt-14 grid w-full max-w-6xl gap-6 lg:grid-cols-2 md:mt-20">
        {selectedProjects.map((project, index) => {
          const slug = project.slug.current;
          const fallback = PROJECT_CASE_STUDY_FALLBACKS[slug];
          const summary =
            project.outcomeSummary ||
            fallback?.outcomeSummary ||
            project.description ||
            project.definition;
          const context = project.context || fallback?.context;
          const skills = project.skills?.filter((skill) => skill.label).slice(0, 4);
          const isFlagship = index === 0;

          return (
            <li
              className={isFlagship ? "lg:col-span-2" : undefined}
              key={project._id}
            >
              <Link
                className={`group grid h-full overflow-hidden rounded-sm border border-white/10 bg-midnight transition duration-300 hover:border-secondary/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-4 focus-visible:ring-offset-tertiary motion-reduce:transition-none ${
                  isFlagship
                    ? "lg:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.65fr)]"
                    : "grid-rows-[auto_1fr]"
                }`}
                href={`/projects/${slug}`}
              >
                <figure
                  className={`relative overflow-hidden bg-tertiary ${
                    isFlagship
                      ? "aspect-[16/10] lg:aspect-auto lg:min-h-[34rem]"
                      : "aspect-[16/10]"
                  }`}
                >
                  {project.projectImage ? (
                  <Image
                      alt={project.projectImageAlt || `${project.title} preview`}
                      className="object-cover transition duration-500 ease-out group-hover:scale-[1.025] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                      fill
                      sizes={
                        isFlagship
                          ? "(min-width: 1024px) 60vw, 100vw"
                          : "(min-width: 1024px) 45vw, 100vw"
                      }
                    src={urlFor(project.projectImage)
                        .width(isFlagship ? 1500 : 1000)
                        .height(isFlagship ? 940 : 625)
                      .fit("crop")
                      .url()}
                      {...(project.projectImageLqip
                        ? {
                            blurDataURL: project.projectImageLqip,
                            placeholder: "blur" as const,
                          }
                        : {})}
                  />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center px-8 text-center">
                      <span className="text-4xl text-primary/25 md:text-5xl">
                        {project.title}
                      </span>
                    </div>
                  )}
                </figure>

                <article className="flex flex-col p-6 sm:p-8 lg:p-10">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      {context && (
                        <p className="text-xs uppercase tracking-[0.18em] text-secondary">
                          {context}
                        </p>
                      )}
                      <h3 className="mt-3 text-3xl leading-none sm:text-4xl">
                        {project.title}
                      </h3>
                    </div>
                    <span className="shrink-0 text-xs tracking-[0.18em] text-primary/65">
                      [{String(index + 1).padStart(2, "0")}]
                    </span>
                  </div>

                  {summary && (
                    <p className="mt-6 text-sm leading-7 text-primary/72 sm:text-base">
                      {summary}
                    </p>
                  )}

                  {skills && skills.length > 0 && (
                    <ul className="mb-6 mt-7 flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <li
                          className="flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.14em] text-primary/65 [&_svg]:size-3.5 [&_svg]:shrink-0"
                          key={skill.label}
                        >
                          <Icon name={skill.icon ?? skill.label} />
                          <span>{formatTechnologyLabel(skill.label)}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              </Link>
            </li>
          );
        })}
      </ol>

      <div className="mx-auto mt-12 flex w-full max-w-6xl justify-center md:mt-16">
        <Button route="/projects">More projects →</Button>
      </div>
    </section>
  );
};
