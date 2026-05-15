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
  const data = await client.fetch(`
    *[_type == "tarifs"] {
      discipline,
      lignes[] { label, prix, note }
    }
  `)
  return data.sort((a, b) =>
    DISCIPLINE_ORDER.indexOf(a.discipline) - DISCIPLINE_ORDER.indexOf(b.discipline)
  )
}

export async function getPartenaires() {
  return client.fetch(`
    *[_type == "partenaires"] | order(ordre asc) {
      nom,
      logo,
      url
    }
  `)
}

export async function getGalerie(discipline) {
  const filter = discipline
    ? `*[_type == "galerie" && discipline == "${discipline}"]`
    : `*[_type == "galerie"]`
  return client.fetch(`
    ${filter} | order(ordre asc) {
      photo { asset, alt, legende },
      discipline
    }
  `)
}

export async function getParametres() {
  return client.fetch(`*[_type == "parametres"][0]{
    ...,
    photo_hero { asset },
    photo_about { asset },
    photo_judo { asset },
    photo_pilates { asset },
    photo_cardio { asset }
  }`)
}
