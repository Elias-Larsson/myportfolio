import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import type { Projects } from "@/sanity/types/project";
import { projectsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { Button } from "../button";
import { ProjectTechStack } from "./project-tech-stack";

const revalidate = 60;

export const ProjectsDisplay = async ({
  heading,
  description,
}: {
  heading?: string | null;
  description?: string | null;
}) => {
  const projects = await client.fetch<Projects[]>(
    projectsQuery,
    {},
    {
      next: { revalidate },
    },
  );
  const selectedProjects = projects.filter((project) => project.featured);

  if (!selectedProjects.length) return null;

  const title = heading?.trim() || "Featured work";
  const lastWord = title.match(/\S+$/)?.[0] ?? "";

  return (
    <section
      aria-labelledby="selected-work-heading"
      className="relative z-10 scroll-mt-8 bg-tertiary px-4 pb-20 pt-24 md:pb-24 md:pt-32"
      id="selected-work"
    >
      <header className="mx-auto grid w-full max-w-6xl gap-6 border-t border-white/10 pt-8 md:grid-cols-[minmax(0,1fr)_minmax(18rem,0.65fr)] md:items-end">
        <h2
          className="text-[10.5dvw] leading-[0.94] sm:text-6xl md:text-7xl"
          id="selected-work-heading"
        >
          {title.slice(0, title.length - lastWord.length)}
          <span className="text-secondary">{lastWord}</span>
        </h2>
        {description && (
          <p className="max-w-xl text-base leading-7 text-primary/72 md:pb-1 md:text-lg md:leading-8">
            {description}
          </p>
        )}
      </header>

      <ol className="mx-auto mt-14 grid w-full max-w-6xl gap-6 lg:grid-cols-2 md:mt-20">
        {selectedProjects.map((project) => {
          const slug = project.slug.current;
          const isFlagship = project.flagship === true;

          return (
            <li
              className={isFlagship ? "lg:col-span-2" : undefined}
              key={project._id}
            >
              <Link
                className={`group grid h-full overflow-hidden rounded-sm border border-white/10 bg-midnight transition duration-300 hover:border-secondary/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-4 focus-visible:ring-offset-tertiary motion-reduce:transition-none ${
                  isFlagship && project.projectImage
                    ? "lg:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.65fr)]"
                    : "grid-rows-[auto_1fr]"
                }`}
                href={`/projects/${slug}`}
              >
                {project.projectImage && (
                  <figure
                    className={`relative overflow-hidden bg-tertiary ${
                      isFlagship
                        ? "aspect-[16/10] lg:aspect-auto lg:min-h-[34rem]"
                        : "aspect-[16/10]"
                    }`}
                  >
                    <Image
                      alt={project.projectImageAlt || ""}
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
                      placeholder={project.projectImageLqip ? "blur" : "empty"}
                      blurDataURL={project.projectImageLqip ?? undefined}
                    />
                  </figure>
                )}

                <article className="flex flex-col p-6 sm:p-8 lg:p-10">
                  <h3 className="text-3xl leading-none sm:text-4xl">
                    {project.title}
                  </h3>

                  {project.description && (
                    <p className="mt-6 text-sm leading-7 text-primary/72 sm:text-base">
                      {project.description}
                    </p>
                  )}

                  <ProjectTechStack
                    className="mt-7"
                    limit={4}
                    skills={project.skills}
                  />
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
