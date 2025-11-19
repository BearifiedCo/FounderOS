const { notion, CONFIG, log } = require('./utils');

const COMPONENT = 'TaskManager';

async function manageTasks() {
  log(COMPONENT, 'Starting task management...');

  try {
    // 1. Fetch Agents from Team DB
    const teamResponse = await notion.databases.query({
      database_id: CONFIG.NOTION_DB_TEAM,
      filter: {
        property: 'Role', // Assuming Role property exists
        select: {
          equals: 'AI Agent' // Or filter by names if Role doesn't exist
        }
      }
    });

    const agents = {}; // Name -> PageID
    const workload = {}; // PageID -> Count

    // If we can't filter by Role, just grab everyone and filter in code
    // For now, hardcode names mapping if DB fetch fails or is empty (fallback)
    // But let's try to map from the Team DB results.
    
    for (const page of teamResponse.results) {
      const name = page.properties.Name.title[0]?.plain_text;
      if (CONFIG.AGENTS.includes(name)) {
        agents[name] = page.id;
        workload[page.id] = 0;
      }
    }

    log(COMPONENT, `Found agents: ${Object.keys(agents).join(', ')}`);

    // 2. Fetch Unassigned Tasks & Calculate Workload
    // We need to fetch ALL active tasks to calculate current workload first
    const tasksResponse = await notion.databases.query({
      database_id: CONFIG.NOTION_DB_TASKS,
      filter: {
        property: 'Status',
        status: {
          does_not_equal: 'Done'
        }
      }
    });

    const unassignedTasks = [];

    for (const task of tasksResponse.results) {
      const assigneeRelation = task.properties.Assignee.relation;
      
      if (assigneeRelation.length > 0) {
        // Task is assigned
        const assigneeId = assigneeRelation[0].id;
        if (workload[assigneeId] !== undefined) {
          workload[assigneeId]++;
        }
      } else {
        // Task is unassigned
        unassignedTasks.push(task);
      }
    }

    log(COMPONENT, `Workload: ${JSON.stringify(workload)}`);
    log(COMPONENT, `Unassigned tasks: ${unassignedTasks.length}`);

    // 3. Assign Tasks
    for (const task of unassignedTasks) {
      // Find agent with lowest workload < 3
      let bestAgentId = null;
      let minLoad = 3; // Max load is 3

      for (const [agentId, load] of Object.entries(workload)) {
        if (load < minLoad) {
          minLoad = load;
          bestAgentId = agentId;
        }
      }

      if (bestAgentId) {
        const taskName = task.properties.Name.title[0]?.plain_text;
        log(COMPONENT, `Assigning "${taskName}" to agent (ID: ${bestAgentId})`);

        await notion.pages.update({
          page_id: task.id,
          properties: {
            'Assignee': {
              relation: [{ id: bestAgentId }]
            }
          }
        });

        workload[bestAgentId]++;
      } else {
        log(COMPONENT, 'All agents at max capacity. Leaving task unassigned.');
      }
    }

    log(COMPONENT, 'Task management complete.');

  } catch (error) {
    log(COMPONENT, `Error: ${error.message}`, error);
  }
}

if (require.main === module) {
  manageTasks();
}

module.exports = { manageTasks };

