# JavaScript Bundle Audit

**Date:** February 12, 2026  
**Task:** 7.3.1 - Audit JavaScript bundle size and identify unused dependencies

## Dependencies Analysis

### Production Dependencies

| Package | Version | Size (approx) | Used In | Status |
|---------|---------|----------------|---------|--------|
| bcryptjs | ^2.4.3 | ~50 KiB | API routes (auth) | ✅ Used |
| better-sqlite3 | ^11.8.1 | ~2.5 MiB | utils/db.js | ✅ Used |
| jsonwebtoken | ^9.0.2 | ~100 KiB | API routes (auth) | ✅ Used |
| jwt-decode | ^4.0.0 | ~10 KiB | contexts/AuthContext.js | ✅ Used |
| next | 15.1.6 | Core framework | All pages | ✅ Used |
| react | ^19.0.0 | Core framework | All components | ✅ Used |
| react-calendar | ^5.1.0 | ~150 KiB | pages/index.js, pages/events.js | ✅ Used |
| react-dom | ^19.0.0 | Core framework | All pages | ✅ Used |
| **sqlite3** | ^5.1.7 | ~500 KiB | **NONE** | ❌ **UNUSED** |
| sweetalert2 | ^11.15.10 | ~50 KiB | hooks/useEvents.js | ✅ Used |

### Findings

**Unused Dependencies:**
- `sqlite3` (^5.1.7) - ~500 KiB
  - **Reason:** Project uses `better-sqlite3` instead
  - **Location:** Not imported anywhere in codebase
  - **Action:** Remove from package.json

**Potentially Optimizable:**
- `react-calendar` (~150 KiB) - Only used on homepage and events page
  - **Opportunity:** Could be lazy-loaded or code-split
  - **Impact:** Medium (not critical for initial page load)

- `sweetalert2` (~50 KiB) - Only used in dashboard (useEvents hook)
  - **Opportunity:** Already code-split (only loads on dashboard)
  - **Impact:** Low (not on homepage)

### Bundle Size Impact

**Current Estimated Bundle Size:**
- Core Next.js/React: ~200 KiB (gzipped)
- Dependencies: ~850 KiB (uncompressed)
- **Total:** ~1.05 MiB (uncompressed)

**After Removing sqlite3:**
- **Savings:** ~500 KiB (uncompressed)
- **Estimated TBT Improvement:** 200-300ms reduction

### Recommendations

1. **Immediate Action:** Remove `sqlite3` dependency (Task 7.3.2)
2. **Future Optimization:** Consider lazy-loading `react-calendar` on homepage
3. **Future Optimization:** Consider replacing `sweetalert2` with native browser alerts or lighter alternative

### Verification

To verify bundle size after changes:
```bash
npm run build
# Check .next/static/chunks/ for bundle sizes
```
