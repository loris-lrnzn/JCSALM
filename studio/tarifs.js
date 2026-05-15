export const tarifs = {
  name: 'tarifs',
  title: 'Tarifs',
  type: 'document',
  fields: [
    {
      name: 'discipline',
      title: 'Discipline',
      type: 'string',
      options: { list: ['Judo', 'Pilates', 'Cardio-Training'] },
    },
    {
      name: 'lignes',
      title: 'Lignes de tarifs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Catégorie (ex: Enfant)', type: 'string' },
            { name: 'prix',  title: 'Prix (ex: 85 €)',        type: 'string' },
          ],
        },
      ],
    },
  ],
}
