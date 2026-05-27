import React, { useState, useCallback, useRef } from 'react'
import { definePlugin } from 'sanity'
import { useClient } from 'sanity'

// ─── Helpers ─────────────────────────────────────────────────────────────────

function detectCategorie(titre) {
  const t = (titre || '').toUpperCase()
  if (
    t.includes('PASSAGE DE GRADE') || t.includes('EXAMEN') ||
    t.includes('UV1') || t.includes('UV2') || t.includes('UV3') ||
    (t.includes('SHIAI') && !t.includes('TOURNOI'))
  ) return 'PASSAGE DE GRADE'
  if (t.includes('STAGE') || t.includes('ENTRAINEMENT') || t.includes('CAMP')) return 'STAGE'
  if (
    t.includes('TOURNOI') || t.includes('CHAMPIONNAT') || t.includes('OPEN') ||
    t.includes('CIRCUIT') || t.includes('COUPE') || t.includes('CUP') ||
    t.includes('GRAND PRIX') || t.includes('EUROPEAN')
  ) return 'COMPÉTITION'
  return 'AUTRE'
}

function parseDate(raw) {
  if (!raw) return null
  const s = raw.trim()
  if (!s || s === '01/01/1970') return null
  const parts = s.split('/')
  if (parts.length !== 3) return null
  const [d, m, y] = parts
  if (!d || !m || !y || y === '1970') return null
  return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`
}

function decodeText(text) {
  // Fix common Latin-1 → UTF-8 mangled chars that appear when reading latin1 as utf8
  return text
    .replace(/é/g, 'é').replace(/è/g, 'è').replace(/ê/g, 'ê')
    .replace(/à/g, 'à').replace(/ù/g, 'ù').replace(/û/g, 'û')
    .replace(/î/g, 'î').replace(/ï/g, 'ï').replace(/ô/g, 'ô')
    .replace(/ç/g, 'ç').replace(/«/g, '«').replace(/»/g, '»')
    .replace(/â/g, 'â').replace(/œ/g, 'œ').replace(/æ/g, 'æ')
    .replace(/[^\x20-\x7EÀ-ɏ\n\r\t]/g, '')
}

function parseCSV(rawText) {
  const text = decodeText(rawText)
  const lines = text.split(/\r?\n/).filter((l) => l.trim())
  const events = []

  // Skip header (line 0)
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(';')
    if (cols.length < 11) continue

    const titreRaw = (cols[2] || '').trim()
    if (!titreRaw) continue

    const annule = titreRaw.toUpperCase().startsWith('ANNULE')
    const titre = titreRaw.replace(/^ANNULE\s*/i, '').trim()
    const date_debut = parseDate(cols[0])
    if (!date_debut) continue

    events.push({
      titre,
      date_debut,
      date_fin:    parseDate(cols[1]) || undefined,
      adresse:     (cols[3] || '').trim() || undefined,
      code_postal: (cols[4] || '').trim() || undefined,
      ville:       (cols[5] || '').trim() || undefined,
      lieu:        (cols[6] || '').trim() || undefined,
      niveau:      (cols[9] || '').trim() || undefined,
      discipline:  (cols[10] || '').trim() || undefined,
      categorie:   detectCategorie(titreRaw),
      annule,
    })
  }

  return events
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const s = {
  page:    { padding: '2rem', maxWidth: '960px', margin: '0 auto', fontFamily: "'Inter', system-ui, sans-serif", fontSize: '14px', color: '#1a1a1a' },
  h1:      { fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.5rem' },
  lead:    { color: '#555', marginBottom: '1.5rem', lineHeight: '1.6' },
  dropzone:{ border: '2px dashed #bbb', borderRadius: '10px', padding: '2.5rem', textAlign: 'center', cursor: 'pointer', backgroundColor: '#f7f7f7', transition: 'border-color 0.2s', marginBottom: '1.5rem' },
  dropActive: { borderColor: '#0070f3', backgroundColor: '#e8f4ff' },
  label:   { color: '#0070f3', textDecoration: 'underline', cursor: 'pointer' },
  hint:    { display: 'block', color: '#999', fontSize: '12px', marginTop: '0.4rem' },
  alert:   (type) => ({
    padding: '0.75rem 1rem', borderRadius: '6px', marginBottom: '1rem',
    backgroundColor: type === 'error' ? '#fff0f0' : '#f0fff4',
    color: type === 'error' ? '#c00' : '#166534',
    border: `1px solid ${type === 'error' ? '#fca5a5' : '#86efac'}`,
  }),
  bar:     { display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' },
  count:   { fontWeight: '600', fontSize: '0.9rem' },
  btn:     (disabled) => ({
    backgroundColor: disabled ? '#93c5fd' : '#0070f3',
    color: 'white', border: 'none', padding: '0.5rem 1.25rem',
    borderRadius: '6px', cursor: disabled ? 'not-allowed' : 'pointer',
    fontWeight: '600', fontSize: '0.85rem',
  }),
  btnDanger: { backgroundColor: '#dc2626', color: 'white', border: 'none', padding: '0.4rem 1rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' },
  table:   { width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' },
  th:      { padding: '0.5rem 0.6rem', textAlign: 'left', borderBottom: '2px solid #e5e7eb', fontWeight: '600', backgroundColor: '#f3f4f6', whiteSpace: 'nowrap' },
  td:      (annule) => ({ padding: '0.45rem 0.6rem', borderBottom: '1px solid #f0f0f0', color: annule ? '#999' : 'inherit', textDecoration: annule ? 'line-through' : 'none' }),
  badge:   (c) => {
    const map = { COMPÉTITION: '#dc2626', STAGE: '#d97706', 'PASSAGE DE GRADE': '#7c3aed', AUTRE: '#6b7280' }
    const bg = map[c] || map.AUTRE
    return { display: 'inline-block', padding: '1px 6px', borderRadius: '4px', fontSize: '11px', backgroundColor: bg + '20', color: bg, fontWeight: '600', border: `1px solid ${bg}50` }
  },
  niveauBadge: (n) => {
    const map = { F: '#0070f3', L: '#059669', D: '#6b7280' }
    const c = map[n] || map.D
    return { display: 'inline-block', padding: '1px 5px', borderRadius: '4px', fontSize: '10px', backgroundColor: c + '15', color: c, fontWeight: '600', border: `1px solid ${c}40` }
  },
  progress: { margin: '1rem 0', padding: '0.75rem 1rem', backgroundColor: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '6px', color: '#0369a1' },
}

const NIVEAU_LABEL = { F: 'Fédéral', L: 'Ligue', D: 'Départ.' }

// ─── Component ────────────────────────────────────────────────────────────────

function CsvImportTool() {
  const client = useClient({ apiVersion: '2024-01-01' })
  const [events, setEvents] = useState([])
  const [importing, setImporting] = useState(false)
  const [progress, setProgress] = useState(null)
  const [result, setResult]   = useState(null)
  const [error, setError]     = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const fileRef = useRef(null)

  const processFile = useCallback((file) => {
    if (!file) return
    if (!file.name.endsWith('.csv')) {
      setError('Veuillez sélectionner un fichier .csv')
      return
    }
    setResult(null)
    setError(null)
    setProgress(null)

    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const parsed = parseCSV(ev.target.result)
        if (!parsed.length) {
          setError('Aucun événement valide trouvé dans ce fichier. Vérifiez le format (séparateur ";" attendu).')
        } else {
          setEvents(parsed)
        }
      } catch (err) {
        setError('Erreur lors de la lecture : ' + err.message)
      }
    }
    reader.onerror = () => setError('Impossible de lire le fichier.')
    // Try latin1 first (FFJudo CSVs are often latin1)
    reader.readAsText(file, 'windows-1252')
  }, [])

  const handleFileInput = useCallback((e) => {
    processFile(e.target.files?.[0])
    e.target.value = '' // allow re-selecting same file
  }, [processFile])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setDragOver(false)
    processFile(e.dataTransfer.files?.[0])
  }, [processFile])

  const handleImport = useCallback(async () => {
    if (!events.length || importing) return
    setImporting(true)
    setResult(null)
    setError(null)

    try {
      const CHUNK = 20
      let done = 0
      for (let i = 0; i < events.length; i += CHUNK) {
        const chunk = events.slice(i, i + CHUNK)
        const tx = client.transaction()
        for (const ev of chunk) {
          tx.create({ _type: 'evenements', ...ev })
        }
        await tx.commit()
        done += chunk.length
        setProgress(`Import en cours… ${done} / ${events.length}`)
      }
      setResult(`✅ ${events.length} événement${events.length > 1 ? 's' : ''} importé${events.length > 1 ? 's' : ''} avec succès !`)
      setEvents([])
    } catch (err) {
      setError('Erreur lors de l\'import Sanity : ' + (err.message || err))
    } finally {
      setImporting(false)
      setProgress(null)
    }
  }, [client, events, importing])

  const handleClear = () => {
    setEvents([])
    setResult(null)
    setError(null)
    setProgress(null)
  }

  return (
    <div style={s.page}>
      <h1 style={s.h1}>📥 Import CSV d'événements</h1>
      <p style={s.lead}>
        Importez un fichier CSV au format <strong>FFJudo</strong> (séparateur <code>;</code>).
        Les événements seront ajoutés à la collection <strong>Événements</strong> du CMS
        et s'afficheront automatiquement sur le site.
      </p>

      {/* Drop zone */}
      <div
        style={{ ...s.dropzone, ...(dragOver ? s.dropActive : {}) }}
        onClick={() => fileRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📂</div>
        <span style={s.label}>Cliquer pour choisir un fichier</span>
        {' '}ou glisser-déposer ici
        <span style={s.hint}>Format attendu : CSV avec séparateur ";" (export FFJudo)</span>
        <input
          ref={fileRef}
          type="file"
          accept=".csv,text/csv"
          onChange={handleFileInput}
          style={{ display: 'none' }}
        />
      </div>

      {/* Messages */}
      {error  && <div style={s.alert('error')}>{error}</div>}
      {result && <div style={s.alert('success')}>{result}</div>}
      {progress && <div style={s.progress}>{progress}</div>}

      {/* Preview & import */}
      {events.length > 0 && (
        <>
          <div style={s.bar}>
            <span style={s.count}>
              {events.length} événement{events.length > 1 ? 's' : ''} détecté{events.length > 1 ? 's' : ''}
              {' '}({events.filter(e => e.annule).length} annulé{events.filter(e => e.annule).length > 1 ? 's' : ''})
            </span>
            <button
              onClick={handleImport}
              disabled={importing}
              style={s.btn(importing)}
            >
              {importing ? 'Import en cours…' : `Importer ${events.length} événements →`}
            </button>
            <button onClick={handleClear} style={s.btnDanger}>
              Annuler
            </button>
          </div>

          <p style={{ color: '#888', fontSize: '12px', marginBottom: '0.75rem' }}>
            💡 Les événements seront ajoutés aux existants (pas de suppression).
            Les événements marqués <em>Annulé</em> sont importés mais désactivés.
          </p>

          <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
            <table style={s.table}>
              <thead>
                <tr>
                  {['Date', 'Titre', 'Catégorie', 'Niveau', 'Lieu / Ville', 'Statut'].map(h => (
                    <th key={h} style={s.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {events.map((ev, i) => (
                  <tr key={i}>
                    <td style={s.td(ev.annule)}>
                      {ev.date_debut
                        ? new Date(ev.date_debut + 'T00:00:00').toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: '2-digit' })
                        : '—'}
                    </td>
                    <td style={{ ...s.td(ev.annule), maxWidth: '260px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {ev.titre}
                    </td>
                    <td style={s.td(ev.annule)}>
                      <span style={s.badge(ev.categorie)}>{ev.categorie}</span>
                    </td>
                    <td style={s.td(ev.annule)}>
                      {ev.niveau && <span style={s.niveauBadge(ev.niveau)}>{NIVEAU_LABEL[ev.niveau] ?? ev.niveau}</span>}
                    </td>
                    <td style={{ ...s.td(ev.annule), maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {[ev.lieu, ev.ville].filter(Boolean).join(' — ') || '—'}
                    </td>
                    <td style={s.td(ev.annule)}>
                      {ev.annule ? '❌ Annulé' : '✅'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}

// ─── Plugin ───────────────────────────────────────────────────────────────────

const CalendarIcon = () => (
  React.createElement('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, width: 20, height: 20 },
    React.createElement('rect', { x: 3, y: 4, width: 18, height: 18, rx: 2 }),
    React.createElement('line', { x1: 16, y1: 2, x2: 16, y2: 6 }),
    React.createElement('line', { x1: 8, y1: 2, x2: 8, y2: 6 }),
    React.createElement('line', { x1: 3, y1: 10, x2: 21, y2: 10 }),
  )
)

export const csvImportPlugin = definePlugin({
  name: 'csv-import',
  tools: [
    {
      name: 'csv-import',
      title: 'Import CSV',
      icon: CalendarIcon,
      component: CsvImportTool,
    },
  ],
})
