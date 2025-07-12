import { type SchemaTypeDefinition } from 'sanity'
import { project, about } from './postType'
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, about],
}
