import fs from "node:fs";
import path from "node:path";

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : full.endsWith(".tsx") ? [full] : [];
  });
}

const forbidden = [/<button\b/, /<input\b/, /<select\b/, /<textarea\b/, /className=["'`][^"'`]*\bbutton\b/];
const violations = [];
for (const file of walk("app")) {
  const source = fs.readFileSync(file, "utf8");
  for (const pattern of forbidden) if (pattern.test(source)) violations.push(`${file}: ${pattern}`);
}
if (violations.length) {
  console.error("Astryx migration guard failed:");
  console.error(violations.join("\n"));
  process.exit(1);
}
console.log("Astryx migration guard passed: no raw controls or custom button classes in app/*.tsx");
