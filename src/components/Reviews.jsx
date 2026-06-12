// Reviews.jsx
// ---------------------------------------------------------------
// The "Google Reviews" section.
//
// IMPORTANT — how live Google reviews work:
//   A plain website cannot pull Google reviews by itself (Google
//   needs a secret key, blocks direct browser requests, and forbids
//   storing reviews yourself). The normal solution is a FREE review
//   widget service that connects to your Google Business Profile and
//   keeps the reviews refreshed automatically.
//
// ---------------------------------------------------------------
//  HOW TO TURN ON LIVE, AUTO-REFRESHING REVIEWS  (one-time, ~5 min)
// ---------------------------------------------------------------
//  1. Make a free account at  https://featurable.com   (it auto-
//     refreshes Google reviews about every 2 days — no cost).
//     (Elfsight or Trustindex work the same way if you prefer.)
//  2. Connect your "Customized Tees" Google Business Profile and
//     create a widget. They give you a little embed snippet:
//        - a <div ...> with an id or data-attribute
//        - one <script src="..."> line
//  3. Paste those two pieces into the two settings just below, then
//     run  npm run build.
//
//  Until you fill these in, the section shows the sample reviews
//  below so the page still looks complete.
// ---------------------------------------------------------------

// The widget's container tag (from Featurable).
const REVIEW_WIDGET_HTML =
  '<div id="featurable-2ab477c1-d545-4bf3-8830-f2623cc1cc84" data-featurable-async></div>'

// The widget's script URL (from Featurable).
const REVIEW_WIDGET_SCRIPT = 'https://featurable.com/assets/bundle.js'

import { useEffect, useRef } from 'react'
import Reveal from './Reveal.jsx'

// Sample reviews shown until the live widget is connected.
const FALLBACK_REVIEWS = [
  { text: 'Got my graduation shirt printed in 10 minutes. Quality is insane for the price. Walking in was the best decision.', who: 'Marissa T. · Jefferson Mall' },
  { text: 'Did 40 shirts for our family reunion. They knocked it out same day with zero stress. Will definitely come back.', who: 'Devon R. · St Matthews' },
  { text: 'The team helped me design a memorial shirt for my grandma. They were so kind and the print came out beautiful.', who: 'Ashley M. · Jefferson Mall' }
]

export default function Reviews() {
  const widgetRef = useRef(null)
  const usingWidget = REVIEW_WIDGET_HTML.trim() !== ''

  // When a widget is configured, drop its container in and load its
  // script once. The widget then fetches + refreshes reviews itself.
  useEffect(() => {
    if (!usingWidget || !widgetRef.current) return
    widgetRef.current.innerHTML = REVIEW_WIDGET_HTML
    if (REVIEW_WIDGET_SCRIPT) {
      const s = document.createElement('script')
      s.src = REVIEW_WIDGET_SCRIPT
      s.async = true
      document.body.appendChild(s)
    }
  }, [usingWidget])

  return (
    <section className="block">
      <div className="container">
        <Reveal>
          <div className="section-title">
            <div className="kicker">★ Google Reviews</div>
            <h2>What Louisville <span className="accent-orange">Says</span></h2>
            <p>Real reviews from our two locations.</p>
          </div>
        </Reveal>

        {usingWidget ? (
          // Live, auto-refreshing widget
          <div ref={widgetRef} />
        ) : (
          // Fallback sample reviews
          <div className="reviews">
            {FALLBACK_REVIEWS.map((r, i) => (
              <Reveal className="review" key={i}>
                <div className="stars">★★★★★</div>
                <p>"{r.text}"</p>
                <div className="who">— {r.who}</div>
              </Reveal>
            ))}
          </div>
        )}

        <div className="center mt">
          <a
            className="btn outline"
            href="https://www.google.com/search?q=customized+tees+louisville"
            target="_blank"
            rel="noopener noreferrer"
          >
            See All Reviews on Google
          </a>
        </div>
      </div>
    </section>
  )
}
