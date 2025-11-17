# Manual Filter Configuration Guide for Product Hubs

## ⚠️ Important Note

**The Notion API cannot programmatically apply filters to linked database views.** This guide provides step-by-step instructions for manually configuring filters in the Notion UI.

## 📋 Prerequisites

Before starting, ensure:
- ✅ All 5 Product Hub pages exist
- ✅ All databases exist (Projects, Tasks, Team, CRM, Content Machine)
- ✅ Products database has entries for: BEARO, AlphaBuilder, Primape, Chimpanion, BEARCO Ecosystem

## 🎯 Configuration Steps

### Step 1: Add Linked Database Views

For each Product Hub page:

1. Open the Product Hub page in Notion
2. Scroll to the section for each database view (Projects, Tasks, Team, CRM, Content Machine)
3. Type `/linked` and select "Create linked database"
4. Select the appropriate database:
   - Projects → `🗂 Projects`
   - Tasks → `🗂 Tasks`
   - Team → `🗂 Team`
   - CRM → `🗂 CRM`
   - Content Machine → `🗂 Content Machine`
5. The linked view will appear on the page

### Step 2: Configure Filters

For each linked database view:

1. **Click on the database view** to select it
2. **Click the "..." menu** (three dots) in the top-right of the view
3. **Select "Edit view"**
4. **Click "Add filter"** button
5. **Configure the filter** based on the product:

#### Filter Configurations by Product

##### BEARO Hub

**Projects View:**
- Filter: `Product` → `Contains` → Select "BEARO"
- View Type: Board
- Group By: Status
- Display: Priority, Start Date, End Date

**Tasks View:**
- Filter: `Project` → `Product` → `Contains` → Select "BEARO"
- View Type: Kanban
- Group By: Status
- Display: Due Date, Assignee, Priority

**Team View:**
- Filter: (Note: Requires Team-Tasks relation, which may not exist yet)
- View Type: Table
- Display: Name, Role, Slack ID, Active

**CRM View:**
- Filter: `Product` → `Contains` → Select "BEARO"
- View Type: Table
- Display: Company Name, Contact Name, Email, Status, Last Contact

**Content Machine View:**
- Filter: `Product` → `Contains` → Select "BEARO"
- View Type: Calendar
- Display: Title, Type, Status, Publish Date

##### AlphaBuilder Hub

**Projects View:**
- Filter: `Product` → `Contains` → Select "AlphaBuilder"
- View Type: Board
- Group By: Status

**Tasks View:**
- Filter: `Project` → `Product` → `Contains` → Select "AlphaBuilder"
- View Type: Kanban
- Group By: Status

**Team View:**
- Filter: (Requires Team-Tasks relation)
- View Type: Table

**CRM View:**
- Filter: `Product` → `Contains` → Select "AlphaBuilder"
- View Type: Table

**Content Machine View:**
- Filter: `Product` → `Contains` → Select "AlphaBuilder"
- View Type: Calendar

##### Primape Hub

**Projects View:**
- Filter: `Product` → `Contains` → Select "Primape"
- View Type: Board
- Group By: Status

**Tasks View:**
- Filter: `Project` → `Product` → `Contains` → Select "Primape"
- View Type: Kanban
- Group By: Status

**Team View:**
- Filter: (Requires Team-Tasks relation)
- View Type: Table

**CRM View:**
- Filter: `Product` → `Contains` → Select "Primape"
- View Type: Table

**Content Machine View:**
- Filter: `Product` → `Contains` → Select "Primape"
- View Type: Calendar

##### Chimpanion Hub

**Projects View:**
- Filter: `Product` → `Contains` → Select "Chimpanion"
- View Type: Board
- Group By: Status

**Tasks View:**
- Filter: `Project` → `Product` → `Contains` → Select "Chimpanion"
- View Type: Kanban
- Group By: Status

**Team View:**
- Filter: (Requires Team-Tasks relation)
- View Type: Table

**CRM View:**
- Filter: `Product` → `Contains` → Select "Chimpanion"
- View Type: Table

**Content Machine View:**
- Filter: `Product` → `Contains` → Select "Chimpanion"
- View Type: Calendar

##### BEARCO Ecosystem Hub

**Projects View:**
- Filter: `Product` → `Contains` → Select "BEARCO Ecosystem"
- View Type: Board
- Group By: Status

**Tasks View:**
- Filter: `Project` → `Product` → `Contains` → Select "BEARCO Ecosystem"
- View Type: Kanban
- Group By: Status

**Team View:**
- Filter: (Shows all team members - no filter needed, or filter by cross-product assignments)
- View Type: Table

**CRM View:**
- Filter: `Product` → `Contains` → Select "BEARCO Ecosystem"
- View Type: Table

**Content Machine View:**
- Filter: `Product` → `Contains` → Select "BEARCO Ecosystem"
- View Type: Calendar

### Step 3: Rename Views (Optional)

After configuring filters, rename each view for clarity:
- Projects View → `[Product Name] — Projects Board`
- Tasks View → `[Product Name] — Sprint Tasks`
- Team View → `[Product Name] — Contributors`
- CRM View → `[Product Name] — Pipeline`
- Content Machine View → `[Product Name] — Content Calendar`

## ✅ Verification Checklist

After configuring filters, verify each Product Hub:

### BEARO Hub
- [ ] Projects view shows only BEARO projects
- [ ] Tasks view shows only BEARO tasks
- [ ] Team view configured (may show all if relation missing)
- [ ] CRM view shows only BEARO contacts
- [ ] Content Machine shows only BEARO content

### AlphaBuilder Hub
- [ ] Projects view shows only AlphaBuilder projects
- [ ] Tasks view shows only AlphaBuilder tasks
- [ ] Team view configured
- [ ] CRM view shows only AlphaBuilder contacts
- [ ] Content Machine shows only AlphaBuilder content

### Primape Hub
- [ ] Projects view shows only Primape projects
- [ ] Tasks view shows only Primape tasks
- [ ] Team view configured
- [ ] CRM view shows only Primape contacts
- [ ] Content Machine shows only Primape content

### Chimpanion Hub
- [ ] Projects view shows only Chimpanion projects
- [ ] Tasks view shows only Chimpanion tasks
- [ ] Team view configured
- [ ] CRM view shows only Chimpanion contacts
- [ ] Content Machine shows only Chimpanion content

### BEARCO Ecosystem Hub
- [ ] Projects view shows BEARCO Ecosystem projects
- [ ] Tasks view shows BEARCO Ecosystem tasks
- [ ] Team view shows all or filtered appropriately
- [ ] CRM view shows BEARCO Ecosystem contacts
- [ ] Content Machine shows BEARCO Ecosystem content

## 🔧 Troubleshooting

### Filter Not Working
- Ensure the Product relation field exists in the database
- Verify the product name matches exactly (case-sensitive)
- Check that the relation is properly linked

### Team View Issues
- The Team-Tasks relation may not exist yet
- This is a known gap identified in Step 3
- Team view may show all members until relation is added

### View Type Not Available
- Some view types (Board, Kanban) require specific field types
- Ensure Status field exists for grouping
- Calendar view requires a date field

## 📝 Notes

- Filters must be applied manually in Notion UI
- Each Product Hub requires 5 separate filter configurations
- Total: 25 filter configurations across all hubs
- Estimated time: 15-30 minutes per hub (75-150 minutes total)

---

**Status**: Manual configuration required  
**Estimated Time**: 1.5-2.5 hours  
**Priority**: High (blocks Step 4)

