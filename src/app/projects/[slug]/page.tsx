import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";

import { Button } from "@/app/components/button";
import { Footer } from "@/app/components/footer";
import { HomeDuck } from "@/app/components/home-duck";
import { formatTechnologyLabel } from "@/app/components/projects/format-project-content";
import { Icon } from "@/app/components/techstackIcon";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { projectQuery, projectSlugsQuery } from "@/sanity/lib/queries";
import {
  DEFAULT_CASE_STUDY_SLUGS,
  PROJECT_CASE_STUDY_FALLBACKS,
  type Project,
} from "@/sanity/types/project";

export const revalidate = 3600;

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

type ProjectSlug = { slug: string };

type ResolvedCaseStudy = {
  label: string;
  outcomeSummary: string;
  team?: string;
  timeline?: string;
  context: string;
  sections: Array<{
    number: string;
    title: string;
    body: string;
  }>;
};

const selectedProjectSlugs = new Set<string>(DEFAULT_CASE_STUDY_SLUGS);

const getProject = cache((slug: string) =>
  client.fetch<Project | null>(
    projectQuery,
    { slug },
    { next: { revalidate } },
  ),
);

const cleanText = (value?: string) =>
  value
    ?.replace(/\r\n/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

const cleanInlineText = (value?: string) =>
  cleanText(value)?.replace(/\s+/g, " ");

const firstValue = (...values: Array<string | undefined>) =>
  values.map(cleanText).find(Boolean) ?? "";

const extractLearning = (description?: string) => {
  const text = cleanText(description);
  if (!text) return undefined;

  const match = text.match(/\bI learned\b[\s\S]*/i);
  return cleanText(match?.[0]);
};

const genericTechnicalDecision = (project: Project) => {
  const tools = project.skills
    ?.map((skill) => formatTechnologyLabel(skill.label))
    .filter(Boolean);

  if (tools?.length) {
    return `The implementation uses ${tools.join(", ")} to support the project's core workflow and keep its main responsibilities clear.`;
  }

  return "The implementation stays focused on the project's core workflow, keeping the interface and supporting application logic easy to follow and iterate on.";
};

const resolveCaseStudy = (project: Project): ResolvedCaseStudy => {
  const slug = project.slug.current;
  const fallback = PROJECT_CASE_STUDY_FALLBACKS[slug];
  const timeline = firstValue(project.timeline, fallback?.timeline);
  const extractedLearning = extractLearning(project.longDescription);
  const projectType =
    project.projectCategory === "caseStudy" ||
    (!project.projectCategory && selectedProjectSlugs.has(slug))
      ? "Case study"
      : "Experiment";

  const challenge = firstValue(
    project.challenge,
    fallback?.challenge,
    project.longDescription,
    project.description,
    project.definition,
  );
  const contribution = firstValue(
    project.contribution,
    fallback?.contribution,
    `I developed ${project.title} from its central idea into a working project, connecting the user-facing flow with the application logic behind it.`,
  );
  const technicalDecision = firstValue(
    project.technicalDecision,
    fallback?.technicalDecision,
    genericTechnicalDecision(project),
  );
  const outcome = firstValue(
    project.outcome,
    fallback?.outcome,
    project.description,
    project.definition,
  );
  const learning = firstValue(
    project.learning,
    fallback?.learning,
    extractedLearning,
    `Building ${project.title} provided a practical setting for refining the implementation, testing assumptions, and identifying what I would simplify in another iteration.`,
  );

  return {
    label: projectType === "Case study" ? "Project case study" : "Experiment",
    outcomeSummary: firstValue(
      project.outcomeSummary,
      fallback?.outcomeSummary,
      project.description,
      project.definition,
    ),
    team: firstValue(project.team, fallback?.team) || undefined,
    timeline: timeline && !/^\d{4}$/.test(timeline) ? timeline : undefined,
    context: firstValue(project.context, fallback?.context, projectType),
    sections: [
      { number: "01", title: "The challenge", body: challenge },
      { number: "02", title: "My contribution", body: contribution },
      {
        number: "03",
        title: "Technical decision",
        body: technicalDecision,
      },
      { number: "04", title: "Outcome", body: outcome },
      { number: "05", title: "What I learned", body: learning },
    ],
  };
};

const validLink = (value?: string) => Boolean(value && value !== "#");

export async function generateStaticParams() {
  const projects = await client.fetch<ProjectSlug[]>(
    projectSlugsQuery,
    {},
    { next: { revalidate } },
  );

  return projects;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return {
      title: "Project not found",
      robots: { index: false, follow: false },
    };
  }

  const caseStudy = resolveCaseStudy(project);
  const description = (cleanInlineText(caseStudy.outcomeSummary) ?? "").slice(
    0,
    160,
  );
  const shareImage = project.backgroundImage ?? project.projectImage;
  const imageUrl = shareImage
    ? urlFor(shareImage)
        .width(1200)
        .height(630)
        .fit("crop")
        .auto("format")
        .url()
    : undefined;

  return {
    title: project.title,
    description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: project.title,
      description,
      type: "article",
      url: `/projects/${slug}`,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: project.backgroundImageAlt || `${project.title} project`,
            },
          ]
        : undefined,
    },
  };
}

export default async function SlugProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) notFound();

  const caseStudy = resolveCaseStudy(project);
  const heroImage = project.backgroundImage ?? project.projectImage;
  const heroLqip = project.backgroundImage
    ? project.backgroundImageLqip
    : project.projectImageLqip;
  const heroAlt =
    project.backgroundImageAlt ||
    project.projectImageAlt ||
    `${project.title} project overview`;
  const heroUrl = heroImage
    ? urlFor(heroImage)
        .width(1800)
        .height(1000)
        .fit("crop")
        .auto("format")
        .quality(88)
        .url()
    : undefined;
  const previewUrl = project.previewImage
    ? urlFor(project.previewImage)
        .width(1400)
        .auto("format")
        .quality(88)
        .url()
    : undefined;
  const videoPosterImage = project.previewImage ?? project.projectImage;
  const previewPoster = videoPosterImage
    ? urlFor(videoPosterImage)
        .width(1400)
        .height(900)
        .fit("crop")
        .auto("format")
        .quality(82)
        .url()
    : undefined;
  const metadata = [
    { label: "Team", value: caseStudy.team },
    { label: "Timeline", value: caseStudy.timeline },
    { label: "Context", value: caseStudy.context },
  ].filter((item): item is { label: string; value: string } =>
    Boolean(item.value),
  );

  return (
    <>
      <main className="relative bg-tertiary pb-32 sm:pb-40">
        <HomeDuck />
        <header className="mx-auto w-full max-w-6xl px-4 pb-14 pt-28 sm:px-8 sm:pb-20 sm:pt-36 lg:px-12">
          <p className="text-xs uppercase tracking-[0.18em] text-secondary-readable">
            [ {caseStudy.label} ]
          </p>
          <h1
            className={`mt-5 max-w-5xl break-words leading-[0.86] ${
              project.title.split(/\s+/).some((word) => word.length >= 10)
                ? "text-[clamp(2.5rem,9vw,8rem)]"
                : "text-[15vw] sm:text-7xl md:text-8xl lg:text-9xl"
            }`}
          >
            {project.title}
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-primary/80 sm:text-xl sm:leading-9">
            {caseStudy.outcomeSummary}
          </p>

          <dl className="mt-12 grid grid-cols-2 border-y border-primary/20 sm:grid-cols-3">
            {metadata.map((item) => (
              <div
                key={item.label}
                className="border-primary/20 py-5 odd:pr-4 even:border-l even:pl-4 sm:border-l sm:px-5 sm:first:border-l-0 sm:first:pl-0"
              >
                <dt className="font-[family-name:var(--font-body)] text-[0.6875rem] uppercase tracking-[0.14em] text-primary/65">
                  {item.label}
                </dt>
                <dd className="mt-2 font-[family-name:var(--font-body)] text-sm leading-5 text-primary/90">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>

          {(validLink(project.liveDemoLink) || validLink(project.repoLink)) && (
            <nav
              aria-label={`${project.title} external links`}
              className="mt-8 flex flex-wrap gap-x-8 gap-y-4"
            >
              {validLink(project.liveDemoLink) && (
                <a
                  href={project.liveDemoLink}
                  target="_blank"
                  rel="noreferrer"
                  className="border-b border-primary/35 pb-1 font-[family-name:var(--font-body)] text-sm uppercase tracking-[0.1em] transition-colors hover:border-secondary hover:text-secondary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
                >
                  Live project ↗
                </a>
              )}
              {validLink(project.repoLink) && (
                <a
                  href={project.repoLink}
                  target="_blank"
                  rel="noreferrer"
                  className="border-b border-primary/35 pb-1 font-[family-name:var(--font-body)] text-sm uppercase tracking-[0.1em] transition-colors hover:border-secondary hover:text-secondary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
                >
                  Source ↗
                </a>
              )}
            </nav>
          )}
        </header>

        {heroUrl && (
          <figure className="relative mx-auto aspect-[4/3] w-full max-w-[100rem] overflow-hidden bg-midnight/20 sm:aspect-[16/9] lg:max-h-[46rem]">
            <Image
              src={heroUrl}
              alt={heroAlt}
              fill
              priority
              placeholder={heroLqip ? "blur" : "empty"}
              blurDataURL={heroLqip}
              sizes="100vw"
              className="object-cover object-top"
            />
          </figure>
        )}

        <article className="mx-auto mt-24 w-full max-w-5xl px-4 sm:mt-32 sm:px-8 lg:px-12">
          <ol className="border-t border-primary/25">
            {caseStudy.sections.map((section) => (
              <li
                key={section.number}
                className="grid gap-6 border-b border-primary/25 py-12 sm:py-16 md:grid-cols-[7rem_minmax(0,1fr)] md:gap-10"
              >
                <div>
                  <span className="font-[family-name:var(--font-body)] text-xs text-secondary-readable">
                    [{section.number}]
                  </span>
                </div>
                <div className="grid gap-6 lg:grid-cols-[minmax(12rem,0.72fr)_minmax(0,1.28fr)] lg:gap-12">
                  <h2 className="text-2xl leading-tight sm:text-3xl">
                    {section.title}
                  </h2>
                  <p className="whitespace-pre-line text-base leading-8 text-primary/75">
                    {section.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </article>

        {(project.video || previewUrl) && (
          <section
            aria-labelledby="project-preview-heading"
            className="mx-auto mt-24 w-full max-w-5xl px-4 sm:mt-32 sm:px-8 lg:px-12"
          >
            <div className="mb-6 flex items-end justify-between gap-4 border-b border-primary/25 pb-4">
              <h2 id="project-preview-heading" className="text-2xl sm:text-3xl">
                Project preview
              </h2>
              <span className="font-[family-name:var(--font-body)] text-xs text-primary/65">[ Media ]</span>
            </div>
            {project.video ? (
              <video
                controls
                playsInline
                preload="none"
                poster={previewPoster}
                aria-label={`${project.title} project demonstration`}
                className="aspect-video w-full rounded-sm bg-midnight object-contain"
              >
                <source src={project.video} type={project.videoMimeType} />
                Your browser does not support embedded video.
              </video>
            ) : (
              previewUrl && (
                <div className="relative aspect-video overflow-hidden rounded-sm bg-midnight/20">
                  <Image
                    src={previewUrl}
                    alt={
                      project.previewImageAlt ||
                      `${project.title} interface preview`
                    }
                    fill
                    placeholder={project.previewImageLqip ? "blur" : "empty"}
                    blurDataURL={project.previewImageLqip}
                    sizes="(min-width: 1024px) 896px, calc(100vw - 64px)"
                    className="object-contain"
                  />
                </div>
              )
            )}
          </section>
        )}

        {project.skills && project.skills.length > 0 && (
          <section
            aria-labelledby="project-stack-heading"
            className="mx-auto mt-20 w-full max-w-5xl px-4 sm:px-8 lg:px-12"
          >
            <h2
              id="project-stack-heading"
              className="text-xs tracking-[0.16em] text-primary/65"
            >
              Tools and technologies
            </h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {project.skills.map((skill) => (
                <li
                  key={skill.label}
                  className="flex items-center gap-2 rounded-sm border border-primary/20 px-3 py-2 font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.08em] text-primary/75 [&_svg]:size-4 [&_svg]:shrink-0"
                >
                  <Icon name={skill.icon ?? skill.label} />
                  <span>{formatTechnologyLabel(skill.label)}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <nav
          aria-label="Back to project archive"
          className="mt-28 flex justify-center px-4"
        >
          <Button route="/projects">← Back to projects</Button>
        </nav>
      </main>
      <Footer />
    </>
  );
}
