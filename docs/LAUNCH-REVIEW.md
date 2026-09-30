# Launch review

## Findings and revisions

| Original issue | Result |
|---|---|
| Repeated category definitions and custom global search event | One shared category catalog and controlled React search state |
| Browser probes numbered Cloudinary files, tries extensions and stops at first missing number | Explicit fallback catalog plus one optional server-side metadata request |
| Image delivery adds a changing query on every render | Stable Cloudinary URLs, optional real resource versions from the live catalog |
| Empty image slots across Home, Customize, Shop and About | 18 generated subjects covering 35 placements, with exact square/portrait/landscape crops |
| Existing uploaded designs live outside GitHub | Nine live Cloudinary designs inventoried and retained, with local optimized fallbacks |
| User wants repeated branding over all photos | Native tiled Cloudinary watermark, with matching local fallback display overlay |
| Fake review fallback and repeated widget scripts | Fake testimonials removed; widget lifecycle cleaned up and Google link retained |
| Drag/drop displays a filename but omits the actual attachment | Selected File kept in state and included in the upload request |
| Custom color value does not reach submitted color field | Requested color normalized into the submitted field |
| Mail-app fallback claims request was received before email is sent | Clear completion instruction instead of a false success message |
| Labels not connected to inputs | Explicit label associations and accessible custom-color input |
| Closed mobile menu remains keyboard-focusable | Inert closed drawer, expanded state and Escape dismissal |
| Narrow-phone location cards overflow | Responsive minimum column size and wrapping long contact text |
| Missing optional font files cause needless requests | Local font lookup and existing Google-font fallback |
| All-in-one build and unused GitHub Pages dependencies | Standard cacheable Vite bundles; 48 unused installed packages removed |
| Social preview URLs point to old GitHub Pages site | Correct Netlify address and canonical URL |
| Hash-only routes and empty main content on unknown paths | Clean hosted routes, migration of old hash links, default route fallback |
| Service worker caches every request and returns HTML for failed images | Only same-origin navigations use offline page caching |
| One exact duplicate CSS rule | Removed; intentional responsive/cascade overrides preserved |

The original color palette, brand treatment, five pages, store photos and color-changing SVG garment illustrations are retained. Generated shirt images are labeled as concept mockups. They do not claim to be completed customer orders.

## Verification

- Production build passes.
- Generated WebP files all decode successfully: 26 files, approximately 1.64 MB total.
- Nine preserved uploaded-design fallbacks all decode successfully, approximately 1.07 MB total.
- Final browser checks with the Cloudinary fallback and repeated watermark display passed all five routes at 1440, 390 and 320 pixels, with no broken images, overflow or page errors.
- Search, design and garment prefills, drag/drop attachment, custom color, simulated upload/submission, legacy hash URLs, unknown routes and mobile navigation passed.
- Cloudinary tiled watermark was verified against an existing public catalog image.
- Catalog endpoint tests cover missing credentials, filtering/pagination, metadata titles and safe remote failures.

## Work requiring account access before official launch

1. The original generated assets are uploaded to Cloudinary. The expanded shop collection adds 108 individually generated concepts, nine per category.
2. Optionally configure server-side Cloudinary credentials in Netlify for automatic discovery of newly added shop designs. Fixed-slot replacements work without this optional feature.
3. Send one genuine order request and confirm receipt in the store inbox, including an attachment. Browser tests simulate responses and do not establish actual email delivery.
4. Verify live third-party review and map embeds. Browser layout verification uses controlled responses for those embeds.
5. Confirm the store's advertised hours, stock ranges and turnaround claims remain current.

Deployment configuration: `netlify.toml` specifies `npm run build` and publish directory `dist`. Production is synchronized from GitHub main. The expanded collection is verified before publication.

Technical references: https://vite.dev/guide/build and https://docs.netlify.com/build/configure-builds/javascript-spas/
