# Customized Tees — Website

A React (Vite) website for the Customized Tees store in Louisville, KY.

**Live site:** https://customizedtees.netlify.app

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

The Shop page shows a searchable gallery of the store's own designs, grouped by category.

- Design images are hosted on **Cloudinary** and referenced by name, so new designs can be added without changing code. See [`docs/CLOUDINARY-GUIDE.md`](docs/CLOUDINARY-GUIDE.md).
- The **search box** filters designs by title and category.
- **"Order This Design"** sends the customer to the Customize form with the design name pre-filled.

---

## The Edo SZ brand font

The store name uses the **Edo SZ** font. Edo SZ is not on Google Fonts.

To use the real font:

1. Get the font file (`edosz.woff2` or `edosz.ttf`).
2. Create a folder called `public/` next to `src/`.
3. Drop the file in there.
4. The CSS already points to `/edosz.woff2` so it will pick it up automatically.

If the file isn't there, the brand name falls back to **Permanent Marker** (a similar brush style from Google Fonts) so the site still looks good.

## How the custom-order form works

Every "Send My Idea" submission is emailed to **customizedtees502@gmail.com** through [Web3Forms](https://web3forms.com). The access key is set at the top of `src/pages/Customize.jsx`.

If the customer attaches a reference image, the browser first uploads it to a file host (Litterbox by default, or Cloudinary if configured in the same file) and includes the download link in the email.
