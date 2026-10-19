# mhbxyz.github.io

Personal blog of Manoah B. — a software engineer exploring code, philosophy and culture.

> “One day, Beauty will save the World.”

**Live:** [mhbxyz.github.io](https://mhbxyz.github.io/)

A bilingual French/English site, built with Hugo and a bespoke visual identity inspired by the author's GitHub portrait: pure black, bone white and aged gold. UnifrakturCook signs the site; Cormorant Garamond in bold sets the titles. The design includes responsive archives, search and topic filtering, article tables of contents, code copying, and a reading progress indicator.

## Development

Install the Hugo extended version in `.hugo-version` (currently **0.154.2**), then run:

```bash
hugo server -D
```

Open `http://localhost:1313/`. No Node.js dependencies or application server are needed. The custom layouts are in this repository; the historical PaperMod submodule is no longer used and does not need to be initialized.

Build the production site:

```bash
hugo --gc --minify
cp public/fr/404.html public/404.html
```

The extra copy provides the root error page required by GitHub Pages. Hugo's development server already handles missing pages.

## Publishing

The existing `.github/workflows/hugo.yml` builds and deploys the static `public/` directory when a commit is pushed to `main`, or when the workflow is started manually. In the repository's Pages settings, the source must be **GitHub Actions**.

Both language prefixes (`/fr/` and `/en/`), article URLs, tag pages, RSS feeds and historical `/page/1/` aliases are retained. `/` redirects to the French homepage. No API keys or server runtime are required.

## Content and design

```text
content/fr/essais/       French essays
content/fr/articles/     French technical articles
content/en/essays/       English essays
content/en/articles/     English technical articles
layouts/                Custom Hugo templates and Markdown rendering hooks
assets/css/site.css     Palette, local fonts, layout and responsive styles
assets/js/site.js       Progressive enhancements; content works without JS
i18n/                   French and English interface text
static/images/          GitHub portrait and monogram favicon
static/fonts/           Locally hosted fonts and their OFL licenses
```

Article bodies remain in their original Markdown files. Matching `translationKey` values link translated articles and the essay sections, so the language switch opens the same text in the other language. Give both versions of a new article the same key.

The original homepage biographies remain in `content/{fr,en}/_index.md` and appear in the About section. Edit interface copy in `i18n/fr.json` and `i18n/en.json`; edit the palette at the top of `assets/css/site.css`.

The avatar is a local copy of the GitHub profile image. Replace `static/images/avatar-github.png` to update it. The portrait and fonts need no external requests. Existing article images retain their original source URLs.

## Reading integrations

- **KaTeX 0.16.9** renders mathematical notation on article pages.
- **Mermaid 11.17.2** renders diagrams with the site's dark palette. If loading fails, the source stays readable.
- **Giscus** preserves the original GitHub Discussions repository, category and pathname mapping, with a dark appearance.

These integrations load from their respective CDNs/services. Search, navigation, article content and the visual identity work independently of them.

## License

Content is copyrighted. Code is MIT. Bundled fonts are distributed under their included SIL Open Font Licenses.
