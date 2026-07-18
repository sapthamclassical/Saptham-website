# Portraits — drop images here

Name each file with the person's **full name exactly as it appears in the data file**:

```
Dhanya V.jpg
Anujan.jpg
Ratish S.jpg
Vanshika.jpg
Manasa.jpg
Tejaswini.jpg
Yuvati.jpg
Pritika.jpg
Aadhithyan.jpg
Naveen.jpg
Varshhaa Pari.jpg
Sahana.jpg
Harini Palaniyappan.jpg
Harini.jpg
```

Supported: `.jpg` `.jpeg` `.png` `.webp` `.avif` — case/spacing/punctuation don't matter
("harini palaniyappan.WEBP" works). Matching is exact on the full name, so `Harini.jpg`
can never leak onto `Harini Palaniyappan`.

The card updates automatically on the next dev-server refresh / build. Until a photo
exists the site shows a premium initials placeholder (never a broken image, never an AI face).

Alumni portraits go in this same folder, named the same way (`Reshma.jpg`, …) —
their entries live in `src/data/alumni.json`.
