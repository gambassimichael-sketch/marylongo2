/* Mary Longo Wedding Planner — interazioni e cambio lingua */
(function () {
  "use strict";
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var root = document.documentElement;
  root.classList.add("js");

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Hero: le animazioni partono a fine intro (o subito, se l'intro non c'è) ---------- */
  var heroGo = function () { if (!root.classList.contains("hero-go")) root.classList.add("hero-go"); };
  var hero = $(".hero");
  if (hero && !reduced && window.matchMedia("(hover: hover)").matches) {
    var pt = false;
    hero.addEventListener("mousemove", function (e) {
      if (pt) return;
      pt = true;
      requestAnimationFrame(function () {
        var r = hero.getBoundingClientRect();
        hero.style.setProperty("--px", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
        hero.style.setProperty("--py", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
        pt = false;
      });
    });
    hero.addEventListener("mouseleave", function () { hero.style.setProperty("--px", 0); hero.style.setProperty("--py", 0); });
  }

  /* ---------- Intro home: una volta per sessione, clic o tasto per saltarla ---------- */
  var intro = $("[data-intro]");
  if (intro && root.classList.contains("intro-on")) {
    try { sessionStorage.setItem("ml-intro", "1"); } catch (e) {}
    document.body.style.overflow = "hidden";
    // la hero si anima mentre i due pannelli dell'intro si aprono (3,25 s, o subito se si salta)
    var heroTimer = setTimeout(heroGo, 3150);
    var skipIntro = function () { intro.classList.add("is-skip"); clearTimeout(heroTimer); setTimeout(heroGo, 120); };
    var endIntro = function () {
      root.classList.remove("intro-on");
      document.body.style.overflow = "";
      intro.parentNode.removeChild(intro);
      document.removeEventListener("keydown", onIntroKey);
      heroGo();
    };
    var onIntroKey = function (e) { if (e.key === "Escape" || e.key === "Enter" || e.key === " ") { e.preventDefault(); skipIntro(); } };
    intro.addEventListener("click", skipIntro);
    intro.addEventListener("animationend", function (e) { if (e.target === intro) endIntro(); });
    document.addEventListener("keydown", onIntroKey);
  } else {
    if (intro) intro.parentNode.removeChild(intro);
    setTimeout(heroGo, 60);
  }

  /* ---------- Contatori (25 anni, 10 anni, 3 lingue): contano quando entrano nello schermo ---------- */
  var counters = $$("[data-count]");
  var countUp = function (el) {
    var end = parseFloat(el.getAttribute("data-count")), t0 = null, dur = 1600;
    var step = function (ts) {
      if (!t0) t0 = ts;
      var p = Math.min(1, (ts - t0) / dur);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    };
    el.textContent = "0";
    requestAnimationFrame(step);
  };
  if (counters.length && "IntersectionObserver" in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { countUp(en.target); cio.unobserve(en.target); } });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  /* ---------- Lingua: ogni lingua ha le sue pagine (/, /en/, /fr/, /es/); qui solo il menu a tendina ---------- */
  var MSG = window.ML_MSG || {};

  $$(".lang").forEach(function (box) {
    var btn = $(".lang__btn", box);
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = !box.classList.contains("is-open");
      box.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });
  document.addEventListener("click", function () {
    $$(".lang.is-open").forEach(function (b) { b.classList.remove("is-open"); $(".lang__btn", b).setAttribute("aria-expanded", "false"); });
  });

  /* ---------- Consenso cookie (GDPR): la scelta vale 6 mesi, poi viene richiesta di nuovo ---------- */
  var CC_KEY = "ml-consent", CC_DAYS = 180;
  var cc = $(".cc");
  function readConsent() {
    try {
      var v = JSON.parse(localStorage.getItem(CC_KEY));
      if (v && v.date && Date.now() - v.date < CC_DAYS * 864e5) return v;
    } catch (e) {}
    return null;
  }
  function loadMaps() {
    $$(".map__frame[data-map-src]").forEach(function (box) {
      if ($("iframe", box)) return;
      var f = document.createElement("iframe");
      f.src = box.getAttribute("data-map-src");
      f.title = box.getAttribute("data-map-title") || "Google Maps";
      f.loading = "lazy";
      f.referrerPolicy = "no-referrer-when-downgrade";
      box.innerHTML = "";
      box.appendChild(f);
      box.classList.add("is-loaded");
    });
  }
  function applyConsent(v) { if (v && v.ext) loadMaps(); }
  function saveConsent(ext) {
    var v = { ext: !!ext, date: Date.now(), v: 1 };
    try { localStorage.setItem(CC_KEY, JSON.stringify(v)); } catch (e) {}
    applyConsent(v);
    closeBanner();
  }
  function setPrefs(open) {
    $(".cc__prefs", cc).hidden = !open;
    $('[data-cc="custom"]', cc).hidden = open;
    $('[data-cc="save"]', cc).hidden = !open;
  }
  function openBanner(withPrefs) {
    if (!cc) return;
    var cur = readConsent();
    $("[data-cc-ext]", cc).checked = !!(cur && cur.ext);
    setPrefs(!!withPrefs);
    cc.hidden = false;
    requestAnimationFrame(function () { cc.classList.add("is-on"); });
  }
  function closeBanner() {
    if (!cc) return;
    cc.classList.remove("is-on");
    setTimeout(function () { cc.hidden = true; }, 350);
  }
  if (cc) {
    cc.addEventListener("click", function (e) {
      var b = e.target.closest("[data-cc]");
      if (!b) return;
      var act = b.getAttribute("data-cc");
      if (act === "accept") saveConsent(true);
      else if (act === "reject") saveConsent(false);
      else if (act === "custom") setPrefs(true);
      else if (act === "save") saveConsent($("[data-cc-ext]", cc).checked);
    });
    var consent = readConsent();
    if (consent) applyConsent(consent); else openBanner(false);
  }
  // delega: i pulsanti "Preferenze cookie" possono essere ricreati dal cambio lingua
  document.addEventListener("click", function (e) {
    if (e.target.closest("[data-cc-open]")) { e.preventDefault(); openBanner(true); }
    if (e.target.closest("[data-map-load]")) {
      var cur = readConsent();
      saveConsent(true);   // caricare la mappa equivale ad accettare i contenuti esterni
      if (!cur) closeBanner();
    }
  });

  /* ---------- Header compatto allo scroll + torna su ---------- */
  var hdr = $(".hdr");
  var totop = $("[data-totop]");
  function onScroll() {
    var y = window.scrollY;
    if (hdr) hdr.classList.toggle("is-small", y > 60);
    if (totop) totop.classList.toggle("is-on", y > 700);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  if (totop) totop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

  /* ---------- Menu mobile ---------- */
  var mnav = $(".mnav");
  function setMenu(open) {
    if (!mnav) return;
    mnav.classList.toggle("is-open", open);
    mnav.setAttribute("aria-hidden", open ? "false" : "true");
    document.body.style.overflow = open ? "hidden" : "";
  }
  $$("[data-menu-open]").forEach(function (b) { b.addEventListener("click", function () { setMenu(true); }); });
  $$("[data-menu-close]").forEach(function (b) { b.addEventListener("click", function () { setMenu(false); }); });
  $$(".mnav a").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });

  /* ---------- Slider hero ---------- */
  var slides = $$(".hero__slide");
  if (slides.length > 1) {
    var titles = $$(".hero__title");
    var dots = $$(".hero__dots button");
    var idx = 0, timer;
    var go = function (n) {
      idx = (n + slides.length) % slides.length;
      [slides, titles, dots].forEach(function (list) {
        list.forEach(function (el, i) { el.classList.toggle("is-on", i === idx); });
      });
    };
    var play = function () { clearInterval(timer); timer = setInterval(function () { go(idx + 1); }, 6500); };
    dots.forEach(function (d, i) { d.addEventListener("click", function () { go(i); play(); }); });
    play();
  }

  /* ---------- Comparsa elementi ---------- */
  var reveals = $$(".reveal");
  var revealTick = false;
  function checkReveals() {
    var limit = window.innerHeight * 0.94, k = 0;
    reveals = reveals.filter(function (el) {
      if (el.getBoundingClientRect().top < limit) {
        if (/gal__item|lt__ph|gcard|rev\b/.test(el.className) && !/\bd[123]\b/.test(el.className)) el.style.transitionDelay = Math.min(k++, 10) * 70 + "ms";
        el.classList.add("is-in");
        return false;
      }
      return true;
    });
    revealTick = false;
  }
  window.addEventListener("scroll", function () {
    if (!revealTick && reveals.length) { revealTick = true; requestAnimationFrame(checkReveals); }
  }, { passive: true });
  window.addEventListener("resize", checkReveals);
  window.addEventListener("load", checkReveals);
  checkReveals();

  /* ---------- Parallasse leggera sulle immagini di sfondo ---------- */
  var para = $$(".phero__bg, .band__bg");
  if (para.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var ticking = false;
    var update = function () {
      var vh = window.innerHeight;
      para.forEach(function (el) {
        var r = el.parentNode.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        var p = (r.top + r.height / 2 - vh / 2) / vh;
        el.style.transform = "translate3d(0," + (p * -40).toFixed(1) + "px,0)";
      });
      ticking = false;
    };
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  /* ---------- FAQ ---------- */
  $$(".faq__q").forEach(function (q) {
    q.addEventListener("click", function () {
      var item = q.parentNode;
      var open = !item.classList.contains("is-open");
      item.classList.toggle("is-open", open);
      q.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  /* ---------- Galleria giustificata: ogni riga riempie tutta la larghezza, nessun buco ---------- */
  function layoutGallery(g) {
    var items = $$(".gal__item", g);
    var W = g.clientWidth;
    if (!W || !items.length) return;
    var gap = parseFloat(getComputedStyle(g).columnGap) || 10;
    var target = W > 1000 ? 280 : W > 600 ? 230 : 200;
    var ratio = function (el) { return parseFloat(el.style.getPropertyValue("--r")) || 1.5; };
    var rowH = function (row) {
      var sum = row.reduce(function (s, el) { return s + ratio(el); }, 0);
      return (W - gap * (row.length - 1)) / sum;
    };
    // righe riempite fino all'altezza desiderata
    var rows = [], row = [];
    items.forEach(function (el) {
      row.push(el);
      if (rowH(row) <= target) { rows.push(row); row = []; }
    });
    if (row.length) rows.push(row);
    // riequilibrio delle ultime due righe: sposto foto finché le altezze si avvicinano
    if (rows.length > 1) {
      var a = rows[rows.length - 2], b = rows[rows.length - 1];
      while (a.length > 1) {
        var diff = Math.abs(rowH(a) - rowH(b));
        var na = a.slice(0, -1), nb = [a[a.length - 1]].concat(b);
        if (Math.abs(rowH(na) - rowH(nb)) >= diff) break;
        a = na; b = nb;
      }
      if (a.length) { rows[rows.length - 2] = a; rows[rows.length - 1] = b; }
      // se l'ultima riga resta molto più alta, la unisco alla precedente
      if (rowH(b) > target * 1.6) { rows.pop(); rows[rows.length - 1] = a.concat(b); }
    }
    rows.forEach(function (r) {
      var h = Math.floor(rowH(r));
      r.forEach(function (el, i) {
        var w = Math.floor(ratio(el) * h);
        // l'ultima foto della riga assorbe gli arrotondamenti, così la riga è sempre piena
        el.style.flex = i === r.length - 1 ? "1 1 " + w + "px" : "0 0 " + w + "px";
        el.style.width = w + "px";
        el.style.height = h + "px";
      });
    });
  }
  var gals = $$(".gal");
  if (gals.length) {
    var relayout = function () { gals.forEach(layoutGallery); };
    relayout();
    var rt;
    window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(relayout, 120); });
  }

  /* ---------- Lightbox galleria ---------- */
  var lb = $(".lb");
  var pics = $$("img[data-lb]");
  if (lb && pics.length) {
    var lbImg = $("img", lb), lbCount = $(".lb__count", lb), lbCap = $(".lb__cap", lb), cur = 0;
    var show = function (i) {
      cur = (i + pics.length) % pics.length;
      lbImg.src = pics[cur].getAttribute("data-full") || pics[cur].src;
      lbImg.alt = pics[cur].alt;
      lbCount.textContent = (cur + 1) + " / " + pics.length;
      if (lbCap) { lbCap.textContent = pics[cur].getAttribute("data-cap") || ""; lb.classList.toggle("has-cap", !!lbCap.textContent); }
    };
    var open = function (i) { show(i); lb.classList.add("is-open"); lb.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; };
    var close = function () { lb.classList.remove("is-open"); lb.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; };
    pics.forEach(function (p, i) { p.parentNode.addEventListener("click", function () { open(i); }); });
    $(".lb__close", lb).addEventListener("click", close);
    $(".lb__prev", lb).addEventListener("click", function (e) { e.stopPropagation(); show(cur - 1); });
    $(".lb__next", lb).addEventListener("click", function (e) { e.stopPropagation(); show(cur + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(cur - 1);
      if (e.key === "ArrowRight") show(cur + 1);
    });
    var sx = null;
    lb.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      if (sx === null) return;
      var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 40) show(cur + (dx < 0 ? 1 : -1));
      sx = null;
    });
  }
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  /* ---------- Form contatti (Netlify Forms) ---------- */
  $$("form.form").forEach(function (f) {
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var d = MSG;
      var st = $(".form__status", f);
      var ok = true;
      $$("[required]", f).forEach(function (el) {
        var bad = el.type === "checkbox" ? !el.checked : !el.value.trim() || (el.type === "email" && !/^\S+@\S+\.\S+$/.test(el.value));
        (el.closest(".f") || el.closest(".check")).classList.toggle("is-err", bad);
        if (bad) ok = false;
      });
      st.classList.remove("is-err");
      if (!ok) { st.textContent = d["form.err"]; st.classList.add("is-err"); return; }
      var btn = $('button[type="submit"]', f);
      btn.disabled = true;
      st.textContent = d["form.sending"];
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(f)).toString(),
      }).then(function (r) {
        if (!r.ok) throw new Error(r.status);
        st.textContent = d["form.ok"];
        f.reset();
        $$('input[name="lingua"]', f).forEach(function (i) { i.value = root.lang; });
      }).catch(function () {
        st.textContent = d["form.fail"];
        st.classList.add("is-err");
      }).then(function () { btn.disabled = false; });
    });
  });
})();
