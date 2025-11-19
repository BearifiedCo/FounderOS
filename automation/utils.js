require('dotenv').config();
const { Client } = require('@notionhq/client');
const { LinearClient } = require('@linear/sdk');
const { Octokit } = require('octokit');

// Initialize Clients
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const linear = new LinearClient({ apiKey: process.env.LINEAR_API_KEY });
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

// Configuration IDs
const CONFIG = {
  NOTION_DB_TASKS: process.env.NOTION_TASK_DB_ID,
  NOTION_DB_PROJECTS: process.env.NOTION_PROJECT_DB_ID,
  NOTION_DB_TEAM: process.env.NOTION_TEAM_DB_ID,
  GITHUB_OWNER: process.env.GITHUB_OWNER || 'BearifiedCo',
  GITHUB_REPO: process.env.GITHUB_REPO || 'FounderOS',
  AGENTS: ['Composer', 'Codex', 'Claude', 'Gemini']
};

const fs = require('fs');
const path = require('path');

// Logger
const log = (component, message, data = null) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${component}] ${message}`;
  
  console.log(logMessage);
  if (data) console.log(JSON.stringify(data, null, 2));

  // Append to file
  try {
    const today = new Date().toISOString().split('T')[0];
    const logDir = path.join(__dirname, '../logs');
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
    const logFile = path.join(logDir, `automation-${today}.md`);
    fs.appendFileSync(logFile, `- ${logMessage}\n`);
  } catch (err) {
    console.error('Failed to write to log file:', err);
  }
};

module.exports = {
  notion,
  linear,
  octokit,
  CONFIG,
  log
};

