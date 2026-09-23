# Archestraide development notes

See the [project README](../README.md) for the overview, architecture and quick start.

## Commands

Run these from this directory, using Node.js 22:

| Command | Purpose |
| --- | --- |
| `npm ci` | Install the locked dependencies |
| `npm run dev` | Start the local Next.js application |
| `npm test` | Compile and run regression tests with Node's test runner |
| `npm run typecheck` | Check TypeScript types |
| `npm run build` | Build the application with its server route |
| `npm start` | Serve that build locally |
| `npm run build:static` | Export static pages to `out/`, restoring API source afterwards |

## Optional server mode

Copy `.env.example` to `.env.local` for local development:

| Variable | Purpose |
| --- | --- |
| `ANTHROPIC_API_KEY` | Server-side key for optional answer synthesis; empty uses the deterministic composer |
| `ARCHESTRAIDE_MODEL` | Anthropic model identifier; defaults to `claude-sonnet-4-6` |
| `BASE_PATH` | Static deployment URL prefix, such as `/archestraide` |

`POST /api/ask` accepts `{ "query": "..." }`. With no key it returns the local composer's answer. With a key it sends the query and up to six retrieved passages to Anthropic. API failures fall back to deterministic answers. The route has no authentication, request-rate control or usage quotas: keep keyed server mode local until those controls and dependency maintenance are addressed.

The static Netlify/Pages builds do not include this route and need no API key. Browser-imported manuals never enter this server path.

## Deployment

`../netlify.toml` sets this directory as the base and publishes `out/`. Import the `javronich1/archestraide` repository with that configuration. If an existing Netlify site still shows the old repository name, review its Git integration after the rename.

For GitHub Pages, select GitHub Actions as the Pages source and manually run **Deploy ArchestrAide to GitHub Pages**. The workflow passes the Pages base path to the static build.

The static helper restores `app/api` after successful or failed builds. If the process is forcibly killed, restore `.api-static-backup` to `app/api` before retrying; the next build deliberately refuses to overwrite a leftover backup.

## Dependency maintenance

The publication cleanup updates Next.js 14 to the compatible Next.js 15 maintenance branch and retains React 18 and the existing application architecture. The framework and PostCSS changes address dependency advisories, rather than changing product functionality. Check the [upstream support policy](https://nextjs.org/support-policy) and run `npm audit` before deployment. Publication checks are recorded in [VALIDATION.md](docs/VALIDATION.md).

The committed deployment is static. Endpoint authentication, rate limits and usage quotas remain follow-up work before offering the optional keyed API as a public service.

## Answer and source limitations

Questions are independent; the visible conversation does not provide multi-turn model memory. Retrieval uses a small lexical index and English intent cues, so Spanish phrasing can miss relevant passages. Source badges describe provenance, not a guarantee that a passage or generated answer is correct. Uploaded files are labelled as user-provided sources, not official documentation.

The [ingestion guide](docs/INGESTION.md) describes the implemented browser path and how to add curated content.
