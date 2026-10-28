# MODU website

The product website for [MODU](https://github.com/nashwahamido/Modu-MobileApp), a gamified 3D furniture assembly app for Android, designed around cognitive accessibility. Built as part of an MSc Interactive Digital Media team project at Trinity College Dublin.

- **Live site:** [modugamified.vercel.app](https://modugamified.vercel.app)
- **Designed and built by:** Nashwa Hamido

It's a single hand-built page in plain HTML, CSS and JavaScript. There's no framework, no build step and no dependencies.

## Files

```
MODU-Website/
├── index.html    markup only
├── styles.css    all styles, in page order
├── main.js       scroll reveal, back-to-top button, room carousel
├── .nojekyll     turns off Jekyll if the site is served from GitHub Pages
└── assets/       logos, mascot, companion heads, furniture renders, rooms, team photos
```

Every file is linked by a relative path, so keep them together.

## Running locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploying

The site is hosted on **Vercel** and redeploys on every push to `main`. It has no build command, and the output directory is the repository root. Any static host works the same way.

The Open Graph tags in `index.html` hard-code `https://modugamified.vercel.app/`. If the site moves to another address, update `og:url` and `og:image` together.

## Page sections

| Section | Anchor | Content |
| --- | --- | --- |
| Hero | none | Wordmark, navigation, headline, Instagram and "Watch the demo" buttons, mascot |
| The loop | `#how` | Two stages: pick a piece, build it |
| Helping modes | `#modes` | The four companions, one per guidance mode |
| Your room | `#room` | Room carousel and the five finishes |
| Video demo | `#demo` | YouTube walkthrough |
| Meet the team | `#team` | Six team members, each linked to LinkedIn |

## How it's built

- **Design tokens:** the `:root` variables in `styles.css` mirror the app's own palette (`src/game/ui/system/theme.ts` in the app repo), so app and site share one visual language. They aren't linked automatically, so update both together.
- **Type:** Lexend throughout, from Google Fonts.
- **Background:** the faint graph-paper grid is two CSS gradients, not an image.
- **Reveal on scroll:** one `IntersectionObserver` fades content in as it enters the screen.
- **Room carousel:** crossfades the room renders and pauses on hover, keyboard focus, or when the tab is hidden.
- **Back to top:** a link rather than a button, so it works without JavaScript. It's hidden from keyboard and screen readers while it's off screen.

## Accessibility

- Every image has alt text.
- Small lavender text uses a darker shade (`--lavender-deep`) to meet WCAG AA contrast.
- All animation is switched off under `prefers-reduced-motion`.
- Each team member's LinkedIn link has an `aria-label` naming the person.
- Tap targets on the small icons are enlarged with padding, so they're comfortable on a phone.

## Responsive behaviour

There are two breakpoints:

- **900 px:** the hero stacks, and the card grids drop to two columns. The hero art is sized in `vw` here, which keeps the mascot and its backdrop in proportion.
- **560 px:** navigation hides, cards drop to one column, and the hero buttons stack.

Checked for horizontal overflow at 360, 390, 768 and 1440 px.

## Editing notes

- **No dashes in the copy.** The page's text uses only commas and full stops. Keep to that when adding text.
- **Furniture thumbnails** come from the app repo (`src/assets/thumbnails/catalogue/`). They're all 512×512 with identical framing, so take new ones from there.
- **Filename case matters on the server.** `LACK-wooden.png` and `lack-wooden.png` are different files once deployed, even if they look the same on Windows or macOS.
- **Room renders** are cleaned of near-invisible pixels and compressed before use. Do the same for any new room image, or it will show a faint box on the dark background and slow the page down.

## Credits

Website designed and built by Nashwa Hamido and updated by MODU team. 

The MODU app was built by the MODU team:

| Name | Role |
| --- | --- |
| Nashwa Hamido | Project manager, full-stack developer and front-end lead |
| Ge You | Backend lead (assembly logic and 3D pipeline) |
| Sherin Glady | Brand and visual designer, illustrator, marketing |
| Emma Tianyi | UX designer, 3D artist |
| Astrid Yin | Strategist, narrative designer |
| Krystyna Mikava | UX/UI designer, front-end developer |

The mascot, companions, furniture renders and room renders are the team's shared artwork. Furniture names describe the pieces modelled. MODU is not affiliated with IKEA.
