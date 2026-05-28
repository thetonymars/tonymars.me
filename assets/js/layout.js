/* assets/js/layout.js — single source for the shared header, footer, and tracking.
 * Edit only the EDIT blocks below; changes apply to every page that loads this file.
 * Full usage (how to wire a page, placeholders, deploy) is in AGENTS.md. */

/* ============================ EDIT BELOW ============================ */

/* Shared menu (placeholder — replace links as needed). */
const MENU_HTML = `
  <header class="site-header">
    <a class="site-logo" href="/">TONY MARS</a>
    <nav class="site-nav">
      <a href="/">Home</a>
    </nav>
  </header>`;

/* Shared footer (placeholder). */
const FOOTER_HTML = `
  <footer class="site-footer">
    <span>© 2026 Tony Mars</span>
    <a href="/privacy">Privacy Policy</a>
    <a href="/terms">Terms of Service</a>
    <a href="/refund">Refund Policy</a>
  </footer>`;

/* Tracking that goes into <head> — e.g. Google Tag Manager head snippet,
 * Meta Pixel base code, analytics. Paste between the backticks. Empty = nothing. */
const TRACKING_HEAD = ``;

/* Tracking that goes right after <body> opens — e.g. GTM <noscript>,
 * other body-level pixels. Paste between the backticks. Empty = nothing. */
const TRACKING_BODY = ``;

/* ============================ END EDIT ============================ */

(function () {
  // Inject an HTML string, re-creating <script> tags so they actually execute.
  function inject(target, where, html) {
    if (!html || !html.trim()) return;
    const tpl = document.createElement("template");
    tpl.innerHTML = html.trim();
    const frag = document.createDocumentFragment();
    tpl.content.childNodes.forEach((node) => {
      if (node.nodeName === "SCRIPT") {
        const s = document.createElement("script");
        for (const a of node.attributes) s.setAttribute(a.name, a.value);
        s.textContent = node.textContent;
        frag.appendChild(s);
      } else {
        frag.appendChild(node.cloneNode(true));
      }
    });
    if (where === "prepend") target.insertBefore(frag, target.firstChild);
    else target.appendChild(frag);
  }

  inject(document.head, "append", TRACKING_HEAD);
  inject(document.body, "prepend", TRACKING_BODY);

  const header = document.querySelector('[data-include="header"]');
  if (header) header.outerHTML = MENU_HTML;
  const footer = document.querySelector('[data-include="footer"]');
  if (footer) footer.outerHTML = FOOTER_HTML;
})();
