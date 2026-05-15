import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemaTypes'

const DISCIPLINES = [
  { label: 'Judo',           id: 'judo' },
  { label: 'Pilates',        id: 'pilates' },
  { label: 'Cardio-Training', id: 'cardiotraining' },
]

export default defineConfig({
  name: 'jcsalm',
  title: 'Judo Club de Salm',
  projectId: '0q69j8xd',
  dataset: 'production',
  plugins: [
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
            S.divider(),
            ...S.documentTypeListItems().filter((item) => item.getId() !== 'horaires'),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
    templates: (prev) => [
      ...prev.filter((t) => t.id !== 'horaires'),
      {
        id: 'horaires-discipline',
        title: 'Horaires',
        schemaType: 'horaires',
        parameters: [{ name: 'discipline', title: 'Discipline', type: 'string' }],
        value: ({ discipline }) => ({ discipline }),
      },
    ],
  },
})
