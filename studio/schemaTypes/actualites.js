export const actualites = {
  name: 'actualites',
  title: 'Actualités',
  type: 'document',
  preview: {
    select: { title: 'titre', subtitle: 'date' },
  },
  fields: [
    {
      name: 'titre',
      title: 'Titre',
      type: 'string',
      validation: (R) => R.required(),
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
      options: { dateFormat: 'DD/MM/YYYY' },
      validation: (R) => R.required(),
    },
    {
      name: 'discipline',
      title: 'Discipline',
      type: 'string',
      options: { list: ['Général', 'Judo', 'Pilates', 'Cardio-Training'] },
    },
    {
      name: 'texte',
      title: 'Texte',
      type: 'text',
      rows: 5,
    },
    {
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'lien_url',
      title: 'Lien externe (URL)',
      type: 'url',
    },
    {
      name: 'lien_label',
      title: 'Texte du bouton',
      type: 'string',
      placeholder: 'Ex : Voir les résultats',
    },
  ],
}
