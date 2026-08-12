# How to Add / Change Website Pictures (Cloudinary) — FOLDER VERSION

You can update the pictures on customizedtees.netlify.app yourself — with
NO access to the website code. You only use Cloudinary. Changes appear on
the live site within a minute.

===================================================================
THE 3 STEPS
===================================================================
1. Log in at cloudinary.com  ->  open "Media Library".
2. Open the folder for the picture you want to add (see the map below).
   Everything is inside one folder called  "customized-tees".
3. NAME your image file as a NUMBER (1, 2, 3 …) and UPLOAD it into that
   folder.  ->  It shows on the website within a minute.

That's it. The FOLDER decides where on the site it goes; the NUMBER
decides the order.

Any format works (JPG, PNG, WEBP). Square pictures look best.

===================================================================
THE FOLDER MAP  (inside "customized-tees")
===================================================================

customized-tees/
├── hof/            <- Home "Hall of Designs".  Upload 1..8
│                       (1=Graduation 2=Memorial 3=Birthday 4=Sports
│                        5=Event 6=Couples 7=Business 8=Community)
├── recent/         <- Home "Recent Work".  Upload 1..6
├── samples/        <- Customize page sample gallery.  Upload 1..8
├── shop/
│   ├── rappers/    <- Upload 1, 2, 3 … (as many as you want)
│   ├── anime/
│   ├── nba/
│   ├── football/
│   ├── cartoon/
│   ├── couples/
│   ├── kids/
│   ├── gaming/
│   ├── movies/
│   ├── memes/
│   ├── memorial/
│   └── birthdays/
├── about            <- "Our Story" photo. Name the file  about  (wide photo)
├── stmatthews-store <- St Matthews storefront photo (wide)
└── jefferson-store  <- Jefferson Mall storefront photo (wide)

(For about / stmatthews-store / jefferson-store: upload them straight
into the "customized-tees" folder, named exactly like that.)

===================================================================
EXAMPLES
===================================================================
- Add the 1st Hall-of-Designs picture:
    open  customized-tees/hof  ->  upload a file named  1.jpg
- Add a 3rd couples design:
    open  customized-tees/shop/couples  ->  upload a file named  3.jpg
- Change the Our Story photo:
    open  customized-tees  ->  upload a file named  about.jpg  (overwrite)

===================================================================
TO REPLACE A PICTURE
===================================================================
Upload a new file with the SAME name into the SAME folder and choose
"Overwrite". It updates within a minute.

===================================================================
RULES / TIPS
===================================================================
- Always name shop pictures 1, 2, 3 … with NO gaps. The site stops at
  the first missing number.
- Empty slots quietly show a placeholder — nothing looks broken.
- You NEVER touch GitHub or code. Cloudinary only.
