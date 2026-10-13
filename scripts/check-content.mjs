import { readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = fileURLToPath(new URL("../", import.meta.url));
const source = await readFile(resolve(root, "src/data/projects.ts"), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;
const data = await import(
  `data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`
);
const publishing = true; // This repository uses YouTube for all full videos.
const youtubeIds = new Set();
const groups = [data.featuredProjects, data.galleryProjects];
const placements = groups.flat();
const ids = placements.map((p) => p.id);
if (new Set(ids).size !== ids.length || ids.length !== data.projects.length) {
  throw new Error("Each project must have exactly one editorial placement.");
}
if (new Set(data.projects.map((p) => p.video)).size !== data.projects.length) {
  throw new Error("Two project records point to the same full-length video.");
}
for (const project of data.projects) {
  if (project.youtubeId) {
    if (!/^[A-Za-z0-9_-]{11}$/.test(project.youtubeId))
      throw new Error(`Invalid YouTube ID: ${project.title}`);
    if (youtubeIds.has(project.youtubeId))
      throw new Error(`Repeated YouTube video: ${project.title}`);
    youtubeIds.add(project.youtubeId);
  }
  if (project.featured !== (project.placement === "featured"))
    throw new Error(`Inconsistent featured placement: ${project.id}`);
  if (
    !project.titleEs ||
    !project.title ||
    !project.descriptionEs ||
    !project.description
  )
    throw new Error(`Missing translation: ${project.id}`);
  for (const key of ["preview", "poster"]) {
    const path = resolve(root, "public", project[key].replace(/^\//, ""));
    const file = await stat(path);
    if (!file.size) throw new Error(`Empty ${key}: ${project.title}`);
  }
  if (!(project.duration > 0))
    throw new Error(`Missing duration: ${project.title}`);
}
if (publishing && youtubeIds.size !== data.projects.length) {
  const missing = data.projects
    .filter((p) => !p.youtubeId)
    .map((p) => p.titleEs);
  throw new Error(
    `Publication pending: add the real YouTube IDs in src/data/projects.ts for:\n${missing.join("\n")}`,
  );
}
console.log(
  `${data.projects.length} unique works, one placement each, all YouTube IDs valid and preview/poster files present.`,
);
