export const partenaires = {
  name: 'partenaires',
  title: 'Partenaires',
  type: 'document',
  fields: [
    {
      name: 'nom',
      title: 'Nom',
      type: 'string',
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'url',
      title: 'Site web (optionnel)',
      type: 'url',
    },
    {
      name: 'ordre',
      title: 'Ordre d\'affichage',
      type: 'number',
    },
  ],
}
