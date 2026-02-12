## Context

The "Qué es Nosework Trial" page (`/pages/que-es-nosework-trial.js`) currently exists but contains generic placeholder content that does not accurately reflect the actual sport rules from the official regulations document (`public/documents/normativas_participantes.pdf`). The page structure and components are already in place, including:

- SEO meta tags and Schema.org Article markup (already configured correctly)
- Hero section with title and tagline
- Multiple content sections using the `card` class pattern
- Responsive design with TailwindCSS
- Navigation and footer components
- Call-to-action sections linking to related pages

The page follows the existing pattern used in other informational pages (`about.js`, `como-empezar.js`, `reglamento.js`) with sections wrapped in semantic HTML and styled with consistent spacing and typography.

## Goals / Non-Goals

**Goals:**
- Update all textual content to accurately reflect the official regulations from `normativas_participantes.pdf`
- Correct the levels section to show "Base" and "Avanzado" instead of generic "Grado 1, 2, 3..."
- Add detailed information about NTC philosophy (open group, not a federation)
- Include all specific rules: odors (Kong + sage essential oil), minimum mark (3 seconds), evaluation criteria (systematic, focus, intensity + general impression)
- Explain inclusivity features: dogs with behavior problems can participate, reinforcers allowed, participants can choose whether to know substance location
- Clarify that there are no traditional podiums, but alternative recognitions are awarded
- Maintain existing page structure, components, and styling patterns
- Ensure content meets REQ-F-005 through REQ-F-008 (P0 F1 requirements)

**Non-Goals:**
- Creating new components or changing page architecture
- Modifying SEO configuration (meta tags and Schema.org are already correct)
- Adding new dependencies or external libraries
- Changing the visual design or layout structure
- Implementing i18n content translation (page structure supports i18n routing, but content updates are Spanish-only for now)
- Adding images or videos (REQ-F-009 is P1 F2, out of scope for this change)

## Decisions

### Decision 1: Content Update Strategy
**Decision:** Update content directly in the JSX of `/pages/que-es-nosework-trial.js` without creating separate content files or CMS integration.

**Rationale:**
- The page is static informational content that doesn't change frequently
- No need for content management system complexity at this stage
- Keeps implementation simple and maintainable
- Follows the pattern used in other informational pages (`about.js`, `como-empezar.js`)

**Alternatives Considered:**
- **Separate content JSON/MD files:** Would add unnecessary abstraction for static content
- **CMS integration:** Overkill for informational pages, adds complexity and dependencies

### Decision 2: Section Structure
**Decision:** Keep existing section structure but update content within each section. Add new subsections where needed to accommodate detailed information from the PDF.

**Rationale:**
- Existing structure is semantically correct and follows accessibility best practices
- Users are already familiar with the layout pattern
- No need to restructure if content can fit within existing sections
- Maintains consistency with other pages

**Alternatives Considered:**
- **Complete restructure:** Unnecessary since current structure is sound
- **Collapsible sections:** Adds complexity without clear benefit for informational content

### Decision 3: Level Information Display
**Decision:** Replace generic "Grado 1, 2, 3..." terminology with accurate "Base" and "Avanzado" levels, including specific rules for each level from the PDF.

**Rationale:**
- PDF clearly states two levels: Base and Avanzado
- Base level: no toys or food as distractors, organizer must inform what elements will be worked
- Avanzado level: everything valid if organizer can demonstrate success
- This is critical information that must be accurate

**Alternatives Considered:**
- **Keep generic terminology:** Would mislead users about actual sport structure
- **Add more levels:** Not supported by official regulations

### Decision 4: NTC Philosophy Section
**Decision:** Add explicit explanation of NTC as an open group (not a federation/association) in the history section, emphasizing inclusivity and freedom for organizers.

**Rationale:**
- PDF clearly states NTC is not a federation, association, or organization with chain of command
- This is important context for understanding the sport's philosophy
- Helps differentiate NTC from other organizations
- Emphasizes the inclusive, open nature of the community

**Alternatives Considered:**
- **Separate philosophy section:** Could work but history section is appropriate place
- **Omit philosophy details:** Would miss important context about NTC's unique approach

### Decision 5: Evaluation System Details
**Decision:** Include detailed explanation of evaluation criteria (systematic, focus, intensity) with coefficients, general impression, and organizer's ability to adjust coefficients.

**Rationale:**
- PDF provides specific evaluation criteria that users need to understand
- Explains how scoring works, which is important for participants
- Shows flexibility for organizers to emphasize specific aspects
- Minimum mark requirement (3 seconds) is clearly stated

**Alternatives Considered:**
- **Simplified explanation:** Would lose important details about how evaluation works
- **Link to regulations page:** Current page should provide sufficient detail; regulations page can have full details

### Decision 6: Inclusivity Information
**Decision:** Include all inclusivity features from PDF: dogs with behavior problems can participate, reinforcers allowed, participants can choose whether to know substance location, no leash requirement, no limit to scenarios.

**Rationale:**
- These features are key differentiators for NTC
- Important for potential participants to understand accessibility
- Shows commitment to inclusion and flexibility
- All explicitly stated in PDF

**Alternatives Considered:**
- **Omit some details:** Would not fully represent the sport's inclusive nature
- **Separate inclusivity section:** Could work but fits well in sport structure section

## Risks / Trade-offs

### Risk 1: Content Accuracy
**Risk:** Content may not perfectly match PDF if regulations are updated in the future.

**Mitigation:** 
- Content is based directly on `normativas_participantes.pdf` as source of truth
- Document the PDF as the authoritative source in code comments
- Future updates can reference the PDF for verification

### Risk 2: Information Overload
**Risk:** Including all details from PDF might make the page too long or overwhelming.

**Mitigation:**
- Use clear section headings and visual hierarchy
- Break information into digestible subsections
- Use bullet points and lists for clarity
- Maintain existing spacing and typography patterns for readability

### Risk 3: Maintenance Burden
**Risk:** If regulations change, content needs manual updates in code.

**Mitigation:**
- This is acceptable for static informational pages
- Changes are infrequent based on PDF date (January 2025)
- Clear documentation of source makes updates straightforward
- Future could migrate to CMS if content changes become frequent

### Risk 4: SEO Impact
**Risk:** Changing content significantly might affect existing SEO rankings.

**Mitigation:**
- Meta tags and Schema.org markup remain unchanged
- Content updates improve accuracy and relevance, which should help SEO
- Canonical URL remains the same
- No URL structure changes

### Trade-off: Detail vs. Brevity
**Trade-off:** Including all PDF details makes page comprehensive but longer.

**Decision:** Prioritize completeness and accuracy over brevity. Users seeking information about Nosework Trial need complete, accurate information. The page structure supports longer content with proper spacing and visual hierarchy.

## Migration Plan

### Step 1: Content Update
1. Update history section with NTC philosophy details
2. Update benefits section with more specific information
3. Replace sport structure section with accurate Base/Avanzado levels and rules
4. Update evaluation system details with coefficients and general impression
5. Add odor information (Kong + sage essential oil)
6. Add inclusivity information (behavior problems, reinforcers, etc.)
7. Update differences section with NTC unique characteristics

### Step 2: Verification
1. Review updated content against PDF to ensure accuracy
2. Test page rendering in browser
3. Verify SEO meta tags still work correctly
4. Check responsive design on mobile/tablet/desktop
5. Verify accessibility (semantic HTML, heading hierarchy)

### Step 3: Deployment
1. Commit changes to git
2. Deploy to staging (if available)
3. Review in staging environment
4. Deploy to production
5. Monitor for any issues

### Rollback Strategy
- Changes are content-only, no structural changes
- Can revert to previous commit if issues arise
- No database migrations or API changes to rollback
- Low risk change

## Open Questions

1. **Images/Videos (REQ-F-009):** Should images or videos be added in a future change? (Currently P1 F2, out of scope)
2. **i18n Content:** When should content be translated to Catalan, English, and Basque? (Structure supports i18n routing, but content is Spanish-only)
3. **Content Updates:** How frequently will regulations change? Should we plan for a content management approach in the future?
