export const horaires = {
  name: 'horaires',
  title: 'Horaires',
  type: 'document',
  preview: {
    select: { title: 'discipline' },
  },
  fields: [
    {
      name: 'discipline',
      title: 'Discipline',
      type: 'string',
      readOnly: true,
      hidden: true,
    },
    {
      name: 'groupes',
      title: 'Groupes',
      type: 'array',
      of: [
        {
          type: 'object',
          preview: { select: { title: 'label' } },
          fields: [
            { name: 'label',      title: 'Nom du groupe / Jour', type: 'string' },
            { name: 'sous_titre', title: 'Sous-titre',           type: 'string' },
            {
              name: 'creneaux',
              title: 'Créneaux',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'jour',    title: 'Jour',    type: 'string' },
                    { name: 'heure',   title: 'Heure',   type: 'string' },
                    { name: 'complet', title: 'Complet', type: 'boolean' },
                  ],
                },
              ],
            },
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
