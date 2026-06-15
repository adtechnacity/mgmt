# Maven Figma Style Guide
# Source: MGMT-UI-Style-Guide (Figma) + variable export

---

## Color Tokens + Semantic Usage

### Accent Colors
| Token | Hex | When to use |
|-------|-----|-------------|
| Accent Orange | `#FF8000` | Highlights, CTAs, key callouts |
| Accent Navy | `#002483` | Primary brand emphasis |

### Primary Colors
| Token | Hex | When to use |
|-------|-----|-------------|
| Navy | `#383F60` | Primary text, strong UI elements |
| LT Navy | `#5969A6` | Secondary UI elements, icons |
| Dark Grey | `#797979` | Tertiary text, supporting UI |

### Text Colors
| Token | Hex | When to use |
|-------|-----|-------------|
| Text/Black | `#212121` | Primary body text, headings |
| Text/Grey | `#8A8894` | Secondary/supporting text |
| Text/Light Grey | `#C9C8D3` | Placeholder, disabled text |
| Text/Disabled | `#C5C0DB` | Disabled state text |
| Text/White | `#FFFFFF` | Text on dark/filled backgrounds |
| Fields/Title | `#9D99AC` | Field label text |
| Fields/Description | `#AAAAAA` | Field description/helper text |

### Background Colors
| Token | Hex | When to use |
|-------|-----|-------------|
| BG/White | `#FFFFFF` | Default page and card backgrounds |
| LT Orange | `#FFF8F1` | Warm highlight backgrounds |
| LT Blue | `#EEF2FF` | Cool highlight, info backgrounds |
| LT Gray 1 | `#D9D9D9` | Dividers, borders |
| LT Gray 2 | `#F3F3F3` | Subtle section backgrounds |
| LT Gray 3 | `#F9FAFB` | Page-level background, alternating rows |
| BG/Disabled | `#F4F3FE` | Disabled field/input backgrounds |

### Status Colors
| Token | Hex | When to use |
|-------|-----|-------------|
| Success (text/icon) | `#03BF00` | Positive state, confirmed action |
| Success (background) | `#F1FFF4` | Success notification background |
| Warning/Validation | `#FFB82E` | At-risk, needs attention |
| Warning (background) | `#FFF5DF` | Warning notification background |
| Error (text/icon) | `#DC0700` | Failed states, critical issues |
| Error (background) | `#FFF5F5` | Error notification/field background |
| Error (stroke) | `#FFD8D8` | Error field border |
| Inactive | `#FFB000` | Inactive/paused state indicator |

### Stroke / Border Colors
| Token | Hex | When to use |
|-------|-----|-------------|
| Stroke/Grey | `#BDBCDB` | Default input borders, dividers |
| Stroke/Focused | `#F845FC` | Focused input border state |
| LT Gray 4 | `#EEF0F6` | Subtle borders, card outlines |

### Elevation (Shadows)
| Level | Value | When to use |
|-------|-------|-------------|
| Elevation 1 | `drop-shadow(0 4px 4px #8E8DD029)` | Cards, floating elements |
| Elevation 2 | `drop-shadow(0 4px 8px #8E8DD029)` | Dropdowns, popovers |
| Elevation 3 | `drop-shadow(0 8px 16px #8E8DD01F)` | Modals, side panels |
| Elevation 4 | `drop-shadow(0 16px 24px #8E8DD01F)` | Top-layer overlays |

### Color rules we follow
- Never use error red `#DC0700` for decoration or emphasis —
  only for actual error states
- Orange `#FF8000` is an accent — use sparingly,
  not for large surfaces
- Status background colors always pair with their
  matching text/icon color — never mix status colors
  (e.g. success bg with warning icon)
- Disabled states always use `BG/Disabled #F4F3FE` +
  `Text/Disabled #C5C0DB` together

---

## Typography Scale + Usage Rules

### Font families
- **Primary font:** Inter (UI body, labels, data)
- **Display font:** Nunito Sans (headlines, field text, buttons)

### Headlines — Nunito Sans (Desktop)
| Level | Size | Weight | When to use |
|-------|------|--------|-------------|
| Headline 1 | 24px | Bold (700) | Page titles |
| Headline 2 | 20px | Bold (700) | Section headers |
| Headline 3 | 18px | Bold (700) | Card titles, panel headers |
| Headline 4 | 16px | Bold (700) | Subsection headers |
| Headline 5 | 14px | Bold (700) | Group labels, small headers |

### Headlines — Nunito Sans (Tablet)
| Level | Size | Weight |
|-------|------|--------|
| Headline 1 | 24px | Bold |
| Headline 2 | 20px | Bold |
| Headline 3 | 18px | Bold |
| Headline 4 | 16px | Bold |
| Headline 5 | 14px | Bold |

### Headlines — Nunito Sans (Mobile)
| Level | Size | Weight |
|-------|------|--------|
| Headline 1 | 18px | Bold |
| Headline 2 | 16px | Bold |
| Headline 3 | 14px | Bold |

### Body — Nunito Sans
| Level | Size | Weight | When to use |
|-------|------|--------|-------------|
| Body-1 | 16px | Regular (400) | Primary body text |
| Body-2 | 15px | Regular (400) | Secondary body text |
| Body-3 | 14px | Regular (400) | Default UI text, descriptions |
| Body-4 | 12px | Regular (400) | Captions, metadata, timestamps |
| Body-5 | 16px | Semi Bold | Emphasized body, key values |
| Body-6 | 15px | Semi Bold | Emphasized secondary text |
| Body-7 | 14px | Semi Bold | Table headers, labels |
| Body-8 | 12px | Semi Bold | Emphasized captions |

### Input Fields — Nunito Sans
| Level | Size | Weight | Line Height | When to use |
|-------|------|--------|-------------|-------------|
| Text_Placeholder | 15px | Regular | 24px | Input placeholder text |
| Text_Title | 12px | Regular | 16px | Field label above input |
| Text_Description | 12px | Regular | 16px | Helper text below input |

### Button / Link — Nunito Sans
| Level | Size | Weight | Line Height | When to use |
|-------|------|--------|-------------|-------------|
| Text Link-1 (Desktop) | 20px | Medium | 24px | Primary link/button text |
| Text Link-1 (Tablet) | 16px | Medium | 20px | Tablet link/button text |
| Text Link-1 (Mobile) | 14px | Medium | 16px | Mobile link/button text |

### Body — Inter
| Level | Size | Weight | Line Height | When to use |
|-------|------|--------|-------------|-------------|
| Body | 14px | Regular (400) | 130% | General UI body, data cells |

### Typography rules we follow
- Headlines always use Nunito Sans — never Inter for titles
- Body text in data tables uses Nunito Sans Body-3
  (14px Regular) as default
- Semi Bold styles (Body-5 through Body-8) for emphasis only —
  not default body text
- Never go below Body-4 (12px) for readable content
- Metric values and KPI numbers use Headline 1 or Headline 2
  so they're scannable at a glance

---

## Spacing + Layout Grid

### Base unit: 4px
All spacing is a multiple of 4px.

| Token | Value | When to use |
|-------|-------|-------------|
| Micro | 4px | Icon internal padding, tight gaps |
| XS | 8px | Between related elements within a component |
| SM | 12px | Internal component padding (compact) |
| MD | 16px | Standard component padding, between groups |
| LG | 24px | Between sections within a page |
| XL | 32px | Major section separation |
| 2XL | 48px | Page-level spacing |

### Layout
Maven is primarily a **desktop product**.

| Breakpoint | Notes |
|-----------|-------|
| Desktop (1440px) | Primary design target |
| Tablet (768px) | Supported — typography scales down |
| Mobile | Limited — headlines use mobile type set |

### Spacing rules we follow
- Never use arbitrary spacing — always a multiple of 4px
- Card internal padding: MD (16px) minimum
- Section separation: LG (24px) between content groups
- Form fields: SM (12px) between label and input,
  XS (8px) between input and helper text

---

## Components + States Reference

### Buttons
- **Variants:** Primary, Secondary, Tertiary
- **Sizes:** Regular, Large
- **Icon options:** No icon, Icon left, Icon right
- **States:** Default → Hover → Focused → Active → Click → Disabled

### Input Fields
| Type | Notes |
|------|-------|
| Input | Basic text entry |
| Input + Icon | Icon inside field |
| Input + Title | Label above field |
| Input + Title + Icon | Label + icon |
| Search | Search-specific pattern |
| Dropdown | Single select |
| Password | Masked entry |
| Text area | Multi-line, with 0/100 char count |
| Text area + Title | Multi-line with label |

**States:** Default → Hover → Focused → Validation (Warning) →
Error → Success → Disabled

### Dropdowns
- Single select + Multi-select variants
- Includes search within dropdown
- States: Inactive → Hover → Active → Disabled

### Select Controls
- **Checkbox:** Off/On — Default, Hover, Focused, Disabled
- **Radio button:** Off/On — Default, Hover, Focused, Disabled
- **Toggle:** Off/On — Default, Disabled

### Links
- Primary and Secondary variants
- Desktop and Mobile sizes
- States: Default → Hover → Click → Disabled

### Notifications
- **Large:** Info, Error, Success
- **Small:** Info, Error, Success
- Always icon + message text

### Tooltips
- Single style, variable content length
- States: Default → Active → Click → Disabled

### Navigation
- **Breadcrumbs:** Inactive, Hover, Selected, Disabled
- **Tabs:** Inactive, Hover, Active, Disabled

### Pagination
- **Dot style:** Inactive, Active, Focused
- **Page number style:** Default, Hover, Active, Focused
  + ellipsis pattern for large ranges

### Progress Bar
- Percentage fill — shown in 25% increments

---

## Brand Voice in UI

### Personality
Direct, calm, professional — like a competent colleague.
Not casual, not corporate.

| Trait | In practice |
|-------|------------|
| Direct | No padding words — get to the point |
| Specific | Real numbers and states, not vague language |
| Helpful | Always tell users what to do next |
| Calm | Errors don't need drama |

### Empty states
**Formula:** What's missing + Why + What to do

| Context | Pattern |
|---------|---------|
| No data yet | "[Thing] will appear here once [condition]. [CTA]" |
| No filter results | "No [items] match your filters. [Clear filters]" |
| Setup needed | "You haven't configured [X] yet. [Get started CTA]" |

**Rules:**
- Never say "Oops" or "Uh oh"
- Always include a next action — never leave users stranded
- Empty ≠ broken — tone is neutral, not apologetic

### Error messages
**Formula:** What failed specifically + What to do next

| Error type | Pattern |
|-----------|---------|
| Data failed to load | "This report couldn't load. Refresh to try again." |
| Action failed | "[Action] didn't go through. Try again or [alternative]." |
| Validation | "[Field] needs [specific format]. Example: [example]." |

**Rules:**
- Never use "Something went wrong" alone —
  always name what failed
- Never blame the user
- Distinguish "no data exists" vs "data failed to load" —
  critical distinction for a reporting tool
- Validation states use Warning `#FFB82E`,
  actual failures use Error `#DC0700`

### Microcopy rules
- **Buttons:** Verb + noun — "Generate Report," "Save Rule,"
  "Add Initiative" — never just "Submit" or "OK"
- **Column headers:** Noun only, title case —
  "Campaign Name," "CPA3," "Spend MTD"
- **Tooltips:** One sentence max
- **Confirmations:** Specific — "Rule saved" not "Success"
- **Loading:** Name what's loading —
  "Loading report..." not just a spinner
- **Text areas:** Always show character count (0/100 pattern)

---
*Last updated: April 2026*
*Sources: MGMT-UI-Style-Guide Figma file + variable export*
*Update when tokens change or new components are added*
