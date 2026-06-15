// Customize.jsx
// ---------------------------------------------------------------
// The most important page: where customers send us their idea.
// Contains:
//   - Category buttons (just visual)
//   - A sample-designs gallery
//   - The big inquiry form (name, phone, email, occasion, idea,
//     optional file upload).
//
// The form really works: it emails submissions to the store via
// Web3Forms, and any attached file is uploaded and a download link
// is included. See the settings at the top of the component below.
// ---------------------------------------------------------------

import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'

// ===============================================================
//  HOW TO RECEIVE FORM SUBMISSIONS BY EMAIL  (one-time setup)
// ===============================================================
//  1. Go to  https://web3forms.com
//  2. Type your email (customizedtees502@gmail.com) in the box and
//     click "Create Access Key". They email you a key right away.
//  3. Paste that key between the quotes below, replacing the
//     placeholder text. Then run:  npm run build
//
//  After that, every "Send My Idea" submission is emailed to you —
//  including the customer's name, phone, email, occasion, idea, and
//  any attached reference image. It's free and unlimited.
//
//  Until you paste a real key, the form falls back to opening the
//  customer's own email app with the details pre-filled.
// ===============================================================
const WEB3FORMS_ACCESS_KEY = '06ae7270-ba8d-48bb-955f-99c1ba9615aa'

// ===============================================================
//  REFERENCE-IMAGE FILE UPLOADS
// ===============================================================
//  Web3Forms' free plan can't attach files, so instead we upload the
//  customer's file to a file host from their browser, get back a
//  download link, and put that LINK in the email to you. You click it
//  to download the actual file (works for ANY file type).
//
//  By default this uses "litterbox" — free, no signup, keeps the file
//  for 72 hours. Since we promise to reply within 24h, that's plenty.
//
//  WANT PERMANENT STORAGE? (optional, ~3 min)
//   1. Make a free account at https://cloudinary.com
//   2. Settings → Upload → add an "Unsigned" upload preset
//   3. Put your cloud name + preset name below. Files then never expire.
// ===============================================================
const CLOUDINARY_CLOUD  = ''   // e.g. 'dxk1abc23'  (leave '' to use litterbox)
const CLOUDINARY_PRESET = ''   // e.g. 'customized_tees'

// Uploads one file and returns a public URL to it.
async function uploadReferenceFile(file) {
  // Option A — Cloudinary (permanent) if you configured it above
  if (CLOUDINARY_CLOUD && CLOUDINARY_PRESET) {
    const fd = new FormData()
    fd.append('file', file)
    fd.append('upload_preset', CLOUDINARY_PRESET)
    const r = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD}/auto/upload`,
      { method: 'POST', body: fd }
    )
    const j = await r.json()
    if (j.secure_url) return j.secure_url
    throw new Error(j.error?.message || 'Cloudinary upload failed')
  }

  // Option B — litterbox (free, no signup, 72-hour retention)
  const fd = new FormData()
  fd.append('reqtype', 'fileupload')
  fd.append('time', '72h')
  fd.append('fileToUpload', file)
  const r = await fetch(
    'https://litterbox.catbox.moe/resources/internals/api.php',
    { method: 'POST', body: fd }
  )
  const url = (await r.text()).trim()
  if (!url.startsWith('http')) throw new Error('Upload failed')
  return url
}

// ===============================================================
//  SIZES & COLORS  (edit these lists to change what's offered)
// ===============================================================
// Sizes are grouped. Each group offers different colors.
const SIZE_GROUPS = [
  { label: 'Baby',  sizes: ['Newborn', '3 Months', '6 Months', '12 Months'] },
  { label: 'Kids',  sizes: ['Kids XS', 'Kids S', 'Kids M', 'Kids L'] },
  { label: 'Adult', sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL', 'XXXXXL'] }
]
const BABY_SIZES = SIZE_GROUPS[0].sizes
const KIDS_SIZES = SIZE_GROUPS[1].sizes

// The garment types we offer. Short Sleeve is the default.
const GARMENTS = ['Short Sleeve', 'Long Sleeve', 'Hoodie', 'Crew Neck']

// Returns the colors available for a given garment + size.
function colorsFor(garment, size) {
  // Long sleeve / hoodie / crew neck come in black, white, grey only.
  if (garment && garment !== 'Short Sleeve') return ['Black', 'White', 'Grey', 'Other']

  // Short sleeve colors depend on the size group:
  if (!size) return []
  if (BABY_SIZES.includes(size)) return ['White']                       // babies: white only
  if (KIDS_SIZES.includes(size)) return ['White', 'Black', 'Blue', 'Pink', 'Other']
  // adult sizes — the store's full color range
  return ['White', 'Black', 'Grey', 'Pink', 'Red', 'Royal Blue', 'Orange', 'Purple', 'Other']
}

export default function Customize() {
  // Was the form successfully sent? (true / false)
  const [sent, setSent] = useState(false)

  // Selected garment + size + color (color choices depend on both)
  const [garment, setGarment] = useState('Short Sleeve')
  const [size, setSize] = useState('')
  const [color, setColor] = useState('')

  // If the customer arrived here by clicking "Order This Design" on
  // the Shop page, the design name is in the URL (?design=...). We
  // use it to pre-fill the idea box so they don't retype it.
  const [params] = useSearchParams()
  const prefillDesign = params.get('design') || ''
  const [idea, setIdea] = useState(
    prefillDesign ? `I'd like the "${prefillDesign}" design. ` : ''
  )

  // Filename the customer selected for "reference image"
  const [fileName, setFileName] = useState('')

  // Visual styling when customer drags a file over the drop zone
  const [dragOver, setDragOver] = useState(false)

  // Is the form mid-send? (disables the button + shows "Sending…")
  const [submitting, setSubmitting] = useState(false)
  // Is the reference image currently uploading?
  const [uploadingFile, setUploadingFile] = useState(false)
  // Any error message to show the customer if sending failed
  const [error, setError] = useState('')

  // The category cards — easy to edit later
  const categories = [
    { icon: '🎓', label: 'Graduation'           },
    { icon: '🕊', label: 'Memorial'             },
    { icon: '🎂', label: 'Birthday'             },
    { icon: '🏆', label: 'Team / Sports'        },
    { icon: '💼', label: 'Business / Work'      },
    { icon: '🎉', label: 'Events & Parties'     },
    { icon: '💕', label: 'Couples'              },
    { icon: '🤝', label: 'Community / Fundraiser' },
    { icon: '✨', label: 'Something Else?'      }
  ]

  // Runs when the customer picks a file from their computer
  const onFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name)
    }
  }

  // Runs when the customer drops a file onto the drop zone
  const onDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFileName(e.dataTransfer.files[0].name)
    }
  }

  // Runs when the customer clicks "Send My Idea"
  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const form = e.currentTarget
    const data = new FormData(form)

    // ---- Fallback: no access key set yet ----
    // Open the customer's email app with everything pre-filled so the
    // store still gets the message even before Web3Forms is configured.
    if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY.includes('PASTE-YOUR')) {
      const body =
        `Name: ${data.get('name')}\n` +
        `Phone: ${data.get('phone')}\n` +
        `Email: ${data.get('email')}\n` +
        `Quantity: ${data.get('quantity')}\n` +
        `Garment: ${data.get('garment')}\n` +
        `Size: ${data.get('size')}\n` +
        `Color: ${data.get('color') === 'Other' ? data.get('custom_color') : data.get('color')}\n` +
        `Occasion: ${data.get('occasion')}\n\n` +
        `Design idea:\n${data.get('idea')}\n\n` +
        `(Note: please attach your reference image to this email if you have one.)`
      window.location.href =
        `mailto:customizedtees502@gmail.com` +
        `?subject=${encodeURIComponent('New Custom Design Request')}` +
        `&body=${encodeURIComponent(body)}`
      setSent(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    // ---- Real send via Web3Forms ----
    try {
      setSubmitting(true)
      // Web3Forms can't carry the file itself, so we remove it and —
      // if one was chosen — upload it to a file host and email you the
      // download link instead.
      const file = data.get('attachment')
      data.delete('attachment')
      if (file && file instanceof File && file.size > 0) {
        try {
          setUploadingFile(true)
          const url = await uploadReferenceFile(file)
          data.append('reference_image_url', url)
          data.append('reference_image_name', file.name)
        } catch (uploadErr) {
          // Upload failed — still send the request, just note it.
          data.append('reference_image_name', file.name)
          data.append(
            'note',
            `Customer attached "${file.name}" but the auto-upload failed — ` +
            `please ask them to text it to 502-232-3703.`
          )
        } finally {
          setUploadingFile(false)
        }
      }
      data.append('access_key', WEB3FORMS_ACCESS_KEY)
      data.append('subject', 'New Custom Design Request — Customized Tees')
      data.append('from_name', 'Customized Tees Website')
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data
      })
      const json = await res.json()
      if (json.success) {
        setSent(true)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        setError(json.message || 'Something went wrong. Please text us at 502-232-3703.')
      }
    } catch (err) {
      setError('Could not send — check your internet, or text us at 502-232-3703.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      {/* Top banner */}
      <div className="page-hero">
        <div className="container">
          <div className="kicker">Customize</div>
          <h1>Bring Your<br />Vision To Life</h1>
          <p>Any event. Any occasion. Any idea. We'll make it happen.</p>
        </div>
      </div>

      {/* Categories */}
      <section className="block">
        <div className="container">
          <Reveal>
            <div className="section-title">
              <div className="kicker">Pick a Vibe</div>
              <h2>What Are We <span className="accent-orange">Making?</span></h2>
            </div>
          </Reveal>
          <div className="categories">
            {categories.map(c => (
              <Reveal key={c.label} className="cat-card">
                <div className="ico">{c.icon}</div>
                <h4>{c.label}</h4>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Sample designs gallery */}
      <section className="block alt">
        <div className="container">
          <Reveal>
            <div className="section-title">
              <div className="kicker">Sample Designs</div>
              <h2>What We've <span className="accent-pink">Printed</span></h2>
            </div>
          </Reveal>
          <div className="gallery">
            <Reveal className="card c1"><span className="cbadge orange">GRADUATION</span><span className="clabel">Graduation Design</span></Reveal>
            <Reveal className="card c3"><span className="cbadge pink">MEMORIAL</span><span className="clabel">Memorial Tribute</span></Reveal>
            <Reveal className="card c6"><span className="cbadge pink">SPORTS</span><span className="clabel">Team Jersey</span></Reveal>
            <Reveal className="card c2"><span className="cbadge blue">BIRTHDAY</span><span className="clabel">Birthday Bash</span></Reveal>
            <Reveal className="card c4"><span className="cbadge orange">BUSINESS</span><span className="clabel">Company Tee</span></Reveal>
            <Reveal className="card c5"><span className="cbadge blue">EVENT</span><span className="clabel">Family Reunion</span></Reveal>
            <Reveal className="card c7"><span className="cbadge blue">COUPLES</span><span className="clabel">His & Hers</span></Reveal>
            <Reveal className="card c8"><span className="cbadge orange">FUNDRAISER</span><span className="clabel">Community Drive</span></Reveal>
          </div>
        </div>
      </section>

      {/* The inquiry form */}
      <section className="form-section" id="order-form">
        <div className="container">
          {/* Show either the form OR the thank-you message */}
          {!sent ? (
            <>
              <Reveal>
                <h2 className="form-title">Tell Us What You Want</h2>
                <p className="lead">Drop your idea below. We'll text or call you back within 24 hours.</p>
              </Reveal>

              <form className="inquiry" onSubmit={onSubmit}>
                <div className="row">
                  <div className="field">
                    <label>Full Name *</label>
                    <input type="text" name="name" required placeholder="Jane Doe" />
                  </div>
                  <div className="field">
                    <label>Phone Number *</label>
                    <input type="tel" name="phone" required placeholder="(502) 232-3703" />
                    <div className="hint">Our team will text or call you back</div>
                  </div>
                </div>

                <div className="row">
                  <div className="field">
                    <label>Email *</label>
                    <input type="email" name="email" required placeholder="you@example.com" />
                  </div>
                  <div className="field">
                    <label>Quantity *</label>
                    <input type="number" name="quantity" required min="1" defaultValue="1" />
                    <div className="hint">How many pieces do you need?</div>
                  </div>
                </div>

                <div className="field">
                  <label>Garment Type *</label>
                  <select
                    name="garment"
                    required
                    value={garment}
                    onChange={(e) => { setGarment(e.target.value); setColor('') }}
                  >
                    {GARMENTS.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>

                <div className="row">
                  <div className="field">
                    <label>Size *</label>
                    <select
                      name="size"
                      required
                      value={size}
                      onChange={(e) => { setSize(e.target.value); setColor('') }}
                    >
                      <option value="" disabled>Choose a size...</option>
                      {SIZE_GROUPS.map(g => (
                        <optgroup key={g.label} label={g.label}>
                          {g.sizes.map(s => <option key={s} value={s}>{s}</option>)}
                        </optgroup>
                      ))}
                    </select>
                  </div>
                  <div className="field">
                    <label>Color *</label>
                    <select
                      name="color"
                      required
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      disabled={!size}
                    >
                      <option value="" disabled>
                        {size ? 'Choose a color...' : 'Pick a size first'}
                      </option>
                      {colorsFor(garment, size).map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    {color === 'Other' && (
                      <input
                        type="text"
                        name="custom_color"
                        required
                        placeholder="Tell us the color you want"
                        style={{ marginTop: '8px' }}
                      />
                    )}
                  </div>
                </div>

                <div className="field">
                  <label>Type of Occasion *</label>
                  <select name="occasion" required defaultValue="">
                    <option value="" disabled>Choose one...</option>
                    <option>Graduation</option>
                    <option>Memorial</option>
                    <option>Birthday</option>
                    <option>Team / Sports</option>
                    <option>Business</option>
                    <option>Event</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="field">
                  <label>Describe your design idea *</label>
                  <textarea
                    name="idea"
                    required
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    placeholder="Tell us colors, text, any special details..."
                  />
                </div>

                {/* File upload (drag-and-drop) */}
                <div className="field">
                  <label>Attach a Reference Image (optional)</label>
                  <label
                    htmlFor="file-input"
                    className={'drop-zone ' + (dragOver ? 'dragover' : '')}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={onDrop}
                  >
                    <p>📎 Drag &amp; drop or <strong>click to upload</strong></p>
                    <p className="small">Any file type — sent straight to our team</p>
                    {fileName && <p className="file-name">✓ {fileName}</p>}
                    <input
                      id="file-input"
                      name="attachment"
                      type="file"
                      accept="image/*,.pdf"
                      hidden
                      onChange={onFileChange}
                    />
                  </label>
                </div>

                <div className="submit-row">
                  <button className="btn big" type="submit" disabled={submitting}>
                    {uploadingFile ? 'Uploading image…' : submitting ? 'Sending…' : 'Send My Idea'}
                  </button>
                  {error && (
                    <p className="form-error" role="alert">{error}</p>
                  )}
                </div>

                <p className="post-note">
                  We'll review your request and reach out within 24 hours to get
                  your order started. You can also walk in and we'll design it
                  with you on the spot!
                </p>
              </form>
            </>
          ) : (
            <div className="success-msg">
              <h3>You're In! ✦</h3>
              <p className="big">Thanks — we got your idea. Expect a text or call from us within 24 hours.</p>
              <p className="small-note">In a hurry? Walk into Jefferson Mall or St Matthews Mall today.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
