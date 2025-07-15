import { SanityDocument } from "next-sanity";

export type Homepage = SanityDocument & {
  title: string;
  subtitle?: string;
  description?: string;
  skills?: string[];
};

export type Footer = SanityDocument & {
  contactDescription?: string;
};
