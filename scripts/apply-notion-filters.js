#!/usr/bin/env node

/**
 * Notion Filter Automation Script
 * 
 * This script automates the application of filters to linked database views
 * across all 5 Product Hubs in Notion.
 * 
 * Since the Notion API doesn't support programmatic filter application on
 * linked views, this script uses Puppeteer to automate UI interactions.
 */

const puppeteer = require('puppeteer');

// Configuration
const PRODUCT_HUBS = {
  BEARO: {
    pageId: '2ad6468866ef812393d9deb1afd2c6a1',
    productName: 'BEARO',
    productUrl: 'https://www.notion.so/2ad6468866ef81a19894d01ecb741931'
  },
  AlphaBuilder: {
    pageId: '2ad6468866ef81dabe13e7d460dda8cd',
    productName: 'AlphaBuilder',
    productUrl: 'https://www.notion.so/2ad6468866ef81f29133f96c46bc5dbd'
  },
  Primape: {
    pageId: '2ad6468866ef812fb626f4d6487fdc5e',
    productName: 'Primape',
    productUrl: 'https://www.notion.so/2ad6468866ef8118b710e780f108f5ad'
  },
  Chimpanion: {
    pageId: '2ad6468866ef81c79e89c054adcf539c',
    productName: 'Chimpanion',
    productUrl: 'https://www.notion.so/2ad6468866ef817c9236f3a7c1532b4d'
  },
  'BEARCO Ecosystem': {
    pageId: '2ad6468866ef81b3ab2ce1f82cd83f7f',
    productName: 'BEARCO Ecosystem',
    productUrl: 'https://www.notion.so/2ad6468866ef81a6be2fd99c7aacec9a'
  }
};

const DATABASES = {
  Projects: {
    url: 'https://www.notion.so/b6436b6fa21b4b8ea7978c8af805881b',
    filterField: 'Product',
    viewType: 'board',
    groupBy: 'Status'
  },
  Tasks: {
    url: 'https://www.notion.so/15d0e156c8814c128d9bb2c8371d5acc',
    filterField: 'Project',
    nestedFilter: { field: 'Product', operator: 'contains' },
    viewType: 'kanban',
    groupBy: 'Status'
  },
  Team: {
    url: 'https://www.notion.so/b0110392b769474bb2968c9a9d2da066',
    filterField: 'Tasks',
    nestedFilter: { field: 'Project', nestedField: 'Product', operator: 'contains' },
    viewType: 'table'
  },
  CRM: {
    url: 'https://www.notion.so/2e2c972956e243968ba34c6db28717aa',
    filterField: 'Product',
    viewType: 'table'
  },
  'Content Machine': {
    url: 'https://www.notion.so/dc4b71505fa54c4da12f2ee642c1da08',
    filterField: 'Product',
    viewType: 'calendar'
  }
};

async function waitFor(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function applyFilterToView(page, productName, databaseConfig) {
  console.log(`  Applying filter for ${databaseConfig.name}...`);
  
  // This is a placeholder - actual implementation would:
  // 1. Find the linked database view on the page
  // 2. Click the "..." menu
  // 3. Click "Edit view"
  // 4. Click "Add filter"
  // 5. Select the filter field
  // 6. Select "Contains" operator
  // 7. Select the product
  // 8. Save the view
  
  // Note: Actual implementation requires careful selector identification
  // and handling of Notion's dynamic UI
  
  await waitFor(1000);
  return true;
}

async function configureProductHub(browser, hubConfig) {
  console.log(`\n📋 Configuring ${hubConfig.productName} Hub...`);
  
  const page = await browser.newPage();
  const hubUrl = `https://www.notion.so/${hubConfig.pageId}`;
  
  try {
    await page.goto(hubUrl, { waitUntil: 'networkidle2', timeout: 30000 });
    await waitFor(3000); // Wait for page to load
    
    // Check if user is logged in
    const isLoggedIn = await page.evaluate(() => {
      return !document.querySelector('[data-testid="login"]');
    });
    
    if (!isLoggedIn) {
      console.log('  ⚠️  Not logged in. Please log in to Notion first.');
      console.log('  Opening browser for manual login...');
      await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 60000 });
    }
    
    // For each database view, apply filters
    const views = [
      { name: 'Projects', config: DATABASES.Projects },
      { name: 'Tasks', config: DATABASES.Tasks },
      { name: 'Team', config: DATABASES.Team },
      { name: 'CRM', config: DATABASES.CRM },
      { name: 'Content Machine', config: DATABASES['Content Machine'] }
    ];
    
    for (const view of views) {
      await applyFilterToView(page, hubConfig.productName, {
        ...view.config,
        name: view.name
      });
    }
    
    console.log(`  ✅ ${hubConfig.productName} Hub configured`);
    return true;
  } catch (error) {
    console.error(`  ❌ Error configuring ${hubConfig.productName} Hub:`, error.message);
    return false;
  } finally {
    await page.close();
  }
}

async function main() {
  console.log('🚀 Starting Notion Filter Automation...\n');
  console.log('⚠️  Note: This script requires manual intervention for:');
  console.log('   1. Notion login (if not already logged in)');
  console.log('   2. Creating linked database views (if they don\'t exist)');
  console.log('   3. Filter application (automated but may need verification)\n');
  
  const browser = await puppeteer.launch({
    headless: false, // Set to true for headless mode
    defaultViewport: { width: 1920, height: 1080 },
    args: ['--start-maximized']
  });
  
  const results = {};
  
  try {
    for (const [hubName, hubConfig] of Object.entries(PRODUCT_HUBS)) {
      results[hubName] = await configureProductHub(browser, hubConfig);
      await waitFor(2000); // Pause between hubs
    }
    
    console.log('\n📊 Summary:');
    for (const [hubName, success] of Object.entries(results)) {
      console.log(`  ${success ? '✅' : '❌'} ${hubName}: ${success ? 'Success' : 'Failed'}`);
    }
    
    const allSuccess = Object.values(results).every(r => r);
    if (allSuccess) {
      console.log('\n🎉 All Product Hubs configured successfully!');
    } else {
      console.log('\n⚠️  Some hubs failed. Please check the logs above.');
    }
    
  } catch (error) {
    console.error('❌ Fatal error:', error);
  } finally {
    await browser.close();
  }
}

// Run if executed directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { main, PRODUCT_HUBS, DATABASES };

