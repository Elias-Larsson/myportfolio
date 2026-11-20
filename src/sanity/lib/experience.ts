import { cache } from "react";
import type { ExperienceEntry } from "../types/professionalProfile";
import { getProfessionalProfile } from "./professional-profile";

type Starter = Omit<ExperienceEntry, "_key" | "slug"> & { slug: string };

const starters: Starter[] = [
  {
    slug: "sprinto",
    company: "Sprinto",
    relationship: "Internship",
    role: "Lead Developer",
    summary:
      "I led a three-person team building AI-assisted quiz workflows in an existing Next.js product.",
    achievements: [
      "Designed quiz generation and manual editing flows for educators.",
      "Integrated the OpenAI API and tested tRPC endpoints with Jest.",
    ],
    technologies: ["Next.js", "OpenAI API", "tRPC", "Jest"],
  },
  {
    slug: "jarfalla-hus",
    company: "Järfälla Hus",
    relationship: "Client project",
    role: "Full-stack Developer",
    summary:
      "I helped build a platform for Järfälla residents to discover and register for local activities.",
    achievements: [
      "Worked in an 11-person Scrum team across development, UX/UI, and DevOps.",
      "Built authentication and an admin interface for managing resident events and information.",
    ],
    technologies: ["TypeScript", "Express", "Vite"],
    caseStudy: {
      outcome:
        "The project received an Honorable Mention from Chas Academy for backend system design and functionality.",
    },
  },
  {
    slug: "samples",
    company: "Samples",
    relationship: "Founder",
    role: "Founder",
    summary:
      "Samples is a mobile product for discovering nearby events and offers.",
    achievements: [
      "Implemented map-based discovery and Supabase-backed product features.",
      "Built and published the product website with Next.js and Motion.",
    ],
    technologies: ["Maps", "Supabase", "Next.js", "Motion"],
  },
  {
    slug: "streamline",
    company: "Streamline",
    role: "Business owner",
    summary: "Streamline offers websites and custom software for businesses.",
  },
  {
    slug: "paws-n-pantry",
    company: "Paws ’n’ Pantry",
    role: "Founder",
    summary: "I founded Paws ’n’ Pantry.",
  },
  {
    slug: "reky",
    company: "Reky",
    relationship: "Thesis · Sprinto",
    role: "Developer",
    summary: "An AI assessment system developed as my thesis with Sprinto.",
  },
];

type ExperienceCase = Omit<ExperienceEntry, "slug"> & {
  slug: string;
  preview: string;
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const companyKey = (company: string) => slugify(company).replaceAll("-", "");

const firstSentence = (text?: string) =>
  text?.trim().split(/\n|(?<=[.!?])\s+/u)[0];

const resolveCase = (
  entry: ExperienceEntry | undefined,
  starter: Starter | undefined,
  slug: string,
): ExperienceCase => {
  const summary = entry?.summary?.trim() || starter?.summary;
  return {
    _key: entry?._key ?? slug,
    slug,
    company: entry?.company?.trim() || starter?.company || slug,
    role: entry?.role?.trim() || starter?.role || "",
    relationship: entry?.relationship?.trim() || starter?.relationship,
    period: entry?.period?.trim(),
    logo: entry?.logo,
    website: entry?.website,
    summary,
    detail: entry?.detail,
    achievements: entry?.achievements ?? starter?.achievements,
    technologies: entry?.technologies ?? starter?.technologies,
    caseStudy: { ...starter?.caseStudy, ...entry?.caseStudy },
    preview:
      entry?.cardSummary?.trim() ||
      firstSentence(entry?.caseStudy?.overview) ||
      firstSentence(summary) ||
      firstSentence(entry?.detail) ||
      entry?.role?.trim() ||
      "",
  };
};

export const getExperienceCases = cache(async () => {
  const profile = await getProfessionalProfile();
  const entries = profile?.experiences ?? [];
  const availableStarters =
    profile?.includeExperienceStarters === false ? [] : starters;
  const matchedStarters = new Set<string>();
  const usedSlugs = new Set<string>();
  const cases: ExperienceCase[] = [];

  for (const entry of entries) {
    if (!entry.company?.trim()) continue;
    const starter = availableStarters.find(
      ({ company, slug }) =>
        !matchedStarters.has(slug) &&
        companyKey(company) === companyKey(entry.company),
    );
    if (starter) matchedStarters.add(starter.slug);

    const baseSlug =
      slugify(entry.slug?.current || "") ||
      starter?.slug ||
      slugify(entry.company) ||
      "work";
    let slug = baseSlug;
    for (let suffix = 2; usedSlugs.has(slug); suffix += 1) {
      slug = `${baseSlug}-${suffix}`;
    }

    usedSlugs.add(slug);
    cases.push(resolveCase(entry, starter, slug));
  }

  for (const starter of availableStarters) {
    if (!matchedStarters.has(starter.slug) && !usedSlugs.has(starter.slug)) {
      cases.push(resolveCase(undefined, starter, starter.slug));
    }
  }

  return cases;
});
