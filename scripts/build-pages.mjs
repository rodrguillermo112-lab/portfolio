import {
  cp,
  mkdir,
  readdir,
  readFile,
  rm,
  stat,
  writeFile,
} from "node:fs/promises";
import { dirname, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = fileURLToPath(new URL("../", import.meta.url));
const preview = process.argv.includes("--preview");
if (!preview) process.env.PORTFOLIO_PUBLISH = "1";
await import("./check-content.mjs");

const build = spawnSync(
  process.execPath,
  [resolve(root, "node_modules/next/dist/bin/next"), "build", "--webpack"],
  {
    cwd: root,
    stdio: "inherit",
    env: { ...process.env, NEXT_PUBLIC_VIDEO_PROVIDER: "youtube" },
  },
);
if (build.error) throw build.error;
if (build.status !== 0) process.exit(build.status || 1);

// Only generated deployment directories are replaced; public/original files stay intact.
const folder = preview ? "out-pages-preview" : "out-pages";
const output = resolve(root, folder);
if (
  dirname(output) !== resolve(root) ||
  !["out-pages", "out-pages-preview"].includes(relative(root, output))
)
  throw new Error("Unsafe generated output path");
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
const source = resolve(root, "out");
await cp(source, output, {
  recursive: true,
  filter: (path) => {
    const local = relative(source, path).split(sep).join("/");
    return !["videos/projects", "videos/reels"].some(
      (entry) => local === entry || local.startsWith(`${entry}/`),
    );
  },
});
if (preview) {
  await writeFile(
    resolve(output, "robots.txt"),
    "User-agent: *\nDisallow: /\n",
  );
  const headers = await readFile(resolve(output, "_headers"), "utf8");
  await writeFile(
    resolve(output, "_headers"),
    `${headers}  X-Robots-Tag: noindex, nofollow\n`,
  );
} else {
  await writeFile(resolve(output, "robots.txt"), "User-agent: *\nAllow: /\n");
}
let count = 0;
let bytes = 0;
async function verify(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) await verify(path);
    else {
      const file = await stat(path);
      if (file.size > 25 * 1024 * 1024)
        throw new Error(`Cloudflare file limit exceeded: ${path}`);
      if (/\.(env|map)$/.test(entry.name))
        throw new Error(`Unexpected deployment file: ${path}`);
      count++;
      bytes += file.size;
    }
  }
}
await verify(output);
if (count > 1000) throw new Error("Cloudflare dashboard upload limit exceeded");
console.log(
  JSON.stringify({
    output,
    files: count,
    bytes,
    mode: preview ? "preview-only: NOT ready to publish" : "ready-for-pages",
  }),
);
