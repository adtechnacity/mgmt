# Email Imports — Claude Code Context

## Project Overview

This is a redesign of the **Email Imports** section inside the Maven internal tool at `maven.adtechnacity.com`. Maven is an internal data and reporting platform used by the AdTechnacity team.

The goal is to redesign the existing `/manage/emailimports` page and build a new `/manage/emailimports/create` form that structures the handoff between Rob (requester) and Luis (engineer) when setting up a new automated email report import.

The sidebar navigation is already implemented. Only build the main content area unless told otherwise.

---

## Tech Stack

- Next.js
- Tailwind CSS
- Snowflake (data layer — read only context, not touched in this project)
- The app already exists — this is a feature addition, not a greenfield build

---

## Pages to Build

### 1. `/manage/emailimports` — Import list

A table listing all email imports with health indicators.

**Columns:**
- Name
- Status (Active / Inactive badge)
- Health (colored dot + label + frequency subtext)
- Edit icon button → links to `/manage/emailimports/[id]/edit`

**Do NOT show report naming on this page.**

**Health column logic:**
- 🟢 Green dot — `Received today at [time]` — latest_received is today
- 🟡 Amber dot — `Last received [N] days ago` + `May–6 days ago
- 🔴 Red dot — `Last received [month year]` + `Likely broken` — 7+ days ago
- ⚫ Gray dot — `Not monitored` — inactive imports

**Filter tabs:** All · Active · Warnings · Inactive

**Top right actions:** Filters button + `+ New import` primary button

**Sample data:**
```js
const imports = [
  { id: 65, name: "Honda Adobe", active: true, latest_received: "2026-04-17T06:11:00", frequency: "daily" },
  { id: 66, name: "Innovid", active: true, latest_received: "2026-04-17T00:01:00", frequency: "daily" },
  { id: 63, name: "Firefox TabReports", active: true, latest_received: "2026-04-13T10:00:00", frequency: "daily" },
  { id: 57, name: "Horizon Honda Flashtalking", active: true, latest_received: "2024-11-14T04:30:00", frequency: "weekly" },
  { id: 62, name: "DCM Campaign By Geo", active: false, latest_received: null, frequency: null },
  { id: 59, name: "Opera Rich Hints", active: true, latest_received: "2026-04-17T00:01:00", frequency: "daily" },
  { id: 64, name: "Fisher Report",atest_received: null, frequency: null },
]
```

---

### 2. `/manage/emailimports/create` — Create new import form

A two-column form layout. Left column (200px) = section label + owner badge. Right column = fields.

#### Section 1 — Basic info `[Rob]`
- `Import name` — required text input
  - Placeholder: `e.g. Honda Adobe`
  - Hint: `A clear name for this report`

#### Section 2 — Email filters `[Rob]`
- `Subject line` — required text input
  - Placeholder: `e.g. Honda | Adobe Prospect Visits`
  - Hint: `The exact subject the client's email will have`
- `Sender emails` — required chip/tag input
  - User types email and presses Enter to add as a chip
  - Each chip has × to remove
  - Placeholder: `Add email address...`
- `File source` — required segmented toggle
  - Options: `Attachment` (default) | `Download link in body`

#### Section 3 — Sample file `[Rob]`
- `Upload sample` — required, accepts `.csv` and `.xlsx` only

**Default state (pre-upload):**
Show a pre-loaded Honda Adobe examwhat a valid upload looks like.

File bar:
- File name: `Honda_Adobe_Report_sample.xlsx`
- Metadata: `Excel · 42 KB · example file`
- Link: `Replace with your file` (instead of Remove)

Preview table columns:
```
Sub Region | Partner | Audience Pillar | Date | Placement ID | DAA Year | Car Model | SV | QSV | PV
```

Preview rows:
```js
["Baltimore Honda Dealers", "Motor Maven", "Prospecting", "1/26/2026", "437823623", "NEW", "Multi-models", "2", "—", "—"],
["Baltimore Honda Dealers", "Motor Maven", "Prospecting", "1/28/2026", "437643217", "NEW", "Multi-models", "123", "7", "2"],
["Baltimore Honda Dealers", "Motor Maven", "Prospecting", "1/29/2026", "437643217", "NEW", "Multi-models", "174", "14", "4"],
["Baltimore Honda Dealers", "Motor Maven", "Prospecting", "1/30/2026", "437823623", "NEW", "Multi-models", "411", "3", "1"],
```

Preview bar: `14 columns detected` pill · `Showing 4 of 312 rows`
Footer: `+ 308 more rows not shown`

Amber notice above upload zone:
`This is an example file. Replace it weal sample of the report your client will send.`

**After user uploads their own file:**
- Parse CSV with `papaparse`, parse Excel with `SheetJS`
- Replace example data with real parsed file contents
- Show real file name, size, upload time
- Show `Remove` link instead of `Replace with your file`
- Switch amber notice to blue notice:
  `Luis will use this to understand the column structure before building the reader. Make sure it's a real example of what the client sends — not a blank template.`

#### Section 4 — Technical settings `[Luis]`
Wrap in a light gray box with top note:
`These fields are filled in by Luis after reviewing the sample file above. You can leave them blank when submitting.`

Fields (all optional, monospace inputs):
- `Report naming` — placeholder `e.g. honda_adobe_report_{0}`, hint: `{0} = email timestamp · {1} = extracted from subject`
- `Attachment filter` — placeholder `Regex to match filename`
  - Report naming + Attachment filter sit side by side in a two-column grid
- `Slter override` — full width, placeholder `e.g. (.+)?Honda\ \|\ Adobe\ Prospect\ Visits(.+)?`, hint: `Only needed if the subject line varies and requires a pattern match`
- `Body filter` — full width, placeholder `Regex to match email body content`

#### Form footer
- Left: `* Required fields` in muted text
- Right: `Cancel` ghost button + `Submit for review` primary orange button

**Validation on submit:**
- Import name — required
- Subject line — required
- Sender emails — at least one required
- File source — required
- Sample file — required (example file does not count as valid — user must upload their own)

Show inline error messages under each missing required field.

**On successful submit:**
Save as pending/draft status. Do not activate the import. Luis will complete the technical setup before it goes live.

---

## Owner Badge Styles

```
Rob badge:  background #e8f0fc, text #1a5fb4, no border
Luis badge: background #f7f7f5, text #6b6b66, border 1px solid #e8e8e4
```

---

## Key Bu- **reports@adtechnacity.com** — the shared inbox that receives all client report emails (~50/day)
- **maven.maven.email_imports** — Snowflake table that stores all import configurations
- **Rob** — requests new imports, not technical, fills in basic info
- **Ruben** — routes requests, product owner of this tool
- **Luis Martinez** — engineer who builds and tests each import reader
- **Erasmo Simó** — handles DBT transformations for the full ETL path (out of scope for MVP)
- **Prefect** — current active implementation, runs every 1 hour, uploads raw files to S3
- **Maven** — legacy implementation, still active for some connectors (e.g. DCM)
- **bi-services** — future replacement, currently outdated and not in use

## MVP Scope

The MVP targets the **BI table path only**:
Email received → Prefect reads it → raw data stored in `MAVEN_DW` → Luis publishes to `maven.maven_bi`

The full ETL path (Erasmo's DBT transformations into daily reporting data) is out of scope for MVP.

Column mapross clients is also out of scope. Each client sends different column structures — Luis writes a custom reader per import. The form's job is to give Luis everything he needs upfront, not to replace the custom reader work.

---

## What NOT to Build

- Do not include the sidebar — it is already implemented
- Do not show `report_naming` on the list page — only in the create/edit form
- Do not build the full ETL path or Erasmo's DBT flow
- Do not build a column mapping system — out of scope
- Do not activate imports on submit — save as pending for Luis to complete
- Do not build bi-services integration
