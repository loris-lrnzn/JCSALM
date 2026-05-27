export const evenements = {
  name: 'evenements',
  title: 'Événements',
  type: 'document',
  preview: {
    select: { title: 'titre', subtitle: 'date_debut' },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle
          ? new Date(subtitle + 'T00:00:00').toLocaleDateString('fr-FR', {
              day: '2-digit', month: 'long', year: 'numeric',
            })
          : '',
      }
    },
  },
  orderings: [
    {
      title: 'Date (croissant)',
      name: 'dateAsc',
      by: [{ field: 'date_debut', direction: 'asc' }],
    },
    {
      title: 'Date (décroissant)',
      name: 'dateDesc',
      by: [{ field: 'date_debut', direction: 'desc' }],
    },
  ],
  fields: [
    {
      name: 'titre',
      title: 'Titre',
      type: 'string',
      validation: (R) => R.required(),
    },
    {
      name: 'date_debut',
      title: 'Date',
      type: 'date',
      options: { dateFormat: 'DD/MM/YYYY' },
      validation: (R) => R.required(),
    },
    {
      name: 'date_fin',
      title: 'Date de fin (optionnel)',
      type: 'date',
      options: { dateFormat: 'DD/MM/YYYY' },
    },
    {
      name: 'categorie',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'Compétition', value: 'COMPÉTITION' },
          { title: 'Stage', value: 'STAGE' },
          { title: 'Passage de grade', value: 'PASSAGE DE GRADE' },
          { title: 'Autre', value: 'AUTRE' },
        ],
        layout: 'radio',
      },
      initialValue: 'AUTRE',
    },
    {
      name: 'niveau',
      title: 'Niveau',
      type: 'string',
      options: {
        list: [
          { title: 'Fédéral (F)', value: 'F' },
          { title: 'Ligue (L)', value: 'L' },
          { title: 'Départemental (D)', value: 'D' },
        ],
        layout: 'radio',
      },
    },
    {
      name: 'lieu',
      title: 'Lieu (salle / dojo)',
      type: 'string',
    },
    {
      name: 'adresse',
      title: 'Adresse',
      type: 'string',
    },
    {
      name: 'ville',
      title: 'Ville',
      type: 'string',
    },
    {
      name: 'code_postal',
      title: 'Code postal',
      type: 'string',
    },
    {
      name: 'discipline',
      title: 'Discipline',
      type: 'string',
      initialValue: 'JUDO JUJITSU',
    },
    {
      name: 'annule',
      title: 'Annulé',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'lien_url',
      title: 'Lien (inscriptions, infos…)',
      type: 'url',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    },
  ],
}
