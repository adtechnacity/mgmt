# Email Import → BI Table PoC (mock)

Local Express + SQLite backend that demonstrates the end-to-end pipeline for the Maven email-import MVP **without touching Snowflake**:

```
[Simulated email arrival]
        │
        ▼
  Excel parser
        │
        ▼
 raw_email_data  ◄─── always inserted
        │
        ▼
  Path selector  (per-import: bi_direct | transformation)
        │
        ├── bi_direct       → insert into honda_adobe_data + control timestamps
        └── transformation  → leave in raw, flag as needing mapping
```

Inspired by the existing `MAVEN.MAVEN_BI.HONDA_ADOBE_DATA` table (sample shared by Ruben Llibre).

## Run

```bash
cd email-import-mapping
npm install
npm start
```

Server boots on http://localhost:3001 and seeds `data.db` with one import config.

A placeholder Excel is auto-generated at `seed/honda-adobe.xlsx` on first boot. **Replace it with Ruben's real Honda Adobe sample once received** — same filename, no code changes needed.

## Demo

Open http://localhost:3001/demo/emailimports-demo.html

1. Default state: "Honda Adobe Email" import, path = **BI Direct**
2. Click **Simulate Email Arrival** → raw + BI tables both populate
3. Toggle to **Transformation** → simulate again → only raw grows, "pending mapping" callout appears
4. **Reset Tables** truncates both
5. Inspect `data.db` with any SQLite client to verify persistence

## API

| Method | Path | Purpose |
|--------|------|---------|
| GET    | `/api/health` | Liveness |
| GET    | `/api/imports` | List imports |
| PATCH  | `/api/imports/:id/path` | Toggle `bi_direct` ↔ `transformation` |
| POST   | `/api/imports/:id/simulate-email` | Parse sample Excel, route, insert |
| GET    | `/api/raw-data?importId=X` | Read raw landing rows |
| GET    | `/api/bi-table/:tableName` | Read BI table rows |
| POST   | `/api/reset` | Truncate raw + BI tables |

## Schema

See `db.js`. Three tables: `imports`, `raw_email_data`, `honda_adobe_data`. The first two are generic; the BI table schema is hardcoded to the Honda Adobe column shape (Ruben's reference). New imports with different shapes would need additional BI tables — out of scope for this PoC.

## Files

| File | Purpose |
|------|---------|
| `server.js` | Express routes |
| `db.js` | SQLite setup + schema + seed |
| `excel-parser.js` | xlsx → array of normalized row objects |
| `router-logic.js` | The core BI vs Transformation routing |
| `generate-seed.js` | Generates placeholder Excel on first boot |
| `seed/honda-adobe.xlsx` | Sample input (placeholder until Ruben shares real) |
| `data.db` | SQLite file (generated at runtime, gitignored) |
