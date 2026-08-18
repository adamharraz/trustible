import fs from "node:fs";

const source = fs.readFileSync("app/trustible.js", "utf8");
const commonjs = source.replace("export const trustibleTheme =", "exports.trustibleTheme =");
fs.writeFileSync("app/trustible.cjs", commonjs, "utf8");
