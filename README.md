# Omsk Regional M. A. Vrubel Museum of Fine Arts exhibitions

[![CI](https://github.com/hu553in/vrubel-museum-exhibitions/actions/workflows/ci.yml/badge.svg)](https://github.com/hu553in/vrubel-museum-exhibitions/actions/workflows/ci.yml)
[![Vercel Deploy](https://deploy-badge.vercel.app/vercel/vrubel-museum-exhibitions)](https://vrubel-museum-exhibitions.vercel.app/)

A website showcasing exhibitions of
[the Omsk Regional M. A. Vrubel Museum of Fine Arts](https://vrubel.ru/).

This project was developed as part of a group diploma project at
[Omsk State Technical University](https://omgtu.ru/english/). The website is available in Russian
only.

Deployed site:
[vrubel-museum-exhibitions.vercel.app](https://vrubel-museum-exhibitions.vercel.app/).

## What it does

- Presents exhibition pages for the Omsk Regional M. A. Vrubel Museum of Fine Arts
- Uses client-side routing for the exhibition experience
- Serves museum media, fonts, and static public documents from the repository
- Uses a Vercel SPA fallback so direct route visits resolve to `index.html`

## Requirements

- Node.js and pnpm
- `xmllint` for SVG checks; CI installs it through `libxml2-utils`

## Setup

```bash
pnpm i
pnpm dev
```

Open <http://localhost:5173>.

## Development

```bash
pnpm build
pnpm test
pnpm check
pnpm check:fix
```

`pnpm build` writes the Vite production build to `build/`.

## Runtime behavior

- The site is Russian-only
- Vite serves the app locally and builds static files for deployment
- `vercel.json` first serves existing files, then rewrites unmatched paths to `index.html`

## Co-authors

- Website design - Kristina Kalnitskaya ([Kristormy@gmail.com](mailto:Kristormy@gmail.com))
- Videos - Anastasia Khasanshina
  ([sergienkoanastasiia@gmail.com](mailto:sergienkoanastasiia@gmail.com))

## Tech stack

- React
- TypeScript
- Vite
