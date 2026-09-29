import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import uploadedDesigns from '../lib/uploaded-designs.json'
import { CATEGORIES } from '../lib/catalog.js'
import { assetUrl, cloudUrl } from '../lib/images.js'
import Reveal from './Reveal.jsx'
import SiteImage from './SiteImage.jsx'

export default function DesignGallery({ query, onQueryChange }) {
  const [cloudDesigns, setCloudDesigns] = useState(null)
  useEffect(() => {
    const controller = new AbortController()
    fetch('/.netlify/functions/catalog', { signal: controller.signal })
      .then(response => response.ok ? response.json() : null)
      .then(data => { if (Array.isArray(data?.designs)) setCloudDesigns(data.designs) })
      .catch(() => { /* Known uploaded designs remain available offline. */ })
    return () => controller.abort()
  }, [])
  const normalized = query.toLowerCase().trim()
  const concepts = CATEGORIES.map(cat => ({ ...cat, id: `concept-${cat.slug}`, image: assetUrl(cat.asset), concept: true }))
  const uploaded = (cloudDesigns ?? uploadedDesigns).map(design => ({ ...CATEGORIES.find(cat => cat.slug === design.category), ...design, image: cloudUrl(design.id, { version: design.version, contain: true }), concept: false }))
  const designs = [...uploaded, ...concepts].filter(cat =>
    `${cat.label} ${cat.slug} ${cat.title}`.toLowerCase().includes(normalized))
  return (
    <section className="block" id="designs">
      <div className="container">
        <Reveal><div className="section-title">
          <div className="kicker">Browse Designs</div>
          <h2>Find Your <span className="accent-orange">Inspiration</span></h2>
          <p>Browse uploaded designs and AI-generated concept mockups. Our team confirms final artwork, availability and pricing.</p>
        </div></Reveal>
        <div className="search-bar">
          <input type="search" id="design-search" value={query}
            onChange={e => onQueryChange(e.target.value)}
            placeholder="Search designs or themes…" aria-label="Search designs" />
          {query && <button id="search-clear" aria-label="Clear search" onClick={() => onQueryChange('')}>✕</button>}
        </div>
        <p className="search-results-count" aria-live="polite">
          {designs.length} design example{designs.length === 1 ? '' : 's'}{query ? ` for “${query}”` : ''}
        </p>
        <div className="design-grid">
          {designs.map(cat => <article className="design-card" key={cat.id}>
            <div className="design-card__image-wrap">
              <SiteImage className="design-card__img" src={cat.image} alt={`${cat.title}, ${cat.concept ? 'illustrative' : 'uploaded'} ${cat.label.toLowerCase()} design`} />
            </div>
            <div className="design-card__info">
              <h3 className="design-card__title">{cat.title}</h3>
              <p className="design-card__description">{cat.label} · {cat.concept ? 'AI concept mockup' : 'Uploaded design'}</p>
              <div className="design-card__footer">
                <Link className="btn design-card__cta" to={`/customize?design=${encodeURIComponent(cat.title)}`} state={{ scrollTo: 'order-form' }}>Request This Design</Link>
              </div>
            </div>
          </article>)}
        </div>
        {!designs.length && <p className="no-results">No designs match “{query}”. Try another theme or <Link to="/customize">send us your idea</Link>.</p>}
      </div>
    </section>
  )
}
