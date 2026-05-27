'use client'

import { useEffect, useRef } from 'react'

const DOJO = [48.39415812948277, 6.975715291354678]

const PIN_SVG = `
<svg width="28" height="38" viewBox="0 0 28 38" fill="none" xmlns="http://www.w3.org/2000/svg"
  style="filter:drop-shadow(0 2px 5px rgba(0,0,0,0.5))">
  <path d="M14 0C6.268 0 0 6.268 0 14c0 9.333 14 24 14 24S28 23.333 28 14C28 6.268 21.732 0 14 0z" fill="#E21E26"/>
  <circle cx="14" cy="14" r="5.5" fill="white"/>
</svg>`

export default function DojoMap() {
  const containerRef = useRef(null)
  const mapRef       = useRef(null)

  useEffect(() => {
    let cancelled = false

    import('leaflet').then((mod) => {
      if (cancelled || !containerRef.current) return

      const L = mod.default

      // CSS Leaflet
      if (!document.querySelector('link[href*="leaflet"]')) {
        const link = document.createElement('link')
        link.rel  = 'stylesheet'
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
        document.head.appendChild(link)
      }

      // Nettoyer toute instance précédente sur ce container
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
      delete containerRef.current._leaflet_id

      const map = L.map(containerRef.current, {
        center:          DOJO,
        zoom:            17,
        scrollWheelZoom: false,
        zoomControl:     true,
      })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map)

      const redIcon = L.divIcon({
        className:  '',
        html:       PIN_SVG,
        iconSize:   [28, 38],
        iconAnchor: [14, 38],
      })

      L.marker(DOJO, { icon: redIcon }).addTo(map)
      mapRef.current = map
    })

    return () => {
      cancelled = true
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
}
