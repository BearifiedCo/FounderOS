const { notion, linear, octokit, CONFIG, log } = require('./utils');

const COMPONENT = 'PRSync';

async function syncPRs() {
  log(COMPONENT, 'Starting PR sync...');

  try {
    // 1. Fetch PRs
    const { data: prs } = await octokit.rest.pulls.list({
      owner: CONFIG.GITHUB_OWNER,
      repo: CONFIG.GITHUB_REPO,
      state: 'all', // or 'open' depending on needs. 'all' lets us catch merged ones.
      per_page: 20
    });

    log(COMPONENT, `Fetched ${prs.length} PRs.`);

    for (const pr of prs) {
      // naive parsing: look for "LIN-123" or "Task-123" (Notion often doesn't have short IDs visible, 
      // but we might use the Linear ID if synced)
      const text = `${pr.title} ${pr.body}`;
      const linearMatch = text.match(/[A-Z]+-\d+/); // e.g. ENG-123

      if (linearMatch) {
        const linearId = linearMatch[0];
        log(COMPONENT, `PR #${pr.number} references Linear Issue ${linearId}`);

        // Update Linear
        if (pr.merged_at) {
          log(COMPONENT, `PR merged. Closing Linear Issue ${linearId}`);
          try {
             const issues = await linear.issues({ filter: { identifier: { eq: linearId } } });
             if (issues.nodes.length > 0) {
                const issue = issues.nodes[0];
                // Find 'Done' state - simplifed
                // In production, fetch states and find the correct ID.
                // await issue.update({ stateId: '...' });
                log(COMPONENT, `(Simulated) Set ${linearId} to Done`);
             }
          } catch (e) {
            log(COMPONENT, `Failed to update Linear: ${e.message}`);
          }
        }

        // Update Notion
        // Find task by Linear ID
        const notionQuery = await notion.databases.query({
          database_id: CONFIG.NOTION_DB_TASKS,
          filter: {
            property: 'Linear Issue',
            rich_text: { equals: linearId }
          }
        });

        if (notionQuery.results.length > 0) {
          const pageId = notionQuery.results[0].id;
          log(COMPONENT, `Linking PR to Notion Task ${pageId}`);
          
          const updates = {
            'GitHub PR': {
              url: pr.html_url
            }
          };

          if (pr.merged_at) {
            updates['Status'] = { status: { name: 'Done' } };
          } else if (pr.state === 'open') {
            updates['Status'] = { status: { name: 'In Progress' } };
          }

          await notion.pages.update({
            page_id: pageId,
            properties: updates
          });
        }
      }
    }

    log(COMPONENT, 'Sync complete.');

  } catch (error) {
    log(COMPONENT, `Error: ${error.message}`, error);
  }
}

if (require.main === module) {
  syncPRs();
}

module.exports = { syncPRs };

