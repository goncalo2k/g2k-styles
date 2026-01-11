import fs from "node:fs";
import path from "node:path";

const srcDir = path.resolve("src");
const distDir = path.resolve("dist");

fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(distDir, { recursive: true });

function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });

  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const fromPath = path.join(from, entry.name);
    const toPath = path.join(to, entry.name);

    if (entry.isDirectory()) copyDir(fromPath, toPath);
    else fs.copyFileSync(fromPath, toPath);
  }
}

copyDir(srcDir, distDir);
console.log("Built: copied src → dist");
