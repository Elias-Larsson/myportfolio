import type { Image, Slug } from "sanity";

export type ProjectSkill = {
  label: string;
  icon?: string | null;
};

export type Projects = {
  _id: string;
  title: string;
  slug: Slug;
  description?: string | null;
  featured?: boolean | null;
  flagship?: boolean | null;
  projectCategory?: "caseStudy" | "experiment" | null;
  skills?: ProjectSkill[] | null;
  projectImage?: Image | null;
  projectImageAlt?: string | null;
  projectImageLqip?: string | null;
};

export type Project = Projects & {
  longDescription?: string | null;
  liveDemoLink?: string | null;
  repoLink?: string | null;
  otherLinks?: { _key: string; label: string; url: string }[] | null;
  backgroundImage?: Image | null;
  backgroundImageAlt?: string | null;
  backgroundImageLqip?: string | null;
  previewImage?: Image | null;
  previewImageAlt?: string | null;
  previewImageLqip?: string | null;
  video?: string | null;
  videoMimeType?: string | null;
};
