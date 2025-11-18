# Step 4 — Founder Dashboard Implementation (Agent: Codex GPT-5.1 High)

**Date**: 18 Nov 2025  
**Status**: ✅ Dashboard specification delivered (manual Notion configuration required)  
**Related Pages**:  
- 🧠 Founder Dashboard — https://www.notion.so/2ad6468866ef81e585a6dccc74c9042e  
- FounderOS — BearifiedCo Command Center — https://www.notion.so/2ad6468866ef81a0926dd83a9e721984  
- Manual filter instructions — `FILTER-CONFIGURATION-STATUS.md`, `notion/MANUAL-FILTER-CONFIGURATION-GUIDE.md`

---

## 1. Build Summary

The Founder Dashboard is organized around a strict visual hierarchy so leadership lands on KPIs first, urgent items second, and deep dives last. All views described below are linked databases that must be embedded manually in Notion because the MCP API still cannot apply per-view filters. The layout is:

1. **Hero header + KPI callouts** (full width)
2. **Alerts & Today's Focus** (two-column strip)
3. **Cross-product intel** (Roadmap Timeline + Product Status grid)
4. **Operational pipelines** (Tasks, Team, CRM, Content, GitHub PRs, Linear)
5. **Reference blocks** (Product navigation, CEO notes, Token placeholders, Now Building stream)

---

## 2. KPI & Alert Sections

| Block | Details |
| --- | --- |
| **Global KPI Row** | Use four callout blocks across a single row. Each references rollups/formulas in the Tasks + Projects DBs. <br>• `Active Projects` → rollup count where `Status != Complete`<br>• `Total Open Tasks` → Tasks filtered Status != Done<br>• `Completion %` → Formula `(Completed Tasks / All Tasks)`<br>• `Tasks Closed This Week` → filter on `Completed Date` within last 7 days. |
| **Financial Placeholder** | If revenue pipeline isn’t in Notion, add a callout: “Financial KPIs pending — integrate QuickBooks/Stripe feed in Step 5.” |
| **Alert & Action Items** | Linked Tasks view (List) with compound filter: `(Status = Blocked) OR (Due Date <= now() + 72h AND Status != Done) OR (Priority in [P0, P1])`. Show columns: Blocked Reason, Owner, Product, Project, Due Date. |
| **Today's Focus** | Linked Tasks view (Table or Gallery) filtered to `Priority = P1` OR `(Due Date = Today AND Status != Done)`. Limit to 5 items and show Product, Assignee, Due Date, Linear Issue ID (if synced). |

**Manual steps**: use Notion UI → `/linked` → select `🗂 Tasks`, then apply filters per `notion/MANUAL-FILTER-CONFIGURATION-GUIDE.md`.

---

## 3. Required Linked Views (Full Dashboard)

### 3.1 Cross-Product Roadmap (Timeline)
- **Database**: `🗂 Projects`
- **View**: Timeline, Group by `Product`, Sort by `Start Date`
- **Fields**: Status, Priority, Start, End, Owner
- **Filters**: none (global view)

### 3.2 Engineering Kanban (Execution Board)
- **Database**: `🗂 Tasks`
- **View**: Board grouped by `Status`
- **Filters**: `Status != Done`
- **Sort**: Priority descending
- **Card badge**: Product + Project relations

### 3.3 Blockers & At-Risk List
- **Database**: `🗂 Tasks`
- **View**: List
- **Filters**: `Status = Blocked` OR `Due Date < now() + 72h`
- **Fields**: Blocked Reason, Owner, Product, Project, Due Date

### 3.4 Agent Workload Overview (AI Ops Tracker)
- **Database**: `🗂 Tasks`
- **View**: Table grouped by `Assigned To`
- **Filters**: `Status != Done`
- **Computed Columns**:  
  - `# Active Tasks` rollup counting tasks per assignee  
  - `High Priority Count` rollup filter `Priority in [P0, P1]`  
  - `Blocked Tasks` rollup filter `Status = Blocked`

### 3.5 Linear Issue Feed (Synced DB)
Use the Linear integration (once connected) or a synced database block.

| View | Filter | Notes |
| --- | --- | --- |
| **Active Issue List** | `State != Done` | Table showing ID, Title, State, Priority, Assignee, Due Date |
| **Engineering Board** | Group by `State` | Board-style view for sprint triage |
| **Past-Due Queue** | `Due Date < Today AND State != Done` | List view surfaced near Alerts section |

*Phase 1 (Step 4)*: Display read-only synced data using the Linear → Notion integration or CSV import ( refreshed daily ).  
*Phase 2*: Automate via the Linear API client described in `LINEAR-INTEGRATION-EVALUATION.md`.

### 3.6 CRM Pipeline
- **Database**: `🗂 CRM`
- **View**: Board grouped by `Stage`
- **Filters**: `Status != Lost`
- **Sort**: `Last Contact` descending
- **Fields**: Company, Contact, Email, Product, Last Contact, Next Step

### 3.7 Content Machine Calendar
- **Database**: `🗂 Content Machine`
- **View**: Calendar (full width)
- **Filters**: none (global calendar)
- **Properties shown**: Title, Content Type, Product, Status

### 3.8 GitHub PR Monitor
- **Database**: Create (or reuse) `GitHub PR Monitor`
  - Properties: `PR Title (Title)`, `Branch`, `Author`, `Status (Select: Open/Needs Review/Merged)`, `URL`, `Related Product`, `Opened At`, `Last Updated`.
- **Views**:  
  1. `Open PRs` – filter `Status = Open`  
  2. `Needs Review` – filter `Status = Needs Review`  
  3. `Recently Merged` – filter `Status = Merged`, sort by `Merged At` desc (limit 5)
- **Automation**: Use GitHub Actions or a scheduled script to hit the GitHub GraphQL API (`pullRequests` query) and upsert rows via the Notion API. Store token + Notion secret in GitHub Secrets.

---

## 4. Product & Reference Sections

| Section | Instructions |
| --- | --- |
| **Product Status Overview** | Linked `🗂 Projects` view, grouped by `Product`, filter `Status != Complete`. Add formula column `Health` (manual select: 🟢, 🟡, 🔴). |
| **Product Navigation Buttons** | Use heading + inline links (or Notion Button blocks) pointing to each Product Hub URL listed in `FILTER-CONFIGURATION-STATUS.md`. |
| **Milestone Tracking** | Projects DB list filtered to `Milestone Date within next 30 days OR within last 7 days (completed)`. Show Product, Owner, Confidence. |
| **Stream Integration / “Now Building”** | Tasks DB list filtered `Status = In Progress`, grouped by Product, sorted by `Updated Date`. |
| **CEO Notes** | Add toggle list or linked database for journaling (Date, Note, Follow-ups). |
| **Token Ecosystem Placeholder** | Create a table with columns `Metric`, `Current Value`, `Source`, `Next Update`. Fill with `$APES Market Cap`, `$BEARCO Market Cap`, `LP Depth`, `Active Holders`, `Staking APR`. Leave values blank with annotation “Populate during Step 6 data integrations.” |

---

## 5. Embedded “🚀 Executive Summary Dashboard”

Place this block at the very top of `FounderOS — BearifiedCo Command Center`:

1. Heading `### 🚀 Executive Summary Dashboard`
2. Two-column layout:
   - **Column A**: Mini timeline (Projects), Active Tasks Kanban, Blockers list
   - **Column B**: Open PRs list, `Linear Issue Count` callout (manual number updated daily or via automation), `Upcoming Deadlines (7 days)` list.
3. Each mini-view simply mirrors the corresponding view from the Founder Dashboard but filtered to fewer items (limit 5) for readability.
4. Add divider after the summary so the rest of the Command Center content stays intact.

---

## 6. Manual Configuration Checklist (Due to Notion API Limits)

1. **Create linked views** with `/linked` for each database listed.  
2. **Apply filters/grouping** manually following `notion/MANUAL-FILTER-CONFIGURATION-GUIDE.md`.  
3. **Rename views** to the names referenced above (e.g., `BEARCO — Projects Board`, `Engineering Kanban`).  
4. **Verify columns** shown for each view.  
5. **Test filters** by toggling sample data in each database.  
6. **Document completion** inside `FILTER-CONFIGURATION-STATUS.md` once finished.  
7. **Command Center placement** must be verified manually (drag block to very top).  
8. **Team ↔ Tasks relation**: if missing, add relation property to both databases so the workload table + rollups work; then add rollups for Active Tasks, Blocked Tasks per team member.

---

## 7. Integration Guidance

### 7.1 Linear (Phase 1 — Step 4)
1. Configure Linear API key in `.env` (Notion secret lives separately).  
2. Create script (e.g., `/integrations/linear_sync.ts`) that:
   - Fetches `issues` via GraphQL (`issues(filter:{state:{type:active}})`).
   - Transforms to JSON payload for Notion `/v1/pages`.  
   - Upserts into `Linear Issue Feed` database keyed by Linear Issue ID.  
3. Schedule via GitHub Actions (every hour) or run manually until automation is live.  
4. Surface summary metrics with Notion rollups + formula fields (`Active Issues`, `Past-Due Count`, `24h Created`).

### 7.2 GitHub PR Monitor
1. Create automation workflow: GitHub Action triggered on `pull_request` events.  
2. Action hits a small script (Node/Python) that calls Notion `pages.create`/`pages.update` with PR metadata.  
3. Map fields: Title, URL, Author → `user.login`, Branch → `headRefName`, Status → event action mapping.  
4. Use Notion’s “synced block” inside dashboard to display the three saved views.

### 7.3 Financial Metrics Placeholder
Until finance data sources are wired, add manual number fields with last-updated timestamps. Plan Step 5 automation to pull Stripe/QBO summary via Make/Zapier or a serverless function writing into a `Financial KPIs` database.

---

## 8. API Limitations & Workarounds

- **Linked view filters cannot be set via MCP** → manual instructions above.  
- **Synced Linear/GitHub databases require authenticated integrations** not yet provisioned; placeholders + automation plan provided.  
- **Team-Tasks rollups** depend on a relation column that may not exist; add manually in Notion schema before configuring Agent Workload view.  
- **Financial KPIs absent** → place annotated placeholders to avoid misleading empty data.

---

## 9. Suggestions for Step 5 & Step 6

### Step 5 (Automation & Autonomy)
1. Implement bidirectional Notion ↔ Linear sync per `LINEAR-INTEGRATION-EVALUATION.md` so agents can auto-create/close work.  
2. Auto-populate GitHub PR Monitor + Financial KPIs using scheduled integrations.  
3. Add Slack alerts (via `slack/automation` rules) that fire when KPI thresholds are crossed (e.g., >5 blockers, >3 overdue milestones).  
4. Build “filter enforcement” helper: script lists any linked views missing `Product` filters so humans can quickly fix them.

### Step 6 (Insights & Summaries)
1. Generate a weekly Founder Summary block automatically (Notion → Slack) using AI agent to pull metrics + produce narrative.  
2. Populate Token Ecosystem table automatically from on-chain APIs and display sparkline charts.  
3. Extend Executive Summary Dashboard with trendline widgets (7-day deltas) for KPIs.  
4. Add anomaly detection: agent scans CRM + Tasks nightly and logs anomalies into an “Alerts” database feeding the dashboard.

---

## 10. Verification Checklist

- [ ] KPI callouts display current values (manual cross-check).  
- [ ] Alert & Today’s Focus views show correct filtered rows.  
- [ ] Eight main linked views configured exactly as specified.  
- [ ] Linear + GitHub sections present (placeholder or live sync).  
- [ ] Product navigation + status grid reflect all five products.  
- [ ] Milestone tracking covers ±30 day window.  
- [ ] Exec Summary block pinned to the top of Command Center.  
- [ ] CEO Notes & Token placeholders ready for future automation.  
- [ ] Documentation (this file) stored under `/notion/`.  
- [ ] Slack notification template prepared:
  ```
  Step 4 Founder Dashboard implementation completed.
  PR ready for Chairman review.
  Agent: Codex GPT-5.1
  Branch: step4-founder-dashboard-codex
  Link: <PR URL>
  ```

Once manual configuration in Notion is complete, update `FILTER-CONFIGURATION-STATUS.md` and merge the accompanying PR titled **“Step 4 — Founder Dashboard (Agent: Codex)”** with labels `step4`, `notion`, `dashboard`.

---

**End of file.**

