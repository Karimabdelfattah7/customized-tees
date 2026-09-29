# Complete image map

35 generated image placements use 18 original subjects and 26 local fallback files. Each has a stable Cloudinary public ID matching its local filename: `ct-concept-<filename-without-extension>`. Shared subjects reuse the same square file; the eight tall cards have separate portrait crops. The nine previously uploaded shop designs are preserved separately.

## Generated image placements

| Placement | Asset path | Display ratio | Source |
|---|---|---|---|
| Home: inspiration 1 | `/images/anime.webp` | 1:1 | Generated concept |
| Home: inspiration 2 | `/images/birthday.webp` | 1:1 | Generated concept |
| Home: inspiration 3 | `/images/memorial.webp` | 1:1 | Generated concept |
| Home: inspiration 4 | `/images/nba.webp` | 1:1 | Generated concept |
| Home: inspiration 5 | `/images/couples.webp` | 1:1 | Generated concept |
| Home: inspiration 6 | `/images/football.webp` | 1:1 | Generated concept |
| Home: tall showcase 1 | `/images/graduation-portrait.webp` | 3:4 | Generated concept |
| Home: tall showcase 2 | `/images/memorial-portrait.webp` | 3:4 | Generated concept |
| Home: tall showcase 3 | `/images/birthday-portrait.webp` | 3:4 | Generated concept |
| Home: tall showcase 4 | `/images/sports-portrait.webp` | 3:4 | Generated concept |
| Home: tall showcase 5 | `/images/reunion-portrait.webp` | 3:4 | Generated concept |
| Home: tall showcase 6 | `/images/couples-portrait.webp` | 3:4 | Generated concept |
| Home: tall showcase 7 | `/images/business-portrait.webp` | 3:4 | Generated concept |
| Home: tall showcase 8 | `/images/community-portrait.webp` | 3:4 | Generated concept |
| Customize: examples 1 | `/images/graduation.webp` | 1:1 | Generated concept |
| Customize: examples 2 | `/images/memorial.webp` | 1:1 | Generated concept |
| Customize: examples 3 | `/images/sports.webp` | 1:1 | Generated concept |
| Customize: examples 4 | `/images/birthday.webp` | 1:1 | Generated concept |
| Customize: examples 5 | `/images/business.webp` | 1:1 | Generated concept |
| Customize: examples 6 | `/images/reunion.webp` | 1:1 | Generated concept |
| Customize: examples 7 | `/images/couples.webp` | 1:1 | Generated concept |
| Customize: examples 8 | `/images/community.webp` | 1:1 | Generated concept |
| Shop: rappers example | `/images/rappers.webp` | 1:1 | Generated concept |
| Shop: anime example | `/images/anime.webp` | 1:1 | Generated concept |
| Shop: nba example | `/images/nba.webp` | 1:1 | Generated concept |
| Shop: football example | `/images/football.webp` | 1:1 | Generated concept |
| Shop: cartoon example | `/images/cartoon.webp` | 1:1 | Generated concept |
| Shop: couples example | `/images/couples.webp` | 1:1 | Generated concept |
| Shop: kids example | `/images/kids.webp` | 1:1 | Generated concept |
| Shop: gaming example | `/images/gaming.webp` | 1:1 | Generated concept |
| Shop: movies example | `/images/movies.webp` | 1:1 | Generated concept |
| Shop: memes example | `/images/memes.webp` | 1:1 | Generated concept |
| Shop: memorial example | `/images/memorial.webp` | 1:1 | Generated concept |
| Shop: birthdays example | `/images/birthday.webp` | 1:1 | Generated concept |
| About: story | `/images/about.webp` | 4:3 | Generated studio illustration |

Square assets are 900 × 900 pixels, portrait assets 900 × 1200 pixels and the About asset 1200 × 900 pixels. Original generated PNGs were visually reviewed, then converted and center-cropped to match the containers. All WebP files were decoded and verified.

## Existing assets and illustrations

| Placement | Asset | Display behavior |
|---|---|---|
| Navbar and footer logo | `src/assets/logo.png` | Existing tie-dye mask, intrinsic aspect ratio |
| About: St Matthews | `public/stmatthews-store.jpg` | Existing photograph, 4:3 cover crop |
| About: Jefferson Mall | `public/jefferson-store.jpg` | Existing photograph, 4:3 cover crop |
| Browser tab / Apple touch icon | `public/favicon.png` | Existing brand icon |
| Installable app icons | `public/icon-192.png`, `public/icon-512.png` | Existing brand icons |
| Social preview | `public/og-image.png` | Existing brand art, live Netlify URL corrected |
| Shop: previously uploaded designs | `public/designs/*.webp` | Nine original designs, contain fit in square cards |
| Shop: blank garments / hats | `src/components/ShirtMockup.jsx` | Existing vector illustrations, five types and 24 color presentations |
| Hero, category icons and care icons | CSS, inline SVG and text | Intentional decoration, no empty raster image slot |
| Location maps | Google Maps iframes | Live maps, no image replacement |

## Replacing an image later

In Cloudinary, replace the asset while keeping its public ID. For example, the square graduation image is `ct-concept-graduation`, and its tall variant is `ct-concept-graduation-portrait`. Invalidate cached versions when overwriting. Watermarks are applied automatically by the website's Cloudinary delivery URL to every replacement.

Before the generated images have been uploaded, the site displays the matching local WebP fallback. These fallback files have a repeated visible website overlay, while Cloudinary-served images have an embedded watermark that remains when the delivered image is saved.

For newly added shop images, keep the `shop-<category>-<number>` naming convention. With server-side Cloudinary credentials configured in Netlify, the catalog function discovers these without browser-side probing. Cloudinary metadata's caption supplies the title. If this optional function is not configured or temporarily unavailable, the nine known uploaded designs remain available.

See [Cloudinary setup](CLOUDINARY-GUIDE.md) for credential handling and upload instructions.
