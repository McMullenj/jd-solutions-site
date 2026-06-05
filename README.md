# JD Solutions site (marketing + Split Frame product)

Single Netlify deployment hosting two independent SPA bundles:

| Path | Bundle |
| --- | --- |
| `/` | JD Solutions marketing |
| `/split-frame` | Split Frame landing |
| `/split-frame/app/*` | Split Frame product (login, setup, dashboard) |

## Local development

```bash
pnpm install
pnpm dev
```

Product app standalone dev still lives in the linked `split-frame/` checkout (`pnpm dev:web` from that repo).

## Production build

```bash
pnpm build
```

`build:product` resolves `split-frame/` (git submodule on CI) or `../split-frame` (sibling checkout for local monorepo layout), builds `@desk-stat/web` with `VITE_WEB_BASE_PATH=/split-frame/app/`, and merges output into `apps/web/dist/split-frame/app/`.

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

`split-frame/` pins the product source at deploy time:

```bash
git submodule update --init --recursive
```

Update the pin after product releases:

```bash
cd split-frame && git fetch && git checkout <commit>
cd .. && git add split-frame && git commit -m "chore: bump split-frame product pin"
```
