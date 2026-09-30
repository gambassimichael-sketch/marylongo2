/* Prepara le foto del sito dalle sorgenti migliori disponibili (originali WordPress, meno compressi).
   Per ogni foto crea:
   - foto/<nome>.jpg      risoluzione nativa, leggera nitidezza (gallerie, card, immagini affiancate)
   - foto/<nome>@2x.jpg   ingrandita 2x con Lanczos3 + nitidezza (sfondi a tutta larghezza, lightbox)
   Uso: node tools/images.js   (richiede: npm install) */
const sharp = require("sharp"), fs = require("fs"), path = require("path");
/* elenco sorgenti: _work/pool.json (generato da _work/sheet.js, foto uniche dopo rimozione doppioni) */
const pool = require("../_work/pool.json");
const OUT = path.join(__dirname, "..", "site", "assets", "img", "foto");
fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const map = {};
  for (const u of pool) {
    const name = "mary-longo-wedding-" + String(u.id).padStart(2, "0");
    const src = sharp(u.p).rotate();
    const meta = await src.metadata();
    await sharp(u.p).rotate()
      .sharpen({ sigma: 0.6, m1: 0.5, m2: 1.5 })
      .jpeg({ quality: 86, mozjpeg: true, progressive: true })
      .toFile(path.join(OUT, name + ".jpg"));
    await sharp(u.p).rotate()
      .resize(meta.width * 2, meta.height * 2, { kernel: "lanczos3" })
      .sharpen({ sigma: 1.1, m1: 0.7, m2: 2.2 })
      .jpeg({ quality: 80, mozjpeg: true, progressive: true, chromaSubsampling: "4:4:4" })
      .toFile(path.join(OUT, name + "@2x.jpg"));
    map[u.id] = { file: name, w: meta.width, h: meta.height };
    process.stdout.write(".");
  }
  fs.writeFileSync(path.join(__dirname, "photos.json"), JSON.stringify(pool.map((u) => ({ id: u.id, ...map[u.id], source: u.name, dups: u.dups || [] })), null, 1));
  console.log("\nfatto:", Object.keys(map).length, "foto");
})();
