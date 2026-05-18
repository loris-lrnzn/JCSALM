export const actualites = {
  name: 'actualites',
  title: 'Actualités',
  type: 'document',
  fields: [
    { name: 'titre',       title: 'Titre',          type: 'string' },
    { name: 'date',        title: 'Date',            type: 'date' },
    { name: 'discipline',  title: 'Discipline',      type: 'string' },
    { name: 'texte',       title: 'Texte',           type: 'text' },
    { name: 'photo',       title: 'Photo',           type: 'image', options: { hotspot: true } },
    { name: 'lien_url',    title: 'Lien externe',    type: 'url' },
    { name: 'lien_label',  title: 'Texte du bouton', type: 'string' },
  ],
}
