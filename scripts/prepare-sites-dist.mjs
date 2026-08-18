import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const source = join(root, "out");
const target = join(root, "dist");
await rm(target, { recursive: true, force: true });
await mkdir(join(target, "server"), { recursive: true });
await mkdir(join(target, ".openai"), { recursive: true });
await cp(source, target, { recursive: true });
await cp(join(root, ".openai", "hosting.json"), join(target, ".openai", "hosting.json"));
const worker = "export default {\\n  async fetch(request, env) {\\n    if (env.ASSETS) return env.ASSETS.fetch(request);\\n    return new Response(\\\"Trustible asset binding is unavailable\\\", { status: 503 });\\n  }\\n};\\n";
await writeFile(join(target, "server", "index.js"), worker);
console.log("Prepared Sites dist/ with assets, metadata, and worker entrypoint");

