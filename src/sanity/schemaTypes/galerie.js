export const galerie = {
  name: 'galerie',
  title: 'Galerie',
  type: 'document',
  fields: [
    {
      name: 'discipline',
      title: 'Discipline',
      type: 'string',
      options: { list: ['Judo', 'Pilates', 'Cardio-Training', 'Général'] },
    },
    {
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt',     title: 'Description',type: 'string' },
        { name: 'legende', title: 'Légende',    type: 'string' },
      ],
    },
    {
      name: 'ordre',
      title: 'Ordre d\'affichage',
      type: 'number',
    },
  ],
}
