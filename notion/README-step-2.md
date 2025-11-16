# Step 2: Notion Architecture Implementation

This directory contains all resources for implementing Step 2 of the FounderOS Notion workspace.

## 📁 Files

- **`step-2-implementation-guide.md`** - Comprehensive manual implementation guide with exact schemas
- **`step-2-notion-api-script.py`** - Python script for automated database creation via Notion API
- **`step-2-sample-data.json`** - Sample data templates for testing
- **`step-2-validation-checklist.md`** - Complete validation checklist

## 🚀 Quick Start

### Option 1: Manual Implementation (Recommended for First Time)

1. Read `step-2-implementation-guide.md` thoroughly
2. Follow the step-by-step instructions
3. Use `step-2-sample-data.json` for reference when adding sample data
4. Complete `step-2-validation-checklist.md` to verify everything

### Option 2: Automated Implementation

1. **Prerequisites**:
   ```bash
   pip install notion-client
   ```

2. **Set up Notion Integration**:
   - Go to https://www.notion.so/my-integrations
   - Create a new integration
   - Copy the integration token
   - Share your Notion workspace/page with the integration

3. **Get Parent Page ID**:
   - Open your Notion workspace in browser
   - Copy the page ID from the URL (the long string after the last `/`)
   - Example: `https://www.notion.so/FounderOS-abc123def456` → Page ID is `abc123def456`

4. **Run the script**:
   ```bash
   export NOTION_TOKEN="your_integration_token_here"
   export NOTION_PARENT_PAGE_ID="your_parent_page_id_here"
   python step-2-notion-api-script.py
   ```

5. **Add Sample Data**:
   - Use the Notion UI to add sample data from `step-2-sample-data.json`
   - Or extend the script to add sample data automatically

6. **Validate**:
   - Complete `step-2-validation-checklist.md`

## 📋 Implementation Steps Summary

1. ✅ Create Command Center page
2. ✅ Add architecture blueprint content
3. ✅ Create 6 databases with exact schemas:
   - Products
   - Projects
   - Tasks
   - Team
   - CRM
   - Content Machine
4. ✅ Add sample data to test relationships
5. ✅ Create Product Hub page stubs
6. ✅ Create Founder Dashboard stub
7. ✅ Validate all relationships and views

## 🔗 Database Relationships

```
Products (1) ──→ (many) Projects
Projects (1) ──→ (many) Tasks
Team (many) ←──→ (many) Tasks
Team (many) ←──→ (many) Projects
Products (1) ──→ (many) Content Machine
```

## 📊 Schema Reference

Each database schema is fully documented in `step-2-implementation-guide.md` with:
- Property names
- Property types
- Select options (with colors)
- Relation configurations
- View configurations

## ⚠️ Important Notes

1. **Relation Dependencies**: Databases must be created in order:
   - Team (no dependencies)
   - Products (depends on Team)
   - Projects (depends on Products + Team)
   - Tasks (depends on Projects + Team)
   - CRM (no dependencies)
   - Content Machine (self-relation)

2. **Notion API Limitations**:
   - Some properties (like formula fields) may need to be added manually
   - Views need to be configured manually after database creation
   - Sample data is best added manually for first-time setup

3. **Testing Relations**:
   - Always test relation links by clicking through
   - Verify reverse relations work correctly
   - Check that multi-select relations display properly

## 🐛 Troubleshooting

### Script Errors

**"NOTION_TOKEN not set"**
- Make sure you've exported the environment variable
- Check that your token is valid

**"NOTION_PARENT_PAGE_ID not set"**
- Export the parent page ID
- Ensure the integration has access to the page

**"Database creation failed"**
- Check that the integration has permission to create databases
- Verify the parent page ID is correct
- Ensure you're not hitting API rate limits

### Manual Implementation Issues

**Relations not working**
- Verify databases were created in the correct order
- Check that relation properties point to the correct database
- Ensure both databases are in the same workspace

**Views not showing data**
- Check filter conditions
- Verify grouping properties exist
- Ensure sample data matches filter criteria

## 📞 Support

If you encounter issues:
1. Check the validation checklist
2. Review the implementation guide
3. Verify your Notion integration permissions
4. Test with minimal sample data first

## ✅ Next Steps

After completing Step 2:
- **Step 3**: Populate Product Hubs with detailed information
- **Step 4**: Build Founder Dashboard with linked databases
- **Step 5**: Set up automations (Linear ↔ Notion, Slack ↔ Notion)

---

**Status**: Ready for implementation  
**Last Updated**: 2025-01-15
