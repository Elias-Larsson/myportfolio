import { SanityDocument } from "next-sanity";

export type ExperienceEntry = {
  _key: string;
  company: string;
  role: string;
  period?: string;
  summary?: string;
  detail?: string;
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
  experiences: ExperienceEntry[];
  education: EducationEntry[];
};
