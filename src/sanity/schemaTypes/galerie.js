export const galerie = {
  name: 'galerie',
  title: 'Galerie',
  type: 'document',
  preview: { select: { title: 'discipline' } },
  fields: [
    {
      name: 'discipline',
      title: 'Discipline',
      type: 'string',
      readOnly: true,
      hidden: true,
    },
    {
      name: 'photos',
      title: 'Photos',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt',     title: 'Description', type: 'string' },
            { name: 'legende', title: 'Légende',      type: 'string' },
          ],
        },
      ],
    },
  ],
}
