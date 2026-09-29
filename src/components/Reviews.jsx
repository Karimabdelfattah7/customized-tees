import { useEffect, useRef } from 'react'
import Reveal from './Reveal.jsx'

const WIDGET_ID = 'featurable-2ab477c1-d545-4bf3-8830-f2623cc1cc84'
export default function Reviews() {
  const widgetRef = useRef(null)
  useEffect(() => {
    // The provider initializes its container on load. Clean up on route changes.
    const script = document.createElement('script')
    script.src = 'https://featurable.com/assets/bundle.js'
    script.async = true
    document.body.appendChild(script)
    return () => script.remove()
  }, [])
  return <section className="block"><div className="container">
    <Reveal><div className="section-title">
      <div className="kicker">Google Reviews</div>
      <h2>What Louisville <span className="accent-orange">Says</span></h2>
      <p>Read customer feedback on Google.</p>
    </div></Reveal>
    <div ref={widgetRef} id={WIDGET_ID} data-featurable-async />
    <div className="center mt"><a className="btn outline"
      href="https://www.google.com/search?q=customized+tees+louisville"
      target="_blank" rel="noopener noreferrer">See Reviews on Google</a></div>
  </div></section>
}
