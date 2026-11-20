import Image from "next/image";
import Link from "next/link";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { projectsQuery } from "@/sanity/lib/queries";
import type { Projects } from "@/sanity/types/project";

import { Button } from "../button";
import { ProjectTechStack } from "./project-tech-stack";

const revalidate = 3600;

const SelectedProjectCard = ({ project }: { project: Projects }) => {
  const isLead = project.flagship === true;
  const imageUrl = project.projectImage
    ? urlFor(project.projectImage)
        .width(isLead ? 1800 : 1000)
        .height(isLead ? 900 : 760)
        .fit("crop")
        .auto("format")
        .quality(85)
        .url()
    : undefined;

  return (
    <li className={isLead ? "lg:col-span-2" : undefined}>
      <Link
        href={`/projects/${project.slug.current}`}
        className="group block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-secondary"
      >
        {imageUrl && (
          <div
            className={`relative overflow-hidden rounded-sm bg-midnight/20 ${
              isLead ? "aspect-[16/9] max-h-[42rem]" : "aspect-[4/3]"
            }`}
          >
            <Image
              src={imageUrl}
              alt={project.projectImageAlt || ""}
              fill
              priority={isLead}
              placeholder={project.projectImageLqip ? "blur" : "empty"}
              blurDataURL={project.projectImageLqip ?? undefined}
              sizes={
                isLead
                  ? "(min-width: 1280px) 1152px, (min-width: 768px) calc(100vw - 96px), calc(100vw - 32px)"
                  : "(min-width: 1024px) 560px, (min-width: 768px) calc(50vw - 64px), calc(100vw - 32px)"
              }
              className="object-cover transition duration-500 ease-out group-hover:scale-[1.025] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          </div>
        )}

        <div className="mt-5 border-t border-primary/25 pt-4">
          <h3
            className={
              isLead
                ? "text-3xl sm:text-4xl md:text-5xl"
                : "text-2xl sm:text-3xl"
            }
          >
            {project.title}
          </h3>
          <ProjectTechStack
            className="mt-3"
            compact
            limit={3}
            skills={project.skills}
          />
          {project.description && (
            <p className="mt-4 max-w-3xl text-sm leading-6 text-primary/75 sm:text-base sm:leading-7">
              {project.description}
            </p>
          )}
        </div>
      </Link>
    </li>
  );
};

const ProjectRow = ({ project }: { project: Projects }) => (
  <li className="border-b border-primary/20">
    <Link
      href={`/projects/${project.slug.current}`}
      className="group grid gap-4 py-7 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-6"
    >
      <div>
        <h3 className="text-xl transition-colors group-hover:text-secondary sm:text-2xl">
          {project.title}
        </h3>
        {project.description && (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-primary/65">
            {project.description}
          </p>
        )}
      </div>
      <ProjectTechStack
        className="sm:max-w-56 sm:justify-end"
        compact
        limit={3}
        skills={project.skills}
      />
    </Link>
  </li>
);

export const ProjectsPage = async () => {
  const projects = await client.fetch<Projects[]>(
    projectsQuery,
    {},
    { next: { revalidate } },
  );
  const sections = [
    {
      id: "selected-projects",
      title: "Selected case studies",
      category: "caseStudy",
      ProjectItem: SelectedProjectCard,
      listClassName: "mt-10 grid grid-cols-1 gap-x-8 gap-y-20 lg:grid-cols-2",
    },
    {
      id: "project-experiments",
      title: "Experiments and learning",
      category: "experiment",
      ProjectItem: ProjectRow,
    },
    {
      id: "other-projects",
      title: "Other projects",
      category: null,
      ProjectItem: ProjectRow,
    },
  ];

  return (
    <section className="relative z-10 w-full bg-tertiary px-4 py-32 sm:px-8 sm:py-40 lg:px-12 lg:py-48">
      <div className="mx-auto w-full max-w-6xl">
        <header className="max-w-4xl">
          <h1 className="text-[13vw] leading-[0.9] sm:text-7xl md:text-8xl lg:text-9xl">
            Project <span className="text-secondary">archive.</span>
          </h1>
        </header>

        {sections.map(({ id, title, category, ProjectItem, listClassName }) => {
          const entries = projects.filter(
            (project) => (project.projectCategory ?? null) === category,
          );
          if (!entries.length) return null;

          return (
            <section aria-labelledby={id} className="mt-28" key={id}>
              <h2
                id={id}
                className="border-b border-primary/25 pb-4 text-2xl sm:text-3xl"
              >
                {title}
              </h2>
              <ul className={listClassName}>
                {entries.map((project) => (
                  <ProjectItem key={project._id} project={project} />
                ))}
              </ul>
            </section>
          );
        })}

        {projects.length === 0 && (
          <p className="mt-20 border-y border-primary/20 py-12 text-primary/70">
            No projects yet.
          </p>
        )}

        <nav aria-label="Return home" className="mt-24 flex justify-center">
          <Button route="/">Home</Button>
        </nav>
      </div>
    </section>
  );
};
