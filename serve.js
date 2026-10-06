/* Server locale per l'anteprima: node serve.js  →  http://localhost:4321 */
const http = require("http"), fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "site");
const TYPES = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".svg": "image/svg+xml", ".webp": "image/webp" };
http.createServer((req, res) => {
  if (req.method === "POST") { res.writeHead(200); return res.end("ok"); }
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p.endsWith("/")) p += "index.html";
  let f = path.join(ROOT, p);
  if (!path.extname(f) && fs.existsSync(f + ".html")) f += ".html";
  fs.readFile(f, (err, data) => {
    if (err) { res.writeHead(404); return res.end("404"); }
    res.writeHead(200, { "Content-Type": TYPES[path.extname(f).toLowerCase()] || "application/octet-stream" });
    res.end(data);
  });
}).listen(process.env.PORT || 4321, () => console.log("http://localhost:" + (process.env.PORT || 4321)));
