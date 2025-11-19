const { notion, linear, CONFIG, log } = require('./utils');

const COMPONENT = 'LinearToNotion';

// Status Mapping Linear -> Notion
const STATUS_MAP = {
  'Todo': 'To Do',
  'In Progress': 'In Progress',
  'Done': 'Done',
  'Canceled': 'Done' // Map Canceled to Done or handle separately
};

async function syncLinearToNotion() {
  log(COMPONENT, 'Starting sync...');

  try {
    // 1. Fetch updated Linear Issues (last 24h)
    // In a real system, we'd persist the last sync time.
    const issues = await linear.issues({
      first: 50,
      orderBy: linear.createdAt, // Should ideally filter by updatedAt
    });

    log(COMPONENT, `Fetched ${issues.nodes.length} issues from Linear.`);

    for (const issue of issues.nodes) {
      const identifier = issue.identifier;
      const title = issue.title;
      const state = await issue.state;
      const stateName = state.name;
      
      log(COMPONENT, `Processing ${identifier}: ${title} (${stateName})`);

      // 2. Check if exists in Notion
      const notionQuery = await notion.databases.query({
        database_id: CONFIG.NOTION_DB_TASKS,
        filter: {
          property: 'Linear Issue',
          rich_text: {
            equals: identifier
          }
        }
      });

      const notionStatus = STATUS_MAP[stateName] || 'To Do';

      if (notionQuery.results.length > 0) {
        // UPDATE
        const pageId = notionQuery.results[0].id;
        log(COMPONENT, `Updating Notion Page ${pageId}`);
        await notion.pages.update({
          page_id: pageId,
          properties: {
            'Name': { title: [{ text: { content: title } }] },
            'Status': { status: { name: notionStatus } },
            // potentially sync description, priority, etc.
          }
        });
      } else {
        // CREATE
        log(COMPONENT, `Creating new Notion Task`);
        await notion.pages.create({
          parent: { database_id: CONFIG.NOTION_DB_TASKS },
          properties: {
            'Name': { title: [{ text: { content: title } }] },
            'Status': { status: { name: notionStatus } },
            'Linear Issue': { rich_text: [{ text: { content: identifier } }] },
            // 'Assignee': ... (Complex mapping needed)
          }
        });
      }
    }

    log(COMPONENT, 'Sync complete.');

  } catch (error) {
    log(COMPONENT, `Error: ${error.message}`, error);
  }
}

if (require.main === module) {
  syncLinearToNotion();
}

module.exports = { syncLinearToNotion };

