# Step 3 Merge Plan: PR #7 (Composer 1) as Base

## ✅ Decision: Merge PR #7 as Base

**Rationale**: PR #7 (Composer 1) provides:
- ✅ Structured documentation with templates
- ✅ Minimal assumption making
- ✅ Easy traceability of filters + views per product
- ✅ Product Hub template for scalability
- ✅ Clear manual setup instructions

## 📋 Merge Steps

### 1. Pre-Merge Verification

```bash
# Checkout main and ensure clean state
git checkout main
git pull origin main

# Review PR #7 branch
git fetch origin step3-product-hubs-composer-1
git checkout step3-product-hubs-composer-1

# Verify files
ls -la notion/product-hubs-step3-composer-1.md
ls -la notion/product-hub-templates.md
ls -la notion/bearo-hub-content.md
```

### 2. Merge PR #7

```bash
# Return to main
git checkout main

# Merge PR #7
git merge origin/step3-product-hubs-composer-1 -m "Merge PR #7: Step 3 Product Hubs (Composer 1 base)"

# Resolve any conflicts (if any)
# Prefer Composer's documentation structure
```

### 3. Post-Merge Enhancements

After merging PR #7, enhance with elements from other PRs:

#### From PR #9 (Codex):
- ✅ Add verification checklist for manual filter configuration
- ✅ Include Team-Tasks relation gap identification
- ✅ Add Slack notification reminder

#### From PR #8 (Claude):
- ✅ Verify all product entries exist in Products database
- ✅ Confirm Product Hub pages are live in Notion

### 4. Manual Configuration Checklist

After merge, complete these steps:

- [ ] Verify all 5 Product Hub pages exist in Notion:
  - [ ] BEARO Hub
  - [ ] AlphaBuilder Hub
  - [ ] Primape Hub
  - [ ] Chimpanion Hub
  - [ ] BEARCO Ecosystem Hub

- [ ] Apply filters to each linked view per hub:
  - [ ] Projects view: Filter by Product
  - [ ] Tasks view: Filter by Product
  - [ ] Team view: Filter by Product assignments
  - [ ] CRM view: Filter by Product
  - [ ] Content Machine view: Filter by Product

- [ ] Verify Product Hub template exists in Products database
- [ ] Test template by creating a new product entry

### 5. Documentation Updates

Update `notion/step3-completion.md` to reflect:
- PR #7 merged as base
- Manual configuration status
- Template availability

## 📊 Files Expected from PR #7

1. `notion/product-hubs-step3-composer-1.md` - Main implementation doc
2. `notion/product-hub-templates.md` - Template definitions
3. `notion/bearo-hub-content.md` - BEARO-specific content template

## ✅ Success Criteria

Merge is successful when:
- ✅ All PR #7 files are in main branch
- ✅ Documentation is complete and clear
- ✅ Templates are documented
- ✅ Manual configuration checklist is ready
- ✅ Ready to proceed to Step 4

---

**Status**: Ready to merge  
**Branch**: `step3-product-hubs-composer-1`  
**Target**: `main`

