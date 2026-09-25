# Customized Tees — Every Image on the Site & How to Change It

## THE GOLDEN RULE
For almost every image: **put a file with the exact name into the exact
folder inside `public/`, then push to GitHub.** Netlify auto-deploys.
No code editing. Until a file exists, a placeholder shows automatically —
nothing ever looks broken.

Recommended: square photos ~1000x1000 JPG (the About story + storefronts
look best landscape ~1200x900). File names are case-sensitive.

---

## NAVBAR + FOOTER
### 1. Logo (top-left + footer)
- Shows: the tie-dye "Customized Tees" wordmark in the navbar and footer.
- File to change: **`src/assets/logo.png`**  (white letters on a black background)
- NOTE: this one lives in `src/assets/`, NOT `public/`, because it gets
  embedded into the page. Replace the file, keep the name `logo.png`.

---

## HOME PAGE
### 2. "Recent Work" strip (6 cards)
- Add files: **`public/recent/1.jpg` … `public/recent/6.jpg`**
- Order: 1=Anime, 2=Birthday, 3=Memorial, 4=NBA, 5=Couples, 6=Football
- Code (if ever needed): `src/pages/Home.jsx` → `recentWork` list

### 3. "Hall of Designs" horizontal cards (8 cards)
- Add files: **`public/hof/1.jpg` … `public/hof/8.jpg`**
- Order: 1=Graduation, 2=Memorial, 3=Birthday, 4=Sports, 5=Event,
  6=Couples, 7=Business, 8=Community
- Code: `src/pages/Home.jsx` → the "Hall Of Designs" array

(The hero at the very top is CSS art — no image to change.)

---

## SHOP PAGE
### 4. "Shop by Category" design galleries (the main product wall)
- Add files: **`public/shop/<category>/1.jpg`, `2.jpg`, `3.jpg` …**
  (as many as you want per category, numbered in order, no gaps)
- Categories (folder names):
  rappers, anime, nba, football, cartoon, couples, kids, gaming, movies,
  memes, memorial, birthdays
- Example: `public/shop/couples/1.jpg`, `public/shop/couples/2.jpg`
- Code: `src/components/DesignGallery.jsx`

### 5. "Your Canvas" blanks (Short Sleeve, Hoodie, Crew, Long, Hat)
- These are DRAWN shirt illustrations (not photos) that say "YOUR DESIGN
  HERE". They're intentional. To swap them for real blank photos, that
  needs a code change — ask me. File: `src/components/ShirtMockup.jsx`.

---

## CUSTOMIZE PAGE
### 6. "What We've Printed" sample gallery (8 cards)
- Add files: **`public/samples/1.jpg` … `public/samples/8.jpg`**
- Order: 1=Graduation, 2=Memorial, 3=Team Jersey, 4=Birthday,
  5=Company Tee, 6=Family Reunion, 7=His & Hers, 8=Community Drive
- Code: `src/pages/Customize.jsx`

---

## ABOUT / FIND US PAGE
### 7. "Our Story" photo
- Add file: **`public/about.jpg`**  (landscape ~1200x900 looks best)
- Code: `src/pages/About.jsx`

### 8. St Matthews storefront photo   ✅ ALREADY ADDED
- File: **`public/stmatthews-store.jpg`**  (replace to update)

### 9. Jefferson Mall storefront photo   ✅ ALREADY ADDED
- File: **`public/jefferson-store.jpg`**  (replace to update)

(The two maps are live Google Maps, not images — nothing to change.)

---

## BRAND / SHARING IMAGES (optional)
### 10. Browser-tab icon (favicon) + phone app icons
- Files: **`public/favicon.png`**, **`public/icon-192.png`**, **`public/icon-512.png`**

### 11. Social-share preview (shows when the link is shared)
- File: **`public/og-image.png`**  (1200x630)

---

## HOW TO ACTUALLY DO IT (two ways)

### Way A — you drop files in, then push
1. Put your images into the folders above (exact names).
2. In a terminal:
       cd D:\customized-tees
       git add -A
       git commit -m "add images"
       git push
3. Netlify rebuilds and publishes automatically (~1 min).

### Way B — send them to me
Send me the images (keep these filenames). I'll place them all and push.

TIP: The 59 prompts in `AI-IMAGE-PROMPTS.md` already list these exact
filenames next to each prompt, so generated images drop straight in.
