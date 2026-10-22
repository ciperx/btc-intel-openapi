# btc-intel OpenAPI 3.1

Hand-written-by-sampling OpenAPI 3.1 document for the live service at
`https://x402.ggez.my.id` (7 endpoints, x402 pay-per-call).

Every schema is derived from a real response captured from production, with the
captured body embedded as `example`, so the document can be rendered in
Swagger UI / Redoc without inventing fields.

## Validation

```bash
npx @stoplight/spectral-cli lint openapi.json --ruleset .spectral.yaml
```

`lint.txt` in this repo is the actual output: **0 errors, 0 warnings**
(`spectral:oas` ruleset).

## Contents

- `openapi.json` — spec (paths: /health, /pox, /fees, /market, /sbtc, /dep-versions, /pkg-health)
- `.spectral.yaml` — ruleset used for validation
- `lint.txt` — captured lint output
