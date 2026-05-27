import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemaTypes'
import { csvImportPlugin } from './plugins/csvImport'

const DISCIPLINES = [
  { label: 'Judo',            id: 'judo' },
  { label: 'Pilates',         id: 'pilates' },
  { label: 'Cardio-Training', id: 'cardiotraining' },
]

export default defineConfig({
  name: 'jcsalm',
  title: 'Judo Club de Salm',
  projectId: '0q69j8xd',
  dataset: 'production',
  plugins: [
    csvImportPlugin(),
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenu')
          .items([
            S.listItem()
              .title('Horaires')
              .child(
                S.list()
                  .title('Horaires par discipline')
                  .items(
                    DISCIPLINES.map(({ label, id }) =>
                      S.listItem()
                        .title(label)
                        .id(`horaires-${id}`)
                        .child(
                          S.document()
                            .title(label)
                            .schemaType('horaires')
                            .documentId(`horaires-${id}`)
                            .initialValueTemplate('horaires-discipline', { discipline: label })
                        )
                    )
                  )
              ),
            S.listItem()
              .title('Galerie')
              .child(
                S.list()
                  .title('Galerie par discipline')
                  .items(
                    DISCIPLINES.map(({ label, id }) =>
                      S.listItem()
                        .title(label)
                        .id(`galerie-${id}`)
                        .child(
                          S.document()
                            .title(label)
                            .schemaType('galerie')
                            .documentId(`galerie-${id}`)
                            .initialValueTemplate('galerie-discipline', { discipline: label })
                        )
                    )
                  )
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => !['horaires', 'galerie'].includes(item.getId())
            ),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
    templates: (prev) => [
      ...prev.filter((t) => !['horaires', 'galerie'].includes(t.id)),
      {
        id: 'horaires-discipline',
        title: 'Horaires',
        schemaType: 'horaires',
        parameters: [{ name: 'discipline', title: 'Discipline', type: 'string' }],
        value: ({ discipline }) => ({ discipline }),
      },
      {
        id: 'galerie-discipline',
        title: 'Galerie',
        schemaType: 'galerie',
        parameters: [{ name: 'discipline', title: 'Discipline', type: 'string' }],
        value: ({ discipline }) => ({ discipline }),
      },
    ],
  },
})
