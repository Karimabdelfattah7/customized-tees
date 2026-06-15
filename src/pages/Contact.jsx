// Contact.jsx
// ---------------------------------------------------------------
// Simple contact page. Two big cards — one to call/text, one to
// email — plus a "walk in" reminder at the bottom.
// ---------------------------------------------------------------

import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'

export default function Contact() {
  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <div className="kicker">Get In Touch</div>
          <h1>Let's Make<br />Something Wild.</h1>
          <p>Text, email, or stop by either of our mall locations.</p>
        </div>
      </div>

      <section className="block">
        <div className="container">
          <div className="location-cards">
            <Reveal className="loc-detail orange">
              <div className="head"><h3>Text or Call</h3></div>
              <div className="body center">
                <div className="big-script orange-text">502-232-3703</div>
                <p>Fastest way to reach us. Text us a design — we'll quote and confirm.</p>
                <a className="btn" href="tel:5022323703">Call Now</a>
              </div>
            </Reveal>

            <Reveal className="loc-detail blue">
              <div className="head"><h3>Email Us</h3></div>
              <div className="body center">
                <div className="big-script blue-text break">customizedtees502@gmail.com</div>
                <p>Send a design file, reference image, or full project details.</p>
                <a className="btn" href="mailto:customizedtees502@gmail.com">Send Email</a>
              </div>
            </Reveal>
          </div>

          <Reveal className="walk-in">
            <h2>
              Or Just <span className="brand-script accent-orange">Walk In</span>
            </h2>
            <p>Jefferson Mall &nbsp;·&nbsp; St Matthews Mall &nbsp;·&nbsp; Louisville, KY</p>
            <Link className="btn" to="/customize" state={{ scrollTo: 'order-form' }}>Start a Design</Link>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
