# GitHub Actions — JD Solutions site deploy

## Workflows

| Workflow | Trigger | Purpose |
| --- | --- | --- |
| [`.github/workflows/deploy-netlify.yml`](../.github/workflows/deploy-netlify.yml) | Manual | Build JD Solutions marketing site and deploy to Netlify |

Split Frame no longer ships as a submodule on this site. The product deploys from [McMullenj/split-frame](https://github.com/McMullenj/split-frame) to `https://split-frame.netlify.app`.

## Required GitHub secrets

| Secret | Purpose |
| --- | --- |
| `NETLIFY_AUTH_TOKEN` | Netlify personal access token with deploy access |
| `NETLIFY_SITE_ID` | JD Solutions Netlify site ID |

`SUBMODULE_ACCESS_TOKEN`, `VITE_*` Split Frame build secrets, and `JD_SOLUTIONS_REPO_TOKEN` are **no longer used** on this site.

## Deploy

Run manually: **Actions → Deploy to Netlify → Run workflow**.
