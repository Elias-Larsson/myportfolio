import { type SchemaTypeDefinition } from 'sanity'
import { project, about, homepage } from './postType'
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, about, homepage],
}
