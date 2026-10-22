# First send with `@nitrosend/sdk` — run notes

- **Install:** `npm install @nitrosend/sdk@0.11.7` in a clean directory. One dependency tree, no peer warnings. Runtime **Node v22.18** (`tsx` to execute the `.ts` directly), compiler **TypeScript 5.9.3**.
- **Commands run:** `tsc --strict --noEmit --target ES2022 --module ESNext --moduleResolution bundler --types node send5.ts` → exit 0. Then `NITROSEND_API_KEY=*** TO_EMAIL=proof@dogfood.nitrosend.net npx tsx send5.ts` → message queued, first poll two seconds later returned `sent`.
- **Install to first send:** about **6 minutes** — npm install ≈90 s, writing the 22-line script ≈3 min, first send at **06:44–06:46 UTC**.
- **Slowest step:** getting a `.ts` file to run at all. On Node 20.19, `node send.ts` fails with `TypeError [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension ".ts"`; the note that you need Node 22.18+ or `tsx` is below the quickstart, so the error arrives before the instruction does.
- **Doc gap, exact repro:** Node 20.19 + `node send.ts` → `ERR_UNKNOWN_FILE_EXTENSION`; same file under `npx tsx send5.ts` works. Moving the runtime requirement above the quickstart would remove the detour.
- **What worked as documented:** `new Nitrosend(key)` with the key read from `process.env`, `ns.messages.send(payload, "<idempotency-key>")` with a plain string as the second argument, and `ns.messages.list({limit: 1})` to watch the status flip to `sent`.
- **One change I would make:** let `send()` accept a wait option (e.g. `{ waitFor: "sent" }`) so a script does not need the poll loop to confirm delivery; the status usually flips within seconds.
