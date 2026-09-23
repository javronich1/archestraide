# Knowledge ingestion

The bundled corpus is structured TypeScript in `lib/knowledge/`. Public documentation links provide provenance; the application does not fetch those pages at runtime.

| File | Contents |
| --- | --- |
| `sources.ts` | Source identifiers, titles, public URLs and topics |
| `runbooks.ts` | Symptoms, likely causes, diagnostic steps and escalation criteria |
| `glossary.ts` | Concepts, examples and related terms |
| `knownIssues.ts` | Environment-specific troubleshooting patterns |
| `types.ts` | Shared source and knowledge types |
| `index.ts` | Converts the curated entries into searchable chunks |

## Add a curated entry

1. Add a source with a stable identifier and a working public URL to `sources.ts`.
2. Add the explanation or runbook to the corresponding knowledge file and reference that identifier in `sourceIds`.
3. Use your own concise explanation and link to the original documentation. Do not bundle vendor manuals or copy restricted text.
4. Run `npm test`, `npm run typecheck` and `npm run build:static`.

The retrieval index is rebuilt from the content at module load. There is no separate database or indexing service.

## Import a PDF in the browser

Open **Manuales**, choose a product and topic, and select a text-based PDF you are permitted to use. `lib/userKnowledge.ts` extracts each page with PDF.js, splits its text into overlapping passages, records page references and saves them in `localStorage`.

Ask and Docs search combine those passages with the bundled corpus. When any uploaded passages are available, Ask uses local composition instead of the optional Claude endpoint. The guided troubleshooting wizard and community pages do not consume this index.

These imports stay in that browser profile and are not written into the repository. The worker script is loaded from jsDelivr; the PDF bytes are processed in the browser. Scanned documents require OCR elsewhere. Browser storage quotas limit manual size, and clearing site storage removes imports.

## Scope

There is no implemented shared manual server, OCR pipeline, automated documentation crawler or embedding service. Community GitHub Issues store submitted troubleshooting entries, not manual files. Extending the bundled corpus makes that text part of the public website and repository, so only add material suitable for redistribution.
