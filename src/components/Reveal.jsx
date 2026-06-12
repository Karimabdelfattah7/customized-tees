// Reveal.jsx
// ---------------------------------------------------------------
// A tiny helper that makes its content fade in when the user
// scrolls down and it comes into view.
//
// How to use it inside any page:
//   <Reveal><h2>My Heading</h2></Reveal>
// ---------------------------------------------------------------

import { useEffect, useRef, useState } from 'react'

export default function Reveal({ children, className = '' }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    // IntersectionObserver = "tell me when this element appears on screen"
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setShown(true)
          obs.disconnect()
        }
      })
    }, { threshold: 0.12 })

    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} className={'reveal ' + (shown ? 'in ' : '') + className}>
      {children}
    </div>
  )
}
