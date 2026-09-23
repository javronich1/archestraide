# Publication validation

Checked on 23 September 2026 on macOS / Apple Silicon with Node.js 25.2.1 and npm 11.6.2. Node.js 22 is the configured deployment target; hosted builds remain a separate check.

- `npm test`: four regression tests passed for long-text chunking, retrieval and bundled source references.
- `npm run typecheck`: passed.
- `npm run build`: production build passed, including the optional API route.
- Local HTTP checks: home, Ask, Manuals, Troubleshoot and Community returned 200. The no-key answer endpoint returned a deterministic answer with sources; an empty query returned 400.
- `npm run build:static`: static export passed. API source was restored after the build and no API endpoint was exported.
- `npm audit`: zero reported vulnerabilities in the publication lockfile at the time of checking. This is a point-in-time dependency check, not a guarantee of application security.

## Dependency changes

Next.js was updated from 14.2.5 to 15.5.26 to resolve framework advisories while retaining React 18 and the existing application architecture. PostCSS is pinned to 8.5.28; the scoped `next.postcss` override replaces Next's older nested copy. Recheck this override when updating the framework. The PDF.js lockfile resolves within the original major version, and unused optional/transitive dependencies disappeared during the refresh.

## Scope of checks

The publication review inspected the local project, current remote tree and retained text history for common secret patterns, private addresses and confidential material. No credentials or industrial/customer datasets were found. Bundled knowledge is curated text linking public documentation; unused placeholder manual-source entries were removed. The project owner confirmed publication rights.

No paid Anthropic calls were made. Browser PDF-worker loading, manual import/storage, live community issue rendering, mobile layout and hosted Netlify/Pages deployments were not tested end to end. The chunking and retrieval logic have regression coverage, but that does not replace a browser acceptance check.

Keep keyed server mode local until authentication, rate limiting and usage controls are added. Static deployment uses the deterministic browser composer and excludes the API route. After the GitHub rename, review any existing hosting integration and test the deployed site before presenting its live URL.
