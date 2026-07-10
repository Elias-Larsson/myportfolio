import { type SchemaTypeDefinition } from "sanity";
import { project, about, homepage } from "./postType";
import { professionalProfile } from "./professionalProfile";
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, about, homepage, professionalProfile],
};
