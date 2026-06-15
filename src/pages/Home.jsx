// Home.jsx
// ---------------------------------------------------------------
// The first page visitors see.
// Sections (top to bottom):
//   1. Hero          — big intro with extra decorative paint art
//   2. Marquee       — slow scrolling list of services (spaced out)
//   3. Bulk Banner   — "we do bulk fast, no minimum"
//   4. Why Choose Us — three feature cards
//   5. Gallery       — six sample designs
//   6. Reviews       — what customers say (Google reviews)
//   7. Care          — how to take care of your shirt
//   8. Locations CTA — orange + blue cards at the bottom
// ---------------------------------------------------------------

import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import Reviews from '../components/Reviews.jsx'
import { designs } from '../data/designs.js'

// Helper: grab the first design image from a given category so the
// "Recent Work" cards show real pictures from our catalog.
const firstImage = (category) =>
  designs.find((d) => d.category === category && d.image)?.image || ''

// The six "Recent Work" cards. Edit the tags/labels here, or swap the
// category to change which catalog picture shows.
const recentWork = [
  { tag: 'ANIME',    badge: 'orange', label: 'Anime Prints',    image: firstImage('anime') },
  { tag: 'BIRTHDAY', badge: 'blue',   label: 'Birthday Bash',   image: firstImage('birthdays') },
  { tag: 'MEMORIAL', badge: 'pink',   label: 'In Loving Memory', image: firstImage('memorial') },
  { tag: 'NBA',      badge: 'orange', label: 'Hoops Season',    image: firstImage('nba') },
  { tag: 'COUPLES',  badge: 'blue',   label: 'His & Hers',      image: firstImage('couples') },
  { tag: 'FOOTBALL', badge: 'pink',   label: 'Game Day',        image: firstImage('football') }
]

export default function Home() {
  return (
    <div>
      {/* ============ HERO ============ */}
      <section className="hero">
        {/* Big blurred color blobs in the background for energy */}
        <div className="blob b-orange" />
        <div className="blob b-blue" />
        <div className="blob b-pink" />

        {/* Decorative animated paint drips */}
        <span className="drop" style={{ left: '8%',  animationDelay: '0s',   background: 'var(--orange)' }} />
        <span className="drop" style={{ left: '20%', animationDelay: '1.2s', background: 'var(--blue)'   }} />
        <span className="drop" style={{ left: '40%', animationDelay: '2.4s', background: 'var(--pink)'   }} />
        <span className="drop" style={{ left: '62%', animationDelay: '0.7s', background: 'var(--orange)' }} />
        <span className="drop" style={{ left: '80%', animationDelay: '3s',   background: 'var(--blue)'   }} />
        <span className="drop" style={{ left: '92%', animationDelay: '1.8s', background: 'var(--pink)'   }} />

        {/* Floating shirt emojis on the sides — pure decoration */}
        <div className="float-shirt s1">👕</div>
        <div className="float-shirt s2">👕</div>
        <div className="float-shirt s3">✦</div>
        <div className="float-shirt s4">✦</div>

        <div className="hero-inner">
          <div className="badge">EST. 2015 · LOUISVILLE, KY</div>
          <h1>
            Your <span className="accent-orange">Style.</span><br />
            Your <span className="accent-blue">Way.</span><br />
            In Store Today.
          </h1>
          <p className="sub">
            Custom printing in under 15 minutes — at both Louisville mall locations.
          </p>
          <div className="cta-row">
            <Link className="btn" to="/customize" state={{ scrollTo: 'order-form' }}>Design Something Custom</Link>
            <Link className="btn outline" to="/about">Find Us</Link>
          </div>

          {/* Quick stats row to fill the hero with more life */}
          <div className="stats">
            <div className="stat"><div className="num">15<span>min</span></div><p>Average Turnaround</p></div>
            <div className="stat"><div className="num">280<span>+</span></div><p>Ready-Made Designs</p></div>
            <div className="stat"><div className="num">2<span>×</span></div><p>Mall Locations</p></div>
            <div className="stat"><div className="num">10<span>yr</span></div><p>Serving Louisville</p></div>
          </div>
        </div>
      </section>

      {/* ============ MARQUEE — scrolling services (spaced out) ============ */}
      <div className="marquee">
        <div className="marquee-track">
          {/* Big gaps between words so the ribbon doesn't feel packed */}
          <span>CUSTOM TEES&nbsp;&nbsp;&nbsp;✦&nbsp;&nbsp;&nbsp;GRADUATION&nbsp;&nbsp;&nbsp;✦&nbsp;&nbsp;&nbsp;MEMORIAL SHIRTS&nbsp;&nbsp;&nbsp;✦&nbsp;&nbsp;&nbsp;TEAM UNIFORMS&nbsp;&nbsp;&nbsp;✦&nbsp;&nbsp;&nbsp;BIRTHDAYS&nbsp;&nbsp;&nbsp;✦&nbsp;&nbsp;&nbsp;EVENTS&nbsp;&nbsp;&nbsp;✦&nbsp;&nbsp;&nbsp;BUSINESS APPAREL&nbsp;&nbsp;&nbsp;✦&nbsp;&nbsp;&nbsp;SAME-DAY PRINTING&nbsp;&nbsp;&nbsp;✦&nbsp;&nbsp;&nbsp;</span>
          <span>CUSTOM TEES&nbsp;&nbsp;&nbsp;✦&nbsp;&nbsp;&nbsp;GRADUATION&nbsp;&nbsp;&nbsp;✦&nbsp;&nbsp;&nbsp;MEMORIAL SHIRTS&nbsp;&nbsp;&nbsp;✦&nbsp;&nbsp;&nbsp;TEAM UNIFORMS&nbsp;&nbsp;&nbsp;✦&nbsp;&nbsp;&nbsp;BIRTHDAYS&nbsp;&nbsp;&nbsp;✦&nbsp;&nbsp;&nbsp;EVENTS&nbsp;&nbsp;&nbsp;✦&nbsp;&nbsp;&nbsp;BUSINESS APPAREL&nbsp;&nbsp;&nbsp;✦&nbsp;&nbsp;&nbsp;SAME-DAY PRINTING&nbsp;&nbsp;&nbsp;✦&nbsp;&nbsp;&nbsp;</span>
        </div>
      </div>

      {/* ============ BULK ORDERS BANNER ============ */}
      <section className="bulk-banner">
        <div className="container">
          <Reveal className="bulk-inner">
            <div className="bulk-ico">📦</div>
            <div className="bulk-text">
              <h2>Bulk Orders? <span className="accent-orange">We Got You.</span></h2>
              <p>
                Bulk pricing starts at <strong>15 shirts</strong> — and we print fast.
                Walk in or send your design and we'll have your bulk order ready
                quicker than anyone in town.
              </p>
            </div>
            <Link className="btn big" to="/customize" state={{ scrollTo: 'order-form' }}>Start Bulk Order</Link>
          </Reveal>
        </div>
      </section>

      {/* ============ PINNED BILLBOARD ============
          A tall section where the giant headline "sticks" while the
          three-line description scrolls past it — inspired by big
          editorial sites. Pure CSS (position: sticky). */}
      <section className="billboard">
        <div className="container">
          <div className="billboard-grid">
            <div className="billboard-sticky">
              <p className="kicker">★ Our Philosophy</p>
              <h2>
                Any <span className="accent-orange">Design.</span><br />
                Any <span className="accent-pink">Occasion.</span><br />
                Any <span className="accent-blue">Day.</span>
              </h2>
            </div>
            <div className="billboard-body">
              <Reveal>
                <h3>01 — Walk In</h3>
                <p>Step into either mall location with nothing but an idea. No appointment, no design files needed. Our team picks it up from there.</p>
              </Reveal>
              <Reveal>
                <h3>02 — We Design</h3>
                <p>We mock it up on the spot — colors, layout, placement. You see exactly what you're getting before a single shirt is pressed.</p>
              </Reveal>
              <Reveal>
                <h3>03 — Walk Out</h3>
                <p>Same-day pickup. Most orders are done in 15 minutes. Bigger bulk runs ship out faster than anywhere else in Louisville.</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ============ HALL OF FAME — horizontal scroll ============
          A landonorris-style horizontal showcase. Drag/swipe to
          browse our biggest custom prints. Each card is wide and
          bold, with scroll-snap so they click into place. */}
      <section className="hof">
        <div className="container">
          <Reveal>
            <div className="hof-head">
              <div>
                <div className="kicker">★ Hall Of Designs</div>
                <h2>Some of Our <span className="accent-orange">Greatest Hits</span></h2>
              </div>
              <p className="muted">← swipe / scroll →</p>
            </div>
          </Reveal>
        </div>
        <div className="hof-track">
          {[
            // "img" = optional real photo. Save photos into public/hof/
            // (e.g. public/hof/1.jpg) and they appear automatically.
            // If a photo is missing the card falls back to the colored
            // gradient + the big icon, so it never looks empty.
            { title: 'Class Of 2025',    tag: 'GRADUATION', c: 'c1', icon: '🎓', img: 'hof/1.jpg' },
            { title: 'In Loving Memory', tag: 'MEMORIAL',   c: 'c3', icon: '🕊',  img: 'hof/2.jpg' },
            { title: 'Sweet Sixteen',    tag: 'BIRTHDAY',   c: 'c4', icon: '🎂', img: 'hof/3.jpg' },
            { title: 'Coach\'s Squad',   tag: 'SPORTS',     c: 'c6', icon: '🏆', img: 'hof/4.jpg' },
            { title: 'Family Reunion',   tag: 'EVENT',      c: 'c5', icon: '🎉', img: 'hof/5.jpg' },
            { title: 'King & Queen',     tag: 'COUPLES',    c: 'c7', icon: '💕', img: 'hof/6.jpg' },
            { title: 'Local Hustle Co.', tag: 'BUSINESS',   c: 'c2', icon: '💼', img: 'hof/7.jpg' },
            { title: 'Block Party',      tag: 'COMMUNITY',  c: 'c8', icon: '🤝', img: 'hof/8.jpg' }
          ].map((card, i) => (
            <div key={card.title} className={'hof-card ' + card.c}>
              {/* Optional real photo — hides itself if the file is
                  missing, revealing the gradient + icon underneath. */}
              <img
                className="hof-img"
                src={card.img}
                alt={card.title + ' custom shirt'}
                loading="lazy"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
              <span className="hof-icon" aria-hidden="true">{card.icon}</span>
              <span className="hof-num">{String(i + 1).padStart(2, '0')}</span>
              <div className="hof-foot">
                <div className="hof-tag">{card.tag}</div>
                <div className="hof-title">{card.title}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ WHY CHOOSE US ============ */}
      <section className="block">
        <div className="container">
          <Reveal>
            <div className="section-title">
              <div className="kicker">Why Choose Us</div>
              <h2>Print Shop. <span className="accent-orange">Reimagined.</span></h2>
            </div>
          </Reveal>

          <div className="features">
            <Reveal className="feature">
              <div className="num">01</div>
              <h3>Ready In 15 Minutes</h3>
              <p>Walk in with an idea, walk out with the shirt. Same-day printing on every order.</p>
            </Reveal>
            <Reveal className="feature">
              <div className="num">02</div>
              <h3>280+ Ready-Made Designs</h3>
              <p>Browse our wall of pre-built designs or come with your own. We've got you covered.</p>
            </Reveal>
            <Reveal className="feature">
              <div className="num">03</div>
              <h3>Custom Design Assistance</h3>
              <p>Not a designer? No problem. Our team will help you bring your vision to life.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ GALLERY ============ */}
      <section className="block alt">
        <div className="container">
          <Reveal>
            <div className="section-title">
              <div className="kicker">Recent Work</div>
              <h2>Built For <span className="accent-blue">Every Occasion</span></h2>
              <p>A peek at the kind of custom prints we do every day.</p>
            </div>
          </Reveal>

          <div className="gallery">
            {recentWork.map((w, i) => (
              <Reveal key={i} className={'card c' + (i + 1)}>
                <span className={'cbadge ' + w.badge}>{w.tag}</span>
                {/* Real design picture pulled from our catalog. Falls
                    back to the colored card if the image can't load. */}
                {w.image && (
                  <img
                    className="card-img"
                    src={w.image}
                    alt={w.label}
                    loading="lazy"
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                  />
                )}
                <span className="clabel">{w.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ GOOGLE REVIEWS ============
        Shows live auto-refreshing reviews once a free widget service
        is connected (see src/components/Reviews.jsx), otherwise sample
        reviews. */}
      <Reviews />

      {/* ============ CARE INSTRUCTIONS ============ */}
      <section className="care">
        <div className="container">
          <Reveal>
            <h2 className="care-title">Care Instructions</h2>
            <p className="care-sub">Treat your custom tee right and it'll last for years.</p>
          </Reveal>
          <div className="care-grid">
            <Reveal className="care-item"><div className="icon">👕</div><p>Turn the garment inside out</p></Reveal>
            <Reveal className="care-item"><div className="icon x">⨉</div><p>Don't bleach</p></Reveal>
            <Reveal className="care-item"><div className="icon">30°</div><p>Machine-wash cold only</p></Reveal>
            <Reveal className="care-item"><div className="icon">☀</div><p>Preferably air dry</p></Reveal>
            <Reveal className="care-item"><div className="icon">◯</div><p>Tumble dry on low heat</p></Reveal>
            <Reveal className="care-item"><div className="icon x">⨉</div><p>Don't iron the print</p></Reveal>
          </div>
        </div>
      </section>

      {/* ============ LOCATIONS CALL-TO-ACTION ============ */}
      <section className="locations-cta" id="locations">
        <div className="container">
          <Reveal>
            <h2 className="cta-heading">
              Come <span className="brand-script accent-orange">See Us</span> Today
            </h2>
          </Reveal>
          <div className="loc-grid">
            <Reveal className="loc-card orange">
              <div className="pin">📍</div>
              <h3>St Matthews</h3>
              <p>5000 Shelbyville Rd #1760<br />St Matthews, KY 40207</p>
              <a
                className="btn outline white"
                href="https://maps.google.com/?q=5000+Shelbyville+Rd+%231760+St+Matthews+KY+40207"
                target="_blank"
                rel="noopener noreferrer"
              >Get Directions</a>
            </Reveal>
            <Reveal className="loc-card blue">
              <div className="pin">📍</div>
              <h3>Jefferson Mall</h3>
              <p>4801 Outer Loop a268<br />Louisville, KY 40219</p>
              <a
                className="btn outline white"
                href="https://maps.google.com/?q=4801+Outer+Loop+a268+Louisville+KY+40219"
                target="_blank"
                rel="noopener noreferrer"
              >Get Directions</a>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
