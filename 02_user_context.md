# 02 — User context

## Who Sheba Lawrence is

**Role:** Ad Ops Specialist at Adtechnacity
**Primary job:** Creates landing pages, generates campaign URLs, and hands them off to media analysts. She is the single owner of this workflow — no one else does it.

She works from her Asana queue. Each morning she opens the tickets in her column, reads the request, switches to Maven, builds the LP and URL, then writes the output back to Asana. She also manages Google Tag Manager for UTM source configuration.

She has been doing this since 2023 and learned the entire system from Rob (who talks fast and says "as long as you get 60% of it, it doesn't matter"). Most of the platform knowledge lives in her memory and a collection of notepads.

## What Sheba knows going into each LP creation

When she opens an Asana ticket, she already knows:
- Which partner/account (Revenue Stream field)
- Which O&O page (Workspace field)
- Which traffic source / platform (Platform field)
- Which device (Desktop/Mobile field)
- The Instapage URL (Instapage URL field)
- The angle (Angle field)
- Whether UTM source is new or existing
- Whether it's tied to an experiment (Experiment Page field)
- EC and popup preferences (from notes field)

She reads these and translates them into Maven decisions — entirely from memory.

## Sheba's mental model for LP creation

She thinks in this sequence:

1. **"Whose is this and where does it live?"** → Account + O&O page → determines which initiative to use
2. **"What platform?"** → Traffic source + device → determines DS, pre-lander on/off, URL structure, macros
3. **"What page?"** → Instapage URL + angle → pre-lander URL assembly or landing URL
4. **"What experience?"** → EC, popup, continuation, UTM source

This is the order the Build form sections should follow.

## The four workflows

**Workflow 1 — New LP creation (most frequent)**
Triggered by a New Landing Pages Asana form submission. Sheba reads the ticket, creates the LP and LPG in Maven, sets all configuration, handles GTM if needed, generates the URL, QAs the redirect chain using the Link Redirect Trace browser extension, and writes Maven ID + URL back to the Asana ticket.

Has two sub-paths:
- **Pre-lander on (front door):** Used for Taboola, Outbrain, MSN, Bing, most native platforms. Uses alias domain (`cos-rd.com/DS/LPG`). Pre-lander URL is built from Instapage URL + tracking params. Requires UTM source in GTM.
- **Pre-lander off (back door):** Used for Facebook and Google. No alias domain. Instapage URL + params becomes the Media URL directly. GTM UTM source still required for Facebook.

**Workflow 2 — Backend experiment setup**
Triggered by an Experiment Request Asana form. An LPG already exists. Sheba finds it, adds variant LPs, sets traffic weights per LP (screenshots and posts to Asana ticket for transparency), configures continuations if needed, and appends `&expid=` after QA. She checks Reports 30–60 minutes after launch to confirm traffic is splitting correctly.

**Workflow 3 — New initiative creation**
Less frequent. Triggered when a new partner, platform, or device type needs a new initiative. She creates the initiative in Maven (initiative group, performance source, tracking source, conversion sources, revenue source). Sometimes must recreate it in a second system (e.g., MSN). For rev share partners (Advita, Spigot) she creates two initiatives — internal (Trading Desk) and external.

**Workflow 4 — QA and URL handoff**
Embedded in Workflows 1 and 2. After generating the URL she appends `&atnqa=1` to create the QA URL, validates the full redirect chain using the Link Redirect Trace browser extension, confirms params render correctly, and hands off both the live URL and QA URL to the analyst.

## Key pain points (confirmed from sessions)

- **No translation between Asana and Maven.** "Facebook" in Asana means DS12, pre-lander off, no alias, `{{double-curly}}` macros in Maven. This translation lives only in Sheba's head.
- **20+ notepads.** Platform-specific param structures, alias domains, macro formats, UTM source naming conventions — all stored externally, not in the system.
- **UTM source requires leaving Maven.** Creating a new UTM source requires opening Google Tag Manager, creating a key-value block, attaching the LPG ID, and waiting 5–15 minutes for propagation before Angel Rojas publishes the container.
- **Manual write-back to Asana.** After generating the URL, Sheba manually types the Maven LP ID, LPG ID, and Media URL back into the Asana ticket. Error-prone and time-consuming.
- **No copy-paste in Maven.** For partners like Fisher (35+ LPs per initiative, unique params per campaign) and Spigot (same setup as Fisher but duplicated), every LP must be created manually.
- **No audit trail for traffic weights.** When she sets LPG traffic distribution for experiments, she screenshots it and posts it to the Asana ticket — there is no structured field in Maven.
- **Continuation QA required.** Continuations must be QA'd before going live. When continuations break it's always a system issue, not a Sheba setup error.

## What Sheba does NOT do

- She does not monitor LP performance after handoff. The analyst confirms the campaign is live.
- She does not set Angle/Sub Angle in Reports — analysts configure that in report templates.
- She does not set Shared ID — analysts set that in the ad platform.
- She does not archive LPs until they've had no traffic for 3 months. Facebook LPs are the exception — they get reactivated often.

## Sources

Confirmed across three sessions with Sheba Lawrence (Mar 19, Mar 24, Mar 26, 2026) and one real Asana task (CCF Duplicate of the OST CA Sr Travel Page, task ID 1211441122399736).
