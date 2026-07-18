import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export type ImageDimensions = {
  width: number;
  height: number;
  aspectRatio: number;
};

export type AboutMedia = {
  _key?: string;
  kind: "image" | "video";
  image: SanityImageSource | null;
  posterImage: SanityImageSource | null;
  alt: string;
  caption: string | null;
  imageLqip: string | null;
  imageDimensions: ImageDimensions | null;
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
  _id: string;
  heading: string | null;
  headingAccent: string | null;
  description: string;
  profileImage: SanityImageSource | null;
  profileAlt: string | null;
  profileLqip: string | null;
  profileDimensions: ImageDimensions | null;
  storyHeading: string | null;
  storyHeadingAccent: string | null;
  storyIntroduction: string | null;
  storySections: AboutStorySection[];
};
