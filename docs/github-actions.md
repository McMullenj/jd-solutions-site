# GitHub Actions — JD Solutions Netlify deploy

## Manual production deploy

Workflow: [`.github/workflows/deploy-netlify.yml`](../.github/workflows/deploy-netlify.yml)

Trigger from GitHub → **Actions** → **Deploy to Netlify** → **Run workflow**.

The workflow:

1. Checks out `main` with the `split-frame/` submodule pin
2. Builds marketing + product (`pnpm build`)
3. Verifies `/split-frame/app/` assets exist
4. Uploads `apps/web/dist` to Netlify production

Netlify site: **jd-solutions-site** (`https://jd-solutions-site.netlify.app`)

## Required GitHub secrets

Configure under **Settings → Secrets and variables → Actions** (environment: `production` recommended).

| Secret | Example / source | Used for |
| --- | --- | --- |
| `SUBMODULE_ACCESS_TOKEN` | Fine-grained or classic PAT with **Contents: Read** on [McMullenj/split-frame](https://github.com/McMullenj/split-frame) (private). Can be the same token as `JD_SOLUTIONS_REPO_TOKEN` in the split-frame repo if that PAT already has read access to both repos. | `actions/checkout` submodule clone |
| `NETLIFY_AUTH_TOKEN` | [Netlify user settings → OAuth applications](https://app.netlify.com/user/applications#personal-access-tokens) | CLI deploy auth |
| `NETLIFY_SITE_ID` | `b291deff-891b-4465-8405-4a8f62bb6d6a` | Target site |
| `VITE_API_BASE_URL` | Cloud Run API URL, e.g. `https://split-frame-api-….run.app` | Product SPA API calls |
| `VITE_SUPABASE_URL` | `https://ohgvnbfrchatnudekjwp.supabase.co` | Supabase auth client |
| `VITE_SUPABASE_ANON_KEY` | Supabase project anon key | Supabase auth client |
| `VITE_AUTH_MODE` | `supabase` (optional; defaults in workflow) | Product auth mode |

These mirror the Netlify production env vars used by automatic builds. Keep GitHub and Netlify values in sync when rotating keys.

## Automatic builds vs manual deploy

| Event | What happens |
| --- | --- |
| Merge to `main` (this repo) | Netlify auto-build from `netlify.toml` (uses Netlify-stored `VITE_*`) |
| Merge to `main` (split-frame repo) | Submodule bump commit lands here; **does not deploy** until you merge that bump or run manual deploy |
| Manual **Deploy to Netlify** workflow | Builds in GHA with GitHub secrets, deploys prebuilt `apps/web/dist` |

## Submodule pin

`split-frame/` tracks [McMullenj/split-frame](https://github.com/McMullenj/split-frame) `main`. The bump workflow in split-frame updates the pinned commit after each split-frame `main` merge.
