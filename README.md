# Customized Tees

React and Vite website for the Louisville custom apparel store.

Live site: https://customizedtees.netlify.app

## Local development

```sh
npm ci
npm run dev
```

## Build and preview

```sh
npm run build
npm run preview
```

`dist/` is the deployable site. Netlify settings are defined in `netlify.toml`: build command `npm run build`, publish directory `dist`. This is a hosted web build; opening index.html directly from a file manager is no longer supported.

Clean routes such as `/shop` work through Netlify's SPA rewrite. Previously shared `/#/shop` links are converted to clean routes in the browser.

## Content and images

- `src/lib/catalog.js`: shared category navigation and generated concept records.
- `src/lib/uploaded-designs.json`: fallback catalog of nine previously uploaded Cloudinary designs, with original source URLs retained for reference.
- `public/designs/`: optimized copies of those uploaded designs.
- `src/lib/images.js`: Cloudinary public IDs, exact crops and repeated watermark transformations.
- `netlify/functions/catalog.mjs`: optional server-side live catalog, using credentials stored only in Netlify.
- `scripts/upload-cloudinary.mjs`: uploads the generated assets without overwriting existing Cloudinary images.
- `public/images/`: 18 generated subjects, exported as 26 optimized WebP files, including eight portrait variants.
- `src/pages/Shop.jsx`: garments, stock options and SVG color illustrations.
- `src/pages/Customize.jsx`: order inquiry form and reference upload.

See [the image map](docs/IMAGE-MAP.md), [audit](docs/LAUNCH-REVIEW.md) and [generation prompts](docs/GENERATED-ASSETS.md).

Photo delivery is connected to Cloudinary cloud `xvnxxkyt`. All content photos use repeated CustomizedTees watermarks. Cloudinary embeds these into the delivered image; until assets are uploaded, local fallbacks display a matching website overlay. Brand logos, app icons and SVG garment illustrations remain unchanged.

To upload generated images, set the Cloudinary API credentials in your local environment and run `npm run upload:images`. Do not commit credentials. See [Cloudinary setup](docs/CLOUDINARY-GUIDE.md).

Generated imagery is labeled as illustrative concept artwork. It is not proof of completed orders, inventory or a real store interior. Storefront photographs and brand assets remain original.

## Inquiry integrations

The form uses the existing Web3Forms access key. Reference files are sent to Litterbox for 72 hours unless Cloudinary upload settings are configured in Customize.jsx. This file host exposes a public download URL, as disclosed beside the upload control.

Browser verification uses simulated upload and submission responses. A real submission and receipt in the store inbox must be checked before the official launch. The third-party Google review widget and maps also need a live visual check.
