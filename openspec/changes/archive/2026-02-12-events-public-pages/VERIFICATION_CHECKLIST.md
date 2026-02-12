# Verification Checklist - Events Public Pages

This checklist documents manual verification tasks and their completion status.

## Screen Reader Testing (11.18)

**Status:** ⚠️ Requires manual testing with actual screen reader

**Instructions:** See `MANUAL_TESTING_GUIDE.md` section 11.18

**Verification:**
- [ ] NVDA testing completed
- [ ] VoiceOver testing completed
- [ ] All interactive elements are accessible
- [ ] Navigation is logical and sequential

**Notes:** Automated tests with axe-core cover most accessibility issues, but manual screen reader testing provides real-world validation.

## Lighthouse Audit (11.20)

**Status:** ✅ Automated via Lighthouse CI

**Run Command:**
```bash
npm run build
npm run start -- -p 3000
npm run test:lighthouse
```

**Expected Scores:**
- Performance: >= 90
- Accessibility: >= 95
- SEO: >= 90
- Best Practices: >= 95

**Manual Verification:**
- [ ] Run Lighthouse CI and verify scores
- [ ] Check reports in `openspec/changes/events-public-pages/evidence/lighthouse/`
- [ ] Address any warnings or failures

## Cross-Browser Compatibility (11.21)

**Status:** ✅ Automated via Playwright (Chrome, Firefox, Safari, Edge)

**Automated Tests:** `tests/e2e/events-list.spec.ts` and `tests/e2e/event-detail.spec.ts` run on multiple browsers

**Manual Verification:**
- [ ] Chrome: Visual check, no console errors
- [ ] Firefox: Visual check, no console errors
- [ ] Safari: Visual check, no console errors
- [ ] Edge: Visual check, no console errors
- [ ] Mobile Chrome: Test on device or emulator
- [ ] Mobile Safari: Test on device or emulator

**Run Automated Tests:**
```bash
npm run test:e2e
```

## Schema.org Validation (12.1)

**Status:** ✅ Script created for validation

**Run Command:**
```bash
npm run build
npm run start -- -p 3000
node scripts/verify-schema.js http://localhost:3000/events
node scripts/verify-schema.js http://localhost:3000/events/1
```

**Manual Verification:**
- [ ] Run verification script
- [ ] Test with Google Rich Results Test: https://search.google.com/test/rich-results
- [ ] Verify no validation errors
- [ ] Check that events appear correctly in structured data

**Google Rich Results Test:**
1. Navigate to: https://search.google.com/test/rich-results
2. Enter URL (use ngrok for localhost or deploy to staging)
3. Verify SportsEvent schema is detected
4. Check for any errors or warnings

## Open Graph Images (12.4)

**Status:** ⚠️ Requires image verification

**Current Implementation:**
- Default image: `/images/og-image.jpg`
- Used on all pages

**Verification Steps:**
1. Check if `/public/images/og-image.jpg` exists
2. Verify image dimensions (should be 1200x630px recommended)
3. Test with Facebook Debugger: https://developers.facebook.com/tools/debug/
4. Test with Twitter Card Validator: https://cards-dev.twitter.com/validator

**Manual Verification:**
- [ ] Image exists and is accessible
- [ ] Image dimensions are appropriate (1200x630px or similar)
- [ ] Facebook preview displays correctly
- [ ] Twitter card preview displays correctly
- [ ] Image loads quickly

**Future Enhancement:**
- Consider dynamic OG images per event using `@vercel/og`

## Social Sharing Previews (12.5)

**Status:** ⚠️ Requires manual testing with social platforms

**Verification:**
- [ ] Facebook sharing preview (use Facebook Debugger)
- [ ] Twitter sharing preview (use Twitter Card Validator)
- [ ] WhatsApp sharing preview (test in WhatsApp)
- [ ] LinkedIn sharing preview (test in LinkedIn)

**Tools:**
- Facebook: https://developers.facebook.com/tools/debug/
- Twitter: https://cards-dev.twitter.com/validator
- LinkedIn: https://www.linkedin.com/post-inspector/

**Note:** Requires public URL (use ngrok or deploy to staging)

## Core Web Vitals (12.9)

**Status:** ✅ Can be verified via Lighthouse or PageSpeed Insights

**Metrics to Check:**
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

**Verification:**
- [ ] Run Lighthouse audit (includes Core Web Vitals)
- [ ] Check PageSpeed Insights: https://pagespeed.web.dev/
- [ ] Verify metrics meet thresholds
- [ ] Address any performance issues

## Visual Review (13.6)

**Status:** ⚠️ Requires manual visual inspection

**Checklist:**
- [ ] Events list page looks consistent with design
- [ ] Event detail page looks consistent with design
- [ ] All views (Calendar/List/Grid) display correctly
- [ ] Filters are visually clear and functional
- [ ] Pagination is clear and functional
- [ ] Responsive design works on all screen sizes
- [ ] Colors and spacing are consistent
- [ ] Typography is consistent

## CSS Review (13.7)

**Status:** ✅ Automated via build process

**Verification:**
- [ ] Build completes without CSS errors
- [ ] No unused Tailwind classes (can be checked with tools like purgecss)
- [ ] CSS is properly optimized in production build

**Note:** Tailwind CSS automatically purges unused classes in production build.
