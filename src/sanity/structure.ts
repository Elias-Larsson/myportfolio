import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Experience & Education')
        .id('professionalProfile')
        .child(
          S.document()
            .schemaType('professionalProfile')
            .documentId('professionalProfile')
        ),
      ...S.documentTypeListItems().filter(
        (listItem) => listItem.getId() !== 'professionalProfile'
      ),
    ])
