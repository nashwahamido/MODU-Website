# Modu, marketing site

A one page static site for Modu, the guided 3D furniture assembly app built as an MSc
Interactive Digital Media project at Trinity College Dublin.

The whole site is a single HTML file with its CSS and JavaScript inline, plus a folder of
images. There is no build step, no framework and no dependencies. Open `index.html` in a
browser and it works.

## Contents

```
modu-site/
├── index.html      the entire site: markup, styles, one script
├── README.md
└── assets/         15 PNGs, all referenced by index.html
```

## Running it

Double clicking `index.html` is enough for most work. If you need a real origin, for example
to test with a service worker or to avoid a browser blocking a local file, serve the folder:

```bash
cd modu-site
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploying

Upload the folder as it stands. Any static host works: GitHub Pages, Netlify, Vercel, an S3
bucket, or a plain directory on a web server. There is nothing to compile and no environment
variables. The only requirement is that `assets/` keeps its name and stays beside
`index.html`, because every image path is relative.

## Page structure

Five blocks, in order:

| Section | Anchor | What it holds |
| --- | --- | --- |
| Hero | none | Wordmark, nav, headline, lede, store buttons, mascot |
| The loop | `#how` | Two numbered stages, each with a row of furniture thumbnails |
| Helping modes | `#modes` | The four companions, one card each |
| Your room | `#room` | The dark band: room render and the five finishes |
| Meet the team | `#team` | Six member cards |

The footer carries the project note, the nav links again and the copyright line.

## How it is put together

**Design tokens.** The `:root` block at the top of the stylesheet mirrors the app's own
palette from `src/game/ui/system/theme.ts` in the Modu repo. If a colour changes in the app,
change it here too. They are not linked, so they drift silently.

**Type.** Lexend throughout, loaded from Google Fonts, in weights 300 to 800. There are two
font variables rather than one: `--display` for normal text and `--label` for the small
uppercase labels, which carry extra letter spacing and weight 500 so they hold at 10 to 12px.
Both point at Lexend. They are separate so a second face can be swapped into the label role
without touching every rule that uses it.

**The workbench grid.** The faint graph paper behind everything is two CSS linear gradients
on `body`, not an image.

**Reveal on scroll.** One `IntersectionObserver` at the bottom of the file adds an `in` class
to every element marked `.rise`, with a short stagger so a row of cards arrives together. If
the visitor asks for reduced motion, the script adds the class to everything immediately and
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
| `room.png` | Your room |

`LACK-cartoon.png` appears in both stages.

`room.png` has been cleaned. The original export carried a large area of near invisible
pixels, alpha values of 1 to 12, plus a few stray opaque fragments above the roofline. Both
are invisible on a cream background but showed as a faint ghost box against the dark band. If
you re export the room from the same source, expect to clean it again.

## Credits

Built by Nashwa Hamido, Ge You, Sherin Glady, Emma Tianyi, Astrid Yin and Krystyna Mikava.

Furniture names describe the pieces modelled. Modu is not affiliated with IKEA.
