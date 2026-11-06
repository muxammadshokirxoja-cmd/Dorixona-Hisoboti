const fs = require("fs"), path = require("path");
const out = path.join(__dirname, "..", "www", "vendor");
fs.mkdirSync(out, { recursive: true });
const nm = path.join(__dirname, "..", "node_modules");
[["firebase/firebase-app-compat.js"], ["firebase/firebase-auth-compat.js"], ["firebase/firebase-firestore-compat.js"],
 ["jszip/dist/jszip.min.js"], ["xlsx/dist/xlsx.full.min.js"]].forEach(([f]) => {
  fs.copyFileSync(path.join(nm, f), path.join(out, path.basename(f)));
  console.log("vendor:", f);
});
