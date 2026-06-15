# Conversion Engine (Predictive Engine Replacement)

*Detailed working notes — source of truth for the Conversion Engine configuration system replacing the current spreadsheet-based workflow.*

---

## 1. What the Conversion Engine Does

The system configures how conversion data is mapped and sent between systems. It sits between:

- **Traffic Sources** (Google Ads, Facebook, Yahoo DSP, etc.)
- **Internal metrics / tracking system** (Maven / Conversion tracking)

Functionally, it:
- Takes incoming identifiers (e.g., conversion IDs, click IDs)
- Maps them to outbound events and metrics
- Sends them to the correct destination (platform account)

---

## 2. Why This System Exists

### Current State (Google Sheets)
- 900+ configurations exist in a single sheet
- Columns include: Conversion ID, Outbound Event (human-readable name), Metric mapping
- No enforced structure, no validation, no scalable search/filtering

### Critical Problem
Mappings are not documented in a structured way. Rob and Sheba memorize mappings and rely on experience instead of system support.

### Resulting Issues
1. **High Error Risk** — Wrong mapping = incorrect conversion tracking; no validation layer prevents mistakes
2. **Fragile System** — Anyone can overwrite rows; no audit trail or rollback
3. **Poor Scalability** — Adding new clients/platforms increases complexity linearly; no grouping by account or platform
4. **No Debugging Capability** — If conversions fail, there's no way to trace where the issue is; requires manual investigation

---

## 3. Core Entities (Strict Definitions)

### 3.1 Traffic Source
External platform sending or receiving conversion data.

Examples: Google Ads, Facebook Ads, Yahoo DSP, Taboola, Outbrain, Anura

### 3.2 Platform Account
A specific advertiser account inside a traffic source.

> From Sumin: "As we add more clients, we are creating more platform accounts."

- Each platform account has unique identifiers and its own credentials
- Example: Google Ads → Capital One Shopping account; Google Ads → Capital One Credit account
- **Implication:** Configurations are not shared globally — they are account-specific

### 3.3 Implementation
The technical method used to connect to a platform account.

Two types:
- **Postback (S2S)**
- **API**

- Implementation is NOT the same as platform account
- One platform account → multiple implementations possible

### 3.4 Parameter
A field used in tracking.

Examples: `utm_source`, `utm_campaign`, `clickid`, `publisher`

Purpose: mapped to platform-specific values.

### 3.5 API Input
Fields required for API-based integrations.

Examples: Client ID, Account ID, Pixel ID, Access Token, API Key

Key property: account-dependent — values differ per platform account.

---

## 4. Page Structure

### 4.1 Integrations Page

**Purpose:** Configure how data flows to/from traffic sources.

**Structure:**
```
Traffic Source
  → Platform Account
      → Implementation (Postback / API)
          → Configuration Fields
```

#### Why Postback and API are Separate

**Postback (S2S)**
- Uses: URL, Parameters
- Characteristics: simple, event-based, no authentication complexity

**API**
- Uses: Credentials (Client ID, Token, etc.)
- Characteristics: requires authentication, platform-specific logic, more complex validation

**Design Decision:** Keep them separate because they have different data structures, different setup flows, and different mental models.

#### Integrations Page Functionalities

1. **Add Traffic Source** — User selects from dropdown; system determines available implementations (API, Postback)
2. **Add Platform Account** — Represents a real advertiser account; required because each account has unique configuration
3. **Add Postback** — Creates a new row inline; required fields: Parameter, Type, URL
4. **Add API** — Creates a new row inline; required fields: Parameter, Implementation (dropdown)
5. **API Input (See Details)** — Triggered by clicking "See Details"

#### API Input Modal Behavior

Fields are dynamic, based on implementation.

> From discussion: "We don't know exact fields ahead of time → depends on platform."

Examples:
- **Google Ads API:** Client ID, Developer Token
- **Facebook:** Pixel ID, Access Token
- **Yahoo DSP:** Client ID, Seat ID

**Important UX Decisions:**

> From Sumin: "Inputs vary → don't hardcode columns."

- Use modal + key-value input system
- Avoid fixed table columns for API inputs

> From discussion: "API input fields are rarely revisited."

- Hide behind "See Details"
- Do not expose in main table

### 4.2 Accounts Page (Main Configuration)

**Purpose:** Configure event mapping logic.

**Structure:** Table with Conversion ID, Outbound Event, Mapped Metric, Notes, Status.

#### Key Behavior — Adding Event Mapping

> From Sumin: "Adding event mapping = creating a new row."

#### Important Constraint — Traffic Sources vs Performance Sources

| Type | Behavior |
|------|----------|
| Performance Sources | Predefined metrics → selectable |
| Traffic Sources | Manual input required |

**Resulting UX:**
- Conversion ID → manual input
- Outbound Event → manual input
- Metric → dropdown

#### Presets

> From Rob: "They memorize mappings → need presets."

**Purpose:** Predefine Outbound Event → Metric combinations.

**Behavior:** When user selects an outbound event, metrics are pre-populated.

Presets are editable and shared across configurations.

---

## 5. Workflow (Based on Real Usage)

### 5.1 Adding New Conversion
1. Receive conversion ID from traffic source
2. Go to Accounts Page
3. Add new row: Conversion ID, Outbound Event, Metric
4. Save

### 5.2 Setting Up New Platform Account
1. Go to Integrations Page
2. Add Traffic Source
3. Add Platform Account
4. Add Implementation (API or Postback)
5. Configure inputs

### 5.3 Debugging
1. Check event mapping (Accounts Page)
2. Check integration setup (Integrations Page)
3. Validate IDs, API inputs, status toggles

---

## 6. Key UX Constraints (From Conversations)

### 6.1 Avoid Too Many Buttons
> From Sumin: "Too many 'Add' buttons are confusing."

Consolidate actions. Prefer inline row creation and a single primary action.

### 6.2 Inline Editing Preferred
Modal-heavy flows = confusing. Inline = consistent + faster.

### 6.3 Table = Primary Interface
Current system is a spreadsheet — users are familiar with row-based editing.

### 6.4 API Inputs Should Be Hidden
> From Sumin: "They don't need to see API details often."

Use "See Details" modal. Do NOT show full inputs in table.

### 6.5 Traffic Source Inputs Must Be Manual
> From Sumin: "They copy/paste conversion IDs."

No dropdown for Conversion ID or Outbound Event.

### 6.6 Performance Source Inputs Can Be Selected
Metrics come from system — can be dropdown/multi-select.

---

## 7. Important Design Tradeoffs

### Tradeoff 1 — Flexibility vs Simplicity
- API inputs vary widely; cannot standardize fields
- **Decision:** Use flexible key-value inputs

### Tradeoff 2 — Visibility vs Complexity
- Showing all inputs → clutter
- Hiding inputs → less transparency
- **Decision:** Show summary in table; full details in modal

### Tradeoff 3 — Global Defaults vs Account Scope
- Platform accounts are independent
- **Decision:** No global defaults (current scope)

---

## 8. System Behavior Constraints

### 8.1 API Inputs Are Unknown Ahead of Time
- Backend must define schema
- UI must adapt dynamically

### 8.2 Platform Accounts Are Expanding
System must support multiple accounts per platform and different configurations per account.

### 8.3 Configurations Are High Volume
Must support search, filtering, and fast editing.

---

## 9. Critical Insights (From Sumin & Rob)

| # | Insight | Implication |
|---|---------|-------------|
| 1 | "They memorize mappings" | Need presets |
| 2 | "Traffic source inputs are manual" | No automation possible for IDs |
| 3 | "Performance source data is preloaded" | Can use selection UI |
| 4 | "API inputs vary per platform" | Must be dynamic |
| 5 | "Too many actions = confusing" | Simplify UI controls |

---

## 10. Non-Assumptions (Strict Accuracy)

Things we do **NOT** assume:
- All platforms share same API fields
- All accounts share credentials
- Bulk creation is always possible
- Users prefer automation over control

Everything is: **manual where required, dynamic where needed**.

---

## Final State (Truth-Based)

The Conversion Engine is:
- A configuration system
- Used daily by Rob and Sheba
- Replacing a spreadsheet-based system
- Built to handle platform-specific integrations, support account-level configurations, and reduce manual errors

---

*Last updated: April 2026*
*Sources: Working sessions with Sumin and Rob; current Google Sheet configuration*
