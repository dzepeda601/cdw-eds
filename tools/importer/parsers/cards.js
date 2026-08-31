/* eslint-disable */
/* global WebImporter */
/**
 * Parser for block variant: cards
 * Base block: cards
 * Source: http://localhost:8899/artificial-intelligence-ai.html
 * Instances:
 *   Section 3 — image cards: image + bold title + description + labeled arrow CTA link.
 *   Section 5 — text-only cards: red check icon + question title + description (no image, no CTA).
 * Library convention:
 *   - Cards (with images): 2 columns. Row 1 = block name. Each card row = [image/icon cell, text cell].
 *     Text cell = Title (heading) + Description + optional Call-to-Action.
 *   - Cards (no images): 1 column. Each card row = single text cell (Heading + Description + optional CTA).
 * blocks/cards/cards.js decorateDefault handles both shapes; text-only cards render without an image.
 * A container's cards are uniform, so the column count is chosen per instance from image presence.
 */
export default function parse(element, { document }) {
  // Drop inline <style> blocks — the source cards carry per-container CSS
  // custom-property declarations (e.g. `--aem-card-rows-size`) that are not
  // authorable card content and must never land in the block table.
  element.querySelectorAll('style').forEach((s) => s.remove());

  // Cards live inside .aem-aligned-card-container wrappers, not as direct
  // children of the block root — match at any depth.
  const cardEls = Array.from(element.querySelectorAll('.aem-aligned-card'));
  if (!cardEls.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  // Determine variant for this instance: any real card image => 2-column (with images).
  const hasImages = cardEls.some(
    (card) => card.querySelector('img.aem-aligned-card__image, img[class*="card__image"]'),
  );

  const cells = [];

  cardEls.forEach((card) => {
    // --- Text content (title + description + optional CTA) ---
    const textParts = [];

    const headline = card.querySelector('.aem-aligned-card__headline, [class*="headline"]');
    if (headline && headline.textContent.trim()) {
      const titleP = document.createElement('p');
      const strong = document.createElement('strong');
      strong.textContent = headline.textContent.trim();
      titleP.append(strong);
      textParts.push(titleP);
    }

    const textWrap = card.querySelector('.aem-aligned-card__text, [class*="card__text"]');
    if (textWrap) {
      const descText = textWrap.textContent.replace(/\s+/g, ' ').trim();
      if (descText) {
        const descP = document.createElement('p');
        descP.textContent = descText;
        textParts.push(descP);
      }
    }

    // CTA link (image cards). Strip the trailing arrow <img>, keep the label.
    const cta = card.querySelector('a.aem-aligned-card__link, a[class*="card__link"], a[href]');
    if (cta) {
      const href = cta.getAttribute('href') || '#';
      const label = cta.textContent.replace(/\s+/g, ' ').trim();
      if (label) {
        const link = document.createElement('a');
        link.setAttribute('href', href);
        link.textContent = label;
        const linkP = document.createElement('p');
        linkP.append(link);
        textParts.push(linkP);
      }
    }

    if (!textParts.length) return;

    if (hasImages) {
      // 2-column row: [image cell, text cell]. Missing image => empty first cell.
      const img = card.querySelector('img.aem-aligned-card__image, img[class*="card__image"]');
      let imageCell = '';
      if (img) {
        const picture = document.createElement('picture');
        picture.append(img);
        imageCell = picture;
      }
      cells.push([imageCell, textParts]);
    } else {
      // 1-column row (no-images variant): single text cell.
      cells.push([textParts]);
    }
  });

  if (!cells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards', cells });
  element.replaceWith(block);
}
