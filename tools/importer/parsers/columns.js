/* eslint-disable */
/* global WebImporter */
/**
 * Parser for block variant: columns
 * Base block: columns
 * Source: http://localhost:8899/artificial-intelligence-ai.html
 * Instance: Section 7 — a horizontal row of 4 partner logo images (image-only columns).
 *
 * IMPORTANT: the page-templates selector matches each `.cdwimageatom` separately,
 * and each atom lives in its OWN `.grid-column > .grid-column-inner` (they are not
 * direct siblings). The import runner invokes this parser once per matched atom.
 * We want a single columns block with one row of N image cells, so:
 *   1. Find the common ancestor row (`.grid-row-inner`, else `.grid-row`) that holds
 *      all the logo atoms.
 *   2. Collect every `.cdwimageatom` under it.
 *   3. Act only from the FIRST atom; build one N-cell row, replace the first atom's
 *      grid column with the block, and remove the remaining atoms' columns.
 *   4. Later invocations receive now-detached atoms and bail via the isConnected guard.
 *
 * Library convention (columns): multiple columns/rows; row 1 = block name (added by
 * createBlock); the 2nd row holds one cell per column. blocks/columns/columns.js sets
 * columns-{n}-cols from the first row's child count and marks single-image cells as
 * columns-img-col.
 *
 * Partner logos are small brand assets that do NOT need runtime responsive
 * renditions, and some Scene7 assets (e.g. Intel's) return 403 for ANY
 * rendition params (?wid/?fmt) while serving their base URL fine. So for
 * logo images we normalize each src to its base Scene7 URL (strip query) and
 * tag it `data-eds-ingest` — the DM/Scene7 transformer (cdw-dm-images.js)
 * skips tagged imgs instead of converting them to render-time carrier-anchors,
 * letting the EDS pipeline ingest and self-host the image at publish time.
 * This fixes Intel and hardens every other logo against the same failure.
 */
export default function parse(element, { document }) {
  // Guard: skip atoms already removed by a previous (grouping) invocation.
  if (!element.isConnected) return;

  // Find the row container that groups all the logo columns together.
  const rowContainer = element.closest('.grid-row-inner') || element.closest('.grid-row') || element.parentElement;
  if (!rowContainer) return;

  const group = Array.from(rowContainer.querySelectorAll('.cdwimageatom'));
  if (!group.length) return;

  // Only build the block from the first atom; other invocations bail here.
  if (group[0] !== element) return;

  // Normalize a logo <img> for native EDS ingestion: strip any Scene7
  // rendition query (?wid/?fmt/...) so the src is the base asset URL (which
  // serves reliably), and tag it so cdw-dm-images.js leaves it as a real
  // <img> for the pipeline to ingest/self-host instead of converting it to a
  // render-time carrier-anchor.
  const prepLogoImg = (img) => {
    const rawSrc = img.getAttribute('src') || '';
    if (rawSrc.includes('/is/image/')) {
      const base = rawSrc.split('?')[0];
      img.setAttribute('src', base);
      img.setAttribute('data-eds-ingest', '');
    }
    return img;
  };

  const row = group.map((atom) => {
    const img = atom.querySelector('img');
    const anchor = atom.querySelector('a[href]');

    if (img && anchor) {
      // Preserve the linked logo: <a href><img></a>. Prep the img for native
      // ingestion (no title carrier-anchor, base URL) so the logo renders
      // even when Scene7 rejects rendition params for that asset.
      const link = document.createElement('a');
      link.setAttribute('href', anchor.getAttribute('href'));
      link.append(prepLogoImg(img));
      return link;
    }
    if (img) return prepLogoImg(img);
    return ''; // pad empty column so the row keeps a consistent cell count.
  });

  if (!row.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  // Row 2: N cells (one per logo) → columns-{N}-cols.
  const cells = [row];
  const block = WebImporter.Blocks.createBlock(document, { name: 'columns', cells });

  // Replace the first atom with the single block; remove the remaining atoms so
  // they are not re-processed and do not leave duplicate content behind.
  element.replaceWith(block);
  group.slice(1).forEach((atom) => atom.remove());
}
