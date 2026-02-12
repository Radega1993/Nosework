# Tasks Sorted by Performance Impact

**Date:** February 12, 2026  
**Current Performance:** LCP 6.2s (target: < 3.0s), TBT 980ms (target: < 300ms), Performance Score 91

## Impact Rating Scale

🔥 **Very High Impact** - Directly addresses critical performance bottlenecks, expected improvement > 30%  
⚡ **High Impact** - Significant performance improvement, expected improvement 15-30%  
📈 **Medium Impact** - Moderate improvement, expected improvement 5-15%  
📊 **Low Impact** - Minor improvement, expected improvement < 5%

---

## 🔥 Very High Impact Tasks (Do First)

### LCP Optimization (Largest Contentful Paint)

1. **7.2.1** Optimize hero background image (compress to < 100 KiB if possible)
   - **Impact:** 🔥 Very High - Hero image is likely the LCP element
   - **Expected Improvement:** LCP 6.2s → 4.0-4.5s (30-35% improvement)
   - **Effort:** 30 min
   - **Current Status:** Not started
   - **Dependencies:** Requires hero image asset

2. **7.2.2** Convert hero image to WebP format with fallback
   - **Impact:** 🔥 Very High - WebP can reduce image size by 25-35%
   - **Expected Improvement:** LCP 4.0-4.5s → 3.5-4.0s (additional 10-15% improvement)
   - **Effort:** 15 min
   - **Current Status:** Not started
   - **Dependencies:** 7.2.1 (should be done together)

3. **7.2.3** Verify Next.js Image component uses responsive sizes (srcset) for hero image
   - **Impact:** 🔥 Very High - Serves appropriately sized images, reducing download time
   - **Expected Improvement:** LCP 3.5-4.0s → 3.0-3.5s (additional 10-15% improvement)
   - **Effort:** 10 min
   - **Current Status:** Not started
   - **Dependencies:** None

### TBT Optimization (Total Blocking Time)

4. **7.3.2** Remove unused JavaScript dependencies (~348 KiB target reduction)
   - **Impact:** 🔥 Very High - Largest single opportunity for TBT reduction
   - **Expected Improvement:** TBT 980ms → 600-700ms (30-40% improvement)
   - **Effort:** 1-2 hours
   - **Current Status:** Not started
   - **Dependencies:** 7.3.1 (must audit first)

5. **7.3.1** Audit JavaScript bundle size and identify unused dependencies
   - **Impact:** 🔥 Very High - Required to identify what to remove
   - **Expected Improvement:** Enables 7.3.2 (indirect impact)
   - **Effort:** 30 min
   - **Current Status:** Not started
   - **Dependencies:** None

---

## ⚡ High Impact Tasks

### LCP Optimization

6. **7.2.5** Preload critical web fonts or add font-display: swap
   - **Impact:** ⚡ High - Prevents font loading from blocking render
   - **Expected Improvement:** LCP 3.0-3.5s → 2.8-3.2s (5-10% improvement)
   - **Effort:** 20 min
   - **Current Status:** Not started
   - **Dependencies:** None

7. **7.2.6** Inline critical CSS for above-the-fold content (hero section)
   - **Impact:** ⚡ High - Reduces render-blocking CSS
   - **Expected Improvement:** LCP 2.8-3.2s → 2.6-3.0s (5-10% improvement)
   - **Effort:** 30-60 min
   - **Current Status:** Not started
   - **Dependencies:** None

8. **7.2.4** Ensure hero image uses `priority` prop (already implemented, verify)
   - **Impact:** ⚡ High - Ensures hero image loads with high priority
   - **Expected Improvement:** LCP improvement (prevents regression)
   - **Effort:** 5 min
   - **Current Status:** Already implemented, needs verification

9. **6.1** Optimize hero background image (compress, convert to WebP if not already)
   - **Impact:** ⚡ High - Same as 7.2.1 (duplicate task)
   - **Expected Improvement:** Same as 7.2.1
   - **Effort:** 30-45 min
   - **Current Status:** Not started
   - **Note:** ⚠️ DUPLICATE - Consolidate with 7.2.1

### TBT Optimization

10. **7.3.4** Implement code splitting for FeaturedEvents component (lazy load if appropriate)
    - **Impact:** ⚡ High - Reduces initial JavaScript bundle size
    - **Expected Improvement:** TBT 600-700ms → 400-500ms (20-30% improvement)
    - **Effort:** 30 min
    - **Current Status:** Not started
    - **Dependencies:** None
    - **Risk:** May impact UX if not done carefully

11. **7.3.5** Consider dynamic import for FeaturedEvents: `dynamic(() => import('@/components/FeaturedEvents'), { ssr: false })`
    - **Impact:** ⚡ High - Defers non-critical JavaScript loading
    - **Expected Improvement:** TBT 400-500ms → 300-400ms (additional 20-25% improvement)
    - **Effort:** 15 min
    - **Current Status:** Not started
    - **Dependencies:** 7.3.4 (should be done together)

12. **7.3.3** Enable production JavaScript minification (verify Next.js config)
    - **Impact:** ⚡ High - Reduces JavaScript size by ~30-40%
    - **Expected Improvement:** TBT 300-400ms → 250-350ms (10-15% improvement)
    - **Effort:** 10 min
    - **Current Status:** Not started
    - **Dependencies:** None
    - **Note:** Next.js should handle this automatically in production

### Image Optimization

13. **7.4.2** Implement responsive image sizes for all images
    - **Impact:** ⚡ High - Reduces unnecessary image data transfer
    - **Expected Improvement:** LCP improvement, overall page load improvement
    - **Effort:** 20-30 min
    - **Current Status:** Not started
    - **Dependencies:** None

14. **7.4.3** Ensure proper image formats (WebP, AVIF where supported)
    - **Impact:** ⚡ High - Modern formats reduce file size significantly
    - **Expected Improvement:** Overall page load improvement
    - **Effort:** 15-20 min
    - **Current Status:** Not started
    - **Dependencies:** None

---

## 📈 Medium Impact Tasks

### Performance Monitoring

15. **7.2.7** Optimize `/api/events` endpoint response time (if slow)
    - **Impact:** 📈 Medium - Only if endpoint is actually slow
    - **Expected Improvement:** LCP improvement (if endpoint blocks render)
    - **Effort:** 30-60 min
    - **Current Status:** Not started
    - **Dependencies:** Requires profiling first
    - **Priority:** P2 - Only do if endpoint profiling shows it's slow

16. **7.4.4** Review image loading strategy (lazy loading for below-fold images)
    - **Impact:** 📈 Medium - Reduces initial page load
    - **Expected Improvement:** Overall page load improvement
    - **Effort:** 15 min
    - **Current Status:** Not started
    - **Dependencies:** None

17. **6.3** Review and optimize component re-renders (use React.memo if needed)
    - **Impact:** 📈 Medium - Reduces unnecessary rendering work
    - **Expected Improvement:** TBT improvement, smoother interactions
    - **Effort:** 30 min
    - **Current Status:** Not started
    - **Dependencies:** None

18. **6.4** Verify no unnecessary API calls (check if events are fetched multiple times)
    - **Impact:** 📈 Medium - Reduces network overhead
    - **Expected Improvement:** Overall page load improvement
    - **Effort:** 15 min
    - **Current Status:** Not started
    - **Dependencies:** None
    - **Note:** Already addressed in implementation (FeaturedEvents handles its own fetching)

19. **7.4.1** Verify all images use Next.js Image component (hero image already done)
    - **Impact:** 📈 Medium - Ensures consistent optimization
    - **Expected Improvement:** Overall page load improvement
    - **Effort:** 15 min
    - **Current Status:** Not started
    - **Dependencies:** None

---

## 📊 Low Impact Tasks (Verification & Polish)

### Performance Verification

20. **7.2.8** Test LCP after optimizations (target: < 3.0s)
    - **Impact:** 📊 Low - Verification only
    - **Effort:** 10 min
    - **Current Status:** Not started
    - **Dependencies:** Requires completing LCP optimization tasks first

21. **7.3.7** Test TBT after optimizations (target: < 300ms)
    - **Impact:** 📊 Low - Verification only
    - **Effort:** 10 min
    - **Current Status:** Not started
    - **Dependencies:** Requires completing TBT optimization tasks first

22. **7.3.6** Verify code splitting doesn't negatively impact UX
    - **Impact:** 📊 Low - Prevents regression
    - **Effort:** 15 min
    - **Current Status:** Not started
    - **Dependencies:** 7.3.4, 7.3.5

23. **7.6.1** Run full Lighthouse audit after all optimizations
    - **Impact:** 📊 Low - Verification only
    - **Effort:** 10 min
    - **Current Status:** Not started
    - **Dependencies:** Requires completing optimization tasks

24. **7.6.2** Verify Performance score maintains or improves (target: 91+)
    - **Impact:** 📊 Low - Verification only
    - **Effort:** 5 min
    - **Current Status:** Not started
    - **Dependencies:** 7.6.1

25. **7.6.5** Verify LCP is < 3.0s
    - **Impact:** 📊 Low - Verification only
    - **Effort:** 5 min
    - **Current Status:** Not started
    - **Dependencies:** 7.6.1

26. **7.6.6** Verify TBT is < 300ms
    - **Impact:** 📊 Low - Verification only
    - **Effort:** 5 min
    - **Current Status:** Not started
    - **Dependencies:** 7.6.1

### Production Optimizations

27. **7.4.5** Consider CDN configuration for static assets (production)
    - **Impact:** 📊 Low - Only relevant for production
    - **Effort:** 1-2 hours (configuration)
    - **Current Status:** Not started
    - **Dependencies:** Production deployment
    - **Priority:** P3 - Can be deferred to production phase

---

## Performance Impact Summary

### Expected Cumulative Improvements

**After Very High Impact Tasks (1-5):**
- LCP: 6.2s → 3.0-3.5s (45-50% improvement)
- TBT: 980ms → 600-700ms (30-40% improvement)

**After High Impact Tasks (6-14):**
- LCP: 3.0-3.5s → 2.6-3.0s (additional 10-15% improvement)
- TBT: 600-700ms → 250-350ms (additional 40-50% improvement)

**After Medium Impact Tasks (15-19):**
- Additional 5-10% improvement potential
- Better overall page performance

**Final Targets:**
- LCP: < 3.0s ✅ (achievable)
- TBT: < 300ms ✅ (achievable with all optimizations)

---

## Recommended Execution Order by Performance Impact

### Phase 1: Critical Performance Fixes (🔥 Very High Impact)
1. 7.3.1 - Audit JavaScript bundle
2. 7.3.2 - Remove unused JS (~348 KiB)
3. 7.2.1 - Optimize hero image
4. 7.2.2 - Convert to WebP
5. 7.2.3 - Verify responsive sizes

**Expected Result:** LCP 6.2s → 3.5-4.0s, TBT 980ms → 600-700ms

### Phase 2: High Impact Optimizations (⚡ High Impact)
6. 7.3.4 - Code splitting for FeaturedEvents
7. 7.3.5 - Dynamic import
8. 7.3.3 - Verify minification
9. 7.2.5 - Preload fonts
10. 7.2.6 - Inline critical CSS
11. 7.4.2 - Responsive image sizes
12. 7.4.3 - Modern image formats

**Expected Result:** LCP 3.5-4.0s → 2.6-3.0s, TBT 600-700ms → 250-350ms

### Phase 3: Medium Impact & Verification (📈 Medium Impact)
13. 7.2.7 - Optimize API endpoint (if needed)
14. 7.4.4 - Review lazy loading
15. 6.3 - Optimize re-renders
16. 6.4 - Verify API calls
17. 7.4.1 - Verify Image component usage
18. 7.2.8 - Test LCP
19. 7.3.7 - Test TBT
20. 7.3.6 - Verify UX
21. 7.6.1-7.6.6 - Full verification

**Expected Result:** LCP < 3.0s ✅, TBT < 300ms ✅

---

## Quick Reference: Top 10 Performance Tasks

1. **7.3.2** Remove unused JavaScript (~348 KiB) - TBT 🔥
2. **7.2.1** Optimize hero image - LCP 🔥
3. **7.2.2** Convert to WebP - LCP 🔥
4. **7.3.4** Code splitting - TBT ⚡
5. **7.2.3** Responsive image sizes - LCP 🔥
6. **7.3.5** Dynamic import - TBT ⚡
7. **7.2.5** Preload fonts - LCP ⚡
8. **7.2.6** Inline critical CSS - LCP ⚡
9. **7.3.3** Verify minification - TBT ⚡
10. **7.4.2** Responsive images - Overall ⚡

**Total Effort:** ~6-8 hours for top 10 tasks  
**Expected Impact:** LCP 6.2s → 2.6-3.0s, TBT 980ms → 250-350ms
