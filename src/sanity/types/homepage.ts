import { SanityDocument } from "next-sanity";

export type Homepage = SanityDocument & {
  title: string;
  subtitle?: string;
  description?: string;
  skills: { label: string; url: string; color: string; icon: string }[]
};

export type Footer = SanityDocument & {
  contactDescription?: string;
};
