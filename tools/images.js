/* Prepara le foto del sito in formato WebP partendo dagli originali (cartella _orig, non pubblicata).
   Per ogni foto del catalogo tools/photos.json crea in site/assets/img/foto/:
   - <nome>-sm.webp   lato lungo 900px — miniature (gallerie, portfolio, Instagram)
   - <nome>.webp      risoluzione nativa (max 2048px) — immagini affiancate, lightbox
   - <nome>@2x.webp   solo per le foto piccole (lato lungo < 1800px): ingrandita 2x con Lanczos3
                      e nitidezza, per gli sfondi a tutta larghezza
   Uso: npm run images   (richiede: npm install) */
const sharp = require("sharp"), fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "site", "assets", "img", "foto");
const CATALOG = path.join(__dirname, "photos.json");
const photos = require(CATALOG);
fs.mkdirSync(OUT, { recursive: true });

const SM = 900, MAX = 2048, UPSCALE_BELOW = 1800;

(async () => {
  const keep = new Set();
  for (const p of photos) {
    const src = path.join(ROOT, p.source);
    const outs = [`${p.file}-sm.webp`, `${p.file}.webp`, `${p.file}@2x.webp`];
    // originale non presente su questo PC (_orig non è nel repo): si tengono i WebP già generati
    if (!fs.existsSync(src)) {
      if (!fs.existsSync(path.join(OUT, `${p.file}.webp`))) throw new Error("Originale mancante: " + p.source);
      outs.forEach((f) => keep.add(f));
      process.stdout.write("=");
      continue;
    }
    const meta = await sharp(src).rotate().metadata();
    const rot = meta.orientation >= 5;
    const w = rot ? meta.height : meta.width, h = rot ? meta.width : meta.height;
    const long = Math.max(w, h);
    const base = () => sharp(src).rotate();

    await base().resize({ width: w >= h ? SM : null, height: h > w ? SM : null, kernel: "lanczos3" })
      .sharpen({ sigma: 0.5 }).webp({ quality: 76, effort: 5 }).toFile(path.join(OUT, `${p.file}-sm.webp`));

    const scale = long > MAX ? MAX / long : 1;
    const mw = Math.round(w * scale), mh = Math.round(h * scale);
    await base().resize(mw, mh, { kernel: "lanczos3" })
      .sharpen({ sigma: 0.6, m1: 0.5, m2: 1.5 }).webp({ quality: 82, effort: 5 }).toFile(path.join(OUT, `${p.file}.webp`));

    p.w = mw; p.h = mh; p.hd = long < UPSCALE_BELOW;
    if (p.hd) {
      await base().resize(w * 2, h * 2, { kernel: "lanczos3" })
        .sharpen({ sigma: 1.1, m1: 0.7, m2: 2.2 }).webp({ quality: 74, effort: 5 }).toFile(path.join(OUT, `${p.file}@2x.webp`));
    }
    outs.forEach((f) => keep.add(f));
    process.stdout.write(".");
  }
  // rimuove i file non più usati (es. vecchi .jpg)
  let removed = 0;
  for (const f of fs.readdirSync(OUT)) if (!keep.has(f)) { fs.unlinkSync(path.join(OUT, f)); removed++; }
  fs.writeFileSync(CATALOG, JSON.stringify(photos, null, 1));
  console.log(`\nfatto: ${photos.length} foto, rimossi ${removed} file vecchi`);
})();
