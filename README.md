# Lydiian

An AI research workspace I built in 2025. You write and organise research documents in a block editor with AI built in, read PDFs beside them, and see how the ideas connect. It ran at app.lydiian.co and is now a paused prototype.

## What works

- **Accounts.** Sign-up, login and password reset with Supabase Auth.
- **Research documents** stored in Supabase and opened in a [Plate](https://platejs.org) block editor.
- **AI in the editor.** Continue writing, improve, simplify, explain, summarise, and make longer or shorter, streamed from OpenAI through the Vercel AI SDK. There are inline completions as you type.
- **Notes**, a view that lists your documents.
- **A PDF reader.**

## Unfinished

- **Concept graph** (`components/concept-graph`): a force-directed map of the concepts across your documents, backed by `concepts` and `document_concepts` tables. The graph still renders mock data and isn't linked from the notes page yet.
- **PDF chat**: the panel beside the reader is a placeholder.

## How it's built

Next.js (App Router) · TypeScript · Supabase · Vercel AI SDK with OpenAI · Plate · Tailwind and shadcn/ui · UploadThing

Most of `components/plate-ui` and `components/ui` comes from the Plate and shadcn/ui registries. The app's own code is in `app/`, `components/notes`, `components/concept-graph`, `components/pdf-viewer` and `lib/`.

## Run it

```bash
pnpm install
pnpm dev
```

It needs a Supabase project with a `research_documents` table, and these in `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_REDIRECT_URL=http://localhost:3000/callback
OPENAI_API_KEY=
UPLOADTHING_TOKEN=
```

## License

[MIT](LICENSE)
