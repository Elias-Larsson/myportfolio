import { SanityDocument } from "next-sanity";
import { Slug } from "sanity";

export type Projects = SanityDocument & {
  title: string;
  definition: string;
  description: string;
  slug: Slug;
  projectImage: string;
};

export type Project = SanityDocument & {
  title: string;
  description: string;
  longDescription?: string;
  slug: {
    _type: "slug";
    current: string;
  };
  techstack?: string[];
  liveDemoLink?: string;
  repoLink?: string;
  backgroundImage?: string;
  previewImage?: string;
  video?: string;
};