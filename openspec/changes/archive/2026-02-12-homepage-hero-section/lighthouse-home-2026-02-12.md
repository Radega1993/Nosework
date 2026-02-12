# Change Request: Fix Lighthouse SEO/Accessibility + Improve LCP/TBT (Home)

Context:
- Project is in development (localhost), not deployed yet.
- Ran Lighthouse on http://localhost:3000/ (Feb 12, 2026).
- Scores: Performance 91, Accessibility 96, Best Practices 100, SEO 52.
- Key findings:
  - Accessibility: <html> missing lang attribute
  - Accessibility: insufficient contrast somewhere
  - Performance: LCP 6.2s, TBT 980ms
  - Performance insights: improve image delivery (~258 KiB), reduce unused JS (~348 KiB), minify JS (~208 KiB)

Goals:
1) SEO: raise score to >= 90 for Home in Lighthouse (local build/start).
2) Accessibility: fix lang attribute and contrast issues flagged by Lighthouse.
3) Performance: reduce LCP to < 3.0s and TBT to < 300ms if possible without changing features.
4) Keep current hero/featured-events features and behavior.

Non-goals:
- Full i18n rollout (only ensure correct defaults and future-proof).
- Production deployment tasks.

Constraints:
- Next.js Pages Router
- React + Tailwind
- Prefer spec-driven changes with minimal code edits.
- Canonicals/robots/sitemap should be correct for both local and production (configurable base URL).
