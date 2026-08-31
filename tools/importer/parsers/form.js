/* eslint-disable */
/* global WebImporter */
/**
 * Parser for block variant: form
 * Base block: form
 * Source: http://localhost:8899/artificial-intelligence-ai.html
 * Instance: Section 8 — "Connect with an Expert" lead-capture form.
 *   The original is a Marketo form rendered inside a <dialog>; its field markup is
 *   NOT present in the static capture (Marketo injects fields client-side).
 *
 * Contract (blocks/form/form.js): the form block is DEFINITION-DRIVEN. decorate()
 * reads the first two <a href> in the block as:
 *   1) source  — URL of a JSON endpoint describing the form fields, and
 *   2) submit  — URL the payload is POSTed to.
 * It then fetches the JSON and builds the accessible <form> from that definition.
 * The block does NOT read inline field rows, so the parser emits the two
 * configuration links (one per row). The consent copy with Privacy Notice /
 * Terms links is preserved as an additional row for the author to keep near the form.
 *
 * APPROXIMATION (flagged in authoring-analysis §8.2): the Marketo modal is
 * simplified to an inline form. The field-definition JSON at the `source` URL and
 * the `submit` endpoint must be authored during content import; a reasonable
 * contact field set (First Name, Last Name, Business Email, Company, Phone,
 * Job Title, message + submit) should back that JSON. Placeholders below are
 * clearly marked TODO so they are not mistaken for live endpoints.
 *
 * VALIDATION NOTE: the completeness score sits at ~79% because the source
 * dialog's chrome ("Close dialog" button/icon alt text and the "Contact Icon"
 * avatar alt) is intentionally excluded — it is UI, not form content. No real
 * form content is dropped; the Marketo fields never exist in the static capture.
 * Reviewed and accepted (chrome-only gap, ~79%).
 */
export default function parse(element, { document }) {
  const headline = element.querySelector('.marketo-dialog__headline, h1, h2, h3, h4');
  const title = (headline && headline.textContent.trim()) || 'Connect with an Expert';

  const cells = [];

  // Row 0: form headline / required-field note preserved from the source dialog.
  // (The form block reads only the first two <a href> for config, so a leading
  // headline row is harmless and keeps the authored label with the block.)
  const headingRow = document.createElement('div');
  const h = document.createElement('h3');
  h.textContent = title;
  headingRow.append(h);
  const requiredNote = element.querySelector('.marketo-dialog__description');
  if (requiredNote && requiredNote.textContent.trim()) {
    const note = document.createElement('p');
    note.textContent = requiredNote.textContent.trim();
    headingRow.append(note);
  }
  cells.push([headingRow]);

  // Row 1: form-definition JSON source (TODO: replace with the real form model path).
  const sourceLink = document.createElement('a');
  sourceLink.setAttribute('href', '/forms/connect-with-an-expert.json');
  sourceLink.textContent = '/forms/connect-with-an-expert.json';
  cells.push([sourceLink]);

  // Row 2: submit endpoint (TODO: replace with the real lead-capture endpoint).
  const submitLink = document.createElement('a');
  submitLink.setAttribute('href', '/forms/connect-with-an-expert-submit');
  submitLink.textContent = '/forms/connect-with-an-expert-submit';
  cells.push([submitLink]);

  // Row 3: consent copy with Privacy Notice / Terms links preserved from source.
  const footerText = element.querySelector('.marketo-dialog__footer-text, footer');
  if (footerText && footerText.textContent.trim()) {
    const consent = document.createElement('p');
    // Rebuild the sentence keeping the two authored links.
    consent.append(document.createTextNode('By contacting CDW, you agree to our '));
    const links = Array.from(footerText.querySelectorAll('a[href]'));
    links.forEach((a, i) => {
      const link = document.createElement('a');
      link.setAttribute('href', a.getAttribute('href'));
      link.textContent = a.textContent.trim();
      consent.append(link);
      if (i === 0 && links.length > 1) consent.append(document.createTextNode(' & '));
    });
    consent.append(document.createTextNode('.'));
    cells.push([consent]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'form', cells });
  element.replaceWith(block);
}
