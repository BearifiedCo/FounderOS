# 🎯 Agent Assignment: Build FounderOS Notion Architecture

## 🟢 Context:
FounderOS Step 1 is complete and merged to `main`. The repository blueprint is live and defines the multi-agent execution system across Slack, Linear, GitHub, Gmail, and Notion. We are now building the **Notion workspace**, which will be our single source of truth, integrated with Linear and Slack.

## ✅ Your Objective:
Implement the **Step 2 — Notion Architecture** as described in the FounderOS Implementation Plan PDF. This includes:

### 1. Create the central **Notion page**:
- Title: `FounderOS — BearifiedCo Command Center`
- Paste the full Notion architecture blueprint inside the page (from Step 2 plan)

### 2. Create the 6 Databases inside that page:
- 🗂 Products
- 🗂 Projects
- 🗂 Tasks
- 🗂 Team (Members)
- 🗂 CRM (optional for AlphaBuilder)
- 🗂 Content Machine

Each database must follow the **exact schema** defined in the Implementation Plan:
- Use correct field types (select, multi-select, date, relation, person)
- Setup all **Relation fields** to link across Products ↔ Projects ↔ Tasks
- Validate: schema matches spec 1-to-1

### 3. Add sample entries to test linking logic:
- Add one sample Product: “BEARO”
- One sample Project under BEARO
- Two Tasks for that project
- One sample Team member, linked to task(s)

### 4. Begin Step 3 preparation (DO NOT EXECUTE YET):
Create page stubs for these Product Hubs:
- BEARO Hub
- AlphaBuilder Hub
- Primape Hub
- Chimpanion Hub
- BEARCO Ecosystem Hub

Leave them empty for now — we’ll fill these in Step 3.

### 5. Create empty stub page:
- Title: `🧠 Founder Dashboard`  
(Leave empty for now — we populate this in Step 4)

---

## 📌 Final Output
After execution:
- Paste link to central Notion page: `FounderOS — BearifiedCo Command Center`
- Confirm that all 6 databases are created and interlinked
- Confirm that Product sample has child Projects and Tasks
- Confirm “Step 2 ready for review” status

---

## 💡 Execution Details:
- Use Notion API MCP or build manually if access is delegated
- Use `bearifiedco.slack.com#founder-os` to post status once complete
- If task is delegated, make a comment in `claude-code-agents.md` or `composer.md` referencing this step

---

## 🛠 Pull Request Workflow (Required)
Once you've completed your work:
1. **Create a new branch**
   - Suggested format:
     ```
     step2-notion-claude
     step2-notion-codex
     step2-notion-composer
     ```

2. **Commit all updated files**  
   - Include `/notion/*.md`, `/agents/*.md` updates if applicable

3. **Push your branch to origin**

4. **Open a Pull Request** back to `main`  
   - Title:  
     ```
     Step 2 — Notion Architecture Blueprint [Agent: Your Name]
     ```
   - Description should include:  
     - Summary of what was implemented  
     - Whether MCP was simulated or real  
     - List of databases created  
     - Sample data added? (Yes/No)  
     - Stub pages prepared? (Yes/No)

5. **Optional:** Post PR link in Slack `#founder-os` with status.

---

🧬 Bonus Guidance:
This system reduces cognitive load for the CEO and prepares the OS for dashboarding, multi-product scaling, and investor visibility.

“Let’s slow the chaos down and tighten the grip.”
