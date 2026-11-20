import Image from "next/image";
import Link from "next/link";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { projectsQuery } from "@/sanity/lib/queries";
import {
  DEFAULT_CASE_STUDY_SLUGS,
  LEGACY_PROJECT_ORDER,
  PROJECT_CASE_STUDY_FALLBACKS,
  type Projects,
} from "@/sanity/types/project";

import { Button } from "../button";
import { Icon } from "../techstackIcon";
import {
  formatTechnologyLabel,
  getProjectArchiveSummary,
} from "./format-project-content";

const revalidate = 3600;

const caseStudySlugs = new Set<string>(DEFAULT_CASE_STUDY_SLUGS);

const projectSlug = (project: Projects) => project.slug.current;

const fallbackYear = (project: Projects) =>
  PROJECT_CASE_STUDY_FALLBACKS[projectSlug(project)]?.year ?? 0;

const fallbackOrder = (project: Projects) =>
  LEGACY_PROJECT_ORDER[projectSlug(project)] ?? 1000;

const sortProjects = (projects: Projects[]) =>
  [...projects].sort((a, b) => {
    const orderA = a.displayOrder ?? fallbackOrder(a);
    const orderB = b.displayOrder ?? fallbackOrder(b);

    if (orderA !== orderB) return orderA - orderB;

    const yearA = a.year ?? fallbackYear(a);
    const yearB = b.year ?? fallbackYear(b);

    if (yearA !== yearB) return yearB - yearA;
    if (a._createdAt !== b._createdAt) {
      return b._createdAt.localeCompare(a._createdAt);
    }

    return a.title.localeCompare(b.title);
  });

const isCaseStudy = (project: Projects) => {
  if (project.projectCategory) {
    return project.projectCategory === "caseStudy";
  }

  return caseStudySlugs.has(projectSlug(project));
};

const cardDescription = (project: Projects) =>
  project.outcomeSummary ??
  PROJECT_CASE_STUDY_FALLBACKS[projectSlug(project)]?.outcomeSummary ??
  project.description ??
  project.definition;

type ProjectMetaProps = {
  project: Projects;
  category: string;
  className: string;
};

const ProjectMeta = ({
  project,
  category,
  className,
}: ProjectMetaProps) => {
  const fallback = PROJECT_CASE_STUDY_FALLBACKS[projectSlug(project)];
  const year = project.year ?? fallback?.year;
  const skills = project.skills?.slice(0, 3).filter((skill) => skill.label);
  const context = [year?.toString(), category].filter(Boolean).join(" / ");

  return (
    <div className={className}>
      <span>{context}</span>
      {skills && skills.length > 0 && (
        <>
          <span aria-hidden="true">/</span>
          <ul
            aria-label="Technologies used"
            className="flex flex-wrap items-center gap-x-2 gap-y-1"
          >
            {skills.map((skill) => (
              <li
                className="inline-flex items-center gap-1 [&_svg]:size-3 [&_svg]:shrink-0"
                key={skill.label}
              >
                <Icon name={skill.icon ?? skill.label} />
                <span>{formatTechnologyLabel(skill.label)}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

type SelectedProjectCardProps = {
  project: Projects;
  index: number;
  isLead: boolean;
};

const SelectedProjectCard = ({
  project,
  index,
  isLead,
}: SelectedProjectCardProps) => {
  const slug = projectSlug(project);
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
        href={`/projects/${slug}`}
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
              alt={
                project.projectImageAlt ||
                `${project.title} project overview`
              }
              fill
              priority={isLead}
              placeholder={project.projectImageLqip ? "blur" : "empty"}
              blurDataURL={project.projectImageLqip}
              sizes={
                isLead
                  ? "(min-width: 1280px) 1152px, (min-width: 768px) calc(100vw - 96px), calc(100vw - 32px)"
                  : "(min-width: 1024px) 560px, (min-width: 768px) calc(50vw - 64px), calc(100vw - 32px)"
              }
              className="object-cover transition duration-500 ease-out group-hover:scale-[1.025] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
            <span className="absolute bottom-4 right-4 translate-y-2 rounded-sm bg-midnight/90 px-4 py-2 font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.16em] opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:transition-none">
              View case study ↗
            </span>
          </div>
        )}

        <div className="mt-5 border-t border-primary/25 pt-4">
          <div className="flex items-start justify-between gap-6">
            <h3
              className={
                isLead
                  ? "text-3xl sm:text-4xl md:text-5xl"
                  : "text-2xl sm:text-3xl"
              }
            >
              {project.title}
            </h3>
            <span className="shrink-0 font-[family-name:var(--font-body)] text-xs text-primary/65">
              [{String(index + 1).padStart(2, "0")}]
            </span>
          </div>
          <ProjectMeta
            category="Case study"
            className="mt-3 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs uppercase tracking-[0.12em] text-secondary-readable"
            project={project}
          />
          <p className="mt-4 max-w-3xl text-sm leading-6 text-primary/75 sm:text-base sm:leading-7">
            {cardDescription(project)}
          </p>
        </div>
      </Link>
    </li>
  );
};

type ExperimentRowProps = {
  project: Projects;
  index: number;
};

const ExperimentRow = ({ project, index }: ExperimentRowProps) => (
  <li className="border-b border-primary/20">
    <Link
      href={`/projects/${projectSlug(project)}`}
      className="group grid gap-4 py-7 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:items-center sm:gap-6"
    >
      <span className="font-[family-name:var(--font-body)] text-xs text-primary/65">
        [{String(index + 1).padStart(2, "0")}]
      </span>
      <div>
        <h3 className="text-xl transition-colors group-hover:text-secondary sm:text-2xl">
          {project.title}
        </h3>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-primary/65">
          {getProjectArchiveSummary(
            projectSlug(project),
            project.description,
            project.definition,
          )}
        </p>
      </div>
      <div className="flex items-center justify-between gap-6 sm:justify-end">
        <ProjectMeta
          category="Experiment"
          className="flex flex-wrap items-center gap-x-1.5 gap-y-1 font-[family-name:var(--font-body)] text-[0.6875rem] uppercase tracking-[0.12em] text-primary/65 sm:max-w-56 sm:justify-end sm:text-right"
          project={project}
        />
        <span
          aria-hidden="true"
          className="text-xl transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
        >
          →
        </span>
      </div>
    </Link>
  </li>
);

export const ProjectsPage = async () => {
  const projectDocuments = await client.fetch<Projects[]>(
    projectsQuery,
    {},
    { next: { revalidate } },
  );
  const projects = sortProjects(projectDocuments);
  const caseStudies = projects.filter(isCaseStudy);
  const experiments = projects.filter((project) => !isCaseStudy(project));

  return (
    <section className="relative z-10 w-full bg-tertiary px-4 py-32 sm:px-8 sm:py-40 lg:px-12 lg:py-48">
      <div className="mx-auto w-full max-w-6xl">
        <header className="max-w-4xl">
          <p className="mb-4 text-xs uppercase tracking-[0.18em] text-primary/70">
            [ Selected work and experiments ]
          </p>
          <h1 className="text-[13vw] leading-[0.9] sm:text-7xl md:text-8xl lg:text-9xl">
            Project <span className="text-secondary">archive.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-primary/75 sm:text-lg sm:leading-8">
            Product work, backend systems, and smaller experiments that show
            how I learn by building.
          </p>
        </header>

        {caseStudies.length > 0 && (
          <section aria-labelledby="selected-projects" className="mt-28">
            <div className="mb-10 flex items-end justify-between gap-6 border-b border-primary/25 pb-4">
              <h2 id="selected-projects" className="text-2xl sm:text-3xl">
                Selected case studies
              </h2>
              <span className="font-[family-name:var(--font-body)] text-xs text-primary/65">
                [{String(caseStudies.length).padStart(2, "0")}]
              </span>
            </div>
            <ol className="grid grid-cols-1 gap-x-8 gap-y-20 lg:grid-cols-2">
              {caseStudies.map((project, index) => (
                <SelectedProjectCard
                  key={project._id}
                  project={project}
                  index={index}
                  isLead={index === 0}
                />
              ))}
            </ol>
          </section>
        )}

        {experiments.length > 0 && (
          <section aria-labelledby="project-experiments" className="mt-32">
            <div className="flex items-end justify-between gap-6 border-b border-primary/25 pb-4">
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.16em] text-secondary-readable">
                  Smaller builds
                </p>
                <h2 id="project-experiments" className="text-2xl sm:text-3xl">
                  Experiments and learning
                </h2>
              </div>
              <span className="font-[family-name:var(--font-body)] text-xs text-primary/65">
                [{String(experiments.length).padStart(2, "0")}]
              </span>
            </div>
            <ol>
              {experiments.map((project, index) => (
                <ExperimentRow
                  key={project._id}
                  project={project}
                  index={index}
                />
              ))}
            </ol>
          </section>
        )}

        {projects.length === 0 && (
          <p className="mt-20 border-y border-primary/20 py-12 text-primary/70">
            Project stories are being prepared. Please check back soon.
          </p>
        )}

        <nav aria-label="Return home" className="mt-24 flex justify-center">
          <Button route="/">Home</Button>
        </nav>
      </div>
    </section>
  );
};
