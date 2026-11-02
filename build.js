/* Genera le pagine HTML del sito in ./site partendo dalle traduzioni in site/assets/js/i18n.js.
   Uso: node build.js — una pagina vera per lingua: italiano alla radice (stessi URL del vecchio sito),
   inglese, francese e spagnolo in /en/, /fr/, /es/, collegate con hreflang. */
const fs = require("fs");
const path = require("path");
const I18N = require("./site/assets/js/i18n.js");

const OUT = path.join(__dirname, "site");
const EN = I18N.dict.en;
const LEGAL = require("./site/assets/js/i18n-legal.js");
for (const k in LEGAL) I18N.langs.forEach((l, i) => (I18N.dict[l][k] = LEGAL[k][i]));
const YEAR = new Date().getFullYear();

const SITE = "https://www.marylongoweddingplanner.it";
const LANGS = ["it", "en", "fr", "es"];
const LOCALE = { it: "it_IT", en: "en_GB", fr: "fr_FR", es: "es_ES" };
let L = "it"; // lingua della pagina in costruzione

/* ---------- helpers ---------- */
function t(k) {
  if (!(k in EN)) throw new Error("Chiave di traduzione mancante: " + k);
  const v = I18N.dict[L][k];
  return v == null || v === "" ? EN[k] : v;
}
/* percorsi: "/chi-sono" → "/chi-sono" (it), "/en/chi-sono" (en)…; la home inglese è "/en/" */
const pre = (l = L) => (l === "it" ? "" : "/" + l);
const urlFor = (p, l = L) => pre(l) + p;
const alts = (p) => Object.fromEntries(LANGS.map((l) => [l, urlFor(p, l)]));
const tag = (name, key, attrs = "") => `<${name} data-i18n="${key}"${attrs ? " " + attrs : ""}>${t(key)}</${name}>`;
const img = (f) => `/assets/img/${f}`;
/* CSS e JS con ?v=<hash del contenuto>: Netlify li fa tenere in cache 7 giorni (netlify.toml),
   così a ogni modifica i browser scaricano subito la versione nuova */
const asset = (f) => `/assets/${f}?v=${require("crypto").createHash("md5").update(fs.readFileSync(path.join(OUT, "assets", f))).digest("hex").slice(0, 8)}`;

/* Foto: catalogo generato da tools/images.js (id numerico → file ottimizzato) */
const PHOTOS = require("./tools/photos.json");
const photo = (id) => {
  const p = PHOTOS.find((x) => x.id === id);
  if (!p) throw new Error("Foto inesistente: " + id);
  return p;
};
const sm = (id) => `/assets/img/foto/${photo(id).file}-sm.webp`;  // miniatura (lato lungo 900px)
const ph = (id) => `/assets/img/foto/${photo(id).file}.webp`;     // risoluzione nativa (max 2048px)
const hd = (id) => `/assets/img/foto/${photo(id).file}${photo(id).hd ? "@2x" : ""}.webp`; // sfondi grandi e lightbox
const ratio = (id) => photo(id).w / photo(id).h;

const PHONE = "+39 338 7441562";
const TEL = "tel:+393387441562";
const MAIL = "info@marylongoweddingplanner.it";
const WA = "https://api.whatsapp.com/send?phone=393387441562";
const IG = "https://www.instagram.com/mary_longo_wp/";
const FB = "https://www.facebook.com/marylongowp";
const MC = "https://www.matrimonio.com/wedding-planner/love-is-love--e167505";
const ADDRESS = "Via Pistoia 8, 73100 Lecce";

const ICON = {
  globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 2.6 3.9 5.6 3.9 9s-1.3 6.4-3.9 9c-2.6-2.6-3.9-5.6-3.9-9S9.4 5.6 12 3Z"/></svg>',
  chev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M4 12h16M14 6l6 6-6 6"/></svg>',
  up: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6"/></svg>',
  wa: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm5.8 14.03c-.24.68-1.42 1.3-1.95 1.34-.5.05-.97.23-3.27-.68-2.77-1.09-4.52-3.93-4.66-4.11-.13-.18-1.11-1.48-1.11-2.82s.7-2 .95-2.27c.25-.27.54-.34.72-.34h.52c.17 0 .39-.01.6.46.23.52.77 1.84.84 1.97.07.14.11.3.02.48-.09.18-.14.3-.27.46-.14.16-.29.36-.41.48-.14.14-.28.28-.12.56.16.27.71 1.17 1.52 1.9 1.05.93 1.93 1.22 2.2 1.36.27.14.43.11.59-.07.16-.18.68-.79.86-1.07.18-.27.36-.23.61-.14.25.09 1.59.75 1.86.89.27.14.45.2.52.32.07.11.07.66-.17 1.34Z"/></svg>',
  ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
  fb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M15 3h-3a4 4 0 0 0-4 4v3H5v4h3v7h4v-7h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M12 20s-7-4.4-9.2-8.2C1.3 9 2.7 6 5.5 6c1.7 0 3 .9 3.6 2 .6-1.1 1.9-2 3.6-2 2.8 0 4.2 3 2.7 5.8C19 15.6 12 20 12 20Z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
  camera: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true"><rect x="5" y="13" width="38" height="26" rx="3"/><path d="M16 13l3-5h10l3 5"/><circle cx="24" cy="26" r="8"/><circle cx="24" cy="26" r="4.5"/><circle cx="37" cy="18.5" r="1.2"/></svg>',
  rings: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true"><circle cx="18" cy="29" r="11"/><circle cx="30" cy="29" r="11"/><path d="M30 18l-4-4 4-5 4 5z"/><path d="M26 14h8"/></svg>',
  glasses: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true"><g transform="rotate(-12 17 24)"><path d="M12 6h9l-1 13a3.5 3.5 0 0 1-7 0z"/><path d="M16.5 22.5V40M12 40h9M12.6 12h7.8"/></g><g transform="rotate(12 31 24)"><path d="M27 6h9l-1 13a3.5 3.5 0 0 1-7 0z"/><path d="M31.5 22.5V40M27 40h9M27.6 12h7.8"/></g><path d="M22 4l2-2M24 6h3M26 1l1-1" /></svg>',
};

const NAV = [
  { href: "/", key: "home", id: "home" },
  { href: "/chi-sono", key: "about", id: "about" },
  { href: "/wedding", key: "wedding", id: "wedding" },
  { href: "/eventi", key: "events", id: "events" },
  { href: "/real-wedding", key: "portfolio", id: "rw" },
  { href: "/guide", key: "guide", id: "guide" },
  { href: "/faq", key: "faq", id: "faq" },
  { href: "/contatti", key: "contact", id: "contact" },
];

const navItem = (n, active) =>
  `<a class="nav__a${n.id === active ? " is-active" : ""}" href="${n.href}">${tag("span", "nav." + n.key)}${tag("small", "nav." + n.key + ".sub")}</a>`;

/* Cambio lingua: link alla stessa pagina nelle altre lingue (ALT è impostato da layout).
   "@/" evita che il prefisso di lingua venga aggiunto di nuovo in prefixLinks(). */
const LANG_NAME = { it: "Italiano", en: "English", fr: "Français", es: "Español" };
let LANG_ALT = {};
const langLink = (l, inner, cls = "") =>
  `<a href="@${LANG_ALT[l]}" hreflang="${l}" lang="${l}"${l === L ? ` class="is-active${cls}" aria-current="page"` : cls ? ` class="${cls.trim()}"` : ""}>${inner}</a>`;
const langSwitch = (extra = "") => `
      <div class="lang ${extra}" data-lang>
        <button class="lang__btn" type="button" aria-haspopup="true" aria-expanded="false" aria-label="${t("ui.language")}">${ICON.globe}<span class="lang__cur">${L.toUpperCase()}</span>${ICON.chev}</button>
        <ul class="lang__menu">
          ${LANGS.map((l) => `<li>${langLink(l, `<b>${l.toUpperCase()}</b>${LANG_NAME[l]}`)}</li>`).join("\n          ")}
        </ul>
      </div>`;

function header(active) {
  return `
  <a class="sidetab" href="/contatti" data-i18n="cta.book">${t("cta.book")}</a>

  <header class="hdr">
    <div class="hdr__in">
      <button class="burger" type="button" data-menu-open data-i18n-attr="aria-label:ui.menu" aria-label="${t("ui.menu")}"><i></i><i></i><i></i></button>
      <nav class="nav nav--l" aria-label="Menu">
        ${NAV.slice(0, 4).map((n) => navItem(n, active)).join("\n        ")}
      </nav>
      <a class="brand" href="/" aria-label="Mary Longo Wedding Planner — Home"><img src="${img("logo-maria-longo.jpg")}" srcset="${img("logo-maria-longo.jpg")} 1x, ${img("logo-maria-longo@2x.jpg")} 2x" alt="Mary Longo Wedding Planner" width="281" height="170"></a>
      <nav class="nav nav--r" aria-label="Menu">
        ${NAV.slice(4).map((n) => navItem(n, active)).join("\n        ")}
      </nav>
      ${langSwitch()}
    </div>
  </header>

  <div class="mnav" aria-hidden="true">
    <div class="mnav__top">
      <img src="${img("logo-maria-longo.jpg")}" srcset="${img("logo-maria-longo.jpg")} 1x, ${img("logo-maria-longo@2x.jpg")} 2x" alt="Mary Longo Wedding Planner" width="281" height="170">
      <button class="mnav__close" type="button" data-menu-close data-i18n-attr="aria-label:ui.close" aria-label="${t("ui.close")}"><i></i><i></i></button>
    </div>
    <nav class="mnav__list">
      ${NAV.map((n) => navItem(n, active)).join("\n      ")}
    </nav>
    <div class="mnav__langs">
      ${LANGS.map((l) => langLink(l, LANG_NAME[l])).join("\n      ")}
    </div>
    <div class="mnav__meta"><a href="${TEL}">${PHONE}</a><a href="mailto:${MAIL}">${MAIL}</a></div>
  </div>`;
}

function footer() {
  return `
  <footer class="ft">
    <div class="ft__in">
      <span class="orn" aria-hidden="true"></span>
      <a class="ft__logo" href="/"><img src="${img("logo-maria-longo.jpg")}" srcset="${img("logo-maria-longo.jpg")} 1x, ${img("logo-maria-longo@2x.jpg")} 2x" alt="Mary Longo Wedding Planner" width="281" height="170" loading="lazy"></a>
      ${tag("p", "foot.tagline", 'class="ft__tag"')}
      <div class="ft__cols">
        <div>
          ${tag("h3", "foot.contacts")}
          <p>${ADDRESS}</p>
          <p><a href="${TEL}">${PHONE}</a></p>
          <p><a href="mailto:${MAIL}">${MAIL}</a></p>
        </div>
        <div>
          ${tag("h3", "foot.hours")}
          ${tag("p", "foot.hours.week")}
          ${tag("p", "foot.hours.sat")}
        </div>
        <div>
          ${tag("h3", "foot.follow")}
          <div class="ft__social">
            <a href="${IG}" target="_blank" rel="noopener" aria-label="Instagram">${ICON.ig}</a>
            <a href="${FB}" target="_blank" rel="noopener" aria-label="Facebook">${ICON.fb}</a>
            <a href="${WA}" target="_blank" rel="noopener" aria-label="WhatsApp">${ICON.wa}</a>
            <a href="${MC}" target="_blank" rel="noopener" aria-label="Matrimonio.com">${ICON.heart}</a>
          </div>
        </div>
      </div>
      <nav class="ft__nav" aria-label="Footer">
        ${NAV.slice(1).map((n) => `<a href="${n.href}" data-i18n="nav.${n.key === "faq" ? "faq.long" : n.key}">${t("nav." + (n.key === "faq" ? "faq.long" : n.key))}</a>`).join("\n        ")}
      </nav>
    </div>
    <div class="ft__bottom">
      <span>&copy; ${YEAR} Mary Longo Wedding Planner · <span data-i18n="foot.rights">${t("foot.rights")}</span></span>
      <span class="ft__legal"><a href="/privacy" data-i18n="foot.privacy">${t("foot.privacy")}</a> · <a href="/cookie-policy" data-i18n="foot.cookie">${t("foot.cookie")}</a> · <button type="button" class="linkbtn" data-cc-open data-i18n="cc.open">${t("cc.open")}</button></span>
      <span><span data-i18n="foot.vat">${t("foot.vat")}</span> 03623540755 · ${ADDRESS}</span>
    </div>
  </footer>

  <div class="floaters">
    <button class="totop" type="button" data-totop data-i18n-attr="aria-label:ui.top" aria-label="${t("ui.top")}">${ICON.up}</button>
    <a class="wa" href="${WA}" target="_blank" rel="noopener" aria-label="WhatsApp">${ICON.wa}</a>
  </div>`;
}

/* Banner cookie (GDPR / linee guida Garante): rifiuto facile quanto l accettazione, X = rifiuta */
function cookieBanner() {
  return `
  <div class="cc" role="dialog" aria-modal="false" aria-labelledby="cc-title" hidden>
    <div class="cc__box">
      <button class="cc__x" type="button" data-cc="reject" data-i18n-attr="aria-label:cc.close" aria-label="${t("cc.close")}"><i></i><i></i></button>
      <p class="cc__title" id="cc-title" data-i18n="cc.title">${t("cc.title")}</p>
      <p class="cc__text" data-i18n="cc.text">${t("cc.text")}</p>
      <div class="cc__prefs" hidden>
        <label class="cc__opt"><input type="checkbox" checked disabled><span><b data-i18n="cc.nec">${t("cc.nec")}</b><small data-i18n="cc.necD">${t("cc.necD")}</small></span></label>
        <label class="cc__opt"><input type="checkbox" data-cc-ext><span><b data-i18n="cc.ext">${t("cc.ext")}</b><small data-i18n="cc.extD">${t("cc.extD")}</small></span></label>
      </div>
      <div class="cc__btns">
        <button class="btn btn--sm" type="button" data-cc="custom" data-i18n="cc.custom">${t("cc.custom")}</button>
        <button class="btn btn--sm" type="button" data-cc="save" data-i18n="cc.save" hidden>${t("cc.save")}</button>
        <button class="btn btn--dark btn--sm" type="button" data-cc="reject" data-i18n="cc.reject">${t("cc.reject")}</button>
        <button class="btn btn--dark btn--sm" type="button" data-cc="accept" data-i18n="cc.accept">${t("cc.accept")}</button>
      </div>
    </div>
  </div>`;
}

/* Intro della home: il logo si apre, occhiello tra due filetti, barra di avanzamento; poi due pannelli si aprono.
   Compare una volta per sessione (classe intro-on messa dallo script in <head>), clic per saltarla. */
const INTRO_HEAD = `
  <script>try{if(!sessionStorage.getItem("ml-intro"))document.documentElement.className+=" intro-on"}catch(e){}</script>`;
const intro = () => `
  <div class="intro" data-intro hidden>
    <div class="intro__panel intro__panel--top" aria-hidden="true"></div>
    <div class="intro__panel intro__panel--bot" aria-hidden="true"></div>
    <div class="intro__in">
      <img class="intro__logo" src="${img("logo-maria-longo@2x.jpg")}" alt="Mary Longo Wedding Planner" width="562" height="340">
      <p class="intro__tag"><span class="intro__rule" aria-hidden="true"></span><span>${t("intro.tag")}</span><span class="intro__rule" aria-hidden="true"></span></p>
    </div>
    <span class="intro__bar" aria-hidden="true"><i></i></span>
    <button class="intro__skip" type="button">${t("ui.skip")}</button>
  </div>`;

/* attributi HTML: escape minimo per i testi messi dentro content="" */
const faqText = (s) => String(s).replace(/<[^>]+>/g, "");
const attr = (s) => String(s).replace(/<[^>]+>/g, "").replace(/&(?!\w+;)/g, "&amp;").replace(/"/g, "&quot;");
const ldScript = (o) => `\n  <script type="application/ld+json">${JSON.stringify(o).replace(/</g, "\\u003c")}</script>`;

/* slug: percorso italiano della pagina (stesso nelle altre lingue) oppure alt: { it, en, fr, es } già completi.
   title/desc: testi già tradotti (altrimenti chiavi <page>.metaTitle / <page>.metaDesc). ld: oggetti JSON-LD */
function layout({ page, slug, alt, title, desc, image, active, bodyClass = "", head = "", pre = "", body, ld = [] }) {
  LANG_ALT = alt || alts(slug);
  const T = title || t(page + ".metaTitle");
  const DSC = desc || t(page + ".metaDesc");
  const canon = SITE + LANG_ALT[L];
  const ogImg = SITE + (image || hd(42));
  const MSG = Object.fromEntries(["form.err", "form.sending", "form.ok", "form.fail"].map((k) => [k, t(k)]));
  return `<!doctype html>
<html lang="${L}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${attr(T)}</title>
  <meta name="description" content="${attr(DSC)}">
  <meta name="robots" content="index,follow,max-image-preview:large">
  <link rel="canonical" href="${canon}">
${LANGS.map((l) => `  <link rel="alternate" hreflang="${l}" href="${SITE + LANG_ALT[l]}">`).join("\n")}
  <link rel="alternate" hreflang="x-default" href="${SITE + LANG_ALT.en}">
  <meta name="author" content="Mary Longo">
  <meta name="geo.region" content="IT-75">
  <meta name="geo.placename" content="Lecce, Puglia, Italia">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Mary Longo Wedding Planner">
  <meta property="og:locale" content="${LOCALE[L]}">
${LANGS.filter((l) => l !== L).map((l) => `  <meta property="og:locale:alternate" content="${LOCALE[l]}">`).join("\n")}
  <meta property="og:url" content="${canon}">
  <meta property="og:title" content="${attr(T)}">
  <meta property="og:description" content="${attr(DSC)}">
  <meta property="og:image" content="${ogImg}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="theme-color" content="#ffffff">
  <link rel="icon" type="image/png" sizes="32x32" href="${img("msn-150x150.png")}">
  <link rel="icon" type="image/png" sizes="192x192" href="${img("msn-300x300.png")}">
  <link rel="apple-touch-icon" href="${img("msn-300x300.png")}">
  <link rel="preload" href="/assets/fonts/jost-300-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/assets/fonts/cormorant-upright-300-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="${asset("css/fonts.css")}">
  <link rel="stylesheet" href="${asset("css/style.css")}">${head}${ld.map(ldScript).join("")}
  <script>window.ML_MSG=${JSON.stringify(MSG)}</script>
</head>
<body class="${bodyClass}">${pre}
${header(active)}

  <main id="main">
${body}
  </main>
${footer()}

  <div class="lb" aria-hidden="true">
    <button class="lb__close" type="button" data-i18n-attr="aria-label:ui.close" aria-label="${t("ui.close")}"><i></i><i></i></button>
    <button class="lb__nav lb__prev" type="button" data-i18n-attr="aria-label:ui.prev" aria-label="${t("ui.prev")}">${ICON.arrow}</button>
    <img alt="">
    <button class="lb__nav lb__next" type="button" data-i18n-attr="aria-label:ui.next" aria-label="${t("ui.next")}">${ICON.arrow}</button>
    <span class="lb__count"></span>
    <p class="lb__cap" aria-live="polite"></p>
  </div>

${cookieBanner()}

  <script src="${asset("js/main.js")}"></script>
</body>
</html>
`;
}

/* ---------- blocchi riutilizzabili ---------- */
const shead = (kicker, title, { h = "h2", cls = "" } = {}) => `
      <div class="shead ${cls}">
        <span class="orn" aria-hidden="true"></span>
        ${tag("span", kicker, 'class="kicker"')}
        ${tag(h, title, 'class="stitle"')}
      </div>`;

const btn = (href, key, cls = "btn", ext = false) =>
  `<a class="${cls}" href="${href}"${ext ? ' target="_blank" rel="noopener"' : ""} data-i18n="${key}">${t(key)}</a>`;

const pageHero = (image, kicker, title, pos = "center") => `
    <section class="phero">
      <div class="phero__bg" style="background-image:url('${hd(image)}');background-position:${pos}"></div>
      <div class="phero__in">
        ${tag("span", kicker, 'class="kicker kicker--light"')}
        ${tag("h1", title, 'class="phero__title"')}
      </div>
    </section>`;

const ctaBand = (image, titleKey, textKey) => `
    <section class="band">
      <div class="band__bg" style="background-image:url('${hd(image)}')"></div>
      <div class="band__in reveal">
        <span class="orn orn--light" aria-hidden="true"></span>
        ${tag("span", "cta.contactMe", 'class="kicker kicker--light"')}
        ${tag("h2", titleKey, 'class="band__title"')}
        ${tag("p", textKey)}
        <div class="btn-row">
          ${btn("/contatti", "cta.book", "btn btn--light")}
          <a class="btn btn--ghost-light" href="${TEL}" data-i18n="cta.call">${t("cta.call")}</a>
        </div>
      </div>
    </section>`;

function contactForm() {
  return `
        <form class="form" name="contatti" method="POST" action="/contatti" data-netlify="true" netlify-honeypot="bot-field" novalidate>
          <input type="hidden" name="form-name" value="contatti">
          <input type="hidden" name="lingua" value="${L}">
          <p class="hp"><label>Bot <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>
          <div class="form__row">
            <div class="f"><input id="f-nome" name="nome" type="text" autocomplete="name" placeholder=" " required><label for="f-nome"><span data-i18n="form.name">${t("form.name")}</span> *</label></div>
            <div class="f"><input id="f-email" name="email" type="email" autocomplete="email" placeholder=" " required><label for="f-email"><span data-i18n="form.email">${t("form.email")}</span> *</label></div>
          </div>
          <div class="f"><input id="f-tel" name="telefono" type="tel" autocomplete="tel" placeholder=" "><label for="f-tel" data-i18n="form.phone">${t("form.phone")}</label></div>
          <div class="f f--area"><textarea id="f-msg" name="messaggio" rows="4" required data-i18n-attr="placeholder:form.msgPh" placeholder="${t("form.msgPh")}"></textarea><label for="f-msg"><span data-i18n="form.msg">${t("form.msg")}</span> *</label></div>
          <label class="check"><input name="privacy" type="checkbox" required><span><span data-i18n="form.privacy">${t("form.privacy")}</span> *</span></label>
          <div class="form__foot">
            <button class="btn" type="submit" data-i18n="form.submit">${t("form.submit")}</button>
            ${tag("small", "form.required", 'class="form__req"')}
          </div>
          <p class="form__status" role="status" aria-live="polite"></p>
        </form>`;
}

const quickContacts = () => `
          <ul class="quick">
            <li>${ICON.phone}<div>${tag("span", "contact.phone", 'class="k"')}<a class="v" href="${TEL}">${PHONE}</a></div></li>
            <li>${ICON.wa}<div><span class="k">WhatsApp</span><a class="v" href="${WA}" target="_blank" rel="noopener" data-i18n="contact.wa">${t("contact.wa")}</a></div></li>
            <li>${ICON.mail}<div>${tag("span", "contact.email", 'class="k"')}<a class="v" href="mailto:${MAIL}">${MAIL}</a></div></li>
            <li>${ICON.pin}<div>${tag("span", "contact.address", 'class="k"')}<span class="v">${ADDRESS}</span></div></li>
          </ul>`;

/* Matrimoni: ogni foto appartiene al proprio matrimonio; la prima è la copertina.
   L'ordine dell'elenco è quello di visualizzazione (e dei numeri romani); n resta fisso perché è nell'URL. */
const PROJECTS = [
  { n: 7, isNew: true, strip: [142, 141, 148, 154], key: "rw.masseria", text: "rw.masseria.text", pos: "center 55%", photos: [151, 150, 131, 134, 138, 132, 136, 135, 137, 133, 139, 130, 143, 129, 140, 142, 152, 141, 153, 144, 145, 148, 146, 149, 147, 154] },
  { n: 8, isNew: true, strip: [159, 162, 169, 167], key: "rw.church", text: "rw.church.text", pos: "center 40%", photos: [155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 174, 166, 167, 168, 169, 170, 171, 172, 173, 165, 175, 176, 177] },
  { n: 1, key: "rw.salento", text: "rw.salento.text", pos: "center 62%", photos: [121, 64, 62, 63, 61, 65, 68, 87, 67, 72, 76, 86, 66, 69, 88, 70, 93, 95, 84, 71, 89, 73, 96, 92, 74, 75, 94, 77, 80, 99, 78, 79, 91, 81, 90, 85, 117, 109, 128, 105, 119, 114, 122, 110, 98, 97, 101, 106, 107, 115, 102, 103, 108, 104, 113, 124, 100, 111, 82, 112, 116, 123, 118] },
  { n: 2, key: "rw.w1", text: "rw.w1.text", pos: "center 40%", photos: [17, 18, 20, 16, 22, 25, 28, 14, 31, 24, 27, 15, 8, 13] },
  { n: 3, key: "rw.w2", text: "rw.w2.text", pos: "center 60%", photos: [6, 36, 40, 42, 26, 10, 30, 29, 37, 32, 2, 35, 21, 23, 19, 33, 12, 5, 9, 11, 34, 7] },
  { n: 4, key: "rw.w3", text: "rw.w3.text", pos: "center 35%", photos: [38, 43, 45, 41, 44, 46, 48, 47] },
  { n: 5, key: "rw.w4", text: "rw.w4.text", pos: "center 50%", photos: [51, 53, 50, 54, 49, 55, 56, 39, 52, 4] },
  { n: 6, key: "rw.w5", text: "rw.w5.text", pos: "center 45%", photos: [58, 59, 57, 60] },
];
const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
PROJECTS.forEach((p, i) => (p.roman = ROMAN[i]));
const MARY = 178; // ritratto di Mary Longo
/* didascalie delle foto (content/captions.js): [it, en, fr, es] */
const CAPTIONS = require("./content/captions.js");
const cap = (id) => (CAPTIONS[id] ? CAPTIONS[id][LANGS.indexOf(L)] : "");
const ALT = "Real Wedding — Mary Longo Wedding Planner";

/* Griglia portfolio (3 colonne, la prima copertina occupa 2x2): l'ultima si allarga
   quanto serve per chiudere la riga — nessuna casella vuota */
const pfFill = (3 - ((4 + PROJECTS.length - 1) % 3)) % 3;
const pfCls = (i) => (i === 0 ? " pf__item--big" : i === PROJECTS.length - 1 && pfFill ? ` pf__item--x${pfFill + 1}` : "");
const portfolioGrid = () => `
        <div class="pf">
          ${PROJECTS.map((p, i) => `
          <a class="pf__item${pfCls(i)} reveal d${(i % 3) + 1}" href="/real-wedding-${p.n}">
            <img src="${i === 0 ? ph(p.photos[0]) : sm(p.photos[0])}" alt="${ALT} — ${t(p.key)}" loading="lazy" decoding="async" style="object-position:${p.pos}">
            <span class="pf__cap">
              <span class="pf__k">${p.isNew ? `<em class="pf__new">${t("rw.new")}</em>` : ""}Real Wedding · ${p.roman}</span>
              ${tag("span", p.key, 'class="pf__t"')}
              <span class="pf__l"><span data-i18n="pf.discover">${t("pf.discover")}</span> · ${p.photos.length} <span data-i18n="rw.photos">${t("rw.photos")}</span></span>
            </span>
          </a>`).join("")}
        </div>`;

/* ---------- Guide (content/guide.js): pagine-risposta per Google e assistenti AI ---------- */
const GUIDE = require("./content/guide.js");
const G = (o) => o[L] || o.en;
const guideAlt = (g) => Object.fromEntries(LANGS.map((l) => [l, pre(l) + g.slug[l]]));
const guideById = (id) => GUIDE.guides.find((g) => g.id === id);
const guideBody = (g) => G(g.body).replace(/\{\{g:(\w+)\}\}/g, (m, id) => guideById(id).slug[L]);

const guideCards = (list) => `
        <div class="gcards">
          ${list.map((g, i) => `
          <a class="gcard reveal d${(i % 3) + 1}" href="${g.slug[L]}">
            <span class="gcard__media"><img src="${sm(g.img)}" alt="" loading="lazy" decoding="async"><span class="gcard__no">${String(GUIDE.guides.indexOf(g) + 1).padStart(2, "0")}</span></span>
            <span class="gcard__t"><span>${G(g.title)}</span></span>
            <span class="gcard__d">${G(g.desc)}</span>
            <span class="gcard__l">${G(GUIDE.hub.read)} ${ICON.arrow}</span>
          </a>`).join("")}
        </div>`;

const guideTeaser = () => `
    <section class="sec">
      <div class="wrap">
        <div class="shead reveal"><span class="orn" aria-hidden="true"></span><span class="kicker">${G(GUIDE.hub.kicker)}</span><h2 class="stitle">${G(GUIDE.hub.teaserTitle)}</h2></div>
        ${guideCards(GUIDE.guides.slice(0, 3))}
        <div class="center reveal" style="margin-top:22px"><a class="btn" href="/guide">${G(GUIDE.hub.teaserBtn)}</a></div>
      </div>
    </section>`;

function guidePages() {
  const out = {};
  const H = GUIDE.hub;
  out["guide.html"] = layout({
    page: "guide",
    slug: "/guide",
    title: G(H.title),
    desc: G(H.desc),
    active: "guide",
    ld: [
      CRUMBS([[t("nav.guide"), "/guide"]]),
      { "@context": "https://schema.org", "@type": "CollectionPage", name: faqText(G(H.h1)), description: G(H.desc), inLanguage: L,
        hasPart: GUIDE.guides.map((g) => ({ "@type": "Article", headline: G(g.title), url: SITE + pre() + g.slug[L] })) },
    ],
    body: `
    <section class="phero">
      <div class="phero__bg" style="background-image:url('${hd(155)}');background-position:center 40%"></div>
      <div class="phero__in">
        <span class="kicker kicker--light">${G(H.kicker)}</span>
        <h1 class="phero__title">${G(H.h1)}</h1>
      </div>
    </section>

    <section class="sec">
      <div class="wrap">
        <p class="lead center reveal">${G(H.lead)}</p>
        ${guideCards(GUIDE.guides)}
      </div>
    </section>
${ctaBand(24, "cta.dream", "contact.lead")}`,
  });

  for (const g of GUIDE.guides) {
    const others = GUIDE.guides.filter((x) => x !== g);
    const rel = (g.related || []).map((n) => PROJECTS.find((p) => p.n === n)).filter(Boolean);
    out[g.slug[L].slice(1) + ".html"] = layout({
      page: "guide",
      alt: guideAlt(g),
      title: `${G(g.title)} | Mary Longo`,
      desc: G(g.desc),
      image: hd(g.img),
      active: "guide",
      ld: [
        CRUMBS([[t("nav.guide"), "/guide"], [G(g.title), g.slug[L]]]),
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: G(g.title),
          description: G(g.desc),
          abstract: faqText(G(g.short)),
          image: SITE + hd(g.img),
          inLanguage: L,
          datePublished: GUIDE.UPDATED,
          dateModified: GUIDE.UPDATED,
          author: { "@id": MARY_ID, "@type": "Person", name: "Mary Longo", url: SITE + urlFor("/chi-sono") },
          publisher: { "@id": BIZ_ID, "@type": "Organization", name: "Mary Longo Wedding Planner", logo: SITE + img("logo-maria-longo@2x.jpg") },
          mainEntityOfPage: SITE + pre() + g.slug[L],
          about: ["Wedding", "Puglia", "Salento"],
        },
      ],
      body: `
    <section class="phero phero--guide">
      <div class="phero__bg" style="background-image:url('${hd(g.img)}');background-position:center 45%"></div>
      <div class="phero__in">
        <a class="kicker kicker--light" href="/guide">${G(H.kicker)}</a>
      </div>
    </section>

    <article class="sec legal guide">
      <div class="wrap wrap--narrow">
        <span class="orn orn--left" aria-hidden="true"></span>
        <h1 class="h-display guide__title">${G(g.title)}</h1>
        <p class="legal__date">${G(H.by)} · <time datetime="${GUIDE.UPDATED}">${G(H.updated)}</time></p>
        <div class="guide__short"><span class="kicker">${G(H.short)}</span><p>${G(g.short)}</p></div>
        <div class="legal__body guide__body">${guideBody(g)}</div>
        ${rel.length ? `
        <div class="guide__rel">
          <span class="kicker">Real Wedding</span>
          <div class="guide__relgrid">${rel.map((p) => `
            <a href="/real-wedding-${p.n}"><img src="${sm(p.photos[0])}" alt="${attr(t(p.key))}" loading="lazy" style="object-position:${p.pos}"><span>${t(p.key)}</span></a>`).join("")}
          </div>
        </div>` : ""}
        <div class="guide__cta">
          <h2>${G(H.cta)}</h2>
          <p>${G(H.ctaText)}</p>
          <div class="btn-row">${btn("/contatti", "cta.book", "btn btn--dark")}<a class="btn" href="${WA}" target="_blank" rel="noopener">WhatsApp</a></div>
        </div>
      </div>
    </article>

    <section class="sec sec--ivory">
      <div class="wrap">
        <div class="shead reveal"><span class="orn" aria-hidden="true"></span><h2 class="stitle">${G(H.more)}</h2></div>
        ${guideCards(others.slice(0, 3))}
      </div>
    </section>`,
    });
  }
  return out;
}

/* llms.txt: riassunto per gli assistenti AI (formato https://llmstxt.org) */
function llmsTxt() {
  const u = (p, l = "it") => SITE + urlFor(p, l);
  const gl = (l) => GUIDE.guides.map((g) => `- [${g.title[l]}](${SITE + pre(l) + g.slug[l]}): ${g.desc[l]}`).join("\n");
  return `# Mary Longo Wedding Planner

> Mary Longo is a wedding planner, event planner and wedding celebrant based in Lecce (Salento, Puglia, Italy). She plans weddings, destination weddings for couples from abroad and private events across Lecce, Salento and the rest of Puglia, and officiates civil and symbolic ceremonies in Italian, English and French (Spanish, Russian and German with trusted partners).

Key facts:
- Business: Mary Longo Wedding Planner (also listed as "Love is Love – Mary Longo Wedding Planner"), Via Pistoia 8, 73100 Lecce, Italy. VAT IT03623540755.
- Experience: 25 years organising events, 10 years as a wedding planner and celebrant.
- Languages: Italian, English, French.
- Services: full wedding planning, partial planning, on-the-day coordination, destination weddings in Puglia, civil and symbolic ceremonies (sand, light, tie-the-knot rituals), private and corporate events.
- Prices: wedding planning services start from about €1,200; supplier costs are separate.
- Area: Lecce, Salento (Otranto, Gallipoli, Santa Maria di Leuca, Nardò, Galatina), Brindisi, Ostuni and all of Puglia; nearest airport Brindisi (BDS), about 40 km from Lecce.
- Real weddings: a Los Angeles couple married in a real Salento town square (with the mayor's permission, pizzica and local food stalls); a Lithuanian couple in a masseria; church weddings in Baroque Lecce; quarry and seaside receptions.
- Contact: +39 338 7441562 (also WhatsApp), info@marylongoweddingplanner.it, Monday–Friday 9:00–18:30, Saturday 9:00–13:30.

## Main pages
- [Home (Italian)](${u("/")}) · [English](${u("/", "en")}) · [Français](${u("/", "fr")}) · [Español](${u("/", "es")})
- [About Mary Longo](${u("/chi-sono", "en")})
- [Wedding services](${u("/wedding", "en")})
- [Real weddings portfolio](${u("/real-wedding", "en")})
- [FAQ: costs, destination weddings, ceremonies, legal requirements](${u("/faq", "en")})
- [Contact](${u("/contatti", "en")})

## Guides (English)
${gl("en")}

## Guide (italiano)
${gl("it")}

## Optional
- [Matrimonio.com reviews](${MC})
- [Instagram](${IG})
- [Facebook](${FB})
`;
}

/* Recensioni degli sposi (testi originali del vecchio sito, in italiano; tradotte nelle altre lingue) */
const reviews = () => `
    <section class="sec sec--ivory revs">
      <div class="wrap">
        ${shead("rev.kicker", "rev.title", { cls: "reveal" })}
        <div class="revs__grid">
          ${[1, 2, 3].map((i) => `
          <figure class="rev reveal d${i}">
            <span class="rev__stars" aria-label="5/5">★★★★★</span>
            <blockquote>${t("rev." + i)}</blockquote>
            <figcaption>${t(`rev.${i}.who`)}</figcaption>
          </figure>`).join("")}
        </div>
        <p class="revs__foot reveal">${L !== "it" ? `<small>${t("rev.note")}</small> · ` : ""}<a href="${MC}/opinioni" target="_blank" rel="noopener">${t("rev.more")}</a></p>
      </div>
    </section>`;

/* titolo della hero: ogni parola in una maschera, sale con un piccolo ritardo (--i) */
const words = (txt) => String(txt).split(/\s+/).map((w, i) => `<span class="w"><span style="--i:${i}">${w}</span></span>`).join(" ");
const HERO_PETALS = [[8, 0, 14, 0.8], [22, 5, 17, 0.6], [37, 2, 15, 0.9], [55, 8, 18, 0.7], [68, 3, 16, 0.85], [82, 10, 19, 0.6], [93, 6, 15, 0.75]];

/* Ultimi matrimoni in evidenza in home: copertina grande, testo, quattro foto con didascalia */
const latestWeddings = () => `
    <section class="sec latest">
      <div class="wrap">
        ${shead("home.latest.kicker", "home.latest.title", { cls: "reveal" })}
        ${tag("p", "home.latest.lead", 'class="lead center reveal"')}
        ${PROJECTS.filter((p) => p.isNew).map((p, i) => `
        <article class="lt${i % 2 ? " lt--rev" : ""}">
          <a class="lt__media reveal reveal--img" href="/real-wedding-${p.n}">
            <img src="${ph(p.photos[0])}" alt="${attr(cap(p.photos[0]) || t(p.key))}" loading="lazy" decoding="async" style="object-position:${p.pos}">
            <span class="lt__badge">${t("rw.new")}</span>
          </a>
          <div class="lt__text">
            <span class="kicker reveal">Real Wedding · ${p.roman} · ${p.photos.length} ${t("rw.photos")}</span>
            <h3 class="lt__title reveal d1">${t(p.key)}</h3>
            <p class="reveal d2">${t(p.text)}</p>
            <div class="lt__strip">${(p.strip || p.photos.slice(1, 5)).map((id, j) => `
              <a class="lt__ph reveal d${(j % 3) + 1}" href="/real-wedding-${p.n}"><img src="${sm(id)}" alt="${attr(cap(id))}" loading="lazy" decoding="async"><span>${cap(id)}</span></a>`).join("")}
            </div>
            <a class="btn btn--dark btn--shine reveal" href="/real-wedding-${p.n}">${t("rw.see")} ${ICON.arrow}</a>
          </div>
        </article>`).join("")}
      </div>
    </section>`;

/* fascia che scorre con i luoghi del Salento */
const MQ = ["Lecce", "Salento", "Otranto", "Gallipoli", "Santa Maria di Leuca", "Ostuni", "Porto Cesareo", "Castro", "Nardò", "Puglia"];
const marquee = () => `
    <div class="mq" aria-hidden="true"><div class="mq__track">${[...MQ, ...MQ].map((n) => `<span>${n}</span><i>✦</i>`).join("")}</div></div>`;

/* ---------- dati strutturati (JSON-LD): stessa identità ovunque, così motori e AI la riconoscono ---------- */
const BIZ_ID = SITE + "/#business";
const MARY_ID = SITE + "/#mary-longo";
const AREAS = ["Lecce", "Salento", "Otranto", "Gallipoli", "Santa Maria di Leuca", "Nardò", "Galatina", "Brindisi", "Ostuni", "Puglia"];
const ORG = () => ({
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": BIZ_ID,
  name: "Mary Longo Wedding Planner",
  alternateName: ["Love is Love – Mary Longo Wedding Planner", "Mary Longo WP"],
  description: t("home.metaDesc"),
  url: SITE + urlFor("/"),
  image: SITE + hd(3),
  logo: SITE + img("logo-maria-longo@2x.jpg"),
  telephone: PHONE,
  email: MAIL,
  vatID: "IT03623540755",
  priceRange: "€€",
  address: { "@type": "PostalAddress", streetAddress: "Via Pistoia 8", addressLocality: "Lecce", postalCode: "73100", addressRegion: "Puglia", addressCountry: "IT" },
  geo: { "@type": "GeoCoordinates", latitude: 40.3529, longitude: 18.1743 },
  areaServed: [...AREAS.map((n) => ({ "@type": "Place", name: n })), { "@type": "Country", name: "Italia" }],
  knowsLanguage: ["it", "en", "fr"],
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "18:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "13:30" },
  ],
  sameAs: [FB, IG, MC],
  founder: { "@id": MARY_ID },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: t("home.svc.title"),
    itemListElement: ["svc.full", "svc.partial", "svc.dayof", "svc.destination", "svc.celebrant", "svc.events"].map((k) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: t(k), areaServed: "Puglia" } })),
  },
});
const PERSON = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": MARY_ID,
  name: "Mary Longo",
  givenName: "Maria",
  familyName: "Longo",
  jobTitle: t("person.job"),
  description: t("about.metaDesc"),
  image: SITE + ph(MARY),
  url: SITE + urlFor("/chi-sono"),
  worksFor: { "@id": BIZ_ID },
  workLocation: { "@type": "Place", name: "Lecce, Puglia, Italia" },
  knowsLanguage: ["it", "en", "fr"],
  knowsAbout: ["Wedding planning", "Destination weddings in Puglia", "Civil and symbolic wedding ceremonies", "Event planning", "Salento"],
  sameAs: [IG, FB, MC],
});
const WEBSITE = () => ({ "@context": "https://schema.org", "@type": "WebSite", url: SITE + urlFor("/"), name: "Mary Longo Wedding Planner", inLanguage: L, publisher: { "@id": BIZ_ID } });
const CRUMBS = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [[t("nav.home"), "/"], ...items].map(([name, p], i) => ({ "@type": "ListItem", position: i + 1, name: String(name).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(), item: SITE + urlFor(p) })),
});

/* ---------- pagine (costruite una volta per lingua) ---------- */
function buildPages() {
const pages = {};

const HERO = [
  [3, "home.hero.s1", "center 58%"],
];

pages["index.html"] = layout({
  page: "home",
  slug: "/",
  active: "home",
  bodyClass: "is-home",
  pre: intro(),
  ld: [ORG(), PERSON(), WEBSITE()],
  head: `${INTRO_HEAD}
  <link rel="preload" as="image" href="${hd(3)}" fetchpriority="high">`,
  body: `
    <!-- PRIMA SCHERMATA: hero + benvenuto, alti esattamente quanto lo schermo -->
    <div class="first">
    <section class="hero">
      <div class="hero__slides">${HERO.map(([f, , pos], i) => `
        <div class="hero__slide${i === 0 ? " is-on" : ""}" style="background-image:url('${hd(f)}');background-position:${pos}"></div>`).join("")}
      </div>
      <div class="hero__veil"></div>
      <div class="hero__glow" aria-hidden="true"></div>
      <div class="hero__wipe" aria-hidden="true"></div>
      <div class="hero__petals" aria-hidden="true">${HERO_PETALS.map(([x, d, s, z]) => `<i style="--x:${x}%;--d:${d}s;--s:${s}s;--z:${z}"></i>`).join("")}</div>
      <div class="hero__content">
        <h1 class="hero__kicker" data-a="1">${t("home.hero.kicker")}</h1>
        <p class="hero__titles">${HERO.map(([, k], i) => `
          <span class="hero__title${i === 0 ? " is-on" : ""}">${words(t(k))}</span>`).join("")}
        </p>
        <p class="hero__sub" data-a="2">${t("home.hero.sub")}</p>
        <span data-a="3">${btn("/chi-sono", "cta.discover", "btn btn--dark btn--shine")}</span>
      </div>
    </section>

    <section class="welcome" id="welcome">
      <div class="wrap">
        <div class="shead">
          <span class="orn" aria-hidden="true"></span>
          ${tag("span", "home.welcome.kicker", 'class="kicker"')}
          <h2 class="stitle">Mary Longo Wedding Planner</h2>
        </div>
        ${tag("p", "home.welcome.lead", 'class="lead center"')}
      </div>
    </section>
    </div>

    <!-- ULTIMI MATRIMONI -->
    ${latestWeddings()}

    <!-- FASCIA LUOGHI -->
    ${marquee()}

    <!-- 3 COLONNE -->
    <section class="sec sec--cols">
      <div class="wrap">
        <div class="cols3">
          ${[
            ["camera", "home.col1", "/real-wedding"],
            ["rings", "home.col2", "/wedding"],
            ["glasses", "home.col3", "/eventi"],
          ].map(([ic, k, href], i) => `
          <article class="col reveal d${i + 1}">
            <span class="col__ico">${ICON[ic]}</span>
            ${tag("h3", k + ".title")}
            ${tag("p", k + ".text")}
            ${btn(href, k + ".btn", "btn btn--dark btn--sm")}
          </article>`).join("")}
        </div>
      </div>
    </section>

    <!-- CITAZIONE -->
    <section class="quote">
      <div class="quote__bg" style="background-image:url('${hd(15)}')"></div>
      <div class="quote__in reveal">
        ${tag("span", "home.quote.kicker", 'class="kicker"')}
        ${tag("h2", "home.quote.title", 'class="stitle"')}
        ${tag("blockquote", "home.quote.text")}
        ${btn("/contatti", "cta.dream", "btn btn--dark")}
      </div>
    </section>

    <!-- CHI SONO (teaser) -->
    <section class="sec">
      <div class="wrap split">
        <div class="split__media reveal reveal--img">
          <img class="is-portrait" src="${ph(MARY)}" alt="Mary Longo, wedding planner a Lecce" loading="lazy">
          <img class="split__inset" src="${ph(15)}" alt="" loading="lazy">
        </div>
        <div class="split__text reveal d1">
          <span class="orn orn--left" aria-hidden="true"></span>
          ${tag("span", "about.story.kicker", 'class="kicker"')}
          <h2 class="stitle">Mary Longo</h2>
          ${tag("p", "about.p1")}
          ${tag("p", "about.p2")}
          <ul class="stats">
            <li><b data-count="25">25</b>${tag("span", "stat.events")}</li>
            <li><b data-count="10">10</b>${tag("span", "stat.weddings")}</li>
            <li><b data-count="3">3</b>${tag("span", "stat.langs")}</li>
          </ul>
          ${btn("/chi-sono", "home.about.btn", "btn")}
        </div>
      </div>
    </section>

    <!-- PORTFOLIO -->
    <section class="sec sec--ivory">
      <div class="wrap">
        ${shead("home.pf.kicker", "home.pf.title", { cls: "reveal" })}
        ${portfolioGrid()}
        <div class="center reveal" style="margin-top:22px">${btn("/real-wedding", "rw.all", "btn")}</div>
      </div>
    </section>

    <!-- SERVIZI -->
    <section class="sec">
      <div class="wrap">
        ${shead("home.svc.kicker", "home.svc.title", { cls: "reveal" })}
        <div class="cards">
          ${[
            ["svc.c1", 6, ""],
            ["svc.c2", 5, "card--dark"],
            ["svc.c3", 5, ""],
          ].map(([k, n, cls], i) => `
          <article class="card ${cls} reveal d${i + 1}">
            ${tag("h3", k + ".title")}
            ${tag("p", k + ".lead", 'class="card__lead"')}
            <ul>${Array.from({ length: n }, (_, j) => tag("li", `${k}.i${j + 1}`)).join("")}</ul>
            ${btn("/contatti", "cta.bookNow", cls ? "btn btn--light" : "btn btn--dark")}
          </article>`).join("")}
        </div>
      </div>
    </section>

    <!-- EVENTI BAND -->
    <section class="band band--left">
      <div class="band__bg" style="background-image:url('${hd(52)}');background-position:center 45%"></div>
      <div class="band__in reveal">
        <span class="orn orn--light" aria-hidden="true"></span>
        ${tag("span", "nav.events", 'class="kicker kicker--light"')}
        ${tag("h2", "ev.cta.title", 'class="band__title"')}
        ${tag("p", "ev.cta.text")}
        <div class="btn-row">${btn("/eventi", "home.col3.btn", "btn btn--light")}</div>
      </div>
    </section>

    <!-- RECENSIONI -->
    ${reviews()}

    <!-- GUIDE -->
    ${guideTeaser()}

    <!-- INSTAGRAM -->
    <section class="ig">
      <div class="ig__head reveal">
        ${tag("span", "home.ig.kicker", 'class="kicker"')}
        <a class="ig__handle" href="${IG}" target="_blank" rel="noopener">${ICON.ig} @mary_longo_wp</a>
      </div>
      <div class="ig__grid">
        ${[43, 24, 54, 28, 5, 17]
          .map((f) => `<a href="${IG}" target="_blank" rel="noopener" aria-label="Instagram @mary_longo_wp"><img src="${sm(f)}" alt="" loading="lazy"></a>`).join("\n        ")}
      </div>
    </section>

    <!-- CONTATTI -->
    <section class="sec sec--blush" id="contatti">
      <div class="wrap duo">
        <div class="reveal">
          <span class="orn orn--left" aria-hidden="true"></span>
          ${tag("span", "contact.kicker", 'class="kicker"')}
          ${tag("h2", "contact.title", 'class="h-display"')}
          ${tag("p", "contact.lead", 'class="lead"')}
          ${quickContacts()}
        </div>
        <div class="reveal d1">${contactForm()}
        </div>
      </div>
    </section>`,
});

pages["chi-sono.html"] = layout({
  page: "about",
  active: "about",
  slug: "/chi-sono",
  ld: [PERSON(), CRUMBS([[t("nav.about"), "/chi-sono"]])],
  body: `${pageHero(18, "nav.about", "about.hero.title", "center 30%")}

    <section class="sec">
      <div class="wrap split">
        <div class="split__media reveal reveal--img">
          <img class="is-portrait" src="${ph(MARY)}" alt="Mary Longo, wedding planner a Lecce" loading="lazy">
          <span class="stamp">Mary Longo · Lecce</span>
        </div>
        <div class="split__text reveal d1">
          <span class="orn orn--left" aria-hidden="true"></span>
          ${tag("span", "about.story.kicker", 'class="kicker"')}
          <h2 class="stitle">Mary Longo Wedding Planner</h2>
          ${tag("p", "about.p1")}
          ${tag("p", "about.p2")}
          ${tag("p", "about.p3")}
          ${btn("/contatti", "cta.book", "btn btn--dark")}
        </div>
      </div>
    </section>

    <section class="sec sec--ivory">
      <div class="wrap">
        <ul class="stats stats--big reveal">
          <li><b data-count="25">25</b>${tag("span", "stat.events")}</li>
          <li><b data-count="10">10</b>${tag("span", "stat.weddings")}</li>
          <li><b data-count="3">3</b>${tag("span", "stat.langs")}</li>
        </ul>
        ${tag("blockquote", "home.quote.text", 'class="bigquote reveal"')}
      </div>
    </section>
${ctaBand(24, "cta.dream", "contact.lead")}`,
});

const svcGrid = (prefix) => `
        <div class="svcg">
          ${[1, 2, 3, 4].map((i) => `
          <article class="svcg__item reveal d${((i - 1) % 2) + 1}">
            <span class="svcg__no">0${i}</span>
            ${tag("h3", `${prefix}.s${i}.t`)}
            ${tag("p", `${prefix}.s${i}.p`)}
            ${tag("span", `${prefix}.s${i}.m`, 'class="svcg__meta"')}
          </article>`).join("")}
        </div>`;

pages["wedding.html"] = layout({
  page: "wed",
  active: "wedding",
  slug: "/wedding",
  ld: [CRUMBS([[t("nav.wedding"), "/wedding"]])],
  body: `${pageHero(42, "nav.wedding", "wed.hero.title", "center 65%")}

    <section class="sec">
      <div class="wrap split split--rev">
        <div class="split__media reveal reveal--img">
          <img src="${ph(6)}" alt="Nozze in Puglia curate da Mary Longo Wedding Planner" loading="lazy">
        </div>
        <div class="split__text reveal d1">
          <span class="orn orn--left" aria-hidden="true"></span>
          ${tag("span", "wed.exp.kicker", 'class="kicker"')}
          ${tag("h2", "home.quote.title", 'class="stitle"')}
          ${tag("p", "wed.exp.p", 'class="lead"')}
        </div>
      </div>
    </section>

    <section class="sec sec--ivory">
      <div class="wrap">
        ${shead("wed.svc.kicker", "home.svc.title", { cls: "reveal" })}
        ${svcGrid("wed")}
      </div>
    </section>

    <section class="sec">
      <div class="wrap">
        <div class="cards">
          ${[
            ["svc.c1", 6, ""],
            ["svc.c2", 5, "card--dark"],
            ["svc.c3", 5, ""],
          ].map(([k, n, cls], i) => `
          <article class="card ${cls} reveal d${i + 1}">
            ${tag("h3", k + ".title")}
            ${tag("p", k + ".lead", 'class="card__lead"')}
            <ul>${Array.from({ length: n }, (_, j) => tag("li", `${k}.i${j + 1}`)).join("")}</ul>
            ${btn("/contatti", "cta.bookNow", cls ? "btn btn--light" : "btn btn--dark")}
          </article>`).join("")}
        </div>
      </div>
    </section>
${ctaBand(14, "wed.cta.title", "wed.cta.text")}`,
});

pages["eventi.html"] = layout({
  page: "ev",
  active: "events",
  slug: "/eventi",
  ld: [CRUMBS([[t("nav.events"), "/eventi"]])],
  body: `${pageHero(58, "nav.events", "ev.hero.title", "center 40%")}

    <section class="sec">
      <div class="wrap split">
        <div class="split__media reveal reveal--img">
          <img src="${ph(19)}" alt="Evento organizzato da Mary Longo a Lecce" loading="lazy">
        </div>
        <div class="split__text reveal d1">
          <span class="orn orn--left" aria-hidden="true"></span>
          ${tag("span", "ev.intro.kicker", 'class="kicker"')}
          ${tag("h2", "ev.cta.title", 'class="stitle"')}
          ${tag("p", "ev.intro.p", 'class="lead"')}
        </div>
      </div>
    </section>

    <section class="sec sec--ivory">
      <div class="wrap">
        ${shead("ev.svc.kicker", "ev.svc.title", { cls: "reveal" })}
        ${svcGrid("ev")}
      </div>
    </section>
${ctaBand(1, "ev.cta.title", "ev.cta.text")}`,
});

/* FAQ: tutte le chiavi faq.qN / faq.aN, raggruppate per tema (faq.groups) */
const FAQ_GROUPS = [
  ["faq.g1", [20, 1, 8, 9, 10]],
  ["faq.g2", [2, 3, 11, 12, 13]],
  ["faq.g3", [4, 15, 16, 17, 14]],
  ["faq.g4", [5, 7, 18, 19, 6]],
];
const FAQ_IDS = FAQ_GROUPS.flatMap(([, ids]) => ids);
pages["faq.html"] = layout({
  page: "faq",
  slug: "/faq",
  active: "faq",
  ld: [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: L,
      mainEntity: FAQ_IDS.map((i) => ({ "@type": "Question", name: faqText(t("faq.q" + i)), acceptedAnswer: { "@type": "Answer", text: faqText(t("faq.a" + i)) } })),
    },
    CRUMBS([[t("nav.faq.long"), "/faq"]]),
  ],
  body: `${pageHero(25, "nav.faq.long", "faq.title", "center 55%")}

    <section class="sec">
      <div class="wrap wrap--narrow">
        ${tag("p", "faq.lead", 'class="lead center reveal"')}
        ${FAQ_GROUPS.map(([g, ids]) => `
        <h2 class="faq__group reveal">${t(g)}</h2>
        <div class="faq">
          ${ids.map((i) => `
          <div class="faq__item reveal" id="faq-${i}">
            <button class="faq__q" type="button" aria-expanded="false"><span>${t("faq.q" + i)}</span><i aria-hidden="true"></i></button>
            <div class="faq__a"><div><p>${t("faq.a" + i)}</p></div></div>
          </div>`).join("")}
        </div>`).join("")}
        <div class="center reveal" style="margin-top:30px">
          ${tag("p", "faq.more", 'class="h-script"')}
          ${btn("/contatti", "cta.contactMe", "btn btn--dark")}
        </div>
      </div>
    </section>`,
});

pages["contatti.html"] = layout({
  page: "ct",
  active: "contact",
  slug: "/contatti",
  ld: [ORG(), CRUMBS([[t("nav.contact"), "/contatti"]])],
  body: `${pageHero(3, "nav.contact", "contact.title", "center 60%")}

    <section class="sec">
      <div class="wrap duo">
        <div class="reveal">
          <span class="orn orn--left" aria-hidden="true"></span>
          ${tag("span", "contact.kicker", 'class="kicker"')}
          ${tag("p", "contact.lead", 'class="lead"')}
          ${quickContacts()}
          <div class="hours">
            ${tag("h3", "foot.hours")}
            ${tag("p", "foot.hours.week")}
            ${tag("p", "foot.hours.sat")}
          </div>
        </div>
        <div class="reveal d1">${contactForm()}
        </div>
      </div>
    </section>

    <section class="map">
      <div class="map__label">${tag("span", "ct.visit", 'class="kicker"')}<span>${ADDRESS}</span></div>
      <div class="map__frame" data-map-src="https://www.google.com/maps?q=Via+Pistoia+8,+73100+Lecce&output=embed" data-map-title="Mary Longo Wedding Planner — ${ADDRESS}">
        <div class="map__consent">
          ${tag("p", "cc.mapText")}
          <div class="btn-row">
            <button class="btn btn--dark btn--sm" type="button" data-map-load data-i18n="cc.mapBtn">${t("cc.mapBtn")}</button>
            <a class="btn btn--sm" href="https://www.google.com/maps/search/?api=1&query=Via+Pistoia+8,+73100+Lecce" target="_blank" rel="noopener" data-i18n="cc.mapOpen">${t("cc.mapOpen")}</a>
          </div>
        </div>
      </div>
    </section>`,
});

pages["real-wedding.html"] = layout({
  page: "pf",
  slug: "/real-wedding",
  active: "rw",
  ld: [CRUMBS([[t("nav.portfolio"), "/real-wedding"]])],
  body: `${pageHero(151, "home.pf.kicker", "pf.title", "center 55%")}

    <section class="sec">
      <div class="wrap">
        ${tag("p", "rw.text", 'class="lead center reveal"')}
        ${portfolioGrid()}
      </div>
    </section>
${ctaBand(24, "cta.dream", "contact.lead")}`,
});

PROJECTS.forEach((p, idx) => {
  const next = PROJECTS[(idx + 1) % PROJECTS.length];
  const cover = p.photos[0];
  const name = faqText(t(p.key));
  pages[`real-wedding-${p.n}.html`] = layout({
    page: "rw",
    slug: `/real-wedding-${p.n}`,
    title: `${name} — Real Wedding ${p.roman} | Mary Longo Wedding Planner`,
    desc: faqText(t(p.text)),
    image: hd(cover),
    active: "rw",
    ld: [
      CRUMBS([[t("nav.portfolio"), "/real-wedding"], [name, `/real-wedding-${p.n}`]]),
      {
        "@context": "https://schema.org",
        "@type": "ImageGallery",
        name,
        description: faqText(t(p.text)),
        inLanguage: L,
        author: { "@id": MARY_ID },
        image: p.photos.slice(0, 8).map((id) => SITE + ph(id)),
      },
    ],
    body: `
    <section class="rwh">
      <div class="rwh__text reveal">
        <a class="rwh__back" href="/real-wedding">← <span data-i18n="rw.all">${t("rw.all")}</span></a>
        <span class="kicker">Real Wedding · ${p.roman}</span>
        ${tag("h1", p.key, 'class="h-display"')}
        ${tag("p", p.text)}
        <nav class="rwh__nav" aria-label="Real Wedding">${PROJECTS.map((q) => `<a href="/real-wedding-${q.n}"${q.n === p.n ? ' class="is-active" aria-current="page"' : ""}>${q.roman}</a>`).join("")}</nav>
      </div>
      <div class="rwh__media reveal reveal--img d1"><img src="${hd(cover)}" alt="${ALT} — ${t(p.key)}" style="object-position:${p.pos}"></div>
    </section>

    <section class="sec sec--ivory">
      <div class="wrap">
        <div class="shead reveal"><span class="orn" aria-hidden="true"></span>${tag("span", "rw.gallery", 'class="kicker"')}<h2 class="stitle">${p.photos.length} <span data-i18n="rw.photos">${t("rw.photos")}</span></h2></div>
        <div class="gal">
          ${p.photos.map((id, i) => `<figure class="gal__item reveal" style="--r:${ratio(id).toFixed(3)}"><img data-lb data-full="${hd(id)}"${cap(id) ? ` data-cap="${attr(cap(id))}"` : ""} src="${sm(id)}" decoding="async" alt="${cap(id) ? attr(cap(id)) + " — " + attr(t(p.key)) : `${ALT} — ${t(p.key)} ${i + 1}`}" loading="lazy">${cap(id) ? `<figcaption>${cap(id)}</figcaption>` : ""}</figure>`).join("\n          ")}
        </div>
      </div>
    </section>

    <a class="nextp" href="/real-wedding-${next.n}">
      <div class="nextp__bg" style="background-image:url('${hd(next.photos[0])}');background-position:${next.pos}"></div>
      <div class="nextp__in">
        ${tag("span", "rw.next", 'class="kicker kicker--light"')}
        ${tag("span", next.key, 'class="nextp__t"')}
        <span class="nextp__k">Real Wedding · ${next.roman}</span>
        <span class="nextp__arrow">${ICON.arrow}</span>
      </div>
    </a>`,
  });
});

const legalPage = (key) => layout({
  page: key,
  slug: key === "cookie" ? "/cookie-policy" : "/privacy",
  active: "",
  bodyClass: "is-legal",
  body: `
    <section class="sec legal">
      <div class="wrap wrap--narrow">
        <span class="orn orn--left" aria-hidden="true"></span>
        ${tag("h1", key + ".title", 'class="h-display"')}
        ${tag("p", "legal.updated", 'class="legal__date"')}
        ${tag("div", key + ".body", 'class="legal__body"')}
      </div>
    </section>`,
});
pages["privacy.html"] = legalPage("privacy");
pages["cookie-policy.html"] = legalPage("cookie");

Object.assign(pages, guidePages());
return pages;
}

/* link interni: nelle lingue diverse dall'italiano "/x" diventa "/en/x" ("/" → "/en/");
   restano invariati asset, URL esterni e i link del selettore lingua (marcati "@/") */
function prefixLinks(html) {
  if (L !== "it") html = html.replace(/href="\/(?!assets\/|@)([^"]*)"/g, (m, p) => `href="${pre()}/${p}"`);
  return html.replace(/href="@\//g, 'href="/');
}

/* ---------- controllo traduzioni + scrittura ---------- */
const missing = [];
for (const l of I18N.langs) for (const k in EN) if (!I18N.dict[l][k]) missing.push(l + ":" + k);
if (missing.length) console.warn("Traduzioni vuote:", missing.join(", "));

const SITEMAP = [];
let written = 0;
for (const lang of LANGS) {
  L = lang;
  const dir = lang === "it" ? OUT : path.join(OUT, lang);
  fs.mkdirSync(dir, { recursive: true });
  for (const [file, html] of Object.entries(buildPages())) {
    const out = path.join(dir, file);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, prefixLinks(html));
    written++;
    if (lang === "it") SITEMAP.push(file);
  }
}
console.log(`scritte ${written} pagine (${LANGS.length} lingue)`);

/* sitemap.xml con le alternative di lingua, robots.txt e llms.txt (per gli assistenti AI) */
function sitemap() {
  const urls = [];
  L = "it";
  const all = buildPages();
  for (const file of SITEMAP) {
    const alt = all[file].match(/<link rel="alternate" hreflang="[a-z-]+" href="[^"]+">/g) || [];
    const map = Object.fromEntries(alt.map((a) => a.match(/hreflang="([^"]+)" href="([^"]+)"/).slice(1)));
    for (const l of LANGS) {
      urls.push(`  <url>
    <loc>${map[l]}</loc>
${[...LANGS, "x-default"].map((h) => `    <xhtml:link rel="alternate" hreflang="${h}" href="${map[h]}"/>`).join("\n")}
  </url>`);
    }
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>
`;
}
fs.writeFileSync(path.join(OUT, "sitemap.xml"), sitemap());
fs.writeFileSync(path.join(OUT, "robots.txt"), `# Mary Longo Wedding Planner — tutti i motori di ricerca e gli assistenti AI sono benvenuti
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: ${SITE}/sitemap.xml
`);
fs.writeFileSync(path.join(OUT, "llms.txt"), llmsTxt());
console.log("scritti sitemap.xml, robots.txt, llms.txt");
