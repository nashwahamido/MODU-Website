# Modu, marketing site

A one page static site for Modu, the guided 3D furniture assembly app built as an MSc
Interactive Digital Media project at Trinity College Dublin.

Three plain files and a folder of images: markup, stylesheet, one small script. There is no
build step, no framework and no dependencies. Open `index.html` in a browser and it works.

## Contents

```
MODU-Website/
├── index.html      the markup, and nothing else
├── styles.css      every rule, ordered the way the page is
├── main.js         the reveal on scroll observer, and only that
├── .nojekyll       empty, and load bearing: see Deploying
├── README.md
└── assets/         15 PNGs, all referenced by index.html
```

All three are linked by relative path, so they have to stay beside each other.

## Running it

Double clicking `index.html` is enough for most work. If you need a real origin, for example
to test with a service worker or to avoid a browser blocking a local file, serve the folder:

```bash
cd MODU-Website
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploying

Upload the folder as it stands. Any static host works: GitHub Pages, Netlify, Vercel, an S3
bucket, or a plain directory on a web server. There is nothing to compile and no environment
variables. The only requirement is that `assets/` keeps its name and stays beside
`index.html`, because every image path is relative.

### GitHub Pages

This is the site's home. Free for public repositories, HTTPS included, and the deploy is a
push.

The site lives at [github.com/nashwahamido/MODU-Website](https://github.com/nashwahamido/MODU-Website),
with `index.html` at the repository root rather than inside a subfolder.

1. Push to `main`.
2. In the repository, go to Settings, then Pages. Set Source to "Deploy from a branch",
   choose `main` and the `/ (root)` folder, and save.
3. Wait about a minute, then open `https://nashwahamido.github.io/MODU-Website/`. Note the
   capitals: that path is case sensitive.
4. Return to Settings, then Pages, and tick "Enforce HTTPS" once the option appears. It is
   greyed out until the certificate is issued, usually within a few minutes.

After that, every push to `main` republishes the site. There is no build step and no workflow
file to maintain.

**`.nojekyll` is why there is no build.** GitHub Pages runs a Jekyll build by default, which
skips any file or folder whose name begins with an underscore. Nothing here starts with one,
but the empty `.nojekyll` file at the root turns the build off entirely, so what is in the
repository is exactly what is served. Do not delete it. It is empty on purpose, and because it
is a dotfile it is easy to lose: Windows Explorer resists creating a name that starts with a
dot, and some archive tools hide the file entirely. It was committed as `nojekyll` once for
exactly that reason. If it happens again, `git mv nojekyll .nojekyll` puts it right, since git
has no such objection.

**Filename case matters once it is deployed.** Windows and macOS treat `LACK-wooden.png` and
`lack-wooden.png` as the same file. The Pages server does not. A mismatched capital renders
fine locally and 404s in production, which is a confusing bug to chase. Every reference in
`index.html` currently matches its filename exactly. Keep it that way when adding art.

### A custom domain

Optional, and the only part that costs anything. Buy a domain, then in Settings, then Pages,
enter it under "Custom domain" and save. GitHub writes a `CNAME` file into the repository.
At the registrar, point the apex at GitHub's four A records and add a `www` CNAME to
`<user>.github.io`. GitHub issues the certificate for the new domain automatically. Their
documentation walks through the DNS records and recommends verifying the domain first, which
protects it from being claimed by someone else later.

### Other hosts

Netlify and Cloudflare Pages both host this free and add per branch deploy previews. Neither
buys much for a single page site with one maintainer, but either is a drop in replacement:
point it at the repository, leave the build command empty, and set the publish directory to
the root.

## Page structure

Five blocks, in order:

| Section | Anchor | What it holds |
| --- | --- | --- |
| Hero | none | Wordmark, nav, headline, lede, the event card, mascot |
| The loop | `#how` | Two numbered stages, each with a row of furniture thumbnails |
| Helping modes | `#modes` | The four companions, one card each |
| Your room | `#room` | The dark band: the room carousel and the five finishes |
| Meet the team | `#team` | Six member cards |

The footer carries the project note, the nav links again and the copyright line.

## How it is put together

**Design tokens.** The `:root` block at the top of `styles.css` mirrors the app's own
palette from `src/game/ui/system/theme.ts` in the Modu repo. If a colour changes in the app,
change it here too. They are not linked, so they drift silently.

**Type.** Lexend throughout, loaded from Google Fonts, in weights 300 to 800. There are two
font variables rather than one: `--display` for normal text and `--label` for the small
uppercase labels, which carry extra letter spacing and weight 500 so they hold at 10 to 12px.
Both point at Lexend. They are separate so a second face can be swapped into the label role
without touching every rule that uses it.

**The workbench grid.** The faint graph paper behind everything is two CSS linear gradients
on `body`, not an image.

**The room carousel.** `main.js` crossfades the three renders on a five second dwell. It stops
on hover, on keyboard focus, and when the tab is in the background, and it does not advance at
all under reduced motion, where the dots still work for anyone who wants to see the other two.
The frame holds a single aspect ratio, the tallest of the three, with each render contained
inside it. That is what keeps the dark band from changing height as the slides swap.

**Reveal on scroll.** `main.js` holds one `IntersectionObserver` that adds an `in` class to
every element marked `.rise`, with a short stagger so a row of cards arrives together. If the
visitor asks for reduced motion, the script adds the class to everything immediately and
returns without observing anything.

**Motion.** The mascot bobs on a six second loop. Every animation and transition is disabled
under `prefers-reduced-motion: reduce`.

## Responsive behaviour

Two breakpoints, both mobile facing:

- **900px and below.** The hero stacks, art above copy. The stage cards and companion cards
  drop to two columns. Importantly, the mascot and the cream disc behind it switch from being
  sized as a percentage of their container to being sized in `vw`, with the disc kept only
  slightly larger than the mascot. Container percentages worked while the hero was a two
  column grid, but once stacked the container had nothing to constrain it and the disc grew
  over the wordmark. Keep the two in proportion if you change either.
- **560px and below.** Nav hides, every card grid drops to one column, the hero art shrinks
  further, the store buttons split one row via `flex: 1`, and the five finish swatches become
  an explicit five column grid rather than a wrapping flex row, which otherwise broke four
  plus one and stranded the last swatch.

Checked for horizontal overflow at 360, 390, 768 and 1440.

## Editing notes

**The copy contains no dashes.** Not em dashes, not en dashes, and no interpunct separators.
Commas and full stops only. This is deliberate, so match it when adding text.

**Furniture thumbnails** come from the app repo, `src/assets/thumbnails/catalogue/`. They are
all 512x512 with identical framing, which is what lets four of them sit in a row at the same
apparent scale. If you add one, take it from the same folder rather than exporting a fresh
render, or it will not match.

**Stage shelves align by structure, not by a fixed height.** Each `.stage` is a flex column
with `.shelf` on `margin-top: auto`, so the two rows of thumbnails line up whatever the copy
above them wraps to. Do not replace this with a hard height.

**Alt text** is written for every image. Keep it if you swap art.

**The hero's event card is dated.** It advertises an August 2026 showcase. After the event it
should come out, or the site is advertising something that has already happened. It is one
self-contained `.visit` block in the markup and one section in the stylesheet, so removal is
clean. The App Store and Google Play placeholders that used to sit below it were removed to
make room, and can come back the same way.

**`assets/mascot.png` is 2.1MB** and renders at 430px. Downscaling it before a public launch
would cut the page weight by roughly half.

## Assets

| File | Used by |
| --- | --- |
| `wordmark.png` | Header |
| `icon.png` | Favicon |
| `mascot.png` | Hero |
| `felix-head.png`, `lumi-head.png`, `sparky-head.png`, `pebble-head.png` | Helping modes |
| `LACK-wooden.png`, `LACK-cozy.png`, `LACK-cartoon.png`, `LACK-white.png` | Stage 01 |
| `LACK-cartoon.png`, `DALFRED-cozy.png`, `BEKVAM-black.png`, `EKET-wooden.png` | Stage 02 |
| `rooms/room-1.png`, `-2`, `-3` | Your room, the carousel |
| `team/nashwa.jpg` and five siblings | Meet the team |

`LACK-cartoon.png` appears in both stages.

The six team portraits in `assets/team/` are square 512x512 crops, each framed off the
detected face so every head sits at the same scale inside its circle. If you replace one,
crop it square around the face rather than dropping in the raw photo, or that person will
render at a different size to the other five.

The three room renders have all been cleaned the same way. The originals carried areas of
near invisible pixels, alpha values in the single digits, plus stray opaque fragments outside
the artwork. Both are invisible on a cream background but show as a faint ghost box against
the dark band. Each file was reduced to the largest connected region of its alpha mask, then
cropped, resized to 1100px wide and quantised to a 256 colour palette, which took them from
roughly 1.1MB each to between 160 and 270KB with no visible loss. If you add a fourth room,
put it through the same treatment or it will weigh more than the rest of the page combined.

## Credits

Built by Nashwa Hamido, Ge You, Sherin Glady, Emma Tianyi, Astrid Yin and Krystyna Mikava.

Furniture names describe the pieces modelled. Modu is not affiliated with IKEA.