import type { SanityDocument } from "next-sanity";
import type { Image, Slug } from "sanity";
import type { AboutMedia } from "./about";

export type ExperienceEntry = {
  _key: string;
  company: string;
  role: string;
  period?: string;
  summary?: string;
  achievements?: string[];
  technologies?: string[];
  detail?: string;
  slug?: Slug;
  relationship?: string;
  logo?: Image;
  cardSummary?: string;
  website?: string;
  caseStudy?: {
    overview?: string;
    roleDescription?: string;
    media?: (AboutMedia & { _key: string })[] | null;
    challenge?: string;
    solution?: string;
    outcome?: string;
  };
};

export type EducationEntry = {
  _key: string;
  school: string;
  programme?: string;
  period?: string;
  status?: string;
};

export type ProfessionalProfile = SanityDocument & {
  heading: string;
  headingAccent: string;
  description: string;
  includeExperienceStarters?: boolean;
  experiences: ExperienceEntry[];
  education: EducationEntry[];
};
