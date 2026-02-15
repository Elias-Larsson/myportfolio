import { groq } from "next-sanity";
export const homepageQuery = groq`*[_type == "homepage"]{
  title, 
  subtitle, 
  description, 
  skills,
  }[0]`;
export const aboutQuery = groq`*[_type=="about"]{
  description, 
  "profile": profileImage.asset->url,
}[0]`;

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
