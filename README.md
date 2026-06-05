# JD Solutions site (marketing + Split Frame submodule)

Single Netlify deployment hosting two independent bundles:

| Path | Bundle |
| --- | --- |
| `/` | JD Solutions marketing SPA |
| `/split-frame/*` | Split Frame public site (submodule: marketing + product) |

Split Frame landing is at `/split-frame`; product routes remain at `/split-frame/app/*`.

## Local development

```bash
pnpm install
pnpm dev
```

Split Frame standalone dev lives in the linked `split-frame/` checkout:

```bash
pnpm dev:web          # landing at /, product at /app/*
pnpm build:public-site  # production base paths
```

## Production build

```bash
pnpm build
```

`build:split-frame` resolves `split-frame/` (git submodule on CI) or `../split-frame` (sibling checkout), builds the unified `@desk-stat/web` bundle with `VITE_SITE_BASE_PATH=/split-frame/`, and merges output into `apps/web/dist/split-frame/`.

## Netlify

- **Site:** `jd-solutions-site` → https://jd-solutions-site.netlify.app
- **Publish:** `apps/web/dist`
- **Build:** see `netlify.toml` (submodule init + combined build)

### Required production env vars

Set on the Netlify site (not in git):

- `VITE_API_BASE_URL` — Cloud Run API URL
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_AUTH_MODE=supabase`

## GitHub Actions

- **Manual Netlify deploy:** Actions → **Deploy to Netlify** (see [`docs/github-actions.md`](docs/github-actions.md) for secrets)
- **Submodule bumps:** automatic when split-frame `main` merges (workflow in split-frame repo)

## Deploy from split-frame repo

```bash
# Web + API env + Supabase auth URLs (from split-frame checkout)
pnpm deploy:jd-solutions

# Full API/worker image deploy + combined web
pnpm deploy:production

# Read-only verification
pnpm verify:production
```

The legacy `split-frame.netlify.app` site is retired; production web traffic uses `jd-solutions-site.netlify.app`.

## Submodule

`split-frame/` pins the full public site source at deploy time:

```bash
git submodule update --init --recursive
```

Update the pin after releases:

```bash
cd split-frame && git fetch && git checkout <commit>
cd .. && git add split-frame && git commit -m "chore: bump split-frame pin"
```
