# FounderOS Step 5: Automation Loop (Composer)

**Agent:** Composer
**Date:** 2025-11-19
**Branch:** `step5-automation-composer`

## Overview
This document details the implementation of the Step 5 Daily Automation Loop. The system is designed to autonomously synchronize tasks across Notion, Linear, and GitHub, and manage agent workloads.

## Architecture
The automation suite consists of modular Node.js scripts located in `automation/`, sharing a common configuration and utility layer.

### Components
1. **`automation/notion-to-linear.js`**
   - **Direction:** Notion → Linear
   - **Trigger:** Daily schedule
   - **Logic:** Reads Notion Tasks. If a task lacks a Linear Issue ID, it creates a new issue in Linear and writes the ID back to Notion. If it has an ID, it updates the Linear issue title/status.
   - **Mapping:**
     - Status: To Do → Todo, In Progress → In Progress, Done → Done.
     - Priority: P1 → 1, P2 → 2, P3 → 3.

2. **`automation/linear-to-notion.js`**
   - **Direction:** Linear → Notion
   - **Trigger:** Daily schedule
   - **Logic:** Fetches recently updated Linear issues. Matches them to Notion tasks via the `Linear Issue` property. Updates status and title in Notion. Creates new Notion tasks for unlinked Linear issues.

3. **`automation/pr-sync.js`**
   - **Direction:** GitHub → Notion/Linear
   - **Trigger:** Daily schedule
   - **Logic:** Scans PRs for issue references (e.g., "LIN-123"). Updates the corresponding Linear issue status (Merged → Done) and Notion Task status. adds PR URL to Notion.

4. **`automation/task-manager.js`**
   - **Purpose:** Agent Load Balancing
   - **Trigger:** Daily schedule (after syncs)
   - **Logic:** Identifies unassigned tasks. Calculates current agent workload from the Team DB. Assigns tasks to `Composer`, `Codex`, `Claude`, or `Gemini` using a round-robin/least-loaded strategy, respecting a max cap of 3 tasks.

### Configuration
- **Schedule:** `automation/schedule/daily-sync.yaml` defines the cron schedule (09:00 UTC).
- **Environment Variables:**
  - `NOTION_API_KEY`, `NOTION_TASK_DB_ID`, `NOTION_TEAM_DB_ID`
  - `LINEAR_API_KEY`
  - `GITHUB_TOKEN`, `GITHUB_OWNER`, `GITHUB_REPO`

### Logging
Execution logs are written to standard output and appended to markdown files in `/logs/` (e.g., `/logs/automation-YYYY-MM-DD.md`) for auditability.

## Verification Checklist
- [x] Directory structure created (`automation/`).
- [x] Dependencies defined in `package.json`.
- [x] `notion-to-linear.js` implemented with status mapping.
- [x] `linear-to-notion.js` implemented with bidirectional sync logic.
- [x] `pr-sync.js` implemented with regex matching.
- [x] `task-manager.js` implemented with workload balancing.
- [x] Logging system integrated.

## Next Steps
1. Set up environment variables in the deployment environment (e.g., GitHub Actions secrets or Railway).
2. Perform a dry-run with read-only permissions to verify field mappings on live data.
3. Enable the cron job.
