import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
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

  try {
    const projects = await client.fetch<SitemapProject[]>(
      projectSlugsQuery,
      {},
      { next: { revalidate } },
    );

    const seenSlugs = new Set<string>();
    const projectRoutes: MetadataRoute.Sitemap = [];

    for (const project of projects) {
      if (!project.slug || seenSlugs.has(project.slug)) continue;
      seenSlugs.add(project.slug);

      const lastModified = project.updatedAt
        ? new Date(project.updatedAt)
        : undefined;

      projectRoutes.push({
        url: absoluteUrl(`/projects/${encodeURIComponent(project.slug)}`),
        ...(lastModified && !Number.isNaN(lastModified.getTime())
          ? { lastModified }
          : {}),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }

    return [...staticRoutes, ...projectRoutes];
  } catch (error) {
    console.error("Unable to include project pages in the sitemap:", error);
    return staticRoutes;
  }
}
