# CDW AI & Data Page Migration Plan

## Objective
Migrate the CDW "Artificial Intelligence (AI)" solutions page — `https://www.cdw.com/content/cdw/en/solutions/ai-and-data/artificial-intelligence-ai.html` — into this AEM Edge Delivery Services project, **reusing only the blocks and page templates already available in this repo**. No new blocks will be created; any content sequence without an exact match will be approximated with the closest existing block and flagged.

## Scope Decisions (confirmed)
- **Block policy:** Reuse only. Map everything to existing repo blocks. Where a sequence has no good fit, approximate with the closest existing block and flag it — do **not** create new blocks or variants.
- **Template policy:** Reuse existing templates. Check the repo's available page templates (e.g. `templates/`) and the migration `page-templates.json` classification, and fit this page to the most appropriate existing template rather than defining a new one. If no template applies, treat it as a standard content page and flag that.
- **Optional plugins:** None. Commerce (PDP/PLP) and Forms migration tooling will **not** be enabled. All content is treated as standard editorial/marketing blocks.

## Approach
Single-page migration through the standard EDS page-import workflow: inventory (blocks + templates) → scrape → analyze structure → classify against existing templates → map to existing blocks → generate import HTML → preview and verify against the original. Import HTML is produced via the project's import tooling (not hand-written). The overriding constraint is that only the existing repo block palette and template set are used.

## Checklist

- [ ] **Block & template inventory** — Survey the blocks currently available in this repo and the project's block library endpoint, and enumerate existing page templates (`templates/` and any `page-templates.json` classification) to establish the reuse palette.
- [ ] **Scrape the source page** — Fetch the CDW AI & Data page, extract metadata, download images, and produce cleaned HTML + analysis artifacts.
- [ ] **Identify page structure** — Break the page into sections and content sequences (two-level analysis).
- [ ] **Classify against existing templates** — Match this page to the most appropriate existing template; if none fits, record it as a standard content page (no new template).
- [ ] **Map sequences to existing blocks** — For each sequence, decide default content vs. block and match to an existing repo block/variant. For any sequence with no exact match, choose the closest existing block and record it as a flagged approximation (no new blocks).
- [ ] **Generate import HTML** — Produce the structured section/block HTML and images folder via the project's import tooling, applying the chosen template.
- [ ] **Preview & verify** — Render the imported page in the local preview, verify DOM/layout, and compare against the original for content completeness and visual fidelity.
- [ ] **Iterate** — Fix mapping/structure/styling gaps found during verification, staying within the existing block and template palette.
- [ ] **Summarize results** — Report what was migrated, which existing template and blocks were reused, and list every flagged approximation and any content that couldn't be fully represented with existing blocks/templates.

## Notes & Open Items
- Strict reuse-only policy for both blocks and templates: any gap is handled by approximation + a flag, never by creating a new block or template.
- Flagged approximations will be collected and presented in the final summary so you can decide later whether they warrant new blocks/templates in a separate effort.

> This artifact is the plan only. Execution requires switching to Execute mode — no files have been created or modified yet.
