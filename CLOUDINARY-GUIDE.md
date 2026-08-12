# How to Add / Change Website Pictures (Cloudinary)

You can update the pictures on customizedtees.netlify.app yourself — with
NO access to the website code. You only use Cloudinary. Changes appear on
the live site within seconds.

## Log in
1. Go to https://cloudinary.com and log in.
2. Open the **Media Library** (left menu).

## The ONE rule that makes it work: the "Public ID"
Every picture slot on the website has a fixed name called a **Public ID**.
When you upload a picture, set its **Public ID** to the exact value from the
list below. (In the upload box there is a "Public ID" field — type it there.
The slashes "/" just keep things in tidy folders.)

- Upload the image, and in the Public ID field type the exact ID.
- Any format works — JPG, PNG, WEBP. No file extension in the Public ID.
- Square pictures (1:1) look best. The About + storefront ones look best wide.

## To REPLACE a picture
Upload a new image with the SAME Public ID and turn ON "Overwrite"
(and "Invalidate" if shown). It updates on the site within a minute.

===================================================================
THE FULL LIST OF PUBLIC IDs
===================================================================

HOME — "Hall of Designs" (8):
  customized-tees/hof/1   (Graduation)
  customized-tees/hof/2   (Memorial)
  customized-tees/hof/3   (Birthday)
  customized-tees/hof/4   (Sports)
  customized-tees/hof/5   (Event)
  customized-tees/hof/6   (Couples)
  customized-tees/hof/7   (Business)
  customized-tees/hof/8   (Community)

HOME — "Recent Work" (6):
  customized-tees/recent/1 … customized-tees/recent/6

CUSTOMIZE — sample gallery (8):
  customized-tees/samples/1 … customized-tees/samples/8

SHOP — categories (as many as you want each, numbered 1,2,3… no gaps):
  customized-tees/shop/rappers/1, /2, /3 …
  customized-tees/shop/anime/1 …
  customized-tees/shop/nba/1 …
  customized-tees/shop/football/1 …
  customized-tees/shop/cartoon/1 …
  customized-tees/shop/couples/1 …
  customized-tees/shop/kids/1 …
  customized-tees/shop/gaming/1 …
  customized-tees/shop/movies/1 …
  customized-tees/shop/memes/1 …
  customized-tees/shop/memorial/1 …
  customized-tees/shop/birthdays/1 …

ABOUT / FIND US:
  customized-tees/about              (the "Our Story" photo — wide)
  customized-tees/stmatthews-store   (St Matthews storefront — wide)
  customized-tees/jefferson-store    (Jefferson Mall storefront — wide)

===================================================================
TIPS
===================================================================
- For shop categories, always start at 1 and don't skip numbers
  (1, 2, 3 …). The site stops at the first missing number.
- If a slot has no Cloudinary picture yet, the site quietly shows a
  placeholder — nothing looks broken.
- You never touch GitHub or code. Cloudinary only.
