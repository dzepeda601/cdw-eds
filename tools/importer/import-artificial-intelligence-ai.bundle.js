/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-artificial-intelligence-ai.js
  var import_artificial_intelligence_ai_exports = {};
  __export(import_artificial_intelligence_ai_exports, {
    default: () => import_artificial_intelligence_ai_default
  });

  // tools/importer/parsers/hero.js
  function parse(element, { document: document2 }) {
    const bgImage = element.querySelector("img[src]");
    const contentNodes = Array.from(
      element.querySelectorAll(
        ".cdwheadlineatom h1, .cdwheadlineatom h2, .cdwheadlineatom h3, .cdwheadlineatom h4, .cdwrteatom p, .cdwbuttonatom a[href]"
      )
    );
    const contentCell = [];
    contentNodes.forEach((node) => {
      if (!node.textContent || !node.textContent.trim()) return;
      if (node.tagName === "A") {
        const href = node.getAttribute("href") || "";
        if (/^javascript:/i.test(href) || href.trim() === "") {
          node.setAttribute("href", "#");
        }
        const p = document2.createElement("p");
        p.append(node);
        contentCell.push(p);
      } else {
        contentCell.push(node);
      }
    });
    if (!contentCell.length && !bgImage) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [];
    if (bgImage) cells.push([bgImage]);
    cells.push([contentCell]);
    const block = WebImporter.Blocks.createBlock(document2, { name: "hero", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards.js
  function parse2(element, { document: document2 }) {
    element.querySelectorAll("style").forEach((s) => s.remove());
    const cardEls = Array.from(element.querySelectorAll(".aem-aligned-card"));
    if (!cardEls.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const hasImages = cardEls.some(
      (card) => card.querySelector('img.aem-aligned-card__image, img[class*="card__image"]')
    );
    const cells = [];
    cardEls.forEach((card) => {
      const textParts = [];
      const headline = card.querySelector('.aem-aligned-card__headline, [class*="headline"]');
      if (headline && headline.textContent.trim()) {
        const titleP = document2.createElement("p");
        const strong = document2.createElement("strong");
        strong.textContent = headline.textContent.trim();
        titleP.append(strong);
        textParts.push(titleP);
      }
      const textWrap = card.querySelector('.aem-aligned-card__text, [class*="card__text"]');
      if (textWrap) {
        const descText = textWrap.textContent.replace(/\s+/g, " ").trim();
        if (descText) {
          const descP = document2.createElement("p");
          descP.textContent = descText;
          textParts.push(descP);
        }
      }
      const cta = card.querySelector('a.aem-aligned-card__link, a[class*="card__link"], a[href]');
      if (cta) {
        const href = cta.getAttribute("href") || "#";
        const label = cta.textContent.replace(/\s+/g, " ").trim();
        if (label) {
          const link = document2.createElement("a");
          link.setAttribute("href", href);
          link.textContent = label;
          const linkP = document2.createElement("p");
          linkP.append(link);
          textParts.push(linkP);
        }
      }
      if (!textParts.length) return;
      if (hasImages) {
        const img = card.querySelector('img.aem-aligned-card__image, img[class*="card__image"]');
        let imageCell = "";
        if (img) {
          const picture = document2.createElement("picture");
          picture.append(img);
          imageCell = picture;
        }
        cells.push([imageCell, textParts]);
      } else {
        cells.push([textParts]);
      }
    });
    if (!cells.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "cards", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/related-articles.js
  function parse3(element, { document: document2 }) {
    let anchors = Array.from(
      element.querySelectorAll("a:has(h3.content-card-title), .content-card-content h3.content-card-title a")
    );
    if (!anchors.length) {
      anchors = Array.from(element.querySelectorAll(".content-card-content a[href]")).filter(
        (a) => a.querySelector("h3")
      );
    }
    if (!anchors.length) {
      anchors = Array.from(element.querySelectorAll("a.content-card-img[href]"));
    }
    const seen = /* @__PURE__ */ new Set();
    const links = [];
    anchors.forEach((a) => {
      const href = a.getAttribute("href") || "";
      if (!href || href.startsWith("#")) return;
      let key = href;
      try {
        key = new URL(href, "http://x").pathname;
      } catch (e) {
      }
      if (seen.has(key)) return;
      seen.add(key);
      const title = (a.textContent || "").replace(/\s+/g, " ").trim();
      const link = document2.createElement("a");
      link.setAttribute("href", href);
      link.textContent = title || href;
      links.push(link);
    });
    if (!links.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const list = document2.createElement("ul");
    links.forEach((link) => {
      const li = document2.createElement("li");
      li.append(link);
      list.append(li);
    });
    const cells = [[list]];
    const block = WebImporter.Blocks.createBlock(document2, { name: "related-articles", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns.js
  function parse4(element, { document: document2 }) {
    if (!element.isConnected) return;
    const rowContainer = element.closest(".grid-row-inner") || element.closest(".grid-row") || element.parentElement;
    if (!rowContainer) return;
    const group = Array.from(rowContainer.querySelectorAll(".cdwimageatom"));
    if (!group.length) return;
    if (group[0] !== element) return;
    const prepLogoImg = (img) => {
      const rawSrc = img.getAttribute("src") || "";
      if (rawSrc.includes("/is/image/")) {
        const base = rawSrc.split("?")[0];
        img.setAttribute("src", base);
        img.setAttribute("data-eds-ingest", "");
      }
      return img;
    };
    const row = group.map((atom) => {
      const img = atom.querySelector("img");
      const anchor = atom.querySelector("a[href]");
      if (img && anchor) {
        const link = document2.createElement("a");
        link.setAttribute("href", anchor.getAttribute("href"));
        link.append(prepLogoImg(img));
        return link;
      }
      if (img) return prepLogoImg(img);
      return "";
    });
    if (!row.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [row];
    const block = WebImporter.Blocks.createBlock(document2, { name: "columns", cells });
    element.replaceWith(block);
    group.slice(1).forEach((atom) => atom.remove());
  }

  // tools/importer/parsers/form.js
  function parse5(element, { document: document2 }) {
    const headline = element.querySelector(".marketo-dialog__headline, h1, h2, h3, h4");
    const title = headline && headline.textContent.trim() || "Connect with an Expert";
    const cells = [];
    const headingRow = document2.createElement("div");
    const h = document2.createElement("h3");
    h.textContent = title;
    headingRow.append(h);
    const requiredNote = element.querySelector(".marketo-dialog__description");
    if (requiredNote && requiredNote.textContent.trim()) {
      const note = document2.createElement("p");
      note.textContent = requiredNote.textContent.trim();
      headingRow.append(note);
    }
    cells.push([headingRow]);
    const sourceLink = document2.createElement("a");
    sourceLink.setAttribute("href", "/forms/connect-with-an-expert.json");
    sourceLink.textContent = "/forms/connect-with-an-expert.json";
    cells.push([sourceLink]);
    const submitLink = document2.createElement("a");
    submitLink.setAttribute("href", "/forms/connect-with-an-expert-submit");
    submitLink.textContent = "/forms/connect-with-an-expert-submit";
    cells.push([submitLink]);
    const footerText = element.querySelector(".marketo-dialog__footer-text, footer");
    if (footerText && footerText.textContent.trim()) {
      const consent = document2.createElement("p");
      consent.append(document2.createTextNode("By contacting CDW, you agree to our "));
      const links = Array.from(footerText.querySelectorAll("a[href]"));
      links.forEach((a, i) => {
        const link = document2.createElement("a");
        link.setAttribute("href", a.getAttribute("href"));
        link.textContent = a.textContent.trim();
        consent.append(link);
        if (i === 0 && links.length > 1) consent.append(document2.createTextNode(" & "));
      });
      consent.append(document2.createTextNode("."));
      cells.push([consent]);
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "form", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/cdw-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        "#onetrust-consent-sdk",
        "#service-agent-app",
        ".menu-shade-utility",
        ".menu-shade",
        "#gh-overlay",
        // Scene7 video viewer / marketo dialog chrome nested inside content.
        // The .cdwmarketoform (section 8) ships a hidden <dialog> connect-with-
        // an-expert modal (line ~4184) that is dialog chrome, not authorable copy.
        "dialog.marketo-dialog",
        // Developer/staging CSS note band ("CSS - APPLY GRID TO ALL REBRAND
        // PAGES / Custom Cards CSS ..."). It's a .cdwgridlayout_copy authoring
        // leftover, not page content — the 8 real content bands are plain
        // .cdwgridlayout (no _copy suffix), so this selector never touches them.
        ".cdwgridlayout_copy"
      ]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        "header",
        "footer",
        "nav",
        ".grid-container.aem-breadcrumbs",
        "breadcrumbs",
        "iframe",
        "noscript",
        "link",
        "script",
        "style"
      ]);
    }
  }

  // tools/importer/transformers/cdw-dm-images.js
  function detectDynamicMediaUrl(urlStr) {
    let u;
    try {
      u = new URL(urlStr, "https://x/");
    } catch (e) {
      return false;
    }
    if (u.pathname.startsWith("/is/image/")) {
      return "scene7";
    }
    if (/^delivery-p\d+-e\d+\.adobeaemcloud\.com$/.test(u.hostname) && u.pathname.startsWith("/adobe/assets/urn:")) {
      return "dm-openapi";
    }
    return false;
  }
  var LINKED_DM_INLINE_WRAPPER_TAGS = /* @__PURE__ */ new Set(["PICTURE"]);
  var LINKED_DM_WRAPPER_SIBLING_TAGS = /* @__PURE__ */ new Set(["SOURCE"]);
  function findLinkedDmCarrier(img) {
    if (!img || !img.parentElement) return null;
    let node = img;
    let parent = img.parentElement;
    while (parent && LINKED_DM_INLINE_WRAPPER_TAGS.has(parent.tagName)) {
      let foundNode = false;
      for (const child of parent.children) {
        if (child === node) {
          foundNode = true;
        } else if (!LINKED_DM_WRAPPER_SIBLING_TAGS.has(child.tagName)) {
          return null;
        }
      }
      if (!foundNode) return null;
      node = parent;
      parent = parent.parentElement;
    }
    if (!parent || parent.tagName !== "A") return null;
    if (parent.children.length !== 1 || parent.children[0] !== node) return null;
    if (parent.textContent.trim() !== "") return null;
    return parent;
  }
  var EMPTY_ALT_SENTINEL = "Image without alt text";
  function altToLinkText(alt) {
    return alt || EMPTY_ALT_SENTINEL;
  }
  function transform2(hookName, element, payload) {
    if (hookName !== "afterTransform") return;
    const doc = element.ownerDocument;
    element.querySelectorAll("img").forEach((img) => {
      const src = img.getAttribute("src") || "";
      if (!detectDynamicMediaUrl(src)) return;
      if (img.hasAttribute("data-eds-ingest")) {
        img.removeAttribute("data-eds-ingest");
        return;
      }
      const alt = img.getAttribute("alt") || "";
      const linkedAnchor = findLinkedDmCarrier(img);
      if (linkedAnchor) {
        linkedAnchor.setAttribute("title", src);
        linkedAnchor.textContent = altToLinkText(alt);
        return;
      }
      const parent = img.parentElement;
      if (parent && parent.tagName === "A") {
        console.warn("DM image inside mixed-content anchor, skipped:", src);
        return;
      }
      const a = doc.createElement("a");
      a.href = src;
      a.textContent = altToLinkText(alt);
      img.replaceWith(a);
    });
  }

  // tools/importer/transformers/cdw-sections.js
  var SECTION_MARKER_ATTR = "data-excat-section-id";
  function transform3(hookName, element, payload) {
    const sections = payload.template && payload.template.sections || [];
    if (hookName === "beforeTransform") {
      for (let i = sections.length - 1; i >= 0; i -= 1) {
        const section = sections[i];
        if (i === 0 && !section.style) continue;
        const sectionEl = element.querySelector(section.selector);
        if (!sectionEl) continue;
        const hr = document.createElement("hr");
        if (section.style) hr.setAttribute(SECTION_MARKER_ATTR, section.id);
        sectionEl.before(hr);
      }
    }
    if (hookName === "afterTransform") {
      for (let i = sections.length - 1; i >= 0; i -= 1) {
        const section = sections[i];
        if (!section.style) continue;
        const marker = element.querySelector(`[${SECTION_MARKER_ATTR}="${section.id}"]`);
        const anchor = marker || element.querySelector(section.selector);
        if (!anchor) continue;
        const metadataBlock = WebImporter.Blocks.createBlock(document, {
          name: "Section Metadata",
          cells: { style: section.style }
        });
        anchor.after(metadataBlock);
        if (marker) {
          marker.removeAttribute(SECTION_MARKER_ATTR);
          if (i === 0) marker.remove();
        }
      }
    }
  }

  // tools/importer/import-artificial-intelligence-ai.js
  var parsers = {
    hero: parse,
    cards: parse2,
    "related-articles": parse3,
    columns: parse4,
    form: parse5
  };
  var PAGE_TEMPLATE = {
    name: "artificial-intelligence-ai",
    description: "CDW Artificial Intelligence (AI) Solutions marketing page. Hero + editorial prose + card grids + featured whitepaper banner + article insights + partner logos + CTA form. Reuse-only: hero, cards, related-articles, columns, form.",
    urls: [
      "http://localhost:8899/artificial-intelligence-ai.html"
    ],
    blocks: [
      {
        name: "hero",
        instances: [
          "#content > div:nth-of-type(2) > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.cmp-container > div.cdwgridlayout:nth-of-type(1)",
          "#content > div:nth-of-type(2) > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.cmp-container > div.cdwgridlayout:nth-of-type(4)"
        ]
      },
      {
        name: "cards",
        instances: [
          "#content > div:nth-of-type(2) > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.cmp-container > div.cdwgridlayout:nth-of-type(3) .cdw-aligned-height-cards",
          "#content > div:nth-of-type(2) > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.cmp-container > div.cdwgridlayout:nth-of-type(5) .cdw-aligned-height-cards"
        ]
      },
      {
        name: "related-articles",
        instances: [
          "#content > div:nth-of-type(2) > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.cmp-container > div.cdwgridlayout:nth-of-type(6) .content-card-container"
        ]
      },
      {
        name: "columns",
        instances: [
          "#content > div:nth-of-type(2) > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.cmp-container > div.cdwgridlayout:nth-of-type(7) .cdwimageatom"
        ]
      },
      {
        name: "form",
        instances: [
          "#content > div:nth-of-type(2) > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.cmp-container > div.cdwgridlayout:nth-of-type(8) .cdwmarketoform"
        ]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero",
        selector: "#content > div:nth-of-type(2) > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.cmp-container > div.cdwgridlayout:nth-of-type(1)",
        style: null,
        blocks: ["hero"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Why CDW intro",
        selector: "#content > div:nth-of-type(2) > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.cmp-container > div.cdwgridlayout:nth-of-type(2)",
        style: null,
        blocks: [],
        defaultContent: ["#content > div:nth-of-type(2) > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.cmp-container > div.cdwgridlayout:nth-of-type(2)"]
      },
      {
        id: "section-3",
        name: "Designed for Every Stage cards",
        selector: "#content > div:nth-of-type(2) > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.cmp-container > div.cdwgridlayout:nth-of-type(3)",
        style: null,
        blocks: ["cards"],
        defaultContent: ["#content > div:nth-of-type(2) > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.cmp-container > div.cdwgridlayout:nth-of-type(3) .cdwheadlineatom"]
      },
      {
        id: "section-4",
        name: "Featured white paper banner",
        selector: "#content > div:nth-of-type(2) > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.cmp-container > div.cdwgridlayout:nth-of-type(4)",
        style: null,
        blocks: ["hero"],
        defaultContent: []
      },
      {
        id: "section-5",
        name: "How CDW Helps text cards",
        selector: "#content > div:nth-of-type(2) > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.cmp-container > div.cdwgridlayout:nth-of-type(5)",
        style: null,
        blocks: ["cards"],
        defaultContent: ["#content > div:nth-of-type(2) > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.cmp-container > div.cdwgridlayout:nth-of-type(5) .cdwheadlineatom"]
      },
      {
        id: "section-6",
        name: "Insights articles",
        selector: "#content > div:nth-of-type(2) > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.cmp-container > div.cdwgridlayout:nth-of-type(6)",
        style: null,
        blocks: ["related-articles"],
        defaultContent: ["#content > div:nth-of-type(2) > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.cmp-container > div.cdwgridlayout:nth-of-type(6) .cdwheadlineatom"]
      },
      {
        id: "section-7",
        name: "Partner logos",
        selector: "#content > div:nth-of-type(2) > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.cmp-container > div.cdwgridlayout:nth-of-type(7)",
        style: null,
        blocks: ["columns"],
        defaultContent: ["#content > div:nth-of-type(2) > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.cmp-container > div.cdwgridlayout:nth-of-type(7) .cdwheadlineatom"]
      },
      {
        id: "section-8",
        name: "Request an AI Assessment CTA",
        selector: "#content > div:nth-of-type(2) > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.cmp-container > div.cdwgridlayout:nth-of-type(8)",
        style: "highlight",
        blocks: ["form"],
        defaultContent: ["#content > div:nth-of-type(2) > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.cmp-container > div.cdwgridlayout:nth-of-type(8) .cdwheadlineatom"]
      }
    ]
  };
  var transformers = [
    transform,
    transform2,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform3] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), { template: PAGE_TEMPLATE });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document2, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document2.querySelectorAll(selector);
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_artificial_intelligence_ai_default = {
    transform: (payload) => {
      const {
        document: document2,
        url,
        html,
        params
      } = payload;
      const main = document2.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document2, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        if (!block.element.parentNode) return;
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document: document2, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        } else {
          console.warn(`No parser found for block: ${block.name}`);
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document2.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document2);
      WebImporter.rules.transformBackgroundImages(main, document2);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const rawPath = new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html?$/, "");
      const path = WebImporter.FileUtils.sanitizePath(rawPath === "" ? "/index" : rawPath);
      return [{
        element: main,
        path,
        report: {
          title: document2.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_artificial_intelligence_ai_exports);
})();
