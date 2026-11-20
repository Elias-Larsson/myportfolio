import { groq } from "next-sanity";

const mediaFields = groq`
  kind,
  "image": select(defined(image.asset._ref) => image),
  "posterImage": select(defined(posterImage.asset._ref) => posterImage),
  alt,
  caption,
  "imageLqip": image.asset->metadata.lqip,
  "videoUrl": videoFile.asset->url,
  "videoMimeType": videoFile.asset->mimeType,
  "captionsUrl": captionsFile.asset->url,
  captionsLanguage
`;

export const homepageQuery = groq`*[_type == "homepage"] | order(_updatedAt desc)[0]{
  title,
  description,
  heroHeadingAccent,
  aboutTeaserTitle,
  aboutTeaserBody,
  featuredHeading,
  featuredDescription,
  footerHeading,
  footerHeadingAccent
}`;

export const aboutQuery = groq`*[_type == "about"] | order(_updatedAt desc)[0]{
  heading,
  headingAccent,
  description,
  "profileImage": select(defined(profileImage.asset._ref) => profileImage),
  "profileLqip": profileImage.asset->metadata.lqip,
  "profileAlt": profileImageAlt,
  workHeading,
  workHeadingAccent,
  workBody,
  storyHeading,
  storyHeadingAccent,
  storyIntroduction,
  storySections[]{
    _key,
    eyebrow,
    title,
    body,
    layout,
    media{${mediaFields}}
  }
}`;

export const professionalProfileQuery = groq`*[_id == "professionalProfile"][0]{
  experiences[]{
    _key,
    company,
    role,
    period,
    summary,
    achievements,
    technologies,
    slug,
    "logo": select(defined(logo.asset._ref) => logo),
    caseStudy{
      overview,
      roleDescription,
      media[]{_key, ${mediaFields}}
    }
  },
  education[]{_key, school, programme, period, status}
}`;

const projectImageFields = groq`
  "projectImage": select(defined(projectImage.asset._ref) => projectImage),
  projectImageAlt,
  "projectImageLqip": projectImage.asset->metadata.lqip
`;

export const projectsQuery = groq`*[_type == "project" && defined(slug.current)] | order(
  coalesce(flagship, false) desc,
  coalesce(displayOrder, 9999) asc,
  _createdAt desc,
  title asc
){
  _id,
  title,
  slug,
  description,
  featured,
  flagship,
  projectCategory,
  skills[]{label, icon},
  ${projectImageFields}
}`;

export const projectQuery = groq`*[_type == "project" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  description,
  longDescription,
  skills[]{label, icon},
  liveDemoLink,
  repoLink,
  otherLinks[]{_key, label, url},
  ${projectImageFields},
  "backgroundImage": select(defined(backgroundImage.asset._ref) => backgroundImage),
  backgroundImageAlt,
  "backgroundImageLqip": backgroundImage.asset->metadata.lqip,
  "previewImage": select(defined(previewImage.asset._ref) => previewImage),
  previewImageAlt,
  "previewImageLqip": previewImage.asset->metadata.lqip,
  "video": video.asset->url,
  "videoMimeType": video.asset->mimeType
}`;

export const projectSlugsQuery = groq`*[_type == "project" && defined(slug.current)]{
  "slug": slug.current,
  "updatedAt": _updatedAt
}`;
