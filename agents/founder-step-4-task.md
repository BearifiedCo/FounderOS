# 🎯 Agent Assignment: Build FounderOS Founder Dashboard (Step 4)

## 🟢 Context:

FounderOS Steps 1-3 are complete:
- **Step 1**: Repository blueprint and multi-agent system architecture ✅
- **Step 2**: Notion workspace with 6 core databases ✅
- **Step 3**: Product Hub pages for all 5 products ✅ (PR #7 merged as base)

We now need to build the **Founder Dashboard** - an executive-level overview that aggregates key information across all products and operations. This is the capstone of the Notion build-out: a high-level dashboard for leadership that provides real-time metrics and insights so that at a glance, the CEO/Chairman can answer "How are we doing, and what needs attention right now?"

## ✅ Your Objective:

Implement **Step 4 — Founder Dashboard** as the central command center for FounderOS leadership. This dashboard will pull together metrics, KPIs, and linked views across all products in a single, visually organized Notion page.

## 📋 Requirements

### 1. Dashboard Structure

Create/update the **Founder Dashboard** Notion page (stub already exists):
- **Location**: Under "FounderOS — BearifiedCo Command Center"
- **Page Title**: `🧠 Founder Dashboard`
- **Layout**: Visually organized with most important information first
- **Sections**: See detailed breakdown below

### 2. Linked Views & Data Aggregation

The dashboard must include linked database views that aggregate data across all products:

#### A. Projects Overview
- **View Type**: Board or Table
- **Grouping**: By Product (or Status)
- **Content**: All active projects across all products
- **Metrics**: 
  - Total active projects
  - Projects per product (count or visual)
  - Projects by status distribution

#### B. Tasks Summary
- **View Type**: Kanban or Table
- **Filters**: 
  - Priority: P0, P1 (critical tasks)
  - Status: In Progress, Ready for Dev
  - Due Date: This week, Overdue
- **Metrics**:
  - Total open tasks
  - Tasks due this week
  - Overdue tasks (highlighted)
  - Tasks by priority breakdown

#### C. Team Performance Metrics
- **View Type**: Table with rollups
- **Content**: Team members with key stats
- **Metrics** (if Team-Tasks relation exists):
  - Tasks completed this month per member
  - Active tasks per member
  - Overload indicators
- **Note**: If Team-Tasks relation missing, use placeholder or manual calculation

#### D. CRM & Sales Stats
- **View Type**: Table or Gallery
- **Filters**: Status = Active
- **Metrics**:
  - Total active contacts/deals
  - Recent deals closed
  - Pipeline value (if tracked)
  - Contacts by product

#### E. Content Machine Status
- **View Type**: Calendar or Kanban
- **Content**: Upcoming and published content
- **Metrics**:
  - Published vs scheduled content count
  - Content by product
  - Upcoming publish dates

### 3. Key Performance Indicators (KPIs)

Display clearly defined KPIs prominently at the top of the dashboard (use big numbers, callout boxes, or highlighted figures). Implement using formula or rollup fields in relevant databases:

#### Top-Level Business KPIs
- **Number of active projects** (rollup from Projects DB)
- **Overall completion percentage** (formula: completed tasks / total tasks)
- **Total open tasks** (count from Tasks DB)
- **Tasks completed this week** (filtered count)

#### Product Metrics
- **Active projects per product** (grouped rollup)
- **Tasks per product** (grouped count)
- **Product health status** (visual indicator per product)

#### Financial Metrics (Placeholder if not available)
- Revenue/sales numbers (if tracked in Notion or external system)
- Pipeline value
- Growth rate
- **Note**: If financial data not in Notion, use placeholder: "Financial metrics integration to be added"

#### Operational Metrics
- **Project completion percentage** (formula-based)
- **Milestone progress** (upcoming milestones count)
- **Task completion rate** (completed this week / total)
- **Team velocity** (tasks completed per team member)

#### Alerts & Warnings (Highlighted)
- Overdue items (highlighted in red)
- Critical issues (P0 tasks)
- Projects behind schedule
- KPIs below threshold

### 4. Product Status Overview

A summary of each product's status (as listed in placeholder):
- **Format**: Embedded board or table view of Projects database
- **Grouping**: By Product
- **Filter**: Active projects only
- **Alternative**: Show rollup for each product (e.g., "X projects in progress, Y projects delayed")
- **Metrics per Product**:
  - Active projects count
  - Open tasks count
  - Team members assigned
  - Recent activity
  - Health status (visual indicator: 🟢 Good, 🟡 At Risk, 🔴 Needs Attention)

### 5. Today's Focus Section

Display 3-5 critical tasks requiring immediate attention:
- **Source**: Notion Tasks filtered by Priority=P1 (or Linear API if integrated)
- **Format**: List or cards with clear visual hierarchy
- **Content**: Task name, assignee, due date, product, status
- **Filter Logic**: Priority = P1 OR (Due Date = Today AND Status != Done)

### 6. Product Spaces Navigation

Quick access buttons/links to Product Hubs:
- BEARO Hub
- AlphaBuilder Hub
- Primape Hub
- Chimpanion Hub
- BEARCO Ecosystem Hub

**Format**: Use Notion's button blocks or linked page references for easy navigation

### 7. Milestone Tracking

A view of upcoming or recent milestones:
- **Format**: Calendar view or filtered list
- **Source**: Projects database (using due dates or milestone property)
- **Filter**: Upcoming milestones (next 30 days) OR recent milestones (last 7 days)
- **Content**: Project name, milestone description, due date, product
- **Purpose**: Ensure leadership sees critical dates across all projects/products

### 8. Alert & Action Items

Highlight anything needing immediate attention:
- **Format**: Linked view of Tasks database
- **Filters**: 
  - Overdue tasks (Due Date < Today AND Status != Done)
  - High Priority tasks (Priority = P0 OR P1) AND Status != Done
  - Blocking issues (if "Blocking" property exists)
- **Visual**: Use red highlighting or callout boxes for urgency
- **Future**: If Linear/Slack integrated, show latest critical mentions or tickets

### 9. CEO Notes Section

A daily founder journal section:
- **Format**: Rich text block or database
- **Purpose**: Daily notes, thoughts, decisions
- **Integration**: Can link to Linear issues or Notion pages
- **Layout**: Dedicated section at bottom of dashboard

### 10. Stream Integration (Optional)

"Now Building" view based on active work:
- **Source**: Notion Tasks (or Linear API if integrated)
- **Filter**: Status = In Progress
- **Format**: List or timeline
- **Grouping**: By Product or Assignee

## 🔗 Integration Requirements

### Notion Integration
- ✅ Use existing databases (Projects, Tasks, Team, CRM, Content Machine)
- ✅ Create linked views with appropriate filters
- ✅ Use rollups for aggregated metrics where possible

### Linear Integration (NEW - Critical Gap to Address)
- **Status**: ⚠️ Not yet integrated (identified gap in Step 3)
- **Requirement**: Implement Linear API integration (see `LINEAR-INTEGRATION-EVALUATION.md`)
- **Phase 1 (Step 4)**: Basic integration
  - Set up Linear API client
  - Fetch Linear issues/tasks (read-only)
  - Display Linear metrics in dashboard
  - Show Linear issue counts and status distribution
- **Phase 2 (Future)**: Full bidirectional sync
  - Create Linear issues from Notion tasks
  - Sync status changes bidirectionally
  - Support autonomous work cycles (agents create/complete tasks)
- **Placeholder**: If Linear not yet integrated, use placeholder: "(Future integration: Linear issues will appear here)"

### External Data Sources
- Define where each metric comes from:
  - Notion DB (primary)
  - Linear API (to be integrated)
  - Manual input (for financials if not automated)
  - Other sources (if applicable)

## 🔄 Automation & Refresh

### Real-time Updates
- Notion linked views update automatically as data changes
- No manual refresh needed for Notion-based metrics

### Scheduled Updates (if needed)
- Daily sync job for Linear metrics (if Linear integrated)
- Automated KPI calculations
- Alert generation for thresholds

### Manual Input (if needed)
- Financial metrics (if not in Notion/Linear)
- Custom KPIs
- CEO Notes

## 📐 Design Guidelines

### Visual Hierarchy
1. **Top Section**: Critical KPIs (big numbers, prominent display)
2. **Second Section**: Alert & Action Items (immediate attention needed)
3. **Third Section**: Today's Focus (3-5 critical tasks)
4. **Middle Section**: Product Status Overview and Projects Overview
5. **Lower Sections**: Detailed views (Tasks Summary, Team Performance, Milestone Tracking)
6. **Bottom Section**: CEO Notes

### Layout Structure
- Use Notion's column layout for side-by-side sections
- **Example Layout**:
  - **Left Column**: KPIs, Alerts, Today's Focus
  - **Right Column**: Product Status, Milestone Calendar
  - **Full Width Below**: Projects Overview, Tasks Summary, Team Performance

### Visual Elements
- Use Notion's native formatting (headings, callouts, dividers, toggles)
- Highlight critical items (overdue, P0 tasks) with red callouts
- Use color coding for status (red=urgent, yellow=at risk, green=good)
- Big numbers for KPIs (use callout boxes with large text or heading format)
- Use dividers to separate major sections
- Consider using toggles for collapsible detailed views

### Consistency
- Match Product Hub styling where applicable
- Use consistent terminology across dashboard
- Link to Product Hubs for detailed views
- Follow blueprint's design principles from Implementation Plan

## ✅ Acceptance Criteria

The Founder Dashboard is complete when:

1. ✅ Dashboard page created/updated in Notion
2. ✅ All required linked views embedded and filtered correctly
3. ✅ KPIs displayed prominently with current values (using rollups/formulas)
4. ✅ Product Status Overview shows all products with health indicators
5. ✅ Alert & Action Items section highlights urgent items
6. ✅ Today's Focus shows 3-5 critical tasks
7. ✅ Milestone Tracking displays upcoming milestones
8. ✅ Projects Overview aggregates all active projects
9. ✅ Tasks Summary shows filtered critical tasks
10. ✅ Team Performance metrics displayed (if Team-Tasks relation exists)
11. ✅ Product navigation links work
12. ✅ CEO Notes section available
13. ✅ Linear integration placeholder or basic metrics (if possible in Step 4)
14. ✅ Dashboard updates automatically from Notion data
15. ✅ Visual hierarchy guides attention to most important info
16. ✅ Layout is clean and not overwhelming
17. ✅ All sections from placeholder ("Coming Soon") are implemented

## 🚨 Constraints & Notes

### Known Limitations
- **Team-Tasks Relation**: May be missing (identified in Step 3)
  - Workaround: Use placeholder or manual calculation for team metrics
  - Future: Add relation and update dashboard

- **Financial Data**: May not be in Notion yet
  - Workaround: Use placeholders or manual input fields
  - Future: Integrate financial tracking system

- **Linear Integration**: Not yet implemented
  - Action: Implement as part of Step 4 (addresses Step 3 gap)
  - Fallback: Use Notion Tasks filtered by priority for "Today's Focus"

### Manual Configuration Required
- Filter application for linked views (Notion API limitation)
- Verification of all metrics display correctly
- Testing of all links and navigation

## 📝 Deliverables

1. **Updated Founder Dashboard Page** in Notion
2. **Documentation File**: `notion/step4-completion.md` with:
   - Implementation summary
   - Dashboard structure details
   - Integration status
   - Manual configuration steps
   - Verification checklist

3. **Linear Integration** (if completed):
   - Integration documentation
   - API setup instructions
   - Sync configuration

4. **Update**: Post in Slack #founder-os channel announcing Step 4 completion

## 🔗 Reference Documents

- **Blueprint**: `/notion/founder-dashboard.md`
- **Step 3 Completion**: `/notion/step3-completion.md`
- **Linear Gap**: `/notion/linear-integration-gap.md`
- **Notion Architecture**: `/notion/step2-completion.md`

## 🎯 Success Metrics

Step 4 is successful when:
- Founder can see all critical information at a glance
- Dashboard updates automatically from underlying data
- Linear integration enables autonomous work cycles
- All products visible in cross-product comparison
- KPIs provide actionable insights

---

## 🚀 Ready to Begin

The Founder Dashboard stub page exists at:
https://www.notion.so/2ad6468866ef81e585a6dccc74c9042e

All underlying databases are ready. Begin implementation by:
1. Reviewing existing dashboard stub
2. Planning dashboard layout
3. Creating linked views with appropriate filters
4. Implementing Linear integration (if possible)
5. Testing and verifying all metrics
6. Documenting completion

**Good luck!** 🎉

