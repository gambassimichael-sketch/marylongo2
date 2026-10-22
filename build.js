/* Genera le pagine HTML del sito in ./site partendo dalle traduzioni in site/assets/js/i18n.js.
   Uso: node build.js  — l'HTML esce in inglese (lingua di default), il cambio lingua avviene in pagina. */
const fs = require("fs");
const path = require("path");
const I18N = require("./site/assets/js/i18n.js");

const OUT = path.join(__dirname, "site");
const EN = I18N.dict.en;
const LEGAL = require("./site/assets/js/i18n-legal.js");
for (const k in LEGAL) I18N.langs.forEach((l, i) => (I18N.dict[l][k] = LEGAL[k][i]));
const YEAR = new Date().getFullYear();

/* ---------- helpers ---------- */
function t(k) {
  if (!(k in EN)) throw new Error("Chiave di traduzione mancante: " + k);
  return EN[k];
}
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
  { href: "/faq", key: "faq", id: "faq" },
  { href: "/contatti", key: "contact", id: "contact" },
];

const navItem = (n, active) =>
  `<a class="nav__a${n.id === active ? " is-active" : ""}" href="${n.href}">${tag("span", "nav." + n.key)}${tag("small", "nav." + n.key + ".sub")}</a>`;

const langSwitch = (extra = "") => `
      <div class="lang ${extra}" data-lang>
        <button class="lang__btn" type="button" aria-haspopup="true" aria-expanded="false" data-i18n-attr="aria-label:ui.language" aria-label="${t("ui.language")}">${ICON.globe}<span class="lang__cur">EN</span>${ICON.chev}</button>
        <ul class="lang__menu">
          <li><button type="button" data-set-lang="en" lang="en"><b>EN</b>English</button></li>
          <li><button type="button" data-set-lang="it" lang="it"><b>IT</b>Italiano</button></li>
          <li><button type="button" data-set-lang="fr" lang="fr"><b>FR</b>Français</button></li>
          <li><button type="button" data-set-lang="es" lang="es"><b>ES</b>Español</button></li>
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
      <button type="button" data-set-lang="en">English</button>
      <button type="button" data-set-lang="it">Italiano</button>
      <button type="button" data-set-lang="fr">Français</button>
      <button type="button" data-set-lang="es">Español</button>
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

/* Intro della home: logo, filo rosa che si disegna, frase e petali; poi si solleva come un velo.
   Compare una volta per sessione (classe intro-on messa dallo script in <head>), clic per saltarla. */
const PETALS = [[6, 0, 6.5, 0.9], [17, 0.9, 7.5, 0.6], [29, 0.3, 6, 1], [41, 1.4, 8, 0.7], [53, 0.6, 7, 0.85], [64, 0.1, 6.8, 0.65], [75, 1.1, 7.2, 1], [86, 0.4, 6.4, 0.75], [94, 1.6, 7.8, 0.6]];
const INTRO_HEAD = `
  <script>try{if(!sessionStorage.getItem("ml-intro")&&!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.className+=" intro-on"}catch(e){}</script>`;
const intro = () => `
  <div class="intro" data-intro hidden>
    <div class="intro__petals" aria-hidden="true">${PETALS.map(([x, d, s, z]) => `<i style="--x:${x}%;--d:${d}s;--s:${s}s;--z:${z}"></i>`).join("")}</div>
    <div class="intro__in">
      <img class="intro__logo" src="${img("logo-maria-longo@2x.jpg")}" alt="Mary Longo Wedding Planner" width="562" height="340">
      <span class="intro__line" aria-hidden="true"></span>
      ${tag("p", "intro.line", 'class="intro__txt"')}
    </div>
    <button class="intro__skip" type="button" data-i18n="ui.skip">${t("ui.skip")}</button>
  </div>`;

function layout({ page, active, bodyClass = "", head = "", pre = "", body, scripts = "" }) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title data-i18n="${page}.metaTitle">${t(page + ".metaTitle")}</title>
  <meta name="description" data-i18n-attr="content:${page}.metaDesc" content="${t(page + ".metaDesc")}">
  <meta name="robots" content="index,follow,max-image-preview:large">
  <meta name="author" content="Mary Longo">
  <meta name="geo.region" content="IT-75">
  <meta name="geo.placename" content="Lecce, Puglia, Italia">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Mary Longo Wedding Planner">
  <meta property="og:title" content="${t(page + ".metaTitle")}">
  <meta property="og:description" content="${t(page + ".metaDesc")}">
  <meta property="og:image" content="${hd(42)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="theme-color" content="#ffffff">
  <link rel="icon" type="image/png" sizes="32x32" href="${img("msn-150x150.png")}">
  <link rel="icon" type="image/png" sizes="192x192" href="${img("msn-300x300.png")}">
  <link rel="apple-touch-icon" href="${img("msn-300x300.png")}">
  <script>try{var l=localStorage.getItem("ml-lang");if(l&&l!=="en")document.documentElement.className+=" i18n-wait"}catch(e){}</script>
  <link rel="preload" href="/assets/fonts/jost-300-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/assets/fonts/cormorant-upright-300-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="${asset("css/fonts.css")}">
  <link rel="stylesheet" href="${asset("css/style.css")}">${head}
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
  </div>

${cookieBanner()}

  <script src="${asset("js/i18n.js")}"></script>${scripts}
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
          <input type="hidden" name="lingua" value="en">
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
  { n: 1, key: "rw.salento", text: "rw.salento.text", pos: "center 62%", photos: [121, 64, 62, 63, 61, 65, 68, 87, 67, 72, 76, 86, 66, 69, 88, 70, 93, 95, 84, 71, 89, 73, 96, 92, 74, 75, 94, 77, 80, 99, 78, 79, 91, 81, 90, 85, 117, 109, 128, 105, 119, 114, 122, 110, 98, 97, 101, 106, 107, 115, 102, 103, 108, 104, 113, 124, 100, 111, 82, 112, 116, 123, 118] },
  { n: 7, key: "rw.masseria", text: "rw.masseria.text", pos: "center 55%", photos: [151, 150, 131, 134, 138, 132, 136, 135, 137, 133, 139, 130, 143, 129, 140, 142, 152, 141, 153, 144, 145, 148, 146, 149, 147, 154] },
  { n: 8, key: "rw.church", text: "rw.church.text", pos: "center 40%", photos: [155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 174, 166, 167, 168, 169, 170, 171, 172, 173, 165, 175, 176, 177] },
  { n: 2, key: "rw.w1", pos: "center 40%", photos: [17, 18, 20, 16, 22, 25, 28, 14, 31, 24, 27, 15, 8, 13] },
  { n: 3, key: "rw.w2", pos: "center 60%", photos: [6, 36, 40, 42, 26, 10, 30, 29, 37, 32, 2, 35, 21, 23, 19, 33, 12, 5, 9, 11, 34, 7] },
  { n: 4, key: "rw.w3", pos: "center 35%", photos: [38, 43, 45, 41, 44, 46, 48, 47] },
  { n: 5, key: "rw.w4", pos: "center 50%", photos: [51, 53, 50, 54, 49, 55, 56, 39, 52, 4] },
  { n: 6, key: "rw.w5", pos: "center 45%", photos: [58, 59, 57, 60] },
];
const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
PROJECTS.forEach((p, i) => (p.roman = ROMAN[i]));
const MARY = 178; // ritratto di Mary Longo
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
              <span class="pf__k">Real Wedding · ${p.roman}</span>
              ${tag("span", p.key, 'class="pf__t"')}
              <span class="pf__l"><span data-i18n="pf.discover">${t("pf.discover")}</span> · ${p.photos.length} <span data-i18n="rw.photos">${t("rw.photos")}</span></span>
            </span>
          </a>`).join("")}
        </div>`;

/* ---------- pagine ---------- */
const pages = {};

const HERO = [
  [3, "home.hero.s1", "center 58%"],
];

pages["index.html"] = layout({
  page: "home",
  active: "home",
  bodyClass: "is-home",
  pre: intro(),
  head: `${INTRO_HEAD}
  <link rel="canonical" href="https://www.marylongoweddingplanner.it/">
  <link rel="preload" as="image" href="${hd(3)}" fetchpriority="high">
  <script type="application/ld+json">
  {"@context":"https://schema.org","@graph":[
    {"@type":["LocalBusiness","ProfessionalService"],"@id":"https://www.marylongoweddingplanner.it/#business","name":"Mary Longo Wedding Planner","description":"Wedding & event planner in Lecce: weddings, destination weddings and bespoke events in Puglia and Salento.","url":"https://www.marylongoweddingplanner.it/","image":"https://www.marylongoweddingplanner.it/wp-content/uploads/2023/02/slider_1.jpeg","logo":"https://www.marylongoweddingplanner.it/wp-content/uploads/2020/10/logo-maria-longo.jpg","telephone":"${PHONE}","email":"${MAIL}","priceRange":"€€","address":{"@type":"PostalAddress","streetAddress":"Via Pistoia, 8","addressLocality":"Lecce","postalCode":"73100","addressRegion":"Puglia","addressCountry":"IT"},"geo":{"@type":"GeoCoordinates","latitude":40.3529,"longitude":18.1743},"areaServed":["Lecce","Salento","Puglia","Italia"],"openingHoursSpecification":[{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday"],"opens":"09:00","closes":"18:30"},{"@type":"OpeningHoursSpecification","dayOfWeek":"Saturday","opens":"09:00","closes":"13:30"}],"sameAs":["${FB}","${IG}","${MC}"],"founder":{"@type":"Person","name":"Mary Longo","jobTitle":"Wedding & Event Planner, Celebrant","knowsLanguage":["it","en","fr"]},"aggregateRating":{"@type":"AggregateRating","ratingValue":"5","reviewCount":"3","bestRating":"5"}},
    {"@type":"WebSite","url":"https://www.marylongoweddingplanner.it/","name":"Mary Longo Wedding Planner","inLanguage":["en","it","fr"]}
  ]}
  </script>`,
  body: `
    <!-- PRIMA SCHERMATA: hero + benvenuto, alti esattamente quanto lo schermo -->
    <div class="first">
    <section class="hero">
      <div class="hero__slides">${HERO.map(([f, , pos], i) => `
        <div class="hero__slide${i === 0 ? " is-on" : ""}" style="background-image:url('${hd(f)}');background-position:${pos}"></div>`).join("")}
      </div>
      <div class="hero__veil"></div>
      <div class="hero__content">
        ${tag("span", "home.hero.kicker", 'class="hero__kicker"')}
        <h1 class="hero__titles">${HERO.map(([, k], i) => `
          <span class="hero__title${i === 0 ? " is-on" : ""}" data-i18n="${k}">${t(k)}</span>`).join("")}
        </h1>
        ${tag("p", "home.hero.sub", 'class="hero__sub"')}
        ${btn("/chi-sono", "cta.discover", "btn btn--dark")}
      </div>
      <a class="hero__scroll" href="#welcome" aria-label="Scroll"><span></span></a>
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
        <div class="split__media reveal">
          <img src="${ph(MARY)}" alt="Mary Longo, wedding planner a Lecce" loading="lazy">
          <img class="split__inset" src="${ph(15)}" alt="" loading="lazy">
        </div>
        <div class="split__text reveal d1">
          <span class="orn orn--left" aria-hidden="true"></span>
          ${tag("span", "about.story.kicker", 'class="kicker"')}
          <h2 class="stitle">Mary Longo</h2>
          ${tag("p", "about.p1")}
          ${tag("p", "about.p2")}
          <ul class="stats">
            <li><b>25</b>${tag("span", "stat.events")}</li>
            <li><b>10</b>${tag("span", "stat.weddings")}</li>
            <li><b>3</b>${tag("span", "stat.langs")}</li>
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
  head: `\n  <link rel="canonical" href="https://www.marylongoweddingplanner.it/chi-sono/">`,
  body: `${pageHero(18, "nav.about", "about.hero.title", "center 30%")}

    <section class="sec">
      <div class="wrap split">
        <div class="split__media reveal">
          <img src="${ph(MARY)}" alt="Mary Longo, wedding planner a Lecce" loading="lazy">
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
          <li><b>25</b>${tag("span", "stat.events")}</li>
          <li><b>10</b>${tag("span", "stat.weddings")}</li>
          <li><b>3</b>${tag("span", "stat.langs")}</li>
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
  head: `\n  <link rel="canonical" href="https://www.marylongoweddingplanner.it/wedding/">`,
  body: `${pageHero(42, "nav.wedding", "wed.hero.title", "center 65%")}

    <section class="sec">
      <div class="wrap split split--rev">
        <div class="split__media reveal">
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
  head: `\n  <link rel="canonical" href="https://www.marylongoweddingplanner.it/eventi/">`,
  body: `${pageHero(58, "nav.events", "ev.hero.title", "center 40%")}

    <section class="sec">
      <div class="wrap split">
        <div class="split__media reveal">
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

pages["faq.html"] = layout({
  page: "faq",
  active: "faq",
  head: `\n  <link rel="canonical" href="https://www.marylongoweddingplanner.it/faq/">
  <script type="application/ld+json">
  ${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [1, 2, 3, 4, 5, 6, 7].map((i) => ({ "@type": "Question", name: t("faq.q" + i), acceptedAnswer: { "@type": "Answer", text: t("faq.a" + i) } })),
  })}
  </script>`,
  body: `${pageHero(25, "nav.faq.long", "faq.title", "center 55%")}

    <section class="sec">
      <div class="wrap wrap--narrow">
        ${tag("p", "faq.lead", 'class="lead center reveal"')}
        <div class="faq">
          ${[1, 2, 3, 4, 5, 6, 7].map((i) => `
          <div class="faq__item reveal">
            <button class="faq__q" type="button" aria-expanded="false">${tag("span", "faq.q" + i)}<i aria-hidden="true"></i></button>
            <div class="faq__a"><div>${tag("p", "faq.a" + i)}</div></div>
          </div>`).join("")}
        </div>
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
  head: `\n  <link rel="canonical" href="https://www.marylongoweddingplanner.it/contatti/">`,
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
  active: "rw",
  head: `
  <link rel="canonical" href="https://www.marylongoweddingplanner.it/real-wedding/">`,
  body: `${pageHero(121, "home.pf.kicker", "pf.title", "center 55%")}

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
  pages[`real-wedding-${p.n}.html`] = layout({
    page: "rw",
    active: "rw",
    head: `
  <link rel="canonical" href="https://www.marylongoweddingplanner.it/real-wedding-${p.n}/">`,
    body: `
    <section class="rwh">
      <div class="rwh__text reveal">
        <a class="rwh__back" href="/real-wedding">← <span data-i18n="rw.all">${t("rw.all")}</span></a>
        <span class="kicker">Real Wedding · ${p.roman}</span>
        ${tag("h1", p.key, 'class="h-display"')}
        ${tag("p", p.text || "rw.text")}
        <nav class="rwh__nav" aria-label="Real Wedding">${PROJECTS.map((q) => `<a href="/real-wedding-${q.n}"${q.n === p.n ? ' class="is-active" aria-current="page"' : ""}>${q.roman}</a>`).join("")}</nav>
      </div>
      <div class="rwh__media reveal d1"><img src="${hd(cover)}" alt="${ALT} — ${t(p.key)}" style="object-position:${p.pos}"></div>
    </section>

    <section class="sec sec--ivory">
      <div class="wrap">
        <div class="shead reveal"><span class="orn" aria-hidden="true"></span>${tag("span", "rw.gallery", 'class="kicker"')}<h2 class="stitle">${p.photos.length} <span data-i18n="rw.photos">${t("rw.photos")}</span></h2></div>
        <div class="gal">
          ${p.photos.map((id, i) => `<figure class="gal__item reveal" style="--r:${ratio(id).toFixed(3)}"><img data-lb data-full="${hd(id)}" src="${sm(id)}" decoding="async" alt="${ALT} — ${t(p.key)} ${i + 1}" loading="lazy"></figure>`).join("\n          ")}
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
  active: "",
  bodyClass: "is-legal",
  head: `
  <link rel="canonical" href="https://www.marylongoweddingplanner.it/${key === "cookie" ? "cookie-policy" : "privacy"}/">`,
  scripts: `
  <script src="${asset("js/i18n-legal.js")}"></script>`,
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

/* ---------- controllo traduzioni + scrittura ---------- */
const missing = [];
for (const l of I18N.langs) for (const k in EN) if (!I18N.dict[l][k]) missing.push(l + ":" + k);
if (missing.length) console.warn("Traduzioni vuote:", missing.join(", "));

for (const [file, html] of Object.entries(pages)) {
  fs.writeFileSync(path.join(OUT, file), html);
  console.log("scritto", file);
}
