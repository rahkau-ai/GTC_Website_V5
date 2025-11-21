# Production Files Guide

## Essential Files (Keep in Production)
These files should remain in the production deployment:

### Core Documentation
- `README.md` - Main project documentation with features, technical details, and implementation status
- `DEPLOYMENT_GUIDE.md` - Instructions for deploying the website to production
- `IMPLEMENTATION_GUIDE.md` - Guide for implementing new features and customizations

### Reference Documentation  
- `CONTACT_FORM_INTEGRATION.md` - Documentation of LeadConnectorHQ form integrations
- `PRODUCTION_DEPLOYMENT_CHECKLIST.md` - Pre-deployment checklist for quality assurance
- `CODEBASE_AUDIT_SUMMARY.md` - Latest code quality audit results

## Development Files (Can Be Archived/Removed)
These files are useful for development but not needed in production:

### Historical Implementation Docs (80+ files)
Most of the *.md files are historical documentation of features that have been implemented:
- Form replacement documentation (multiple iterations)
- Mobile fixes and enhancements
- Logo updates and iterations
- Animation and styling tweaks
- Contact page improvements (multiple versions)
- Testing guides
- Quick fixes summaries

### Recommendation
For a clean production deployment:
1. **Keep**: README.md, DEPLOYMENT_GUIDE.md, IMPLEMENTATION_GUIDE.md, CONTACT_FORM_INTEGRATION.md
2. **Archive**: Move all other .md files to a `/docs/archive/` folder (if you need version history)
3. **Or Delete**: Remove them entirely if version control (Git) has the history

## Current Status
- All documentation files currently in root directory
- No /docs/ folder structure
- Could benefit from organization for cleaner production deployment

## Action Items
1. Create `/docs/` folder structure
2. Move essential docs to `/docs/`
3. Archive historical docs to `/docs/archive/` 
4. Or remove archived docs if using version control
