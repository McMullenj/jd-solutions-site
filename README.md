# JD Solutions site

Marketing site for JD Solutions. Split Frame is a separate product deployed from [McMullenj/split-frame](https://github.com/McMullenj/split-frame) at `https://split-frame.netlify.app`.

| Path | Content |
| --- | --- |
| `/` | JD Solutions marketing SPA |

## Local development

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```

## Netlify

- **Site:** `jd-solutions-site`
- **URL:** `https://jd-solutions-site.netlify.app`
- **Build:** see `netlify.toml`

Deploy manually via GitHub Actions (`deploy-netlify.yml`) or Netlify dashboard.

## Split Frame

Product web UI, API integration, and deploy live entirely in the split-frame repository. Navigation links on this site point to `https://split-frame.netlify.app`.
