import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { getExperienceCases } from "@/sanity/lib/professional-profile";
import { projectSlugsQuery } from "@/sanity/lib/queries";
import { absoluteUrl } from "./site";

type SitemapProject = {
  slug: string;
  updatedAt?: string;
};

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl("/about"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/projects"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const [projects, experiences] = await Promise.allSettled([
    client.fetch<SitemapProject[]>(
      projectSlugsQuery,
      {},
      { next: { revalidate } },
    ),
    getExperienceCases(),
  ]);

  const routes = [...staticRoutes];
  if (projects.status === "fulfilled") {
    const seenSlugs = new Set<string>();

    for (const project of projects.value) {
      if (!project.slug || seenSlugs.has(project.slug)) continue;
      seenSlugs.add(project.slug);

      const lastModified = project.updatedAt
        ? new Date(project.updatedAt)
        : undefined;

      routes.push({
        url: absoluteUrl(`/projects/${encodeURIComponent(project.slug)}`),
        ...(lastModified && !Number.isNaN(lastModified.getTime())
          ? { lastModified }
          : {}),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  } else {
    console.error(
      "Unable to include project pages in the sitemap:",
      projects.reason,
    );
  }

  if (experiences.status === "fulfilled") {
    for (const { slug } of experiences.value) {
      routes.push({
        url: absoluteUrl(`/experience/${encodeURIComponent(slug)}`),
      });
    }
  } else {
    console.error(
      "Unable to include experience pages in the sitemap:",
      experiences.reason,
    );
  }

  return routes;
}
