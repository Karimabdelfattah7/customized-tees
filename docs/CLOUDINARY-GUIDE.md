# Cloudinary image management

Public delivery cloud: `xvnxxkyt`. This is already referenced in the original site and verified against existing public images.

## Stable generated-image IDs

Each file in `public/images/` uploads as `ct-concept-` plus its filename without `.webp`. Examples:

- `graduation.webp` → `ct-concept-graduation`
- `graduation-portrait.webp` → `ct-concept-graduation-portrait`
- `about.webp` → `ct-concept-about`

26 assets cover all 35 generated image placements. The nine existing shop designs retain their `shop-<category>-<number>` IDs. Storefronts use `stmatthews-store` and `jefferson-store`, with the existing local photos as fallback.

## Initial upload

Set `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` in your local environment. Use the values from your Cloudinary console, never paste or commit the secret in a public repository. Run:

```sh
npm run upload:images
```

This uploads all 26 generated WebP files using signed server-side requests. It does not overwrite an existing asset. Uploads have not been performed until account access is connected.

## Change a photo later

Open the Cloudinary Media Library, find the asset by its public ID, and overwrite it with a replacement while preserving that ID. Request CDN invalidation on overwrite. The website retains the same URL and automatically applies its crop and watermark to the replacement. No code change or deployment is needed for these fixed image slots.

## Add or remove shop designs without editing code

The optional Netlify function lists Cloudinary assets whose IDs match `shop-<category>-<number>`. Configure `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` as server-only environment variables in Netlify. Never add the `VITE_` prefix to API keys or secrets. Only the cloud name is a public browser setting.

Category slugs: rappers, anime, nba, football, cartoon, couples, kids, gaming, movies, memes, memorial, birthdays. Set a Cloudinary caption to supply a descriptive title. The function returns only matching catalog records and caches the public response for 60 seconds. If unavailable, the client displays the known uploaded designs from its fallback manifest.

## Repeated watermarks

The Cloudinary delivery transformation resizes the image to the card ratio, applies repeated white CustomizedTees text at 35% opacity, tilted 25 degrees, then optimizes format and quality. These watermarks are embedded into the delivered file. Cloudinary originals remain editable, allowing future watermark adjustments.

Local fallbacks display matching repeated text through a website overlay. That overlay alone is not embedded in a directly downloaded local original. Finish uploading the generated assets before treating the download watermark requirement as complete.

Documentation: https://cloudinary.com/documentation/image_layer_watermarking
