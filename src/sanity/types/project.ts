import { SanityDocument } from "next-sanity";
import { Image, Slug } from "sanity";

export type Projects = SanityDocument & {
  title: string;
  definition: string;
  description: string;
  slug: Slug;
  projectImage: Image;
};

export type Project = SanityDocument & {
  title: string;
  description: string;
  longDescription?: string;
  slug: {
    _type: "slug";
    current: string;
  };
  skills: { label: string; url: string; color: string; icon: string }[]
  liveDemoLink?: string;
  repoLink?: string;
  backgroundImage?: Image;
  previewImage?: Image;
  video?: File;
};
