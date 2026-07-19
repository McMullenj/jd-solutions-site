# Independent product subsite routing

JD Solutions is the public hostname. Product sites stay in their own repositories
and deploy independently.

## Routes

| Path | Source | Integration |
| --- | --- | --- |
| `/` | `apps/web` | Built into this repo |
| `/split-frame/*` | Split Frame submodule build output | Static files copied into `apps/web/dist/split-frame` |
| `/axel/*` | FigureItOut `public-website` | Status-200 proxy to `https://axelskating.netlify.app/axel/:splat` |

## Rules

- Do not copy Axel source or build output into this repository.
- Do not add FigureItOut as a submodule or workspace package.
- Do not import Axel React components into JD.
- Ordinary Axel content releases deploy only the Axel Netlify origin; JD does not need a rebuild.
- Navigation to Axel uses a plain `<a href="/axel/">` so Netlify can intercept before the JD SPA.

## Local proxy

```bash
AXEL_DEV_ORIGIN=http://127.0.0.1:3000 pnpm dev
```

## Isolation check

```bash
pnpm test:axel-isolation
```
