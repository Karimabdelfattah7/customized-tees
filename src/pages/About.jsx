// About.jsx
// ---------------------------------------------------------------
// The "About & Locations" page.
// Tells the store's story and shows both mall locations with a
// "Get Directions" button that opens Google Maps in a new tab.
// ---------------------------------------------------------------

import Reveal from '../components/Reveal.jsx'

export default function About() {
  return (
    <div>
      {/* Top banner */}
      <div className="page-hero">
        <div className="container">
          <div className="kicker">About Us</div>
          <h1>Born in Louisville.<br />Built for Everyone.</h1>
          <p>A local custom apparel shop serving the city with same-day prints since 2015.</p>
        </div>
      </div>

      {/* Brand story */}
      <section className="block">
        <div className="container">
          <div className="story">
            <Reveal className="story-img" />
            <Reveal>
              <h2>Our <span className="brand-script accent-orange">Story</span></h2>
              <p>Customized Tees started with a simple idea: that every Louisvillian should be able to walk into a shop, share a vision, and walk out with a one-of-a-kind shirt within minutes. No middlemen. No waiting weeks. No minimum orders.</p>
              <p>Today we run two locations inside Jefferson Mall and St Matthews Mall, and we've printed thousands of designs for graduations, memorials, birthdays, sports teams, businesses and every kind of celebration in between.</p>
              <p>If you can describe it, we can print it — usually in under 15 minutes.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Two location cards */}
      <section className="block alt">
        <div className="container">
          <Reveal>
            <div className="section-title">
              <div className="kicker">Visit Us</div>
              <h2>Two <span className="accent-orange">Locations</span> To Serve You</h2>
            </div>
          </Reveal>

          <div className="location-cards">
            {/* St Matthews — real storefront photo + Google Maps embed.
                TO ADD THE PHOTO: drop the storefront picture into the
                public/ folder named "stmatthews-store.jpg" and it will
                show up automatically below. */}
            <Reveal className="loc-detail orange">
              <div className="head">
                <h3>St Matthews</h3>
                <p>Louisville, KY</p>
              </div>
              {/* If the photo file is missing, a styled placeholder is
                  shown instead so the layout still looks finished. */}
              <div className="store-photo-wrap">
                <img
                  className="store-photo"
                  src="stmatthews-store.jpg"
                  alt="Customized Tees storefront — St Matthews location"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.parentElement.classList.add('no-photo')
                  }}
                />
                <div className="store-photo-fallback">
                  <div>📸</div>
                  <p>Storefront photo</p>
                  <small>Save the photo as <code>public/stmatthews-store.jpg</code></small>
                </div>
              </div>
              <iframe
                className="map"
                title="St Matthews location map"
                src="https://www.google.com/maps?q=5000+Shelbyville+Rd+%231760+St+Matthews+KY+40207&output=embed"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="body">
                <p><strong>Address:</strong> 5000 Shelbyville Rd #1760, St Matthews, KY 40207</p>
                <p><strong>Hours:</strong> Mon–Sat 10am–9pm · Sun 12pm–6pm</p>
                <p><strong>Phone:</strong> 502-232-3703</p>
                <p><strong>Email:</strong> customizedtees502@gmail.com</p>
                <a
                  className="btn"
                  href="https://maps.google.com/?q=5000+Shelbyville+Rd+%231760+St+Matthews+KY+40207"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Directions
                </a>
              </div>
            </Reveal>

            {/* Jefferson Mall — storefront photo + Google Maps embed.
                TO ADD THE PHOTO: save the Jefferson Mall storefront
                picture into the public/ folder as "jefferson-store.jpg"
                and it shows up automatically. */}
            <Reveal className="loc-detail blue">
              <div className="head">
                <h3>Jefferson Mall</h3>
                <p>Louisville, KY</p>
              </div>
              <div className="store-photo-wrap">
                <img
                  className="store-photo"
                  src="jefferson-store.jpg"
                  alt="Customized Tees storefront — Jefferson Mall location"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.parentElement.classList.add('no-photo')
                  }}
                />
                <div className="store-photo-fallback">
                  <div>📸</div>
                  <p>Storefront photo</p>
                  <small>Save the photo as <code>public/jefferson-store.jpg</code></small>
                </div>
              </div>
              <iframe
                className="map"
                title="Jefferson Mall location map"
                src="https://www.google.com/maps?q=4801+Outer+Loop+a268+Louisville+KY+40219&output=embed"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="body">
                <p><strong>Address:</strong> 4801 Outer Loop a268, Louisville, KY 40219</p>
                <p><strong>Hours:</strong> Mon–Sat 10am–9pm · Sun 12pm–6pm</p>
                <p><strong>Phone:</strong> 502-232-3703</p>
                <p><strong>Email:</strong> customizedtees502@gmail.com</p>
                <a
                  className="btn"
                  href="https://maps.google.com/?q=4801+Outer+Loop+a268+Louisville+KY+40219"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Directions
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Our Promise */}
      <section className="block">
        <div className="container">
          <Reveal>
            <div className="section-title">
              <div className="kicker">Our Promise</div>
              <h2>What You Get <span className="accent-blue">Every Time</span></h2>
            </div>
          </Reveal>
          <div className="promise">
            <Reveal className="p-card o">
              <h3>Quality Prints</h3>
              <p>Vibrant inks, durable transfers, garments that hold up wash after wash.</p>
            </Reveal>
            <Reveal className="p-card b">
              <h3>Fast Turnaround</h3>
              <p>Most orders finished while you wait — usually under 15 minutes.</p>
            </Reveal>
            <Reveal className="p-card p">
              <h3>Personal Service</h3>
              <p>Real humans helping with real ideas. Walk-ins always welcome.</p>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
