# mhbxyz.github.io

Personal blog of Manoah B. — a software engineer exploring the intersections of code, philosophy, and faith.

> *"One day, Beauty will save the World"*

## About

This is a bilingual (French/English) blog built with [Hugo](https://gohugo.io/) and the [PaperMod](https://github.com/adityatelange/hugo-PaperMod) theme.

**Essays** — Reflections on Christianity, Orthodox theology, ethics, and the philosophy of computer science.

**Articles** — Technical writings on development tools, automation, and open-source projects.

## Live

[mhbxyz.github.io](https://mhbxyz.github.io/)

## Stack

- **Hugo** — Static site generator
- **PaperMod** — Minimal theme
- **KaTeX** — Mathematical notation
- **Mermaid** — Diagrams
- **Giscus** — Comments via GitHub Discussions
- **GitHub Actions** — CI/CD

## Local Development

```bash
# Clone with submodules
git clone --recurse-submodules https://github.com/mhbxyz/mhbxyz.github.io.git
cd mhbxyz.github.io

# Run locally
hugo server -D

# Build
hugo --gc --minify
```

## Structure

```
content/
├── en/
│   ├── essays/      # Philosophical essays
│   └── articles/    # Technical articles
└── fr/
    ├── essais/      # Essais philosophiques
    └── articles/    # Articles techniques
```

## License

Content is copyrighted. Code is MIT.
