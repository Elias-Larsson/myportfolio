import { groq } from "next-sanity";
export const homepageQuery = groq`*[_type == "homepage"]{
  title, 
  subtitle, 
  description, 
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
  experiences[]{
    _key,
    company,
    role,
    period,
    summary,
    achievements,
    technologies,
    detail
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

export const projectsQuery = groq`*[_type == "project"]{
  _id, 
  title, 
  definition,
  featured,
  slug, 
  description,
  "projectImage": projectImage.asset->url
 }`;

export const projectQuery = groq`*[_type == "project" && slug.current == $slug][0]{
  _id,
  title,
  description,
  longDescription,
  slug,
  skills,
  liveDemoLink,
  repoLink,
  "backgroundImage": backgroundImage.asset->url,
  "previewImage": previewImage.asset->url,
  "video": video.asset->url
}`;
