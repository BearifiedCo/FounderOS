const { notion, linear, CONFIG, log } = require('./utils');

const COMPONENT = 'NotionToLinear';

// Status Mapping Notion -> Linear
const STATUS_MAP = {
  'To Do': 'Todo',
  'In Progress': 'In Progress',
  'Done': 'Done',
  'Canceled': 'Canceled'
};

// Priority Mapping Notion -> Linear
const PRIORITY_MAP = {
  'P1-High': 1, // Urgent
  'P2-Medium': 2, // High
  'P3-Low': 3, // Normal
  'None': 0
};

async function syncNotionToLinear() {
  log(COMPONENT, 'Starting sync...');

  try {
    // 1. Fetch Notion Tasks
    const response = await notion.databases.query({
      database_id: CONFIG.NOTION_DB_TASKS,
      filter: {
        property: 'Status',
        status: {
          does_not_equal: 'Archived' // Example filter
        }
      }
    });

    const tasks = response.results;
    log(COMPONENT, `Found ${tasks.length} tasks in Notion.`);

    // 2. Fetch Linear Teams/States for mapping (Simplified: assume one team for now or default)
    const me = await linear.viewer;
    const teams = await linear.teams();
    const defaultTeam = teams.nodes[0]; // Pick first team for now
    
    if (!defaultTeam) {
      throw new Error('No Linear team found.');
    }

    const states = await defaultTeam.states();
    
    for (const task of tasks) {
      const props = task.properties;
      const taskName = props.Name.title[0]?.plain_text || 'Untitled Task';
      const notionStatus = props.Status.status?.name || 'To Do';
      const notionPriority = props.Priority.select?.name || 'None';
      const linearId = props['Linear Issue']?.rich_text[0]?.plain_text;

      // Map Status
      const targetStateName = STATUS_MAP[notionStatus] || 'Todo';
      const targetState = states.nodes.find(s => s.name === targetStateName);

      // Map Priority
      const targetPriority = PRIORITY_MAP[notionPriority] || 0;

      const issueData = {
        title: taskName,
        description: `Synced from Notion: ${task.url}`,
        stateId: targetState?.id,
        priority: targetPriority,
        teamId: defaultTeam.id
      };

      if (linearId) {
        // UPDATE existing issue
        log(COMPONENT, `Updating Linear Issue ${linearId} for Task "${taskName}"`);
        // Note: In a real app, we'd query Linear by ID to get the internal UUID, 
        // or store the Linear UUID in Notion as well.
        // Assuming linearId is the identifier (e.g. "TEAM-123"), we need to look it up.
        try {
          const issues = await linear.issues({ filter: { identifier: { eq: linearId } } });
          if (issues.nodes.length > 0) {
            const issue = issues.nodes[0];
            await issue.update(issueData);
          } else {
            log(COMPONENT, `Linear Issue ${linearId} not found. Skipping update.`);
          }
        } catch (err) {
          log(COMPONENT, `Failed to update Linear issue ${linearId}: ${err.message}`);
        }
      } else {
        // CREATE new issue
        log(COMPONENT, `Creating Linear Issue for Task "${taskName}"`);
        try {
          const issuePayload = await linear.issueCreate(issueData);
          const newIssue = await issuePayload.issue;
          const newLinearId = newIssue.identifier;
          const newLinearUrl = newIssue.url;

          // Update Notion with Linear ID and URL
          await notion.pages.update({
            page_id: task.id,
            properties: {
              'Linear Issue': {
                rich_text: [{ text: { content: newLinearId } }]
              },
              'Linear URL': { // Assuming this property exists or we put it in description
                 url: newLinearUrl
              }
            }
          });
          log(COMPONENT, `Created Linear Issue ${newLinearId} and updated Notion.`);
        } catch (err) {
          log(COMPONENT, `Failed to create Linear issue: ${err.message}`);
        }
      }
    }

    log(COMPONENT, 'Sync complete.');

  } catch (error) {
    log(COMPONENT, `Error: ${error.message}`, error);
  }
}

if (require.main === module) {
  syncNotionToLinear();
}

module.exports = { syncNotionToLinear };

