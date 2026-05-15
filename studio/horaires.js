export const horaires = {
  name: 'horaires',
  title: 'Horaires',
  type: 'document',
  fields: [
    {
      name: 'discipline',
      title: 'Discipline',
      type: 'string',
      options: { list: ['Judo', 'Pilates', 'Cardio-Training'] },
    },
    {
      name: 'label',
      title: 'Groupe / Jour',
      type: 'string',
    },
    {
      name: 'sous_titre',
      title: 'Sous-titre (ex: nés en 2016 à 2019)',
      type: 'string',
    },
    {
      name: 'creneaux',
      title: 'Créneaux',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'jour',    title: 'Jour',   type: 'string' },
            { name: 'heure',   title: 'Heure',  type: 'string' },
            { name: 'complet', title: 'Complet', type: 'boolean' },
          ],
        },
      ],
    },
    {
      name: 'ordre',
      title: 'Ordre d\'affichage',
      type: 'number',
    },
  ],
}
