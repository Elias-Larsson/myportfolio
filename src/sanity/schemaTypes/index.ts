import { type SchemaTypeDefinition } from "sanity";
import { project, homepage } from "./postType";
import { professionalProfile } from "./professionalProfile";
import {
  about,
  aboutHobby,
  aboutMedia,
  aboutStorySection,
} from "./aboutType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    project,
    about,
    homepage,
    professionalProfile,
    aboutMedia,
    aboutStorySection,
    aboutHobby,
  ],
};
