import type { SanityDocument } from "next-sanity";
import type { Image, Slug } from "sanity";
import type { AboutMedia } from "./about";

export type ExperienceEntry = {
  _key: string;
  company: string;
  role: string;
  period?: string | null;
  summary?: string | null;
  achievements?: string[] | null;
  technologies?: string[] | null;
  slug?: Slug | null;
  logo?: Image | null;
  caseStudy?: {
    overview?: string | null;
    roleDescription?: string | null;
    media?: (AboutMedia & { _key: string })[] | null;
  } | null;
};

export type EducationEntry = {
  _key: string;
  school: string;
  programme?: string | null;
  period?: string | null;
  status?: string | null;
};

export type ProfessionalProfile = SanityDocument & {
  experiences?: ExperienceEntry[] | null;
  education?: EducationEntry[] | null;
};
