import { client } from './sanity'

const DISCIPLINE_ORDER = ['Judo', 'Pilates', 'Cardio-Training']

export async function getHoraires() {
  const data = await client.fetch(
    `*[_type == "horaires"] {
      discipline,
      groupes[] {
        label,
        sous_titre,
        creneaux[] { jour, heure, complet }
      }
    }`,
    {},
    { cache: 'no-store' }
  )
  return data.sort((a, b) =>
    DISCIPLINE_ORDER.indexOf(a.discipline) - DISCIPLINE_ORDER.indexOf(b.discipline)
  )
}

export async function getTarifs() {
  const data = await client.fetch(
    `*[_type == "tarifs"] {
      discipline,
      lignes[] { label, prix, note }
    }`,
    {},
    { cache: 'no-store' }
  )
  return data.sort((a, b) =>
    DISCIPLINE_ORDER.indexOf(a.discipline) - DISCIPLINE_ORDER.indexOf(b.discipline)
  )
}

export async function getPartenaires() {
  return client.fetch(
    `*[_type == "partenaires"] | order(ordre asc) {
      nom,
      logo,
      url
    }`,
    {},
    { cache: 'no-store' }
  )
}

export async function getGalerie(discipline) {
  const id = discipline.toLowerCase().replace('-', '')
  return client.fetch(
    `*[_type == "galerie" && _id == $id][0].photos[] { asset, alt, legende }`,
    { id: `galerie-${id}` }
  )
}

export async function getActualites({ limit } = {}) {
  const slice = limit ? `[0...${limit}]` : ''
  return client.fetch(
    `*[_type == "actualites"] | order(date desc)${slice} {
      _id, titre, date, discipline, texte,
      photo { asset },
      lien_url, lien_label
    }`,
    {},
    { cache: 'no-store' }
  )
}

export async function countActualites() {
  return client.fetch(`count(*[_type == "actualites"])`, {}, { cache: 'no-store' })
}

export async function getActualiteById(id) {
  return client.fetch(
    `*[_type == "actualites" && _id == $id][0] {
      _id, titre, date, discipline, texte,
      photo { asset },
      lien_url, lien_label
    }`,
    { id },
    { cache: 'no-store' }
  )
}

export async function getEvenements({ limit } = {}) {
  const today = new Date().toISOString().split('T')[0]
  const slice = limit ? `[0...${limit}]` : ''
  return client.fetch(
    `*[_type == "evenements" && date_debut >= $today] | order(date_debut asc)${slice} {
      _id, titre, date_debut, date_fin, categorie, niveau,
      lieu, ville, code_postal, adresse, discipline,
      annule, lien_url, description
    }`,
    { today },
    { cache: 'no-store' }
  )
}

export async function getParametres() {
  return client.fetch(
    `*[_type == "parametres"][0]{
      ...,
      photo_hero { asset },
      photo_hero_mobile { asset },
      photo_about { asset },
      photo_judo { asset },
      photo_pilates { asset },
      photo_cardio { asset }
    }`,
    {},
    { cache: 'no-store' }
  )
}
