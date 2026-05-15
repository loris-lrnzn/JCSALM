export const parametres = {
  name: 'parametres',
  title: 'Paramètres du site',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    { name: 'adresse',  title: 'Adresse',    type: 'string' },
    { name: 'email',    title: 'Email',      type: 'string' },
    { name: 'telephone',title: 'Téléphone',  type: 'string' },
    { name: 'facebook', title: 'URL Facebook', type: 'url'  },
    { name: 'annee_fondation', title: 'Année de fondation', type: 'string' },
    { name: 'nb_licencies',    title: 'Nombre de licenciés', type: 'string' },
    { name: 'nb_ceintures_noires', title: 'Ceintures noires', type: 'string' },
  ],
}
