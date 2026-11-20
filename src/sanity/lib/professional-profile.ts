import { cache } from "react";
import type { ProfessionalProfile } from "../types/professionalProfile";
import { client } from "./client";
import { professionalProfileQuery } from "./queries";

export const getProfessionalProfile = cache(() =>
  client.fetch<ProfessionalProfile | null>(
    professionalProfileQuery,
    {},
    {
      next: { revalidate: 60 },
    },
  ),
);

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const getExperienceCases = cache(async () => {
  const profile = await getProfessionalProfile();
  const entries = (profile?.experiences ?? []).filter((entry) =>
    entry.company?.trim(),
  );
  const usedSlugs = new Set<string>();

  return entries.map((entry) => {
    // Existing entries can remain accessible before their slug is set in Studio.
    const baseSlug =
      slugify(entry.slug?.current ?? "") ||
      slugify(entry.company) ||
      slugify(entry._key);
    let slug = baseSlug;

    for (let suffix = 2; usedSlugs.has(slug); suffix += 1) {
      slug = `${baseSlug}-${suffix}`;
    }

    usedSlugs.add(slug);
    return {
      ...entry,
      slug,
      overview: entry.caseStudy?.overview?.trim() || entry.summary?.trim(),
    };
  });
});
