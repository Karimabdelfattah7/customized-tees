# Expanded shop collection

The 12 categories each contain ten generated concepts: one original and nine additions. Nine existing uploaded designs remain, giving 129 gallery entries. These are trend-inspired illustrative mockups; the store confirms production artwork, availability and pricing.

The built-in image-generation tool created each design separately. The 84 images uploaded in the previous round were recovered from Cloudinary. The remaining 24 were regenerated after the workspace interruption. Their subjects and printed text are recorded in `SHOP-GENERATION-PROMPTS.json`; original prompt details for the recovered 84 were not preserved by the interrupted workspace.

Every new public ID is `ct-drop-<category>-<1–9>`, matching `src/lib/generated-designs.json`. Replace an image in Cloudinary using the same public ID and invalidate cached delivery. No code change is required. Cloudinary originals remain unwatermarked for owner management; customer delivery embeds diagonal, tiled CustomizedTees text at 35% opacity. The 900 × 900 WebP backups in `public/designs/drop/` also contain embedded watermarks.

The shared generation prompt requests a square studio apparel catalog photo, a whole front-facing cotton shirt on an invisible mannequin, charcoal backdrop, readable exact print text and original chest illustration. The subject and printed text are inserted separately for each requested design.

Filters and search apply to the entire collection. Images load lazily. Every category has at least ten designs, and each design links to its prefilled request form.

Style references reviewed for this collection:

- https://www.printful.com/uk/blog/design-trends
- https://www.etsy.com/seller-handbook/article/1473931456647

These reports describe style trends, not individual bestseller rankings.
