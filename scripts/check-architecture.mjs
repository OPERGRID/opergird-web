import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const sourceRoot = path.join(projectRoot, "src");

const sourceExtensions = new Set([".js", ".jsx", ".mjs", ".cjs", ".ts", ".tsx"]);

const violations = [];

function walk(directory) {
  const entries = fs.readdirSync(directory, {
    withFileTypes: true,
  });

  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...walk(fullPath));
      continue;
    }

    if (entry.isFile() && sourceExtensions.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

function relativeFile(filePath) {
  return path.relative(projectRoot, filePath).split(path.sep).join("/");
}

function collectImports(content) {
  const imports = [];

  const staticPattern = /\b(?:import|export)\s+(?:[^"'`]*?\s+from\s+)?["']([^"']+)["']/g;

  const dynamicPattern = /\bimport\s*\(\s*["']([^"']+)["']\s*\)/g;

  for (const match of content.matchAll(staticPattern)) {
    imports.push(match[1]);
  }

  for (const match of content.matchAll(dynamicPattern)) {
    imports.push(match[1]);
  }

  return imports;
}

function isClientModule(content) {
  const normalized = content.trimStart();

  return normalized.startsWith('"use client"') || normalized.startsWith("'use client'");
}

function looksLikeServerOnlyImport(importPath) {
  return (
    importPath === "server-only" ||
    importPath.includes(".server") ||
    importPath.startsWith("@/lib/server/") ||
    importPath.includes("/server/")
  );
}

function report(file, importPath, reason) {
  violations.push({
    file,
    importPath,
    reason,
  });
}

if (!fs.existsSync(sourceRoot)) {
  console.error("src directory does not exist.");
  process.exit(1);
}

const files = walk(sourceRoot);

for (const absoluteFile of files) {
  const file = relativeFile(absoluteFile);
  const content = fs.readFileSync(absoluteFile, "utf8");

  const imports = collectImports(content);

  const inComponents = file.startsWith("src/components/");

  const inLib = file.startsWith("src/lib/");

  const inConfig = file.startsWith("src/config/");

  const inFeatures = file.startsWith("src/features/");

  const clientModule = isClientModule(content);

  for (const importPath of imports) {
    if (
      inComponents &&
      (importPath.startsWith("@/features/") || importPath.startsWith("@/app/"))
    ) {
      report(
        file,
        importPath,
        "Global components must not depend on features or routes.",
      );
    }

    if (
      inLib &&
      (importPath.startsWith("@/features/") || importPath.startsWith("@/app/"))
    ) {
      report(file, importPath, "Infrastructure must not depend on features or routes.");
    }

    if (
      inConfig &&
      (importPath.startsWith("@/features/") || importPath.startsWith("@/app/"))
    ) {
      report(file, importPath, "Configuration must not depend on features or routes.");
    }

    if (inFeatures && importPath.startsWith("@/app/")) {
      report(
        file,
        importPath,
        "Features must not depend on Next.js route implementations.",
      );
    }

    if (clientModule && looksLikeServerOnlyImport(importPath)) {
      report(file, importPath, "Client modules must not import server-only modules.");
    }
  }
}

if (violations.length > 0) {
  console.error("");
  console.error("OPERGRID architecture violations detected:");
  console.error("");

  for (const violation of violations) {
    console.error(`File   : ${violation.file}`);
    console.error(`Import : ${violation.importPath}`);
    console.error(`Rule   : ${violation.reason}`);
    console.error("");
  }

  process.exit(1);
}

console.log("OPERGRID architecture check: PASS");
