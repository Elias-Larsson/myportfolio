import { SanityDocument } from "next-sanity";
import { Image } from "sanity";

export type About = SanityDocument & {
  description: string;
  profileImage?: Image;
};
