import { SanityDocument } from "next-sanity";

export type Homepage = SanityDocument & {
  title: string;
  subtitle?: string;
  description?: string;
  heroEyebrow?: string | null;
  heroHeading?: string | null;
  heroHeadingAccent?: string | null;
  heroDescription?: string | null;
  credibilityItems?: string[] | null;
  aboutTeaserTitle?: string | null;
  aboutTeaserBody?: string | null;
  skills: { label: string; url: string; color: string; icon: string }[];
};

export type Footer = SanityDocument & {
  contactDescription?: string;
};
