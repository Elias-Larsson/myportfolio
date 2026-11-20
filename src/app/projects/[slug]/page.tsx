import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";

import { Button } from "@/app/components/button";
import { Footer } from "@/app/components/footer";
import { HomeDuck } from "@/app/components/home-duck";
import { ProjectTechStack } from "@/app/components/projects/project-tech-stack";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { projectQuery, projectSlugsQuery } from "@/sanity/lib/queries";
import type { Project } from "@/sanity/types/project";

export const revalidate = 3600;

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

type ProjectSlug = { slug: string };

const getProject = cache((slug: string) =>
  client.fetch<Project | null>(
    projectQuery,
    { slug },
    { next: { revalidate } },
  ),
);

const externalUrl = (value?: string | null) => {
  try {
    const url = new URL(value?.trim() ?? "");
    if (url.protocol === "https:" || url.protocol === "http:") return url.href;
  } catch {
    // Legacy projects can contain empty strings or placeholder hash links.
  }
};

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

  const description = project.description
    ?.trim()
    .replace(/\s+/g, " ")
    .slice(0, 160);
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
              alt: project.backgroundImage
                ? (project.backgroundImageAlt ?? undefined)
                : (project.projectImageAlt ?? undefined),
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

  const description = project.description?.trim();
  const longDescription = project.longDescription?.trim();
  const links = [
    {
      key: "live",
      label: "Live demo",
      href: externalUrl(project.liveDemoLink),
      icon: "/maki_arrow.svg",
    },
    {
      key: "repo",
      label: "Source repository",
      href: externalUrl(project.repoLink),
      icon: "/mdi_github.svg",
    },
    ...(project.otherLinks ?? []).map(({ _key, label, url }) => ({
      key: _key,
      label: label?.trim() || "Project link",
      href: externalUrl(url),
      icon: "/globe.svg",
    })),
  ].filter((link): link is typeof link & { href: string } =>
    Boolean(link.href),
  );
  const heroImage = project.backgroundImage ?? project.projectImage;
  const heroLqip = project.backgroundImage
    ? project.backgroundImageLqip
    : project.projectImageLqip;
  const heroAlt = project.backgroundImage
    ? project.backgroundImageAlt
    : project.projectImageAlt;
  const heroUrl = heroImage
    ? urlFor(heroImage).width(2200).auto("format").quality(88).url()
    : undefined;
  const previewUrl = project.previewImage
    ? urlFor(project.previewImage).width(1400).auto("format").quality(88).url()
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
  return (
    <>
      <main className="relative bg-tertiary pb-32 wrap-anywhere sm:pb-40">
        <div className={heroUrl ? "flex min-h-svh flex-col" : "pt-8 sm:pt-12"}>
          {heroUrl && (
            <figure className="relative min-h-[min(38svh,16rem)] flex-1 overflow-hidden bg-midnight">
              <Image
                src={heroUrl}
                alt={heroAlt ?? ""}
                fill
                priority
                placeholder={heroLqip ? "blur" : "empty"}
                blurDataURL={heroLqip ?? undefined}
                sizes="100vw"
                className="object-cover object-top"
              />
            </figure>
          )}

          <header className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 px-4 py-6 sm:px-8 sm:py-8 lg:px-12">
            <div className="flex items-start justify-between gap-3">
              <h1 className="min-w-0 wrap-anywhere text-[clamp(2rem,7.5vw,5.75rem)] leading-[0.94]">
                {project.title}
              </h1>
              <HomeDuck inline />
            </div>
            {((description && description !== longDescription) ||
              links.length > 0 ||
              project.skills?.length) && (
              <div className="space-y-4">
                {description && description !== longDescription && (
                  <p className="max-w-2xl text-sm leading-6 text-primary/80 sm:text-base">
                    {description}
                  </p>
                )}
                {links.length > 0 && (
                  <nav
                    aria-label={`${project.title} external links`}
                    className="flex flex-wrap gap-2"
                  >
                    {links.map(({ key, label, href, icon }) => (
                      <Button
                        ariaLabel={`${label} (opens in a new tab)`}
                        external
                        icon={icon}
                        key={key}
                        route={href}
                      >
                        {key !== "repo" ? <span>{label}</span> : null}
                      </Button>
                    ))}
                  </nav>
                )}
                <ProjectTechStack skills={project.skills} />
              </div>
            )}
          </header>
        </div>

        {longDescription && (
          <article className="mx-auto mt-16 w-full max-w-6xl px-4 sm:mt-24 sm:px-8 lg:px-12">
            <h2 className="mb-6 text-2xl sm:text-3xl">Overview</h2>
            <p className="max-w-prose whitespace-pre-wrap wrap-anywhere text-base leading-8 text-primary/75 sm:text-lg sm:leading-9">
              {longDescription}
            </p>
          </article>
        )}

        {(project.video || previewUrl) && (
          <section
            aria-labelledby="project-preview-heading"
            className="mx-auto mt-24 w-full max-w-5xl px-4 sm:mt-32 sm:px-8 lg:px-12"
          >
            <h2
              id="project-preview-heading"
              className="mb-6 border-b border-primary/25 pb-4 text-2xl sm:text-3xl"
            >
              Project preview
            </h2>
            {project.video ? (
              <video
                autoPlay
                disablePictureInPicture
                disableRemotePlayback
                loop
                muted
                playsInline
                preload="none"
                poster={previewPoster}
                aria-label={`${project.title} project demonstration`}
                className="aspect-video w-full rounded-sm bg-midnight object-contain"
              >
                <source
                  src={project.video}
                  type={project.videoMimeType ?? undefined}
                />
                Your browser does not support embedded video.
              </video>
            ) : (
              previewUrl && (
                <div className="relative aspect-video overflow-hidden rounded-sm bg-midnight/20">
                  <Image
                    src={previewUrl}
                    alt={project.previewImageAlt ?? ""}
                    fill
                    placeholder={project.previewImageLqip ? "blur" : "empty"}
                    blurDataURL={project.previewImageLqip ?? undefined}
                    sizes="(min-width: 1024px) 896px, calc(100vw - 64px)"
                    className="object-contain"
                  />
                </div>
              )
            )}
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
