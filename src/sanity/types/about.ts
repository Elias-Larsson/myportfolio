import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export type AboutMedia = {
  _key?: string;
  kind: "image" | "video";
  image: SanityImageSource | null;
  posterImage: SanityImageSource | null;
  alt: string;
  caption: string | null;
  imageLqip: string | null;
  videoUrl: string | null;
  videoMimeType: string | null;
  captionsUrl: string | null;
  captionsLanguage: string | null;
};

export type AboutStorySection = {
  _key: string;
  eyebrow: string | null;
  title: string;
  body: string;
  layout: "mediaLeft" | "mediaRight" | null;
  media: AboutMedia | null;
};

export type About = {
  heading: string | null;
  headingAccent: string | null;
  description: string;
  profileImage: SanityImageSource | null;
  profileAlt: string | null;
  profileLqip: string | null;
  workHeading: string | null;
  workHeadingAccent: string | null;
  workBody: string | null;
  storyHeading: string | null;
  storyHeadingAccent: string | null;
  storyIntroduction: string | null;
  storySections: AboutStorySection[] | null;
};
