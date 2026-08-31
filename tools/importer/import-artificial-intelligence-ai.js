/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroParser from './parsers/hero.js';
import cardsParser from './parsers/cards.js';
import relatedArticlesParser from './parsers/related-articles.js';
import columnsParser from './parsers/columns.js';
import formParser from './parsers/form.js';

// TRANSFORMER IMPORTS
import cdwCleanupTransformer from './transformers/cdw-cleanup.js';
import cdwDmImagesTransformer from './transformers/cdw-dm-images.js';
import cdwSectionsTransformer from './transformers/cdw-sections.js';

// PARSER REGISTRY
const parsers = {
  hero: heroParser,
  cards: cardsParser,
  'related-articles': relatedArticlesParser,
  columns: columnsParser,
  form: formParser,
};

// PAGE TEMPLATE CONFIGURATION - Embedded from page-templates.json
const PAGE_TEMPLATE = {
  name: 'artificial-intelligence-ai',
  description: 'CDW Artificial Intelligence (AI) Solutions marketing page. Hero + editorial prose + card grids + featured whitepaper banner + article insights + partner logos + CTA form. Reuse-only: hero, cards, related-articles, columns, form.',
  urls: [
    'http://localhost:8899/artificial-intelligence-ai.html',
  ],
  blocks: [
    {
      name: 'hero',
      instances: [
        '#content > div:nth-of-type(2) > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.cmp-container > div.cdwgridlayout:nth-of-type(1)',
        '#content > div:nth-of-type(2) > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.cmp-container > div.cdwgridlayout:nth-of-type(4)',
      ],
    },
    {
      name: 'cards',
      instances: [
        '#content > div:nth-of-type(2) > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.cmp-container > div.cdwgridlayout:nth-of-type(3) .cdw-aligned-height-cards',
        '#content > div:nth-of-type(2) > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.cmp-container > div.cdwgridlayout:nth-of-type(5) .cdw-aligned-height-cards',
      ],
    },
    {
      name: 'related-articles',
      instances: [
        '#content > div:nth-of-type(2) > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.cmp-container > div.cdwgridlayout:nth-of-type(6) .content-card-container',
      ],
    },
    {
      name: 'columns',
      instances: [
        '#content > div:nth-of-type(2) > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.cmp-container > div.cdwgridlayout:nth-of-type(7) .cdwimageatom',
      ],
    },
    {
      name: 'form',
      instances: [
        '#content > div:nth-of-type(2) > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.cmp-container > div.cdwgridlayout:nth-of-type(8) .cdwmarketoform',
      ],
    },
  ],
  sections: [
    {
      id: 'section-1', name: 'Hero', selector: '#content > div:nth-of-type(2) > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.cmp-container > div.cdwgridlayout:nth-of-type(1)', style: null, blocks: ['hero'], defaultContent: [],
    },
    {
      id: 'section-2', name: 'Why CDW intro', selector: '#content > div:nth-of-type(2) > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.cmp-container > div.cdwgridlayout:nth-of-type(2)', style: null, blocks: [], defaultContent: ['#content > div:nth-of-type(2) > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.cmp-container > div.cdwgridlayout:nth-of-type(2)'],
    },
    {
      id: 'section-3', name: 'Designed for Every Stage cards', selector: '#content > div:nth-of-type(2) > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.cmp-container > div.cdwgridlayout:nth-of-type(3)', style: null, blocks: ['cards'], defaultContent: ['#content > div:nth-of-type(2) > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.cmp-container > div.cdwgridlayout:nth-of-type(3) .cdwheadlineatom'],
    },
    {
      id: 'section-4', name: 'Featured white paper banner', selector: '#content > div:nth-of-type(2) > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.cmp-container > div.cdwgridlayout:nth-of-type(4)', style: null, blocks: ['hero'], defaultContent: [],
    },
    {
      id: 'section-5', name: 'How CDW Helps text cards', selector: '#content > div:nth-of-type(2) > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.cmp-container > div.cdwgridlayout:nth-of-type(5)', style: null, blocks: ['cards'], defaultContent: ['#content > div:nth-of-type(2) > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.cmp-container > div.cdwgridlayout:nth-of-type(5) .cdwheadlineatom'],
    },
    {
      id: 'section-6', name: 'Insights articles', selector: '#content > div:nth-of-type(2) > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.cmp-container > div.cdwgridlayout:nth-of-type(6)', style: null, blocks: ['related-articles'], defaultContent: ['#content > div:nth-of-type(2) > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.cmp-container > div.cdwgridlayout:nth-of-type(6) .cdwheadlineatom'],
    },
    {
      id: 'section-7', name: 'Partner logos', selector: '#content > div:nth-of-type(2) > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.cmp-container > div.cdwgridlayout:nth-of-type(7)', style: null, blocks: ['columns'], defaultContent: ['#content > div:nth-of-type(2) > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.cmp-container > div.cdwgridlayout:nth-of-type(7) .cdwheadlineatom'],
    },
    {
      id: 'section-8', name: 'Request an AI Assessment CTA', selector: '#content > div:nth-of-type(2) > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.cmp-container > div.cdwgridlayout:nth-of-type(8)', style: 'highlight', blocks: ['form'], defaultContent: ['#content > div:nth-of-type(2) > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.cmp-container > div.cdwgridlayout:nth-of-type(8) .cdwheadlineatom'],
    },
  ],
};

// TRANSFORMER REGISTRY - cleanup + DM images run first, section transformer last
const transformers = [
  cdwCleanupTransformer,
  cdwDmImagesTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [cdwSectionsTransformer] : []),
];

/**
 * Execute all page transformers for a specific hook
 * @param {string} hookName - 'beforeTransform' or 'afterTransform'
 * @param {Element} element - The DOM element to transform
 * @param {Object} payload - { document, url, html, params }
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = { ...payload, template: PAGE_TEMPLATE };
  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all block instances on the page based on the embedded template.
 * @param {Document} document
 * @param {Object} template
 * @returns {Array}
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];
  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });
  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const {
      document, url, html, params,
    } = payload;

    const main = document.body;

    // 1. beforeTransform (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks using the embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using its registered parser
    pageBlocks.forEach((block) => {
      if (!block.element.parentNode) return; // already replaced by an earlier parser
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. afterTransform (final cleanup + section breaks/metadata)
    executeTransformers('afterTransform', main, payload);

    // 5. WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Sanitized path (root → /index guard)
    const rawPath = new URL(params.originalURL).pathname
      .replace(/\/$/, '')
      .replace(/\.html?$/, '');
    const path = WebImporter.FileUtils.sanitizePath(rawPath === '' ? '/index' : rawPath);

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
