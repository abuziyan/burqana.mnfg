
# Clothing Manufacturing — Professional Web App (GH Pages Ready)

**Frontend:** React + TypeScript + Vite + Tailwind  
**Backend:** Google Apps Script + Google Sheets  
**Hosting:** GitHub Pages (workflow included)

## Setup
1) Create a Google Sheet with tabs:
   - Users, TimeLogs, SewerOperations, PayrollSummary (optional), ReferenceOperations
   - Import CSVs from `/sheets-samples`

2) Apps Script (attached to the Sheet)
   - Paste `apps-script/Code.gs`
   - Script Properties: `SHEET_ID`, `API_KEY`
   - Deploy as Web App (execute as Me, access Anyone)
   - Copy the `/exec` URL

3) Local dev
```bash
cd web-frontend
npm i
cp .env.example .env
# set VITE_APPS_SCRIPT_URL in .env to your /exec/ URL (must end with /exec/)
npm run dev
```

## GitHub Pages
- Repo already contains `.github/workflows/deploy-gh-pages.yml`
- Add a repo secret: `VITE_APPS_SCRIPT_URL` → your Apps Script `/exec/` URL
- Push to `main`. The workflow builds and publishes to GitHub Pages.
- Vite base path is read from `BASE_PATH` (set by the workflow) and defaults to `/`.

## Roles
- Regular: Clock In/Out, view history
- Sewer: Log operations, view history & pay
- Admin: Approve/Reject pending operations
- HR: Payroll summary per user or for all
