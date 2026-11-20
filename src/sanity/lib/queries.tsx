import { groq } from "next-sanity";
export const homepageQuery = groq`*[_type == "homepage"]{
  title,
  subtitle,
  description,
  heroEyebrow,
  heroHeading,
  heroHeadingAccent,
  heroDescription,
  credibilityItems,
  aboutTeaserTitle,
  aboutTeaserBody,
  skills,
  }[0]`;
export const aboutQuery = groq`*[_type == "about"] | order(_updatedAt desc)[0]{
  _id,
  heading,
  headingAccent,
  description,
  profileImage,
  "profileLqip": profileImage.asset->metadata.lqip,
  "profileDimensions": profileImage.asset->metadata.dimensions{
    width,
    height,
    aspectRatio
  },
  "profileAlt": profileImageAlt,
  workHeading,
  workHeadingAccent,
  workBody,
  storyHeading,
  storyHeadingAccent,
  storyIntroduction,
  "storySections": coalesce(storySections[]{
    _key,
    eyebrow,
    title,
    body,
    layout,
    media{
      kind,
      image,
      posterImage,
      alt,
      caption,
      "imageLqip": image.asset->metadata.lqip,
      "imageDimensions": image.asset->metadata.dimensions{
        width,
        height,
        aspectRatio
      },
      "videoUrl": videoFile.asset->url,
      "videoMimeType": videoFile.asset->mimeType,
      "captionsUrl": captionsFile.asset->url,
      captionsLanguage
    }
  }, [])
}`;

export const professionalProfileQuery = groq`*[_id == "professionalProfile"][0]{
  heading,
  headingAccent,
  description,
  includeExperienceStarters,
  experiences[]{
    _key,
    company,
    role,
    period,
    summary,
    achievements,
    technologies,
    detail,
    slug,
    relationship,
    "logo": select(defined(logo.asset._ref) => logo),
    cardSummary,
    website,
    caseStudy{
      overview,
      roleDescription,
      challenge,
      solution,
      outcome,
      media[]{
        _key,
        kind,
        "image": select(defined(image.asset._ref) => image),
        "posterImage": select(defined(posterImage.asset._ref) => posterImage),
        alt,
        caption,
        "imageLqip": image.asset->metadata.lqip,
        "imageDimensions": image.asset->metadata.dimensions{
          width,
          height,
          aspectRatio
        },
        "videoUrl": videoFile.asset->url,
        "videoMimeType": videoFile.asset->mimeType,
        "captionsUrl": captionsFile.asset->url,
        captionsLanguage
      }
    }
  },
  education[]{
    _key,
    school,
    programme,
    period,
    status
  }
}`;

export const footerQuery = groq`*[_type == "homepage"]{
    contactDescription
}`;

export const projectsQuery = groq`*[
  _type == "project" && defined(slug.current)
] | order(
  coalesce(displayOrder, 9999) asc,
  coalesce(year, 0) desc,
  _createdAt desc,
  title asc
){
  _id,
  _createdAt,
  _updatedAt,
  title,
  definition,
  featured,
  slug,
  description,
  projectCategory,
  displayOrder,
  year,
  role,
  team,
  timeline,
  context,
  outcomeSummary,
  skills[]{label, icon, url, color},
  projectImage,
  projectImageAlt,
  "projectImageLqip": projectImage.asset->metadata.lqip,
  "projectImageDimensions": projectImage.asset->metadata.dimensions{
    width,
    height,
    aspectRatio
  }
}`;

export const projectQuery = groq`*[_type == "project" && slug.current == $slug][0]{
  _id,
  _createdAt,
  _updatedAt,
  title,
  definition,
  featured,
  description,
  longDescription,
  challenge,
  contribution,
  technicalDecision,
  outcome,
  learning,
  slug,
  projectCategory,
  displayOrder,
  year,
  role,
  team,
  timeline,
  context,
  outcomeSummary,
  skills[]{label, icon, url, color},
  liveDemoLink,
  repoLink,
  otherLinks[]{_key, label, url},
  projectImage,
  projectImageAlt,
  "projectImageLqip": projectImage.asset->metadata.lqip,
  "projectImageDimensions": projectImage.asset->metadata.dimensions{
    width,
    height,
    aspectRatio
  },
  backgroundImage,
  backgroundImageAlt,
  "backgroundImageLqip": backgroundImage.asset->metadata.lqip,
  "backgroundImageDimensions": backgroundImage.asset->metadata.dimensions{
    width,
    height,
    aspectRatio
  },
  previewImage,
  previewImageAlt,
  "previewImageLqip": previewImage.asset->metadata.lqip,
  "previewImageDimensions": previewImage.asset->metadata.dimensions{
    width,
    height,
    aspectRatio
  },
  "video": video.asset->url,
  "videoMimeType": video.asset->mimeType
}`;

export const projectSlugsQuery = groq`*[
  _type == "project" && defined(slug.current)
]{"slug": slug.current}`;
