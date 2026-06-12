# Customized Tees — Website

A small React (Vite) website for the Customized Tees store in Louisville, KY.

## How to run it on your computer

You need **Node.js 18 or newer** installed (download from https://nodejs.org).

Open a terminal in this folder and run:

```
npm install
npm run dev
```

Then open the URL it prints (usually http://localhost:5173).

To build a production version (for uploading to a host):

```
npm run build
```

The finished files go into the `dist/` folder.

---

## What's in each file (plain English)

| File | What it does |
|------|-------------|
| `index.html` | The empty page React fills in. Loads the Google fonts. |
| `package.json` | Lists the libraries the site needs. |
| `src/main.jsx` | Starts React. |
| `src/App.jsx` | The shell — top nav, page routing, footer. |
| `src/ThemeContext.jsx` | Controls **light / dark mode**. Remembers your choice. |
| `src/styles.css` | All the colors, fonts, and animations. Heavily commented. |
| `src/components/Navbar.jsx` | Top bar with brand name, page links, theme toggle, hamburger. |
| `src/components/Footer.jsx` | Bottom strip with links and contact info. |
| `src/components/Reveal.jsx` | Makes things fade in when you scroll to them. |
| `src/pages/Home.jsx` | The main page. |
| `src/pages/About.jsx` | About + both store locations. |
| `src/pages/Customize.jsx` | The "send us your design idea" form. |
| `src/pages/Contact.jsx` | Phone, email, and "walk in" info. |

---

## How to change things

- **Edit text on the home page** → open `src/pages/Home.jsx`.
- **Add/remove a category** in the form → look for `const categories = [` in `src/pages/Customize.jsx`.
- **Change a color (orange, blue, pink…)** → top of `src/styles.css`, under "COLOR THEMES".
- **Use a different brand font** → put your `.woff2` or `.ttf` file in a new `public/` folder and update the `@font-face` block at the top of `src/styles.css`.

## The design catalog (Shop page)

The Shop page shows a searchable gallery of designs grouped by category
(Rap, Anime, NBA, Football, Couples, Kids, Memes, Memorial, Birthdays…).

- The design data lives in **`src/data/designs.js`** (auto-generated).
- To refresh it, run: **`node scripts/scrapeDesigns.js`** — this pulls
  sample designs from Transfer Kingdom's public Shopify endpoints and
  rewrites `src/data/designs.js`. Then run `npm run build` again.
- **IMPORTANT / legal:** the anime, NBA, and football samples are
  third-party licensed artwork pulled in only as demo content. Replace
  them with the store's OWN designs before going public to avoid
  copyright/trademark problems. Edit `src/data/designs.js` directly, or
  change the category→collection mapping at the top of
  `scripts/scrapeDesigns.js`.
- The **search box** filters by title, tags, description, and category.
- **"Order This Design"** sends the customer to the Customize form with
  the design name pre-filled in the idea box.

## The Edo SZ brand font

The store name uses the **Edo SZ** font. Edo SZ is not on Google Fonts.

To use the real font:

1. Get the font file (`edosz.woff2` or `edosz.ttf`).
2. Create a folder called `public/` next to `src/`.
3. Drop the file in there.
4. The CSS already points to `/edosz.woff2` so it will pick it up automatically.

If the file isn't there, the brand name falls back to **Permanent Marker** (a similar brush style from Google Fonts) so the site still looks good.

## Making the form actually email you

Right now the form just shows a thank-you message — it does **not** send a real email yet. The easiest way to make it work:

- Sign up at [Formspree](https://formspree.io) (free).
- They give you an endpoint URL like `https://formspree.io/f/xxxx`.
- In `src/pages/Customize.jsx`, change the `<form>` opening tag to `<form action="https://formspree.io/f/xxxx" method="POST">` and remove the `onSubmit` line, OR have a developer wire it up via fetch().
