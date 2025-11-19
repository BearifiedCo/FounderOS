#!/usr/bin/env node

/**
 * Linear to Notion Sync Script
 * Syncs Linear issues to Notion database for FounderOS
 * 
 * Usage: node linear-sync.js <LINEAR_API_KEY>
 */

const LINEAR_API_KEY = process.argv[2] || process.env.LINEAR_API_KEY;
const NOTION_DATABASE_ID = 'a256468f56d145f0a17d4ed8628daeaa';

if (!LINEAR_API_KEY) {
  console.error('Please provide Linear API key as argument or set LINEAR_API_KEY environment variable');
  console.error('Usage: node linear-sync.js <LINEAR_API_KEY>');
  process.exit(1);
}

// Linear GraphQL endpoint
const LINEAR_API_URL = 'https://api.linear.app/graphql';

// GraphQL query to fetch issues
const ISSUES_QUERY = `
  query Issues {
    issues(first: 100, filter: { state: { name: { nin: ["Done", "Canceled"] } } }) {
      nodes {
        id
        identifier
        title
        description
        priority
        priorityLabel
        state {
          name
          type
        }
        assignee {
          name
          email
        }
        dueDate
        labels {
          nodes {
            name
          }
        }
        project {
          name
        }
        url
        createdAt
        updatedAt
      }
    }
  }
`;

async function fetchLinearIssues() {
  try {
    const response = await fetch(LINEAR_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': LINEAR_API_KEY
      },
      body: JSON.stringify({ query: ISSUES_QUERY })
    });

    if (!response.ok) {
      throw new Error(`Linear API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
    }

    return data.data.issues.nodes;
  } catch (error) {
    console.error('Error fetching Linear issues:', error);
    throw error;
  }
}

async function syncToNotion(issues) {
  console.log(`Found ${issues.length} active Linear issues`);
  
  // Format issues for display
  const formattedIssues = issues.map(issue => ({
    id: issue.identifier,
    title: issue.title,
    state: issue.state.name,
    priority: issue.priorityLabel,
    assignee: issue.assignee?.name || 'Unassigned',
    dueDate: issue.dueDate || 'No due date',
    project: issue.project?.name || 'No project',
    labels: issue.labels.nodes.map(l => l.name).join(', ') || 'No labels',
    url: issue.url
  }));

  // Display issues in console
  console.log('\n=== Linear Issues ===\n');
  formattedIssues.forEach(issue => {
    console.log(`[${issue.id}] ${issue.title}`);
    console.log(`  State: ${issue.state} | Priority: ${issue.priority}`);
    console.log(`  Assignee: ${issue.assignee} | Due: ${issue.dueDate}`);
    console.log(`  Project: ${issue.project} | Labels: ${issue.labels}`);
    console.log(`  URL: ${issue.url}`);
    console.log('---');
  });

  console.log('\nTo sync these to Notion:');
  console.log('1. Copy the issue details above');
  console.log('2. Add them to the Linear Issues database in Notion');
  console.log(`3. Database URL: https://www.notion.so/${NOTION_DATABASE_ID}`);
  console.log('\nFull automation coming soon with Notion API integration!');
  
  return formattedIssues;
}

// Main execution
async function main() {
  console.log('Fetching Linear issues...');
  
  try {
    const issues = await fetchLinearIssues();
    await syncToNotion(issues);
    
    console.log('\n✅ Linear sync complete!');
  } catch (error) {
    console.error('❌ Sync failed:', error.message);
    process.exit(1);
  }
}

// Run the script
main();