# Portfolio — Mohammad Raditia Pradana

A **data-driven academic portfolio**. All content lives in JSON files under `/data`.  
To update anything, edit the relevant JSON — no HTML or JS changes needed.

---

## File Structure

```
portfolio/
├── index.html              ← Page shell (rarely needs editing)
├── assets/
│   ├── css/style.css       ← All styles
│   ├── js/main.js          ← Renderer (loads data, builds the page)
│   └── img/                ← Images (profile photo, logos)
│       ├── profile.jpg
│       ├── ui.png
│       ├── sc.jpg
│       ├── ppsml.png
│       ├── nature.png
│       ├── elsevier.png
│       ├── wiley.jpg
│       └── frontiers.jpg
└── data/
    ├── profile.json        ← Name, bio, links, photo path
    ├── education.json      ← Degrees (array)
    ├── experience.json     ← Work history (array)
    ├── projects.json       ← Research projects (array)
    ├── publications.json   ← Journal articles, conference papers, peer review
    └── news.json           ← News/announcements (array)
```

---

## How to Update Content

### Add a new publication
Open `data/publications.json` and add an object to the `"journal"` or `"conference"` array:

```json
{
  "authors": "<strong>Pradana, M.R.</strong>, & Co-Author, A.",
  "year": "2026",
  "title": "Your paper title here.",
  "venue": "Journal Name, Vol(Issue), pages",
  "doi": "https://doi.org/10.xxxx/xxxxx"
}
```

Publications are numbered automatically. Most recent first = put new entries at the **top** of the array.

---

### Add a news item
Open `data/news.json` and add to the top:

```json
{
  "date": "2026-06",
  "html": "Your news text here. You can use <strong>bold</strong>, <em>italic</em>, and <a href='...'>links</a>."
}
```

---

### Add a project
Open `data/projects.json` and add an object:

```json
{
  "title": "Project Title",
  "image": "assets/img/your-image.jpg",  // or null if no image
  "url": "https://your-project-page.com",  // or null
  "status": "Completed",  // or null for no badge
  "desc": "Short description of the project."
}
```

---

### Add experience
Open `data/experience.json` and add an object (place at top for most recent):

```json
{
  "period": "Jan 2026 – Present",
  "role": "Job Title",
  "org": "Organization Name",
  "logo": "assets/img/logo.png",
  "desc": "What you did."
}
```

---

### Update your bio / links
Edit `data/profile.json` — change `about`, add/remove items in the `links` array, or update your photo path.

Supported link icon names: `email`, `linkedin`, `github`, `rg`, `orcid`, `cv`

---

### Add a peer review journal
Open `data/publications.json`, find `"peerReview"`, and add:

```json
{ "journal": "Journal Name – Publisher", "logo": "assets/img/logo.png", "abbr": "J" }
```

---

## Running Locally

Because the page loads JSON via `fetch()`, you need a local server (not just file:// in browser):

```bash
# Python (easiest)
cd portfolio
python -m http.server 8000
# then open http://localhost:8000

# Node.js
npx serve .
```

---

## Deploying

Works with any static host:

| Host | Steps |
|------|-------|
| **GitHub Pages** | Push to repo → Settings → Pages → Deploy from branch `main` |
| **Netlify** | Drag the `portfolio/` folder onto netlify.com/drop |
| **Vercel** | `vercel deploy` from the folder |

No build step needed — it's plain HTML/CSS/JS.

---

## Customization

- **Colors**: Edit CSS variables at the top of `assets/css/style.css` under `:root`
- **Fonts**: Change the `@import` URL at the top of `style.css` and update `--font-serif` / `--font-sans`
- **Add a new section**: Add a `<section id="new-section">` in `index.html`, a new JSON file in `/data`, a renderer function in `main.js`, and a nav link
