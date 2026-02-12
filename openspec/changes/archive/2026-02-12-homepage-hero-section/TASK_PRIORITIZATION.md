# Task Prioritization Review

**Date:** February 12, 2026  
**Current Status:** 50/123 tasks complete (41%)  
**Lighthouse Scores:** Performance 91, Accessibility 96, Best Practices 100, SEO 52

## Priority Framework

**P0 (Critical - Do First):** Quick wins, high impact, blocks other work, or critical for Lighthouse scores  
**P1 (High Priority):** Significant impact on Lighthouse scores, moderate effort  
**P2 (Medium Priority):** Important but can be done in parallel or after critical items  
**P3 (Low Priority):** Nice to have, polish, or can be deferred

## Recommended Priority Order

### Phase 1: Quick Wins (P0) - Immediate Impact
**Goal:** Fix critical issues that are easy to resolve and significantly impact Lighthouse scores

#### 1.1 SEO Quick Wins (Highest ROI)
- **7.1.1** Add `lang="es"` attribute to `<html>` tag ⚡ **5 min**
  - **Impact:** Fixes both Accessibility and SEO issues
  - **Effort:** Very low
  - **Blocks:** None
  
- **7.5.1** Verify all meta tags are present ⚡ **10 min**
  - **Impact:** SEO score improvement
  - **Effort:** Low (verification)
  
- **7.5.2** Add Twitter Card meta tags if missing ⚡ **15 min**
  - **Impact:** SEO score improvement
  - **Effort:** Low

- **7.5.3** Verify meta description length (120-160 chars) ⚡ **5 min**
  - **Impact:** SEO score improvement
  - **Effort:** Very low

- **7.5.4** Ensure title tag is unique and descriptive ⚡ **5 min**
  - **Impact:** SEO score improvement
  - **Effort:** Very low

#### 1.2 Accessibility Quick Wins
- **7.1.2-7.1.6** Contrast audit (can be done together) ⚡ **30 min**
  - **Impact:** Accessibility score improvement (96 → 100)
  - **Effort:** Low (automated tools)
  - **Dependency:** Run audit first, then fix issues

- **7.1.7** Fix contrast issues identified ⚡ **30-60 min**
  - **Impact:** Accessibility score improvement
  - **Effort:** Low-Medium (depends on findings)

#### 1.3 SEO Technical Fixes
- **7.5.8** Ensure robots.txt exists ⚡ **10 min**
  - **Impact:** SEO score improvement
  - **Effort:** Very low

- **7.5.9** Verify sitemap.xml includes homepage ⚡ **10 min**
  - **Impact:** SEO score improvement
  - **Effort:** Very low

- **7.5.10** Verify heading hierarchy ⚡ **15 min**
  - **Impact:** SEO score improvement
  - **Effort:** Low (visual inspection)

**Phase 1 Total:** ~2-3 hours, Expected Impact: SEO 52 → 70-80, Accessibility 96 → 100

---

### Phase 2: Performance Quick Wins (P0-P1) - High Impact
**Goal:** Address performance issues with minimal code changes

#### 2.1 Image Optimization (Highest Performance Impact)
- **7.2.1** Optimize hero background image (compress to < 100 KiB) 🔥 **30 min**
  - **Impact:** LCP improvement (largest impact)
  - **Effort:** Low (image optimization tool)
  - **Priority:** P0 - Critical for LCP target

- **7.2.2** Convert hero image to WebP format ⚡ **15 min**
  - **Impact:** LCP improvement
  - **Effort:** Low (automated conversion)
  - **Dependency:** Requires hero image asset

- **7.2.3** Verify Next.js Image responsive sizes ⚡ **10 min**
  - **Impact:** LCP improvement
  - **Effort:** Very low (verification)

- **7.2.4** Verify hero image priority prop ⚡ **5 min**
  - **Impact:** LCP improvement
  - **Effort:** Very low (already implemented)

#### 2.2 JavaScript Optimization (High Impact on TBT)
- **7.3.1** Audit JavaScript bundle size 🔥 **30 min**
  - **Impact:** Identifies opportunities for TBT reduction
  - **Effort:** Low (automated tools)
  - **Priority:** P0 - Must do before removing dependencies

- **7.3.2** Remove unused JavaScript dependencies 🔥 **1-2 hours**
  - **Impact:** TBT improvement (~348 KiB reduction)
  - **Effort:** Medium (requires careful testing)
  - **Dependency:** Requires audit first (7.3.1)

- **7.3.3** Verify production minification ⚡ **10 min**
  - **Impact:** TBT improvement
  - **Effort:** Very low (check Next.js config)

**Phase 2 Total:** ~3-4 hours, Expected Impact: LCP 6.2s → 4-5s, TBT 980ms → 600-700ms

---

### Phase 3: Code Splitting & Advanced Optimizations (P1)
**Goal:** Further performance improvements with code changes

#### 3.1 Code Splitting
- **7.3.4** Implement code splitting for FeaturedEvents 🔥 **30 min**
  - **Impact:** TBT improvement
  - **Effort:** Low-Medium
  - **Risk:** May impact UX if not done carefully

- **7.3.5** Consider dynamic import for FeaturedEvents ⚡ **15 min**
  - **Impact:** TBT improvement
  - **Effort:** Low (if code splitting approved)
  - **Dependency:** 7.3.4

- **7.3.6** Verify code splitting doesn't impact UX ⚡ **15 min**
  - **Impact:** Ensures no regression
  - **Effort:** Low (testing)

#### 3.2 Advanced Performance
- **7.2.5** Preload critical web fonts ⚡ **20 min**
  - **Impact:** LCP improvement
  - **Effort:** Low

- **7.2.6** Inline critical CSS ⚡ **30-60 min**
  - **Impact:** LCP improvement
  - **Effort:** Medium (requires CSS extraction)

- **7.2.7** Optimize `/api/events` endpoint ⚡ **30-60 min**
  - **Impact:** LCP improvement (if endpoint is slow)
  - **Effort:** Medium (requires profiling first)
  - **Priority:** P2 - Only if endpoint is actually slow

**Phase 3 Total:** ~2-3 hours, Expected Impact: LCP 4-5s → 3-4s, TBT 600-700ms → 300-400ms

---

### Phase 4: SEO Deep Dive (P1-P2)
**Goal:** Complete SEO optimization to reach 90+ score

#### 4.1 Structured Data
- **7.5.5** Verify Schema.org markup validity 🔥 **20 min**
  - **Impact:** SEO score improvement
  - **Effort:** Low (testing tool)

- **7.5.6** Add SportsEvent schema for featured events ⚡ **30 min**
  - **Impact:** SEO score improvement
  - **Effort:** Medium

#### 4.2 Content SEO
- **7.5.11** Ensure H1 contains primary keyword ⚡ **5 min**
  - **Impact:** SEO score improvement
  - **Effort:** Very low (verification)

- **7.5.12** Verify featured events heading structure ⚡ **5 min**
  - **Impact:** SEO score improvement
  - **Effort:** Very low

- **7.5.13** Verify alt text on all images ⚡ **10 min**
  - **Impact:** SEO score improvement
  - **Effort:** Very low

- **7.5.7** Verify canonical URL configuration ⚡ **15 min**
  - **Impact:** SEO score improvement
  - **Effort:** Low

**Phase 4 Total:** ~1.5 hours, Expected Impact: SEO 70-80 → 85-90

---

### Phase 5: Testing & Verification (P1)
**Goal:** Verify all optimizations work correctly

#### 5.1 Accessibility Testing
- **7.1.8** Re-run Lighthouse accessibility audit ⚡ **10 min**
  - **Impact:** Verification
  - **Effort:** Very low

#### 5.2 Performance Testing
- **7.2.8** Test LCP after optimizations ⚡ **10 min**
  - **Impact:** Verification
  - **Effort:** Very low

- **7.3.7** Test TBT after optimizations ⚡ **10 min**
  - **Impact:** Verification
  - **Effort:** Very low

#### 5.3 SEO Testing
- **7.5.14** Re-run Lighthouse SEO audit ⚡ **10 min**
  - **Impact:** Verification
  - **Effort:** Very low

#### 5.4 Comprehensive Testing
- **7.6.1-7.6.6** Full Lighthouse audit and verification ⚡ **30 min**
  - **Impact:** Final verification
  - **Effort:** Low

**Phase 5 Total:** ~1 hour

---

### Phase 6: Manual Testing (P2)
**Goal:** Ensure functionality works across devices/browsers

- **5.1-5.19** Manual testing tasks
  - **Impact:** Quality assurance
  - **Effort:** High (requires manual testing)
  - **Priority:** P2 - Can be done in parallel with optimizations
  - **Note:** Some tasks (5.13, 5.14, 5.15) overlap with Lighthouse tasks

---

### Phase 7: Polish & Documentation (P2-P3)
**Goal:** Final polish and documentation

- **6.1** Optimize hero background image (duplicate of 7.2.1) ⚠️ **CONSOLIDATE**
- **6.3** Review component re-renders ⚡ **30 min** - P2
- **6.4** Verify no duplicate API calls ⚡ **15 min** - P2
- **6.5** Review Tailwind CSS classes ⚡ **30 min** - P3
- **6.6** Ensure consistent spacing ⚡ **30 min** - P3
- **6.10** Final visual review ⚡ **30 min** - P2
- **7.4.1-7.4.5** Image delivery optimization (some overlap with 7.2.x) ⚠️ **CONSOLIDATE**
- **7.6.7** Document remaining issues ⚡ **30 min** - P2
- **7.6.8** Create performance budget ⚡ **1 hour** - P2

---

## Task Consolidation Recommendations

### Duplicates to Remove/Consolidate:
1. **6.1** and **7.2.1** - Both optimize hero image → Keep 7.2.1 (more detailed)
2. **7.2.1** and **7.2.2** - Can be combined into single task
3. **7.4.1-7.4.3** - Overlap with 7.2.x → Consolidate image optimization tasks
4. **5.15** and **7.1.2-7.1.7** - Both test contrast → Keep Lighthouse tasks (more comprehensive)
5. **5.16** and **7.6.1** - Both run Lighthouse → Keep 7.6.1 (more comprehensive)

### Dependencies to Resolve:
- **7.3.2** depends on **7.3.1** (must audit before removing)
- **7.3.5** depends on **7.3.4** (dynamic import requires code splitting decision)
- **7.1.7** depends on **7.1.2-7.1.6** (must audit before fixing)

---

## Recommended Execution Order

### Week 1: Quick Wins (Phases 1-2)
**Day 1-2:** Phase 1 (SEO & Accessibility quick wins) - 2-3 hours  
**Day 3-4:** Phase 2 (Performance quick wins) - 3-4 hours  
**Expected Results:** SEO 52 → 75+, Accessibility 96 → 100, LCP 6.2s → 4-5s

### Week 2: Advanced Optimizations (Phases 3-4)
**Day 1-2:** Phase 3 (Code splitting) - 2-3 hours  
**Day 3-4:** Phase 4 (SEO deep dive) - 1.5 hours  
**Expected Results:** LCP 4-5s → 3-4s, TBT 600-700ms → 300-400ms, SEO 75+ → 85-90

### Week 3: Testing & Polish (Phases 5-7)
**Day 1:** Phase 5 (Verification) - 1 hour  
**Day 2-3:** Phase 6 (Manual testing) - Parallel work  
**Day 4-5:** Phase 7 (Polish & documentation) - 2-3 hours  
**Expected Results:** All targets met, documentation complete

---

## Critical Path (Minimum Viable Optimization)

If time is limited, focus on these **P0 tasks** for maximum impact:

1. **7.1.1** - Add lang attribute (5 min) → SEO + Accessibility
2. **7.5.1-7.5.4** - SEO meta tags (35 min) → SEO score
3. **7.1.2-7.1.7** - Contrast fixes (1 hour) → Accessibility score
4. **7.2.1-7.2.2** - Image optimization (45 min) → LCP
5. **7.3.1-7.3.2** - Remove unused JS (2 hours) → TBT
6. **7.6.1-7.6.6** - Verify results (30 min) → Confirmation

**Total:** ~5 hours for 80% of impact

---

## Risk Assessment

**High Risk Tasks:**
- **7.3.2** Remove unused JS - May break functionality if dependencies are incorrectly identified
  - **Mitigation:** Test thoroughly after removal
  
- **7.3.4** Code splitting - May impact UX if not done correctly
  - **Mitigation:** Test UX before and after

**Low Risk Tasks:**
- Most SEO tasks (verification/configuration)
- Image optimization (can be reverted easily)
- Meta tag additions (low risk of breaking functionality)

---

## Summary

**Total Tasks:** 123  
**P0 Tasks:** ~15 tasks (~6-8 hours)  
**P1 Tasks:** ~20 tasks (~4-5 hours)  
**P2 Tasks:** ~30 tasks (~6-8 hours)  
**P3 Tasks:** ~5 tasks (~2 hours)

**Recommended Focus:** Complete P0 tasks first for maximum Lighthouse score improvement with minimal effort.
