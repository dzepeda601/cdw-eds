/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: CDW site-wide cleanup.
 * Removes non-authorable global chrome (header, footer, breadcrumbs, service
 * agent, cookie banner, tracking pixels) so the import contains only the
 * page-level authorable content under #content > div:nth-of-type(2).
 *
 * All selectors verified against migration-work/cleaned.html and the
 * excludedRegions list in migration-work/page-structure.json.
 */

const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Overlays / cookie chrome / interactive widgets that can interfere with
    // block parsing. Verified in cleaned.html:
    //   #onetrust-consent-sdk (line ~4311), #service-agent-app (line 6),
    //   .menu-shade-utility / .menu-shade (lines 2,4), #gh-overlay (line 3295)
    WebImporter.DOMUtils.remove(element, [
      '#onetrust-consent-sdk',
      '#service-agent-app',
      '.menu-shade-utility',
      '.menu-shade',
      '#gh-overlay',
      // Scene7 video viewer / marketo dialog chrome nested inside content.
      // The .cdwmarketoform (section 8) ships a hidden <dialog> connect-with-
      // an-expert modal (line ~4184) that is dialog chrome, not authorable copy.
      'dialog.marketo-dialog',
      // Developer/staging CSS note band ("CSS - APPLY GRID TO ALL REBRAND
      // PAGES / Custom Cards CSS ..."). It's a .cdwgridlayout_copy authoring
      // leftover, not page content — the 8 real content bands are plain
      // .cdwgridlayout (no _copy suffix), so this selector never touches them.
      '.cdwgridlayout_copy',
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // Non-authorable global chrome and leftover elements. Verified in
    // cleaned.html: <header> (line 8), <footer> (line ~4275),
    // .grid-container.aem-breadcrumbs (line 3299), <breadcrumbs> (line 3304),
    // <iframe> GPP locator (line ~4307), tracking <img>/<noscript>/<link>.
    WebImporter.DOMUtils.remove(element, [
      'header',
      'footer',
      'nav',
      '.grid-container.aem-breadcrumbs',
      'breadcrumbs',
      'iframe',
      'noscript',
      'link',
      'script',
      'style',
    ]);
  }
}
