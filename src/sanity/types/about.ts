import { SanityDocument } from "next-sanity";

export type About = SanityDocument & {
  description: string;
  profileImage?: string;
};
